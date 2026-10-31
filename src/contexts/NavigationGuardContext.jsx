import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { UNSAFE_DataRouterContext, useBlocker } from 'react-router-dom';

import { ModalAlert } from '../components/ModalAlert';
import { validateProp } from '../utils/validateProp';

export const NavigationGuardContext = createContext(null);

function RouterGuard({ hasChanges, request }) {
  const blocker = useBlocker(hasChanges);
  useEffect(() => {
    if (blocker.state === 'blocked')
      request(
        () => blocker.proceed(),
        () => blocker.reset(),
      );
  }, [blocker, request]);
  return null;
}
RouterGuard.propTypes = {
  hasChanges: validateProp('function', true),
  request: validateProp('function', true),
};

export function NavigationGuardProvider({ children }) {
  const entries = useRef(new Map());
  const pending = useRef(null);
  const [visible, setVisible] = useState(false);
  const dataRouter = useContext(UNSAFE_DataRouterContext);
  const hasChanges = useCallback(
    () => [...entries.current.values()].some((entry) => entry.dirty()),
    [],
  );
  const register = useCallback((id, entry) => {
    entries.current.set(id, entry);
    return () => entries.current.delete(id);
  }, []);
  const clear = useCallback((id) => entries.current.delete(id), []);
  const request = useCallback(
    (proceed, cancel) => {
      if (pending.current) return;
      if (!hasChanges()) {
        proceed();
        return;
      }
      pending.current = { proceed, cancel };
      setVisible(true);
    },
    [hasChanges],
  );
  const discard = () => {
    const target = pending.current;
    pending.current = null;
    for (const [id, entry] of [...entries.current]) {
      if (entry.dirty()) {
        clear(id);
        entry.discard();
      }
    }
    setVisible(false);
    target?.proceed();
  };
  const stay = () => {
    const target = pending.current;
    pending.current = null;
    setVisible(false);
    target?.cancel?.();
  };
  useEffect(() => {
    const beforeUnload = (event) => {
      if (!hasChanges()) return;
      event.preventDefault();
      event.returnValue = '';
    };
    window.addEventListener('beforeunload', beforeUnload);
    return () => window.removeEventListener('beforeunload', beforeUnload);
  }, [hasChanges]);
  const value = useMemo(
    () => ({ register, clear, request }),
    [register, clear, request],
  );
  return (
    <NavigationGuardContext.Provider value={value}>
      {dataRouter && <RouterGuard hasChanges={hasChanges} request={request} />}
      {children}
      <ModalAlert
        visible={visible}
        title="Alterações não salvas"
        message="Existem alterações que não foram salvas. Deseja realmente sair da tela? As alterações serão descartadas."
        onCancel={stay}
        onConfirm={discard}
      />
    </NavigationGuardContext.Provider>
  );
}
NavigationGuardProvider.propTypes = { children: validateProp('object', true) };
