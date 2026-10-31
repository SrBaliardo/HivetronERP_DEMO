import { useCallback, useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';

import { useManufacturingSequences } from '../../../../contexts/manufacturingSequences/index.js';
import { useAsyncAction } from '../../../../hooks/useAsyncAction';
import { useDelayedCallback } from '../../../../hooks/useDelayedCallback';
import { useUnsavedChanges } from '../../../../hooks/useUnsavedChanges';

export function useSequenceExport(initialItem) {
  const domain = useManufacturingSequences();
  const { loadExportSequences } = domain;
  const [source, setSource] = useState(initialItem);
  const [loadedSource, setLoadedSource] = useState(null);
  const [sequences, setSequences] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [clearing, setClearing] = useState(false);
  const [pickerVersion, setPickerVersion] = useState(0);
  const request = useRef(0);
  const action = useAsyncAction();
  const cancelAction = action.cancel;
  const delayed = useDelayedCallback(() => {
    setSource(null);
    setLoadedSource(null);
    setSequences([]);
    setSelectedIds([]);
    setPickerVersion((v) => v + 1);
    setClearing(false);
  }, 500);
  const cancelDelay = delayed.cancel;
  const load = useCallback(
    async (item) => {
      if (!item?.value) {
        toast.warning('Por favor, selecione um item da lista antes de buscar.');
        return;
      }
      const ticket = ++request.current;
      setLoading(true);
      setError(false);
      try {
        const result = await loadExportSequences(item.value);
        if (request.current !== ticket) return;
        setSequences(result);
        setSelectedIds([]);
        setLoadedSource(result.length ? item : null);
        if (!result.length)
          toast.info('Este item não possui sequências cadastradas.');
      } catch (error) {
        if (request.current !== ticket) return;
        setError(true);
        setLoadedSource(null);
        toast.error('Erro ao conectar com o servidor.');
      } finally {
        if (request.current === ticket) setLoading(false);
      }
    },
    [loadExportSequences],
  );
  useEffect(() => {
    cancelAction();
    cancelDelay();
    setSource(initialItem);
    setLoadedSource(null);
    setSequences([]);
    setSelectedIds([]);
    setDestinations([]);
    setItemToDelete(null);
    setLoading(false);
    setError(false);
    setClearing(false);
    setPickerVersion((value) => value + 1);
    if (initialItem) load(initialItem);
    return () => {
      request.current += 1;
    };
  }, [initialItem, load, cancelAction, cancelDelay]);
  const addDestination = (selection) => {
    const message = domain.destinationSelectionError(destinations, selection);
    if (message) toast.info(message);
    else setDestinations((previous) => [...previous, selection.raw]);
  };
  const exportSelected = () => {
    const message = domain.exportSelectionError(selectedIds, destinations);
    if (message) {
      toast.warning(message);
      return;
    }
    return action.run(
      (signal) =>
        domain.exportSelectedSequences(selectedIds, destinations, signal),
      () => {
        acceptChanges();
        setClearing(true);
        delayed.schedule();
      },
    );
  };
  const pending = action.pending || clearing;
  const acceptChanges = useUnsavedChanges(
    !clearing && (selectedIds.length > 0 || destinations.length > 0),
    () => {
      setSelectedIds([]);
      setDestinations([]);
      setItemToDelete(null);
    },
  );
  return {
    source,
    setSource,
    loadedSource,
    sequences,
    selectedIds,
    destinations,
    itemToDelete,
    setItemToDelete,
    pickerVersion,
    loading,
    error,
    pending,
    search: () => load(source),
    addDestination,
    confirmDelete: () => {
      setDestinations((previous) =>
        previous.filter((item) => item.id !== itemToDelete.id),
      );
      setItemToDelete(null);
    },
    selectAll: sequences.length > 0 && selectedIds.length === sequences.length,
    toggleAll: () =>
      setSelectedIds((previous) =>
        previous.length === sequences.length
          ? []
          : sequences.map((item) => item.id),
      ),
    toggle: (id) =>
      setSelectedIds((previous) =>
        previous.includes(id)
          ? previous.filter((value) => value !== id)
          : [...previous, id],
      ),
    exportSelected,
  };
}
