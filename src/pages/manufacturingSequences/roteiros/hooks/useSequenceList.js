import { useCallback, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';

import { useManufacturingSequences } from '../../../../contexts/manufacturingSequences';
import { useAsyncList } from '../../../../hooks/useAsyncList';

export function useSequenceList(itemId, itemType, active) {
  const { listSequences, manufacturingSequences } = useManufacturingSequences();
  const visit = useRef(null);
  const success = useRef(null);
  const enabled = active && itemId != null;

  useEffect(() => {
    visit.current = enabled ? { notified: false } : null;
    return () => {
      visit.current = null;
    };
  }, [enabled, itemId, itemType]);

  const notifyEmpty = useCallback(
    (currentVisit, items) => {
      if (
        currentVisit &&
        visit.current === currentVisit &&
        !currentVisit.notified &&
        items.length === 0
      ) {
        currentVisit.notified = true;
        toast.info('Nenhuma sequência adicionada para esse ' + itemType + '.');
      }
    },
    [itemType],
  );

  const load = useCallback(async () => {
    const currentVisit = visit.current;
    const items = await listSequences(itemId);
    if (currentVisit && visit.current === currentVisit) {
      success.current = { itemId, itemType, listSequences, items };
      notifyEmpty(currentVisit, items);
    }
    return items;
  }, [listSequences, itemId, itemType, notifyEmpty]);

  const list = useAsyncList(load, enabled, manufacturingSequences);
  useEffect(() => {
    const previous = success.current;
    if (
      enabled &&
      !list.loading &&
      !list.error &&
      previous?.itemId === itemId &&
      previous.itemType === itemType &&
      previous.listSequences === listSequences &&
      previous.items === manufacturingSequences &&
      previous.items === list.items
    )
      notifyEmpty(visit.current, list.items);
  }, [
    enabled,
    itemId,
    itemType,
    listSequences,
    list.items,
    list.loading,
    list.error,
    manufacturingSequences,
    notifyEmpty,
  ]);

  return list;
}
