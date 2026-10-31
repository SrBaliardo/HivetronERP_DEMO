import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

import { useAutenticacao } from '../../../../contexts/autenticacao';

export function usePasswordRecovery({ visible, onCancel, onConfirm }) {
  const { requestPasswordRecovery } = useAutenticacao();
  const { register, handleSubmit, reset } = useForm({
    defaultValues: { email: '' },
  });
  const [submitting, setSubmitting] = useState(false);
  const pending = useRef(false);
  const controller = useRef(null);
  const timer = useRef(null);
  const active = useRef(false);

  useEffect(() => {
    active.current = visible;
    if (!visible) {
      controller.current?.abort();
      clearTimeout(timer.current);
      reset({ email: '' });
      pending.current = false;
      setSubmitting(false);
    }
    return () => {
      active.current = false;
      controller.current?.abort();
      clearTimeout(timer.current);
    };
  }, [visible, reset]);

  const discard = () => {
    reset({ email: '' });
    onCancel();
  };

  const submit = handleSubmit(async ({ email }) => {
    if (pending.current || !active.current) return;
    pending.current = true;
    setSubmitting(true);
    const request = new AbortController();
    controller.current = request;
    try {
      await requestPasswordRecovery(email, request.signal);
      if (!active.current || request.signal.aborted) return;
      onConfirm();
      timer.current = setTimeout(() => {
        if (active.current && !request.signal.aborted) discard();
      }, 1100);
    } catch {
      if (active.current && !request.signal.aborted) {
        pending.current = false;
        setSubmitting(false);
      }
    }
  });

  return { register, submit, discard, submitting };
}
