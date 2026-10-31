import { useEffect, useState } from 'react';

import { useManufacturingSequences } from '../../../../contexts/manufacturingSequences/index.js';
export function useItemSearch(term, selected) {
  const { searchExportItems } = useManufacturingSequences();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [revision, setRevision] = useState(0);
  useEffect(() => {
    let active = true;
    setItems([]);
    setError(false);
    setLoading(false);
    if (term.trim().length < 3 || selected?.code === term) return undefined;
    setLoading(true);
    const timeout = setTimeout(() => {
      searchExportItems(term)
        .then(
          (result) => {
            if (active) setItems(result);
          },
          () => {
            if (active) setError(true);
          },
        )
        .finally(() => {
          if (active) setLoading(false);
        });
    }, 400);
    return () => {
      active = false;
      clearTimeout(timeout);
    };
  }, [term, selected?.code, searchExportItems, revision]);
  return { items, loading, error, refresh: () => setRevision((v) => v + 1) };
}
