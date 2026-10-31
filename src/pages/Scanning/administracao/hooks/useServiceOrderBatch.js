import { useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';

import { useScanning } from '../../../../contexts/scanning';
import { useAsyncAction } from '../../../../hooks/useAsyncAction';

export function useServiceOrderBatch(items, active, blocked, onGenerated) {
  const {
    sessionKey,
    role,
    getPermissions,
    canGenerateOrder,
    ordersForGeneration,
    generateOrdersBatch,
  } = useScanning();
  const action = useAsyncAction();
  const cancel = action.cancel;
  const [selectedIds, setSelectedIds] = useState([]);
  const eligible = useMemo(
    () => ordersForGeneration(items),
    [items, ordersForGeneration],
  );
  const selected = useMemo(
    () => eligible.filter((item) => selectedIds.includes(item.id)),
    [eligible, selectedIds],
  );
  const permitted = getPermissions(role, 1).generate;
  const pending = blocked || action.pending;

  useEffect(() => {
    setSelectedIds([]);
    cancel();
  }, [active, sessionKey, role, cancel]);

  useEffect(() => {
    const available = new Set(eligible.map((item) => item.id));
    setSelectedIds((previous) => {
      const next = previous.filter((id) => available.has(id));
      return next.length === previous.length ? previous : next;
    });
  }, [eligible]);

  const toggle = (record, checked) => {
    if (!active || pending || !permitted || !canGenerateOrder(record)) return;
    setSelectedIds((previous) =>
      checked
        ? previous.includes(record.id)
          ? previous
          : [...previous, record.id]
        : previous.filter((id) => id !== record.id),
    );
  };
  const generate = () => {
    if (!active || pending || !selected.length) return;
    if (!permitted) {
      toast.warning('🙅🏻‍♂️ Você não tem permissão para executar essa operação!');
      return;
    }
    action.run(
      (signal) => generateOrdersBatch(selected, signal),
      () => {
        onGenerated(selected);
        setSelectedIds([]);
      },
      () => toast.error('Erro ao processar a geração de O.S. em lote.'),
    );
  };

  return {
    selected,
    pending,
    toggle,
    generate,
    canSelect: (record) =>
      active && !pending && permitted && canGenerateOrder(record),
  };
}
