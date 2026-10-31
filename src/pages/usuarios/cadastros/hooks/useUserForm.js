import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { useUsuarios } from '../../../../contexts/usuarios';
import { useAsyncAction } from '../../../../hooks/useAsyncAction';
import { useUnsavedForm } from '../../../../hooks/useUnsavedForm';
import { userSchema } from './schema';

const denied = () =>
  toast.warning('🙅🏻‍♂️ Você não tem permissão para executar essa operação!');

export function useUserForm({ user, isNew, onSaved, onBack, onDeleted }) {
  const { saveUser, deleteUser, prepareUserForm, roles, permissions } =
    useUsuarios();
  const [editing, setEditing] = useState(isNew);
  const [passwordEnabled, setPasswordEnabled] = useState(isNew);
  const [permissionEnabled, setPermissionEnabled] = useState(isNew);
  const [navigateAfterSave, setNavigateAfterSave] = useState(true);
  const navigationBeforeEdit = useRef(true);
  const [unlockTarget, setUnlockTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const timer = useRef(null);
  const action = useAsyncAction();
  const { cancel } = action;
  const form = useForm({
    defaultValues: prepareUserForm(isNew ? null : user),
    resolver: yupResolver(userSchema, undefined, { raw: true }),
    context: { passwordEnabled },
  });
  const { reset } = form;
  useEffect(() => {
    cancel();
    clearTimeout(timer.current);
    reset(prepareUserForm(isNew ? null : user));
    setEditing(isNew);
    setPasswordEnabled(isNew);
    setPermissionEnabled(isNew);
    setUnlockTarget(null);
    setDeleting(false);
    setDeleted(false);
  }, [user, isNew, prepareUserForm, reset, cancel]);
  useEffect(() => () => clearTimeout(timer.current), []);
  const save = (values) => {
    if ((!isNew && !editing) || action.pending) return;
    if (!(isNew ? permissions.create : permissions.update)) return denied();
    return action.run(
      (signal) => saveUser(values, isNew ? null : user, signal),
      (saved) => {
        acceptChanges();
        setEditing(false);
        setPasswordEnabled(false);
        setPermissionEnabled(false);
        onSaved(saved, navigateAfterSave);
      },
    );
  };
  const discard = () => {
    if (action.pending) return;
    acceptChanges();
    if (editing && !isNew) {
      setNavigateAfterSave(navigationBeforeEdit.current);
      reset(prepareUserForm(user));
      setEditing(false);
      setPermissionEnabled(false);
      setPasswordEnabled(false);
    } else {
      reset(prepareUserForm(isNew ? null : user));
      onBack();
    }
  };
  const edit = () => {
    if (permissions.update) {
      if (!editing) navigationBeforeEdit.current = navigateAfterSave;
      setEditing(true);
    } else denied();
  };
  const requestDelete = () => {
    if (action.pending || !user) return;
    if (permissions.remove) setDeleting(true);
    else denied();
  };
  const confirmDelete = () =>
    action.run(
      (signal) => deleteUser(user.id, signal),
      () => {
        setDeleting(false);
        acceptChanges();
        setDeleted(true);
        onDeleted?.();
        timer.current = setTimeout(onBack, 1100);
      },
    );
  const unlock = () => {
    if (unlockTarget === 'password') setPasswordEnabled(true);
    if (unlockTarget === 'permission') setPermissionEnabled(true);
    setUnlockTarget(null);
  };
  const acceptChanges = useUnsavedForm(
    form,
    editing && !deleted,
    () => {
      setEditing(isNew);
      setNavigateAfterSave(navigationBeforeEdit.current);
      setPermissionEnabled(isNew);
      setPasswordEnabled(isNew);
      setUnlockTarget(null);
    },
    navigateAfterSave !== navigationBeforeEdit.current,
  );
  return {
    form,
    editing,
    passwordEnabled,
    permissionEnabled,
    navigateAfterSave,
    setNavigateAfterSave,
    unlockTarget,
    setUnlockTarget,
    deleting,
    setDeleting,
    roles,
    pending: action.pending || deleted,
    save,
    discard,
    edit,
    requestDelete,
    confirmDelete,
    unlock,
  };
}
