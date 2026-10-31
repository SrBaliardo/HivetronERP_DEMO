import { ButtonBorder } from '../../../../../components/ButtonBorder';
import { ButtonFill } from '../../../../../components/ButtonFill';
import { validateProp } from '../../../../../utils/validateProp';
import * as S from './styles';

export function ModalAddOC({ visible, onCancel, onConfirm }) {
  const confirm = () => {
    onConfirm();
  };

  const discard = () => {
    onCancel();
  };

  return (
    <S.ModalContainer
      title="Deseja adicionar Ordens de Corte?"
      open={visible}
      onCancel={onCancel}
      footer={[
        <ButtonBorder key="cancel" onClick={discard}>
          Não
        </ButtonBorder>,

        <ButtonFill key="confirm" onClick={confirm}>
          Sim
        </ButtonFill>,
      ]}
      centered
    ></S.ModalContainer>
  );
}

ModalAddOC.propTypes = {
  visible: validateProp('boolean'),
  onCancel: validateProp('function'),
  onConfirm: validateProp('function'),
};
