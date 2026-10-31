import { ButtonBorder } from '../../../../../components/ButtonBorder';
import { ButtonFill } from '../../../../../components/ButtonFill';
import { validateProp } from '../../../../../utils/validateProp';
import * as S from './styles';

export function ModalAlertConfirm({ visible, onCancel, onConfirm }) {
  const confirm = () => {
    onConfirm();
  };

  const discard = () => {
    onCancel();
  };

  return (
    <S.ModalContainer
      title="Confirmar Cancelamento"
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
    >
      <p>Tem certeza que deseja CANCELAR esta OS?</p>
      <p>Cancelar esta OS afetará as sequências e será irreversível!</p>
    </S.ModalContainer>
  );
}

ModalAlertConfirm.propTypes = {
  visible: validateProp('boolean'),
  onCancel: validateProp('function'),
  onConfirm: validateProp('function'),
};
