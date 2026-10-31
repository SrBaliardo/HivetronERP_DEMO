import {
  createContext,
  useState,
  useEffect,
  useContext,
  useMemo,
  useCallback,
  useRef,
} from 'react';

import { validateProp } from '../utils/validateProp';

const ScreenContext = createContext();
function readStoredScreen() {
  try {
    return localStorage.getItem('activeScreen');
  } catch {
    return null;
  }
}

export const ScreenProvider = ({ children }) => {
  const pendingRestore = useRef(false);
  const requestScreenRestore = useCallback(() => {
    pendingRestore.current = true;
  }, []);
  const consumeScreenRestore = useCallback(() => {
    const requested = pendingRestore.current;
    pendingRestore.current = false;
    return requested;
  }, []);
  const [activeScreen, setActiveScreen] = useState(
    () => readStoredScreen() || '/home',
  );
  useEffect(() => {
    try {
      localStorage.setItem('activeScreen', activeScreen);
    } catch {
      console.warn('Não foi possível salvar a tela ativa.');
    }
  }, [activeScreen]);
  const value = useMemo(
    () => ({
      activeScreen,
      setActiveScreen,
      readStoredScreen,
      requestScreenRestore,
      consumeScreenRestore,
    }),
    [activeScreen, requestScreenRestore, consumeScreenRestore],
  );
  return (
    <ScreenContext.Provider value={value}>{children}</ScreenContext.Provider>
  );
};
ScreenProvider.propTypes = {
  children: validateProp(['object', 'string', 'number', 'boolean']),
};
export const useScreen = () => useContext(ScreenContext);
