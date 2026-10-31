import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useRef, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { toast } from 'react-toastify';

import { useAppointment } from '../../../../contexts/appointment/index.js';
import { useScanning } from '../../../../contexts/scanning/index.js';
import { useAsyncAction } from '../../../../hooks/useAsyncAction';
import { useUnsavedForm } from '../../../../hooks/useUnsavedForm';
import { schema } from './schema';
export function useAppointmentRegistration() {
  const {
    getPointedOrderById,
    addAppointment,
    canRegister,
    role,
    sessionKey,
    isDemonstration,
  } = useAppointment();
  const { checkOrderStatus } = useScanning();
  const form = useForm({
    resolver: yupResolver(schema),
    defaultValues: { code: '' },
  });
  const { reset } = form;
  const code = useWatch({ control: form.control, name: 'code' });
  const [order, setOrder] = useState(null);
  const [selectedCode, setSelectedCode] = useState(null);
  const [registered, setRegistered] = useState(false);
  const checkpoint = useRef(false);
  const action = useAsyncAction();
  const { cancel } = action;
  useEffect(() => {
    cancel();
    reset({ code: '' });
    setOrder(null);
    setSelectedCode(null);
    setRegistered(false);
    checkpoint.current = false;
  }, [sessionKey, reset, cancel]);
  useEffect(() => {
    if (selectedCode && code !== selectedCode && !checkpoint.current) {
      cancel();
      setOrder(null);
      setSelectedCode(null);
    }
  }, [code, selectedCode, cancel]);
  const clear = () => {
    acceptChanges();
    reset({ code: '' });
    setOrder(null);
    setSelectedCode(null);
    setRegistered(false);
    checkpoint.current = false;
  };
  const lookup = (values) => {
    if (!canRegister(role) || checkpoint.current) return;
    action.run(
      () => getPointedOrderById(values.code),
      (data) => {
        if (!data) {
          toast.error('Ordem FINALIZADA ou CANCELADA. Tente outro código.');
          return;
        }
        checkpoint.current = false;
        setRegistered(false);
        setOrder(data);
        setSelectedCode(values.code);
      },
      () =>
        toast.error(
          'Erro ao buscar apontamentos. Verifique o código de barras e tente novamente.',
        ),
    );
  };
  const save = () => {
    if (!canRegister(role) || !order || !selectedCode) return;
    action.run(
      async (signal) => {
        if (!checkpoint.current) {
          await addAppointment(selectedCode, signal);
          checkpoint.current = true;
          if (!signal.aborted) setRegistered(true);
        }
        // A degustação não sincroniza nem altera ordens reais.
        // Integração real: await checkOrderStatus(selectedCode, signal);
        if (!isDemonstration) await checkOrderStatus(selectedCode, signal);
      },
      clear,
      () => toast.error('Erro ao efetivar o apontamento. Tente novamente.'),
    );
  };
  const acceptChanges = useUnsavedForm(form, !registered, () => {
    setOrder(null);
    setSelectedCode(null);
    checkpoint.current = false;
  });
  return {
    form,
    order,
    pending: action.pending,
    registered,
    allowed: canRegister(role),
    lookup,
    save,
    clear,
    invalid: (errors) =>
      toast.warning(
        errors.code?.message ||
          'Por favor, insira um código de ordem antes de apontar.',
      ),
  };
}
