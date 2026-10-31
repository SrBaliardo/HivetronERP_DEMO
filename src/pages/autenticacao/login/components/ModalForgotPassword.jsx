import { validateProp } from '../../../../utils/validateProp';
import { usePasswordRecovery } from '../hooks/usePasswordRecovery';
import * as S from '../styles';

export function ModalForgotPassword({ visible, onCancel, onConfirm }) {
  const { register, submit, discard, submitting } = usePasswordRecovery({
    visible,
    onCancel,
    onConfirm,
  });
  return (
    <S.RecoveryModal
      title="Informe seu e-mail cadastrado"
      open={visible}
      styles={S.recoveryModalStyles}
      onCancel={discard}
      footer={[
        <S.CancelButton type="button" key="cancel" onClick={discard}>
          Cancelar
        </S.CancelButton>,
        <S.RecoverButton
          type="button"
          key="confirm"
          onClick={submit}
          disabled={submitting}
        >
          Enviar
        </S.RecoverButton>,
      ]}
      centered
    >
      <form onSubmit={submit} aria-busy={submitting}>
        <S.RecoveryInput
          {...register('email')}
          aria-label="E-mail"
          placeholder="E-mail"
          autoComplete="email"
        />
      </form>
    </S.RecoveryModal>
  );
}

ModalForgotPassword.propTypes = {
  visible: validateProp('boolean', true),
  onCancel: validateProp('function', true),
  onConfirm: validateProp('function', true),
};
