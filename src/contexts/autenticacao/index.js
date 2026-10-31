import {
  createContext,
  createElement,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { toast } from 'react-toastify';

import { createDemonstrationService } from '../../services/autenticacao';
import {
  isSessionStorageEvent,
  readRememberedUsername,
  readSession,
  removeSession,
  saveRememberedUsername,
  saveSession,
  subscribeSessionInvalidation,
} from '../../services/sessao';
import { decodeToken, isTokenExpired } from '../../utils/token';
import { validateProp } from '../../utils/validateProp';
import {
  buildLoginPayload,
  buildUserProfile,
  getSessionUserId,
} from './builders';
import { buildDemonstrationResponses } from './builders/demonstracao';
import { canValidateAdmin, isDemonstrationCredential } from './regras';

const { authenticate, fetchUserProfile, recoverPassword } =
  createDemonstrationService(buildDemonstrationResponses());

export const AutenticacaoContext = createContext();

function reportFailure(operation, error) {
  if (error?.code === 'ERR_CANCELED') return;
  console.warn(operation, {
    code: error?.code || 'UNKNOWN',
    status: error?.response?.status,
  });
}

function initialSession() {
  const session = readSession();
  if (
    session.token &&
    (!getSessionUserId(session) || isTokenExpired(session.token))
  ) {
    removeSession();
    return {};
  }
  return session;
}

export function AutenticacaoProvider({ children }) {
  const [userData, setUserData] = useState(initialSession);
  const [sessionRevision, setSessionRevision] = useState(0);
  const [profileState, setProfileState] = useState({
    token: userData.token,
    status: userData.token ? 'pending' : 'idle',
  });
  const retryProfile = useCallback(
    () => setSessionRevision((value) => value + 1),
    [],
  );
  const sessionVersion = useRef(0);

  const putUserData = useCallback((session) => {
    saveSession(session);
    sessionVersion.current += 1;
    setSessionRevision(sessionVersion.current);
    setUserData(session);
  }, []);

  const clearUserData = useCallback(() => {
    sessionVersion.current += 1;
    setSessionRevision(sessionVersion.current);
    removeSession();
    setUserData({});
  }, []);

  useEffect(() => {
    const token = userData.token;
    if (!token) return undefined;
    let timer;
    const checkSession = () => {
      clearTimeout(timer);
      const savedSession = readSession();
      if (savedSession.token !== token) {
        sessionVersion.current += 1;
        setSessionRevision(sessionVersion.current);
        setUserData(savedSession);
        return;
      }
      if (isTokenExpired(token)) {
        clearUserData();
        return;
      }
      const expiration = decodeToken(token)?.exp;
      if (typeof expiration === 'number') {
        timer = setTimeout(
          checkSession,
          Math.min(Math.max(expiration * 1000 - Date.now() + 1, 1), 2147483647),
        );
      }
    };
    const onInvalidation = (invalidToken) => {
      if (invalidToken === token) clearUserData();
    };
    const onStorage = (event) => {
      if (isSessionStorageEvent(event)) checkSession();
    };
    const unsubscribe = subscribeSessionInvalidation(onInvalidation);
    window.addEventListener('focus', checkSession);
    window.addEventListener('pageshow', checkSession);
    window.addEventListener('online', checkSession);
    window.addEventListener('storage', onStorage);
    document.addEventListener('visibilitychange', checkSession);
    checkSession();
    return () => {
      clearTimeout(timer);
      unsubscribe();
      window.removeEventListener('focus', checkSession);
      window.removeEventListener('pageshow', checkSession);
      window.removeEventListener('online', checkSession);
      window.removeEventListener('storage', onStorage);
      document.removeEventListener('visibilitychange', checkSession);
    };
  }, [userData.token, clearUserData]);

  useEffect(() => {
    const token = userData.token;
    const userId = getSessionUserId({ token });
    if (!token) return undefined;
    if (!userId) {
      clearUserData();
      return undefined;
    }
    let active = true;
    const version = sessionVersion.current;

    setProfileState({ token, status: 'pending' });
    fetchUserProfile(userId, token)
      .then(
        (profile) => {
          if (!active || version !== sessionVersion.current) return;
          const userProfile = buildUserProfile(profile);
          setProfileState({ token, status: 'ready' });
          setUserData((previous) => {
            if (!active || version !== sessionVersion.current) return previous;
            return { ...previous, ...userProfile };
          });
        },
        (error) => {
          if (active && version === sessionVersion.current) {
            setProfileState({ token, status: 'error' });
            reportFailure('Erro ao buscar dados do usuário.', error);
          }
        },
      )
      .catch((error) => {
        if (active && version === sessionVersion.current) {
          setProfileState({ token, status: 'error' });
          reportFailure('Erro ao buscar dados do usuário.', error);
        }
      });
    return () => {
      active = false;
    };
  }, [userData.token, sessionRevision, clearUserData]);

  const login = useCallback(
    async (values, signal) => {
      saveRememberedUsername(values.username, values.rememberMe);
      if (!isDemonstrationCredential(values.username, values.password)) {
        toast.info(
          'Use o usuário demo e a senha demo para explorar a demonstração.',
        );
        throw new Error('Credenciais demonstrativas inválidas.');
      }
      try {
        const session = await toast.promise(
          authenticate(buildLoginPayload(values), signal),
          {
            pending: '👨🏻‍💻 Verificando seus dados...',
            success: '🙋🏻‍♂️ Seja bem-vindo(a)!',
            error: '🙅🏻‍♂️ Verifique seu e-mail e senha.',
          },
        );
        if (!signal?.aborted) putUserData(session);
        return session;
      } catch (error) {
        reportFailure('Erro ao autenticar usuário.', error);
        throw error;
      }
    },
    [putUserData],
  );

  const requestPasswordRecovery = useCallback(async (email, signal) => {
    try {
      return await toast.promise(recoverPassword(email, signal), {
        pending: '👨🏻‍💻 Enviando solicitação...',
        success: 'Demonstração: nenhum e-mail foi enviado.',
        error: 'Erro ao enviar, verifique as informações e tente novamente.',
      });
    } catch (error) {
      reportFailure('Erro ao solicitar recuperação de senha.', error);
      throw error;
    }
  }, []);

  const validateAdmin = useCallback(async (username, password) => {
    if (!isDemonstrationCredential(username, password)) {
      throw new Error('Use o usuário demo e a senha demo.');
    }
    try {
      const session = await authenticate(
        buildLoginPayload({ username, password }),
      );
      const userId = getSessionUserId(session);
      if (!userId) throw new Error('Erro na autenticação.');
      const profile = buildUserProfile(
        await fetchUserProfile(userId, session.token),
      );
      if (!canValidateAdmin(profile.role)) {
        throw new Error('Usuário sem permissão para liberar o modal.');
      }
      return profile;
    } catch (error) {
      reportFailure('Erro ao validar usuário.', error);
      throw new Error('Credenciais inválidas ou usuário sem permissão.');
    }
  }, []);

  const value = useMemo(
    () => ({
      userData,
      userRole: userData.role,
      isUserLoading: Boolean(
        userData.token &&
          (profileState.token !== userData.token ||
            profileState.status === 'pending'),
      ),
      profileError:
        profileState.token === userData.token &&
        profileState.status === 'error',
      retryProfile,
      putUserData,
      clearUserData,
      login,
      requestPasswordRecovery,
      validateAdmin,
      getRememberedUsername: readRememberedUsername,
      rememberUsername: saveRememberedUsername,
    }),
    [
      userData,
      profileState,
      retryProfile,
      putUserData,
      clearUserData,
      login,
      requestPasswordRecovery,
      validateAdmin,
    ],
  );

  return createElement(AutenticacaoContext.Provider, { value }, children);
}

AutenticacaoProvider.propTypes = {
  children: validateProp(['object', 'string', 'number', 'boolean']),
};

export function useAutenticacao() {
  const context = useContext(AutenticacaoContext);
  if (!context) throw new Error('useUser must be used within a UserProvider');
  return context;
}
