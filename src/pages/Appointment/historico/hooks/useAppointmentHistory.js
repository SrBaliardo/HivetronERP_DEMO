import { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useAppointment } from '../../../../contexts/appointment/index.js';
import { useAsyncList } from '../../../../hooks/useAsyncList';
const empty = [];
export const initial = {
  searchInput: '',
  searchInputCode: '',
  searchInputOperation: '',
  searchInputMachine: '',
  searchInputItem: '',
  startDate: '',
  endDate: '',
  selectedStatus: '',
};
export function useAppointmentHistory() {
  const {
    loadPointedOrders,
    pointedOrder,
    filterOrders,
    validDateRange,
    exportOrders,
    sessionKey,
  } = useAppointment();
  const location = useLocation();
  const navigationSession = useRef(sessionKey);
  const resource = useAsyncList(loadPointedOrders, true, pointedOrder);
  const [criteria, setCriteria] = useState(initial);
  const [applied, setApplied] = useState(null);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 8,
    total: 0,
  });
  useEffect(() => {
    setCriteria(initial);
    setApplied(null);
    setPagination({ current: 1, pageSize: 8, total: 0 });
  }, [sessionKey]);
  const rows =
    pointedOrder === null
      ? resource.loading &&
        navigationSession.current === sessionKey &&
        Array.isArray(location.state?.orderList)
        ? location.state.orderList
        : empty
      : resource.items;
  const filteredData = useMemo(
    () => (applied ? filterOrders(rows, applied) : rows),
    [rows, applied, filterOrders],
  );
  const handleFilter = () => {
    if (!validDateRange(criteria)) {
      toast.warning('A data final não pode ser menor do que a data inicial');
      return;
    }
    setApplied({ ...criteria });
    setPagination((prev) => ({ ...prev, current: 1 }));
  };
  return {
    ...resource,
    criteria,
    setCriteria,
    applied,
    hasFilters: Object.values(applied || {}).some(Boolean),
    clearFilters: () => {
      setCriteria(initial);
      setApplied(null);
      setPagination((previous) => ({ ...previous, current: 1 }));
    },
    filteredData,
    pagination,
    setPagination,
    handleFilter,
    dataToExport: exportOrders(filteredData, resource.items),
  };
}
