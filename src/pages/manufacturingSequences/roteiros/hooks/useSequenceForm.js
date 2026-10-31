import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { useManufacturingSequences } from '../../../../contexts/manufacturingSequences/index.js';
import { useAsyncAction } from '../../../../hooks/useAsyncAction';
import { useDelayedCallback } from '../../../../hooks/useDelayedCallback';
import { useUnsavedForm } from '../../../../hooks/useUnsavedForm';
import { sequenceSchema } from './schema';
import { useSequenceCatalogs } from './useSequenceCatalogs';

export function useSequenceForm({
  onChange,
  isNew,
  onCancel,
  itemId,
  sequence: selectedSequence,
}) {
  const {
    buildEmptyTool,
    buildSequenceForm,
    getLastSequence,
    nextSequence,
    canSelectAsMain,
    permissions,
    deleteSequence,
    validateSequence,
    saveSequence,
  } = useManufacturingSequences();
  const catalogs = useSequenceCatalogs();
  const [formVersion, setFormVersion] = useState(0);
  const action = useAsyncAction();
  const { cancel } = action;
  const [isEditing, setIsEditing] = useState(isNew);
  const [initializing, setInitializing] = useState(isNew);
  const [deleting, setDeleting] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [estimatedTimeError, setEstimatedTimeError] = useState('');
  const [operationType, setOperationType] = useState('');
  const [machineGroup, setMachineGroup] = useState('');
  const [resetTime, setResetTime] = useState(false);
  const form = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: buildSequenceForm(isNew ? null : selectedSequence),
    resolver: yupResolver(sequenceSchema, undefined, { raw: true }),
  });
  const { control, reset, setValue, watch } = form;
  const {
    fields: toolFields,
    append,
    remove,
    move,
  } = useFieldArray({ control, name: 'sequenceTools' });
  const delayed = useDelayedCallback(() => onChange('11', itemId), 1100);
  const cancelDelay = delayed.cancel;
  useEffect(() => {
    cancel();
    cancelDelay();
    reset(buildSequenceForm(isNew ? null : selectedSequence));
    setFormVersion((value) => value + 1);
    setIsEditing(isNew);
    setInitializing(isNew && itemId != null);
    setDeleting(false);
    setDeleted(false);
    setEstimatedTimeError('');
    setOperationType(selectedSequence?.operationTypeDescription || '');
    setMachineGroup(selectedSequence?.machineGroupDescription || '');
    setResetTime(isNew);
    let active = true;
    if (isNew && itemId != null)
      getLastSequence(itemId)
        .then((value) => {
          if (active) {
            setValue('sequence', nextSequence(value));
            setValue('isMain', true);
          }
        })
        .catch(() => {
          if (active) {
            setValue('sequence', 10);
            setValue('isMain', true);
          }
        })
        .finally(() => {
          if (active) setInitializing(false);
        });
    return () => {
      active = false;
    };
  }, [
    selectedSequence,
    isNew,
    itemId,
    reset,
    setValue,
    buildSequenceForm,
    getLastSequence,
    nextSequence,
    cancel,
    cancelDelay,
  ]);
  const handleDiscard = () => {
    if (action.pending || deleted) return;
    acceptChanges();
    cancelDelay();
    reset(buildSequenceForm(isNew ? null : selectedSequence));
    setFormVersion((value) => value + 1);
    setEstimatedTimeError('');
    setOperationType(
      isNew ? '' : selectedSequence?.operationTypeDescription || '',
    );
    setMachineGroup(
      isNew ? '' : selectedSequence?.machineGroupDescription || '',
    );
    setDeleting(false);
    if (isNew || !isEditing) onChange('11');
    else setIsEditing(false);
    onCancel?.();
  };
  const handleEdit = () => {
    if (permissions.update) setIsEditing(true);
    else
      toast.warning('🙅🏻‍♂️ Você não tem permissão para executar essa operação!');
  };
  const handleDelete = () => {
    if (permissions.remove) setDeleting(true);
    else
      toast.warning('🙅🏻‍♂️ Você não tem permissão para executar essa operação!');
  };
  const confirmDelete = () =>
    action.run(
      (signal) => deleteSequence(selectedSequence.id, signal),
      () => {
        setDeleting(false);
        acceptChanges();
        setDeleted(true);
        delayed.schedule();
      },
    );
  const onSubmit = (data) => {
    if (!isEditing || deleted || initializing) return;
    const error = validateSequence(data);
    if (error) {
      setEstimatedTimeError(
        error.field === 'estimatedTime' ? error.message : '',
      );
      toast.error('Erro ao salvar, verifique os campos do formulário.');
      return;
    }
    setEstimatedTimeError('');
    return action.run(
      (signal) =>
        saveSequence(
          data,
          { isNew, itemId, sequence: isNew ? null : selectedSequence },
          signal,
        ),
      (saved) => {
        acceptChanges();
        reset(buildSequenceForm(saved));
        setIsEditing(false);
        setDeleted(true);
        delayed.schedule();
      },
    );
  };
  const validateSelection = (catalog, option) => {
    const message = catalog.selectionError(option);
    if (message) {
      toast.warning(message);
      return false;
    }
    return true;
  };
  const acceptChanges = useUnsavedForm(
    form,
    isEditing && !initializing && !deleted,
    () => {
      setIsEditing(isNew);
      setFormVersion((value) => value + 1);
      setOperationType(selectedSequence?.operationTypeDescription || '');
      setMachineGroup(selectedSequence?.machineGroupDescription || '');
      setEstimatedTimeError('');
    },
  );
  return {
    catalogs,
    initializing,
    formVersion,
    validateOperationSelection: (option) =>
      validateSelection(catalogs.operations, option),
    validateMachineSelection: (option) =>
      validateSelection(catalogs.machines, option),
    validateToolSelection: (option) =>
      validateSelection(catalogs.tools, option),
    ...form,
    errors: form.formState.errors,
    toolFields,
    addTool: () => append(buildEmptyTool()),
    remove,
    move,
    isEditing,
    isDeleteButtonVisible: !isNew && !isEditing,
    operationId: watch('operationId'),
    machineId: watch('machineId'),
    operationType,
    machineGroup,
    resetTime,
    selectedSequence,
    showCheckbox: canSelectAsMain(selectedSequence, isNew),
    currentIsMainValue: watch('isMain'),
    setIsMain: (value) => setValue('isMain', value),
    operationChange: (option) => {
      setValue('operationId', option.value);
      setOperationType(option.operationType);
    },
    machineChange: (option) => {
      setValue('machineId', option.value);
      setMachineGroup(option.machineGroup);
    },
    estimatedTimeError,
    handleDiscard,
    handleEdit,
    handleDelete,
    confirmDelete,
    onSubmit,
    deleting,
    setDeleting,
    pending: action.pending || deleted,
  };
}
