import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useScanning } from '../../../../contexts/scanning/index.js';
import { useAsyncAction } from '../../../../hooks/useAsyncAction';
import { useScanningPage } from './useScanningPage';

const initial = { searchInput: '', startDate: '', endDate: '', dateExit: '' };
const initialQuery = {
  page: 0,
  size: 8,
  sort: { field: null, order: null },
  filters: initial,
};
const stages = {
  REGISTER: ['/scanning-inspection-step1', '10'],
  INSPECTION: ['/scanning-inspection-step2', '11'],
  RELEASE: ['/scanning-inspection-step3', '12'],
  EXPEDITION: ['/scanning-inspection-step4', '13'],
  COMPLETED: ['/scanning-inspection-step5', '14'],
};
export function useScanningList(kind, active) {
  const {
    sessionKey,
    validInvoiceDateRange,
    buildInitialInspection,
    getPermissions,
    role,
    generateOrder,
    getInspectionById,
    getInvoiceInspection,
  } = useScanning();
  const [state, setState] = useState({
    sessionKey,
    criteria: initial,
    query: initialQuery,
  });
  const view =
    state.sessionKey === sessionKey
      ? state
      : { sessionKey, criteria: initial, query: initialQuery };
  const { criteria, query } = view;
  const resource = useScanningPage(kind, query, active);
  const action = useAsyncAction();
  const cancelaction = action.cancel;
  const navigate = useNavigate();
  const checkpoints = useRef(new Map());
  const update = (operation) =>
    setState((previous) =>
      operation(
        previous.sessionKey === sessionKey
          ? previous
          : { sessionKey, criteria: initial, query: initialQuery },
      ),
    );
  const setCriteria = (next) =>
    update((previous) => ({
      ...previous,
      criteria: typeof next === 'function' ? next(previous.criteria) : next,
    }));
  useEffect(() => {
    checkpoints.current.clear();
    cancelaction();
  }, [sessionKey, cancelaction]);
  useEffect(() => {
    if (!resource.loaded || !active) return;
    const lastPage = Math.max(0, resource.page.totalPages - 1);
    if (query.page > lastPage)
      setState((previous) =>
        previous.sessionKey === sessionKey
          ? { ...previous, query: { ...previous.query, page: lastPage } }
          : previous,
      );
  }, [
    active,
    resource.loaded,
    resource.page.totalPages,
    query.page,
    sessionKey,
  ]);
  const handleFilter = () => {
    if (!validInvoiceDateRange(kind, criteria)) {
      toast.warning('A data final não pode ser menor do que a data inicial');
      return;
    }
    if (query.page === 0 && query.filters === criteria) resource.refresh();
    else
      update((previous) => ({
        ...previous,
        query: { ...previous.query, page: 0, filters: previous.criteria },
      }));
  };
  const hasFilters = Object.values(query.filters).some((value) => value !== '');
  const clearFilters = () => {
    update((previous) => ({
      ...previous,
      criteria: initial,
      query: { ...previous.query, page: 0, filters: initial },
    }));
  };
  const handleTableChange = (pagination, sorter, type) =>
    update((previous) => ({
      ...previous,
      query: {
        ...previous.query,
        page:
          type === 'sort' ||
          pagination.pageSize !==
            (resource.hasPage ? resource.page.size : previous.query.size)
            ? 0
            : pagination.current - 1,
        size: pagination.pageSize,
        sort: type === 'sort' ? sorter : previous.query.sort,
      },
    }));
  const open = (record) => {
    if (resource.loading || action.pending) return;
    if (kind === 'serviceOrders') {
      if (!getPermissions(role, 1).generate) {
        toast.warning('🙅🏻‍♂️ Você não tem permissão para executar essa operação!');
        return;
      }
      if (!checkpoints.current.has(record.id))
        checkpoints.current.set(record.id, {});
      action.run(
        (signal) =>
          generateOrder(record, checkpoints.current.get(record.id), signal),
        (result) => navigate('/scanning-orders', { state: result }),
        () => toast.error('Erro ao processar a ordem de serviço.'),
      );
      return;
    }
    if (kind === 'invoices' && !record.hasInspection) {
      navigate('/scanning-inspection-step1', {
        state: {
          tabKey: '10',
          fromTab: 'ScanningTab1',
          inspection: buildInitialInspection(record),
        },
      });
      return;
    }
    action.run(
      (signal) =>
        kind === 'inspections'
          ? getInspectionById(record.id)
          : getInvoiceInspection(record, signal),
      (inspection) => {
        const route = stages[inspection.inspectionStage];
        if (!route) {
          toast.error('Estágio da inspeção desconhecido!');
          return;
        }
        navigate(route[0], { state: { tabKey: route[1], inspection } });
      },
      (error) =>
        toast.error(error.message || 'Erro ao buscar dados da inspeção!'),
    );
  };
  return {
    ...resource,
    criteria,
    setCriteria,
    filteredData: resource.items,
    pagination: {
      current: resource.hasPage ? resource.page.number + 1 : query.page + 1,
      pageSize: resource.hasPage ? resource.page.size : query.size,
      total: resource.page.totalElements,
    },
    sorter: query.sort,
    handleTableChange,
    handleFilter,
    clearFilters,
    hasFilters,
    open,
    pending: action.pending,
  };
}
