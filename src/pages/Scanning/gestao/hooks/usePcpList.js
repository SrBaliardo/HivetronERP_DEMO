import { useEffect, useMemo, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useScanning } from '../../../../contexts/scanning/index.js';
import { useAsyncAction } from '../../../../hooks/useAsyncAction';
import { useAsyncList } from '../../../../hooks/useAsyncList';
const defaults = {
  search: '',
  code: '',
  client: '',
  operation: '',
  type: '',
  machine: '',
  group: '',
  item: '',
  status: '',
  startDate: '',
  endDate: '',
};
export function usePcpList(kind, active) {
  const domain = useScanning();
  const {
    role,
    sessionKey,
    filterPcpRecords,
    validPcpDateRange,
    getPcpPermissions,
    buildPcpNavigation,
  } = domain;
  const source =
    kind === 'service'
      ? domain.allServiceOrders
      : kind === 'cut'
        ? domain.cutOrders
        : domain.sequenceOrders;
  const load =
    kind === 'service'
      ? domain.loadAllServiceOrders
      : kind === 'cut'
        ? domain.loadCutOrders
        : domain.loadSequenceOrders;
  const list = useAsyncList(load, active, source === null);
  const action = useAsyncAction();
  const navigate = useNavigate();
  const form = useForm({ defaultValues: defaults });
  const status = useWatch({ control: form.control, name: 'status' });
  const [applied, setApplied] = useState(null);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 8,
    total: 0,
  });
  const cancel = action.cancel,
    reset = form.reset;
  useEffect(() => {
    cancel();
    reset(defaults);
    setApplied(null);
    setPagination((value) => ({ ...value, current: 1 }));
  }, [sessionKey, cancel, reset]);
  useEffect(() => {
    if (!active) cancel();
  }, [active, cancel]);
  const filtered = useMemo(
    () =>
      applied
        ? filterPcpRecords(source || [], kind, applied)
        : { items: source || [], description: 'Todos' },
    [source, kind, applied, filterPcpRecords],
  );
  const apply = form.handleSubmit((criteria) => {
    if (!validPcpDateRange(criteria)) {
      toast.warning('A data final não pode ser menor do que a data inicial');
      return;
    }
    setApplied(criteria);
    setPagination((value) => ({ ...value, current: 1 }));
  });
  const open = (record) => {
    const access = getPcpPermissions(role);
    if (!(kind === 'service' ? access.serviceRead : access.cutRead)) {
      toast.warning('🙅🏻‍♂️ Você não tem permissão para executar essa operação!');
      return;
    }
    action.run(
      () =>
        kind === 'service'
          ? domain.getOrderById(record.id)
          : domain.getCutOrderById(record.id),
      (order) => {
        if (!order) {
          toast.error('Não foi possível carregar a ordem.');
          return;
        }
        navigate(
          kind === 'service' ? '/pcp-service-orders' : '/pcp-cut-orders',
          { state: buildPcpNavigation(kind, order, filtered.items) },
        );
      },
      () => toast.error('Não foi possível carregar a ordem.'),
    );
  };
  return {
    ...form,
    status,
    hasFilters: Object.values(applied || {}).some(Boolean),
    clearFilters: () => {
      reset(defaults);
      setApplied(null);
      setPagination((previous) => ({ ...previous, current: 1 }));
    },
    apply,
    open,
    records: source || [],
    data: filtered.items,
    filters: filtered.description,
    pagination,
    setPagination,
    loading: list.loading,
    error: list.error,
    refresh: list.refresh,
    pending: action.pending,
  };
}
