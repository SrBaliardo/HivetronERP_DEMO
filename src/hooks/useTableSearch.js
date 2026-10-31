import { useMemo, useState } from 'react';

export function useTableSearch(items, keys) {
  const [searchInput, setSearchInput] = useState('');
  const [applied, setApplied] = useState('');
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 8,
    total: 0,
  });
  const filteredData = useMemo(
    () =>
      (items || []).filter(
        (item) =>
          !applied ||
          keys.some((key) => item[key]?.toLowerCase().includes(applied)),
      ),
    [items, keys, applied],
  );
  const search = () => {
    setApplied(searchInput.toLowerCase());
  };
  const clearFilters = () => {
    setSearchInput('');
    setApplied('');
    setPagination((previous) => ({ ...previous, current: 1 }));
  };
  return {
    searchInput,
    setSearchInput,
    search,
    clearFilters,
    hasFilters: Boolean(applied),
    filteredData,
    pagination,
    setPagination,
  };
}
