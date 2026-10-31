import { useCallback, useEffect, useRef } from 'react';

export function useDelayedCallback(callback, delay) {
  const timer = useRef(null);
  const current = useRef(callback);
  current.current = callback;
  const cancel = useCallback(() => clearTimeout(timer.current), []);
  useEffect(() => cancel, [cancel]);
  const schedule = useCallback(() => {
    cancel();
    timer.current = setTimeout(() => current.current(), delay);
  }, [cancel, delay]);
  return { schedule, cancel };
}
