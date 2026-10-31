import { useCallback, useEffect, useRef, useState } from 'react';

// A leitura é local; a deduplicação de transporte fica no service da capacidade.
export function useAsyncList(load, active = true, refreshKey) {
  const [state, setState] = useState({
    items: [],
    loading: false,
    error: false,
    settled: null,
  });
  const [revision, setRevision] = useState(0);
  const generation = useRef(0);
  const settled = useRef(null);
  useEffect(() => {
    if (!active) return undefined;
    if (
      settled.current?.load === load &&
      settled.current.revision === revision &&
      settled.current.refreshKey === refreshKey
    )
      return undefined;
    const request = ++generation.current;
    let mounted = true;
    setState((previous) => ({ ...previous, loading: true, error: false }));
    const finish = (result, error) => {
      if (!mounted || generation.current !== request) return;
      const completed = { load, revision, refreshKey };
      settled.current = completed;
      setState((previous) => ({
        items: error ? previous.items : result,
        loading: false,
        error,
        settled: completed,
      }));
    };
    Promise.resolve()
      .then(() => (mounted ? load() : undefined))
      .then(
        (result) => finish(result, false),
        () => finish(undefined, true),
      );
    return () => {
      mounted = false;
    };
  }, [load, active, revision, refreshKey]);
  const refresh = useCallback(() => setRevision((value) => value + 1), []);
  const awaitingCurrentLoad =
    state.settled?.load !== load ||
    state.settled?.revision !== revision ||
    state.settled?.refreshKey !== refreshKey;
  return {
    items: state.items,
    loading: Boolean(active && (state.loading || awaitingCurrentLoad)),
    error: state.error,
    refresh,
  };
}
