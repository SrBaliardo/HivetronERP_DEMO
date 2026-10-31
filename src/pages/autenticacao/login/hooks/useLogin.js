import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { useAutenticacao } from '../../../../contexts/autenticacao';
import { useScreen } from '../../../../contexts/ScreenContext';

export function useLogin() {
  const { getRememberedUsername, rememberUsername, login } = useAutenticacao();
  const navigate = useNavigate();
  const screen = useScreen();
  const [defaultValues] = useState(() => {
    const username = getRememberedUsername() || 'demo';
    return { username, password: 'demo', rememberMe: Boolean(username) };
  });
  const form = useForm({ defaultValues });
  const [showPassword, setShowPassword] = useState(false);
  const [recoveryVisible, setRecoveryVisible] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const pending = useRef(false);
  const controller = useRef(null);
  const timer = useRef(null);
  const mounted = useRef(false);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
      controller.current?.abort();
      clearTimeout(timer.current);
    };
  }, []);

  const submit = form.handleSubmit(async (values) => {
    if (pending.current || !mounted.current) return;
    pending.current = true;
    setSubmitting(true);
    controller.current = new AbortController();
    try {
      await login(values, controller.current.signal);
      if (!mounted.current || controller.current.signal.aborted) return;
      timer.current = setTimeout(() => {
        if (mounted.current) {
          screen?.requestScreenRestore();
          navigate('/home');
        }
      }, 1000);
    } catch {
      pending.current = false;
      if (mounted.current) setSubmitting(false);
    }
  });

  const selectRememberMe = (checked) => {
    form.setValue('rememberMe', checked);
    rememberUsername(form.getValues('username'), checked);
  };

  return {
    register: form.register,
    rememberMe: form.watch('rememberMe') || false,
    selectRememberMe,
    submit,
    submitting,
    showPassword,
    togglePassword: () => setShowPassword((visible) => !visible),
    recoveryVisible,
    openRecovery: () => setRecoveryVisible(true),
    closeRecovery: () => setRecoveryVisible(false),
  };
}
