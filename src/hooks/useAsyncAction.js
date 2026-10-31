import { useCallback, useEffect, useRef, useState } from 'react';

import { useLoading } from '../contexts/LoadingContext';

// Interações locais compartilham somente o controle de concorrência e desmontagem.
export function useAsyncAction() {
  const beginLoading = useLoading()?.beginLoading;
  const release = useRef(null);
  const mounted = useRef(false);
  const current = useRef(null);
  const [pending, setPending] = useState(false);
  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
      release.current?.();
      release.current = null;
      current.current?.abort();
      current.current = null;
    };
  }, []);
  const cancel = useCallback(() => {
    if (!current.current) return;
    release.current?.();
    release.current = null;
    current.current.abort();
    current.current = null;
    if (mounted.current) setPending(false);
  }, []);
  const run = useCallback(
    async (operation, onSuccess, onError) => {
      if (!mounted.current || current.current) return;
      const controller = new AbortController();
      current.current = controller;
      release.current = beginLoading?.();
      setPending(true);
      try {
        const result = await operation(controller.signal);
        if (
          mounted.current &&
          current.current === controller &&
          !controller.signal.aborted
        )
          onSuccess?.(result);
      } catch (error) {
        // A fachada comunica a falha. O formulário conserva os valores para nova tentativa.
        if (
          mounted.current &&
          current.current === controller &&
          !controller.signal.aborted
        )
          onError?.(error);
      } finally {
        if (current.current === controller) {
          release.current?.();
          release.current = null;
          current.current = null;
          if (mounted.current) setPending(false);
        }
      }
    },
    [beginLoading],
  );
  return { pending, run, cancel };
}
