import { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useScanning } from '../../../../contexts/scanning/index.js';
import { useAsyncAction } from '../../../../hooks/useAsyncAction';
const initial = { searchInput: '', dateExit: '', status: '' };
export function useOrdersList() {
  const domain = useScanning();
  const {
    readOrderList,
    saveOrderList,
    filterRecords,
    getPermissions,
    role,
    getOrderById,
    syncOrder,
    generateCutOrders,
  } = domain;
  const location = useLocation();
  const navigate = useNavigate();
  const action = useAsyncAction();
  const cancelaction = action.cancel;
  const [orderList, setOrderList] = useState(() =>
    Array.isArray(location.state?.orderList)
      ? location.state.orderList
      : readOrderList(),
  );
  const [criteria, setCriteria] = useState(initial);
  const [applied, setApplied] = useState(initial);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 8,
    total: 0,
  });
  const checkpoints = useRef(new Map());
  const cutCheckpoint = useRef({});
  useEffect(() => {
    cancelaction();
    checkpoints.current.clear();
    cutCheckpoint.current = {};
    setSelectedOrder(null);
    const rows = Array.isArray(location.state?.orderList)
      ? location.state.orderList
      : readOrderList();
    setOrderList(rows);
    if (Array.isArray(location.state?.orderList)) saveOrderList(rows);
  }, [location.state?.orderList, readOrderList, saveOrderList, cancelaction]);
  const filteredData = useMemo(
    () => filterRecords(orderList, 'orders', applied),
    [filterRecords, orderList, applied],
  );
  const permissions = getPermissions(role, 1);
  const warning = () =>
    toast.warning('🙅🏻‍♂️ Você não tem permissão para executar essa operação!');
  const editOrder = (order) => {
    if (!permissions.orders) {
      warning();
      return;
    }
    action.run(
      () => getOrderById(order.id),
      (data) =>
        navigate('/scanning-orders', {
          state: {
            order: data,
            orderList: filteredData,
            tabKey: '16',
            fronTab: 'ScanningTab15',
          },
        }),
      () => toast.error('Erro ao buscar ordem de serviço.'),
    );
  };
  const handleSync = (order) => {
    if (!permissions.orders) {
      warning();
      return;
    }
    setSelectedOrder(order);
  };
  const syncSequences = () => {
    if (!selectedOrder) return;
    if (!checkpoints.current.has(selectedOrder.id))
      checkpoints.current.set(selectedOrder.id, {});
    action.run(
      (signal) =>
        syncOrder(
          selectedOrder.id,
          checkpoints.current.get(selectedOrder.id),
          signal,
        ),
      () => setSelectedOrder(null),
      () =>
        toast.error(
          'Erro ao sincronizar. Verifique o status das sequências e tente novamente.',
        ),
    );
  };
  const addOC = () => {
    if (!permissions.cut) {
      warning();
      return;
    }
    action.run(
      (signal) =>
        generateCutOrders(
          location.state?.orderList,
          cutCheckpoint.current,
          signal,
        ),
      () => {
        cutCheckpoint.current = {};
      },
      () =>
        toast.error(
          'Erro ao cadastrar as ordens de corte. Verifique e tente novamente.',
        ),
    );
  };
  return {
    criteria,
    setCriteria,
    hasFilters: Object.values(applied).some(Boolean),
    clearFilters: () => {
      setCriteria(initial);
      setApplied(initial);
      setPagination((previous) => ({ ...previous, current: 1 }));
    },
    filteredData,
    orderList,
    pagination,
    setPagination,
    selectedOrder,
    pending: action.pending,
    editOrder,
    handleSync,
    syncSequences,
    addOC,
    hideModalSync: () => setSelectedOrder(null),
    goBack: () => navigate('/scanning', { state: { tabKey: '3' } }),
    handleFilter: () => {
      setApplied(criteria);
      setPagination((prev) => ({ ...prev, current: 1 }));
    },
  };
}
