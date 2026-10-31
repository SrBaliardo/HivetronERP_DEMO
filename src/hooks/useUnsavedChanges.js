import { useCallback, useContext, useEffect, useId, useRef } from 'react';

import { NavigationGuardContext } from '../contexts/NavigationGuardContext';

export function useUnsavedChanges(dirty, onDiscard) {
  const guard = useContext(NavigationGuardContext);
  const id = useId();
  const current = useRef({ dirty, onDiscard });
  current.current = { dirty, onDiscard };
  useEffect(
    () =>
      guard?.register(id, {
        dirty: () => current.current.dirty,
        discard: () => current.current.onDiscard?.(),
      }),
    [guard, id, dirty],
  );
  return useCallback(() => guard?.clear(id), [guard, id]);
}
export function useNavigationConfirmation() {
  const guard = useContext(NavigationGuardContext);
  return useCallback(
    (proceed, cancel) => (guard ? guard.request(proceed, cancel) : proceed()),
    [guard],
  );
}
