import { useEffect, useRef, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useScanning } from '../../../../contexts/scanning/index.js';
import { useAsyncAction } from '../../../../hooks/useAsyncAction';
import { useDelayedCallback } from '../../../../hooks/useDelayedCallback';
import { useUnsavedForm } from '../../../../hooks/useUnsavedForm';
export function useCutOrderForm(order) {
  const {
    buildCutOrderForm,
    displayDeadline,
    saveCutOrder,
    getPcpPermissions,
    role,
    sessionKey,
  } = useScanning();
  const form = useForm({ defaultValues: buildCutOrderForm(order) });
  const blocks = useWatch({ control: form.control, name: 'blocks' }) || [];
  const status = useWatch({ control: form.control, name: 'status' }) || '';
  const [editing, setEditing] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const navigate = useNavigate();
  const back = () => navigate('/pcp', { state: { tabKey: '2' } });
  const navigation = useRef(back);
  navigation.current = back;
  const delayed = useDelayedCallback(() => navigation.current(), 800);
  const action = useAsyncAction();
  const cancel = action.cancel,
    cancelDelayed = delayed.cancel,
    reset = form.reset;
  const canEdit = getPcpPermissions(role).cutEdit;
  useEffect(() => {
    cancel();
    cancelDelayed();
    reset(buildCutOrderForm(order));
    setEditing(false);
    setLeaving(false);
  }, [order, sessionKey, reset, buildCutOrderForm, cancel, cancelDelayed]);
  const warning = () =>
    toast.warning('🙅🏻‍♂️ Você não tem permissão para executar essa operação!');
  const change = (path, value) => {
    if (editing && canEdit && !action.pending && !leaving)
      form.setValue(path, value, { shouldDirty: true });
  };
  const acceptChanges = useUnsavedForm(form, editing && !leaving, () =>
    setEditing(false),
  );
  return {
    handleSubmit: form.handleSubmit,
    cutItems: blocks,
    orderStatus: status,
    isEditing: editing,
    pending: action.pending || leaving,
    isSmallScreen: useMediaQuery({ query: '(max-width: 890px)' }),
    formatDisplayDate: displayDeadline,
    handleStatusChange: (value) => change('status', value),
    handleInputChange: (block, field, value) =>
      change('blocks.' + block + '.' + field, value),
    handleRadioChange: (block, item, value) =>
      change('blocks.' + block + '.cutItems.' + item + '.isStock', value),
    handleObservationChange: (block, item, value) =>
      change('blocks.' + block + '.cutItems.' + item + '.observation', value),
    handleEdit: () => {
      if (canEdit) setEditing(true);
      else warning();
    },
    handleDiscard: () => {
      acceptChanges();
      if (editing) {
        reset(buildCutOrderForm(order));
        setEditing(false);
      } else back();
    },
    onSubmit: () => {
      if (!canEdit) {
        warning();
        return;
      }
      if (!editing || leaving) return;
      return action.run(
        (signal) => saveCutOrder(order, form.getValues(), signal),
        () => {
          acceptChanges();
          setEditing(false);
          setLeaving(true);
          delayed.schedule();
        },
      );
    },
  };
}
