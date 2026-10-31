import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { ButtonBorder } from '../../../../../components/ButtonBorder';
import { ButtonFill } from '../../../../../components/ButtonFill';
import { InputPasswordModal } from '../../../../../components/InputPasswordModal';
import { validateProp } from '../../../../../utils/validateProp';
import * as S from './styles';
export function AdminModal({ visible, onCancel, onConfirm, isLoading }) {
  const { register, reset, watch, setValue, handleSubmit } = useForm({
    defaultValues: { username: '', password: '' },
  });
  useEffect(() => {
    reset({ username: '', password: '' });
  }, [visible, reset]);
  const confirm = (values) => {
    if (!values.username.trim() || !values.password.trim()) {
      toast.warning('Usuário e senha são obrigatórios.');
      return;
    }
    onConfirm(values.username, values.password);
  };
  return (
    <S.ModalContainer
      title="Credenciais de Administrador"
      open={visible}
      onCancel={isLoading ? undefined : onCancel}
      centered
      footer={[
        <ButtonBorder key="cancel" onClick={onCancel} disabled={isLoading}>
          Cancelar
        </ButtonBorder>,
        <ButtonFill
          key="confirm"
          onClick={handleSubmit(confirm)}
          disabled={isLoading}
        >
          Confirmar
        </ButtonFill>,
      ]}
    >
      <label htmlFor="inspection-admin-login">Login:</label>
      <input
        aria-label="username"
        {...register('username')}
        id="inspection-admin-login"
        className="input"
        placeholder="Usuário"
        disabled={isLoading}
      />
      <label htmlFor="inspection-admin-password">Senha:</label>
      <InputPasswordModal
        name="password"
        id="inspection-admin-password"
        autoComplete="current-password"
        placeholder="Senha"
        value={watch('password')}
        disabled={isLoading}
        onChange={(event) => setValue('password', event.target.value)}
      />
    </S.ModalContainer>
  );
}

AdminModal.propTypes = {
  visible: validateProp('boolean'),
  onCancel: validateProp('function'),
  onConfirm: validateProp('function'),
  isLoading: validateProp('boolean'),
};
