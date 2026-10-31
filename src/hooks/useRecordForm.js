import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { useAsyncAction } from './useAsyncAction';
import { useDelayedCallback } from './useDelayedCallback';
import { useUnsavedForm } from './useUnsavedForm';

// Ciclo React genérico; contratos, permissões e navegação são fornecidos pelo consumidor.
export function useRecordForm({
  record,
  isNew,
  buildForm,
  saveRecord,
  removeRecord,
  schema,
  permissions,
  onSaved,
  onBack,
}) {
  const form = useForm({
    defaultValues: buildForm(isNew ? null : record),
    resolver: yupResolver(schema, undefined, { raw: true }),
  });
  const { reset } = form;
  const [isEditing, setIsEditing] = useState(isNew);
  const [navigateCheck, setNavigateCheck] = useState(true);
  const navigationBeforeEdit = useRef(true);
  const [deleting, setDeleting] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const action = useAsyncAction();
  const { cancel } = action;
  const delayed = useDelayedCallback(onBack, 1100);
  const cancelDelay = delayed.cancel;
  useEffect(() => {
    cancel();
    cancelDelay();
    reset(buildForm(isNew ? null : record));
    setIsEditing(isNew);
    setDeleting(false);
    setDeleted(false);
  }, [record, isNew, reset, buildForm, cancel, cancelDelay]);
  const handleDiscard = () => {
    if (action.pending || deleted) return;
    acceptChanges();
    reset(buildForm(isNew ? null : record));
    if (isEditing && !isNew) {
      setNavigateCheck(navigationBeforeEdit.current);
      setIsEditing(false);
    } else onBack();
  };
  const denied = () =>
    toast.warning('🙅🏻‍♂️ Você não tem permissão para executar essa operação!');
  const handleEdit = () => {
    if (permissions.update) {
      if (!isEditing) navigationBeforeEdit.current = navigateCheck;
      setIsEditing(true);
    } else denied();
  };
  const handleDelete = () => {
    if (permissions.remove) setDeleting(true);
    else denied();
  };
  const confirmDelete = () =>
    action.run(
      (signal) => removeRecord(record.id, signal),
      () => {
        setDeleting(false);
        acceptChanges();
        setDeleted(true);
        delayed.schedule();
      },
    );
  const onSubmit = (data) => {
    if (!isEditing || deleted) return;
    return action.run(
      (signal) => saveRecord(data, record, isNew, signal),
      (saved) => {
        acceptChanges();
        reset(buildForm(saved));
        setIsEditing(false);
        onSaved(saved, navigateCheck);
      },
    );
  };
  const acceptChanges = useUnsavedForm(
    form,
    isEditing && !deleted,
    () => {
      setIsEditing(isNew);
      setNavigateCheck(navigationBeforeEdit.current);
    },
    navigateCheck !== navigationBeforeEdit.current,
  );
  return {
    ...form,
    isEditing,
    navigateCheck,
    setNavigateCheck,
    deleting,
    setDeleting,
    handleDiscard,
    handleEdit,
    handleDelete,
    confirmDelete,
    onSubmit,
    pending: action.pending || deleted,
  };
}
