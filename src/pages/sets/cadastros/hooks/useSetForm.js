import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useSets } from '../../../../contexts/sets';
import { useAsyncAction } from '../../../../hooks/useAsyncAction';
import { useDelayedCallback } from '../../../../hooks/useDelayedCallback';
import { useUnsavedForm } from '../../../../hooks/useUnsavedForm';
import { setSchema } from './schema';

export function useSetForm({
  set,
  isNew,
  setCode,
  setDescription,
  onCancel,
  onSave,
  handleCancel,
}) {
  const { buildSetForm, permissions, deleteSet, saveSet, prepareNavigation } =
    useSets();
  const navigate = useNavigate();
  const action = useAsyncAction();
  const { cancel } = action;
  const [isEditing, setIsEditing] = useState(isNew);
  const [deleting, setDeleting] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const form = useForm({
    defaultValues: buildSetForm(isNew ? null : set),
    resolver: yupResolver(setSchema, undefined, { raw: true }),
  });
  const { reset, watch } = form;
  const back = () => navigate('/bom', { state: { tabKey: '2' } });
  const delayed = useDelayedCallback(back, 1100);
  const cancelDelay = delayed.cancel;
  useEffect(() => {
    cancel();
    cancelDelay();
    reset(buildSetForm(isNew ? null : set));
    setIsEditing(isNew);
    setDeleting(false);
    setDeleted(false);
  }, [set, isNew, setCode, buildSetForm, reset, cancel, cancelDelay]);
  const handleDiscard = () => {
    if (action.pending || deleted) return;
    acceptChanges();
    reset(buildSetForm(isNew ? null : set));
    if (isEditing && !isNew) setIsEditing(false);
    else back();
    onCancel?.();
    handleCancel?.();
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
      (signal) => deleteSet(set.id, signal),
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
      (signal) =>
        saveSet(
          data,
          { isNew, set: isNew ? null : set, setCode, setDescription },
          signal,
        ),
      (saved) => {
        acceptChanges();
        setIsEditing(false);
        reset(buildSetForm(saved));
        if (isNew) onSave?.(saved);
        else navigate('/bom-sets', { state: prepareNavigation(saved, '8') });
      },
    );
  };
  const acceptChanges = useUnsavedForm(form, isEditing && !deleted, () =>
    setIsEditing(isNew),
  );
  return {
    ...form,
    errors: form.formState.errors,
    isEditing,
    isDeleteButtonVisible: !isNew && !isEditing,
    description: isNew ? setDescription : set?.description || '',
    currentIsActiveValue: watch('isActive'),
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
