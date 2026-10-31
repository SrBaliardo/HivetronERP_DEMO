import { validateProp } from '../../utils/validateProp';
import { ButtonBorder } from '../ButtonBorder';
import { ButtonFill } from '../ButtonFill';
import * as S from './styles';

export function ModalAlert({
  visible,
  onCancel,
  onConfirm,
  disabled = false,
  pending = false,
  title = 'Confirmar Exclusão',
  message = 'Tem certeza que deseja excluir?',
}) {
  const blocked = disabled || pending;
  return (
    <S.ModalContainer
      title={title}
      open={visible}
      closable={!blocked}
      maskClosable={!blocked}
      keyboard={!blocked}
      onCancel={blocked ? undefined : onCancel}
      centered
      footer={[
        <ButtonBorder
          key="cancel"
          type="button"
          disabled={blocked}
          onClick={onCancel}
        >
          Não
        </ButtonBorder>,
        <ButtonFill
          key="confirm"
          type="button"
          disabled={blocked}
          onClick={onConfirm}
        >
          Sim
        </ButtonFill>,
      ]}
    >
      <p>{message}</p>
    </S.ModalContainer>
  );
}
ModalAlert.propTypes = {
  visible: validateProp('boolean'),
  onCancel: validateProp('function', true),
  onConfirm: validateProp('function', true),
  disabled: validateProp('boolean'),
  pending: validateProp('boolean'),
  title: validateProp('string'),
  message: validateProp('string'),
};
