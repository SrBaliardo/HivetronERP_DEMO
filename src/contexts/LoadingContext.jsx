import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { validateProp } from '../utils/validateProp';

const LoadingContext = createContext(null);

export function LoadingProvider({ children }) {
  const mounted = useRef(false);
  const requests = useRef(new Set());
  const modals = useRef(new Set());
  const [requestCount, setRequestCount] = useState(0);
  const [modalCount, setModalCount] = useState(0);
  const [legacyLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const activeRequests = requests.current;
    const activeModals = modals.current;
    mounted.current = true;
    setRequestCount(activeRequests.size);
    setModalCount(activeModals.size);
    return () => {
      mounted.current = false;
      activeRequests.clear();
      activeModals.clear();
    };
  }, []);

  const beginLoading = useCallback(() => {
    const request = {};
    requests.current.add(request);
    if (mounted.current) setRequestCount(requests.current.size);
    return () => {
      if (requests.current.delete(request) && mounted.current)
        setRequestCount(requests.current.size);
    };
  }, []);

  const registerModal = useCallback(() => {
    const modal = {};
    modals.current.add(modal);
    if (mounted.current) setModalCount(modals.current.size);
    return () => {
      if (modals.current.delete(modal) && mounted.current)
        setModalCount(modals.current.size);
    };
  }, []);

  const value = useMemo(
    () => ({
      isLoading: legacyLoading || requestCount > 0,
      setIsLoading,
      beginLoading,
      registerModal,
      hasModal: modalCount > 0,
    }),
    [legacyLoading, requestCount, beginLoading, registerModal, modalCount],
  );

  return (
    <LoadingContext.Provider value={value}>{children}</LoadingContext.Provider>
  );
}

LoadingProvider.propTypes = {
  children: validateProp(['object', 'string', 'number', 'boolean']),
};

export const useLoading = () => useContext(LoadingContext);
