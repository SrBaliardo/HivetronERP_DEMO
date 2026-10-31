import { useEffect, useRef, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useManufacturingSequences } from '../../../../contexts/manufacturingSequences/index.js';
import { useOperations } from '../../../../contexts/operations/index.js';
import { useScanning } from '../../../../contexts/scanning/index.js';
import { useAsyncAction } from '../../../../hooks/useAsyncAction';
import { useDelayedCallback } from '../../../../hooks/useDelayedCallback';
import { useUnsavedForm } from '../../../../hooks/useUnsavedForm';
export function useOrderForm(order, orderList, mode = 'scanning') {
  const domain = useScanning();
  const {
    buildOrderForm,
    getPermissions,
    getPcpPermissions,
    savePcpOrder,
    role,
    sessionKey,
    readOrderList,
    saveOrder,
    scheduleOrder,
    buildSequenceSelection,
    sequenceOperationIdForSelection,
    buildOrderFieldValue,
    displayDeadline,
    displayExitDate,
  } = domain;
  const sequences = useManufacturingSequences();
  const { getOperation } = useOperations();
  const navigate = useNavigate();
  const action = useAsyncAction();
  const cancelaction = action.cancel;
  const selection = useAsyncAction();
  const cancelselection = selection.cancel;
  const [currentOrder, setCurrentOrder] = useState(order);
  const [scheduleVisible, setScheduleVisible] = useState(false);
  const scheduleCheckpoint = useRef({});
  const [leaving, setLeaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [infoData, setInfoData] = useState(null);
  const [infoVisible, setInfoVisible] = useState(false);
  const navigation = useRef(null);
  const delayed = useDelayedCallback(() => navigation.current?.(), 1100);
  const canceldelayed = delayed.cancel;
  const form = useForm({ defaultValues: buildOrderForm(order) });
  const editedSequences =
    useWatch({ control: form.control, name: 'sequences' }) || [];
  const reset = form.reset;
  const observation = useWatch({ control: form.control, name: 'observation' });
  const pcp = mode === 'pcp';
  const access = getPcpPermissions(role);
  const permissions = pcp
    ? { orderEdit: access.serviceEdit, orderDelete: access.serviceCancel }
    : getPermissions(role, 1);
  useEffect(() => {
    cancelaction();
    cancelselection();
    canceldelayed();
    setCurrentOrder(order);
    reset(buildOrderForm(order));
    setScheduleVisible(false);
    scheduleCheckpoint.current = {};
    setLeaving(false);
    setIsEditing(false);
  }, [
    order,
    buildOrderForm,
    sessionKey,
    reset,
    cancelaction,
    cancelselection,
    canceldelayed,
  ]);
  const backTab = (updatedList) =>
    pcp
      ? navigate('/pcp')
      : navigate('/scanning-orders', {
          state: { tabKey: '15', orderList: updatedList },
        });
  const handleDiscard = () => {
    acceptChanges();
    cancelselection();
    setInfoVisible(false);
    if (isEditing) {
      reset(buildOrderForm(currentOrder));
      setIsEditing(false);
    } else backTab(pcp ? undefined : readOrderList() || orderList);
  };
  const warning = () =>
    toast.warning('🙅🏻‍♂️ Você não tem permissão para executar essa operação!');
  const save = (canceled) => {
    if (!(canceled ? permissions.orderDelete : permissions.orderEdit)) {
      warning();
      return;
    }
    if ((!canceled && !isEditing) || leaving) return;
    action.run(
      (signal) =>
        pcp
          ? savePcpOrder(currentOrder, form.getValues(), canceled, signal)
          : saveOrder(
              currentOrder,
              form.getValues(),
              orderList || [],
              canceled,
              signal,
            ),
      (updated) => {
        acceptChanges();
        setLeaving(true);
        setIsEditing(false);
        if (canceled)
          toast.success(
            'Demonstração: ação simulada; nenhum dado foi gravado.',
          );
        navigation.current = () => backTab(updated);
        delayed.schedule();
      },
      () => {
        if (canceled)
          toast.error(
            'Erro ao cancelar a ordem de serviço. Verifique os status das sequências.',
          );
        else toast.error('Erro ao salvar as sequências.');
      },
    );
  };
  const handleSelectSequence = (index, id) => {
    if (!isEditing || !permissions.orderEdit || leaving || action.pending)
      return;
    return selection.run(
      async (signal) => {
        const data = await sequences.getSequenceData(id);
        if (signal.aborted) return;
        const operationId = sequenceOperationIdForSelection(data);
        const operation =
          operationId == null ? undefined : await getOperation(operationId);
        if (signal.aborted) return;
        return buildSequenceSelection(
          form.getValues('sequences.' + index),
          data,
          id,
          currentOrder.amount,
          operation,
        );
      },
      (data) => form.setValue('sequences.' + index, data),
      () => toast.error('Erro ao carregar dados da sequência.'),
    );
  };
  const handleInputChange = (index, field, value) => {
    if (!isEditing || !permissions.orderEdit || action.pending || leaving)
      return;
    form.setValue(
      'sequences.' + index + '.' + field,
      buildOrderFieldValue(field, value),
    );
  };
  const handleOpenSchedule = () => {
    if (!permissions.orderEdit) {
      warning();
      return;
    }
    if (isEditing && !action.pending && !selection.pending && !leaving)
      setScheduleVisible(true);
  };
  const handleSchedule = () => {
    if (!permissions.orderEdit) {
      warning();
      return;
    }
    if (!scheduleVisible || !isEditing || selection.pending || leaving) return;
    action.run(
      (signal) =>
        scheduleOrder(
          currentOrder.id,
          scheduleCheckpoint.current,
          mode,
          signal,
        ),
      (updated) => {
        setCurrentOrder(updated);
        reset(buildOrderForm(updated));
        setScheduleVisible(false);
        scheduleCheckpoint.current = {};
      },
      () =>
        toast.error(
          scheduleCheckpoint.current.scheduled
            ? 'Planejamento realizado, mas não foi possível atualizar os detalhes da O.S. Confirme novamente para tentar atualizar.'
            : 'Não foi possível realizar o planejamento automático das operações. Verifique os status das sequências e tente novamente.',
        ),
    );
  };
  const acceptChanges = useUnsavedForm(form, isEditing && !leaving, () => {
    cancelselection();
    setIsEditing(false);
    setInfoVisible(false);
    setScheduleVisible(false);
  });
  return {
    ...form,
    currentOrder,
    scheduleVisible,
    handleOpenSchedule,
    handleSchedule,
    handleCancelSchedule: () => {
      if (!action.pending) setScheduleVisible(false);
    },
    isEditing,
    editedSequences,
    observation,
    setObservation: (value) => form.setValue('observation', value),
    itemId: currentOrder?.itemId,
    isSmallScreen: useMediaQuery({ query: '(max-width: 768px)' }),
    infoData,
    setInfoData,
    infoVisible,
    setInfoVisible,
    pending: action.pending || selection.pending || leaving,
    handleDiscard,
    handleEdit: () => {
      if (permissions.orderEdit) setIsEditing(true);
      else warning();
    },
    handleSetCanceledServiceOrderStatus: () => save(true),
    onSubmit: () => save(false),
    handleSelectSequence,
    handleInputChange,
    formatDisplayDate: displayDeadline,
    formatDisplayExitDate: displayExitDate,
  };
}
