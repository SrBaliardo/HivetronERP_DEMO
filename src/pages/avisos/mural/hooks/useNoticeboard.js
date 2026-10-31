import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { useAvisos } from '../../../../contexts/avisos';
import { useAsyncAction } from '../../../../hooks/useAsyncAction';
import { useAsyncList } from '../../../../hooks/useAsyncList';
import { useNavigationConfirmation } from '../../../../hooks/useUnsavedChanges';
import { useUnsavedForm } from '../../../../hooks/useUnsavedForm';
import { noticeSchema } from './schema';

const denied = () =>
  toast.warning('🙅🏻‍♂️ Você não tem permissão para executar essa operação!');

export function useNoticeboard(active) {
  const {
    listNotices,
    saveNotice,
    deleteNotice,
    prepareNoticeForm,
    hasCapacity,
    permissions,
  } = useAvisos();
  const confirmNavigation = useNavigationConfirmation();
  const list = useAsyncList(listNotices, active);
  const action = useAsyncAction();
  const [selection, setSelection] = useState(null);
  const [mode, setMode] = useState('idle');
  const [deleteTarget, setDeleteTarget] = useState(null);
  const form = useForm({
    defaultValues: prepareNoticeForm(null),
    resolver: yupResolver(noticeSchema, undefined, { raw: true }),
  });
  const close = () => {
    acceptChanges();
    setSelection(null);
    setMode('idle');
    form.reset(prepareNoticeForm(null));
  };
  const show = (notice, viewOnly) => {
    if (action.pending) return;
    if (!viewOnly && !permissions.update) {
      denied();
      viewOnly = true;
    }
    confirmNavigation(() => {
      setSelection(notice);
      setMode(viewOnly ? 'view' : 'edit');
      form.reset(prepareNoticeForm(notice));
    });
  };
  const add = () => {
    if (!permissions.create) return denied();
    if (!hasCapacity(list.items.length)) return setMode('limit');
    confirmNavigation(() => {
      setSelection(null);
      setMode('create');
      form.reset(prepareNoticeForm(null));
    });
  };
  const save = (values) => {
    if (mode !== 'create' && mode !== 'edit') return;
    if (!(selection ? permissions.update : permissions.create)) return denied();
    if (!selection && !hasCapacity(list.items.length)) return setMode('limit');
    return action.run(
      (signal) => saveNotice(values, selection, signal),
      () => {
        close();
        list.refresh();
      },
    );
  };
  const requestDelete = (notice) => {
    if (action.pending) return;
    if (permissions.remove) setDeleteTarget(notice);
    else denied();
  };
  const confirmDelete = () =>
    deleteTarget &&
    action.run(
      (signal) => deleteNotice(deleteTarget.id, signal),
      () => {
        if (selection?.id === deleteTarget.id) close();
        setDeleteTarget(null);
        list.refresh();
      },
    );
  const acceptChanges = useUnsavedForm(
    form,
    active && (mode === 'create' || mode === 'edit'),
    close,
  );
  return {
    ...list,
    messages: list.items,
    form,
    selection,
    mode,
    deleteTarget,
    setDeleteTarget,
    show,
    add,
    save,
    close,
    requestDelete,
    confirmDelete,
    pending: action.pending,
  };
}
