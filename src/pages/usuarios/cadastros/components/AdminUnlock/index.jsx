import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useId } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as yup from 'yup';

import { ButtonBorder } from '../../../../../components/ButtonBorder';
import { ButtonFill } from '../../../../../components/ButtonFill';
import { InputPasswordModal } from '../../../../../components/InputPasswordModal';
import { useAutenticacao } from '../../../../../contexts/autenticacao';
import { useAsyncAction } from '../../../../../hooks/useAsyncAction';
import { validateProp } from '../../../../../utils/validateProp';
import * as S from './styles';

const schema = yup.object({
  username: yup
    .string()
    .test('required', 'Usuário e senha são obrigatórios.', (value) =>
      Boolean(value?.trim()),
    ),
  password: yup
    .string()
    .test('required', 'Usuário e senha são obrigatórios.', (value) =>
      Boolean(value?.trim()),
    ),
});

export function AdminUnlock({ visible, onCancel, onConfirm }) {
  const id = useId();
  const { validateAdmin } = useAutenticacao();
  const { pending, run, cancel: cancelRequest } = useAsyncAction();
  const { register, handleSubmit, reset, control } = useForm({
    defaultValues: { username: '', password: '' },
    resolver: yupResolver(schema),
  });
  useEffect(() => {
    reset({ username: '', password: '' });
    if (!visible) cancelRequest();
  }, [visible, reset, cancelRequest]);
  const confirm = (values) =>
    run(
      () => validateAdmin(values.username, values.password),
      () => {
        toast.success('Usuário autorizado!');
        reset();
        onConfirm();
      },
      (error) => toast.error(error.message),
    );
  const cancel = () => {
    if (!pending) {
      reset();
      onCancel();
    }
  };
  return (
    <S.ModalContainer
      title="Credenciais de Administrador"
      open={visible}
      onCancel={cancel}
      closable={!pending}
      maskClosable={!pending}
      keyboard={!pending}
      centered
      footer={[
        <ButtonBorder
          key="cancel"
          type="button"
          disabled={pending}
          onClick={cancel}
        >
          Cancelar
        </ButtonBorder>,
        <ButtonFill key="confirm" type="submit" form={id} disabled={pending}>
          Confirmar
        </ButtonFill>,
      ]}
    >
      <form
        id={id}
        onSubmit={handleSubmit(confirm, () =>
          toast.warning('Usuário e senha são obrigatórios.'),
        )}
      >
        <label htmlFor={`${id}-username`}>Login:</label>
        <input
          id={`${id}-username`}
          className="input"
          placeholder="Usuário"
          autoComplete="username"
          disabled={pending}
          {...register('username')}
        />
        <label htmlFor={`${id}-password`}>Senha:</label>
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <InputPasswordModal
              id={`${id}-password`}
              inputRef={field.ref}
              autoComplete="current-password"
              disabled={pending}
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              name={field.name}
            />
          )}
        />
      </form>
    </S.ModalContainer>
  );
}
AdminUnlock.propTypes = {
  visible: validateProp('boolean'),
  onCancel: validateProp('function', true),
  onConfirm: validateProp('function', true),
};
