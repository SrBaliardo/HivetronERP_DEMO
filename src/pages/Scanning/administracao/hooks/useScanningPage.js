import { useCallback, useEffect, useRef, useState } from 'react';

import { useScanning } from '../../../../contexts/scanning';

const emptyPage = {
  items: [],
  number: 0,
  size: 8,
  totalElements: 0,
  totalPages: 0,
};
export function useScanningPage(kind, query, active) {
  const {
    sessionKey,
    getScanningPage,
    pageVersions,
    markGeneratedServiceOrders,
  } = useScanning();
  const [revision, setRevision] = useState(0);
  const [state, setState] = useState({
    key: '',
    page: emptyPage,
    loading: false,
    error: false,
  });
  const generation = useRef(0);
  const settled = useRef('');
  const key = JSON.stringify([sessionKey, kind, query]);
  const requestKey = JSON.stringify([key, revision, pageVersions[kind] || 0]);
  useEffect(() => {
    if (!active || settled.current === requestKey) return undefined;
    const ticket = ++generation.current;
    let mounted = true;
    setState((previous) => ({
      key,
      page: previous.key === key ? previous.page : emptyPage,
      loading: true,
      error: false,
    }));
    getScanningPage(kind, query).then(
      (page) => {
        if (mounted && ticket === generation.current) {
          settled.current = requestKey;
          setState({ key, page, loading: false, error: false });
        }
      },
      () => {
        if (mounted && ticket === generation.current) {
          settled.current = requestKey;
          setState((previous) => ({
            ...previous,
            loading: false,
            error: true,
          }));
        }
      },
    );
    return () => {
      mounted = false;
    };
  }, [active, getScanningPage, key, kind, query, requestKey]);
  const refresh = useCallback(() => {
    generation.current++;
    setRevision((value) => value + 1);
  }, []);
  const markGenerated = useCallback(
    (records) => {
      setState((previous) =>
        previous.key === key
          ? {
              ...previous,
              page: {
                ...previous.page,
                items: markGeneratedServiceOrders(previous.page.items, records),
              },
            }
          : previous,
      );
    },
    [key, markGeneratedServiceOrders],
  );
  const current =
    state.key === key
      ? state
      : { page: emptyPage, error: false, loading: true };
  return {
    page: current.page,
    hasPage: state.key === key && state.page !== emptyPage,
    items: current.error ? [] : current.page.items,
    loading: Boolean(
      active && (current.loading || settled.current !== requestKey),
    ),
    error: current.error,
    loaded: state.key === key && settled.current === requestKey && !state.error,
    refresh,
    markGenerated,
  };
}
