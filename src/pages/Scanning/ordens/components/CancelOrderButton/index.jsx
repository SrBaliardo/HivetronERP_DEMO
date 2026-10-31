import { useState } from 'react';
import { toast } from 'react-toastify';

import { useAutenticacao as useUser } from '../../../../../contexts/autenticacao';
import { hasPermission } from '../../../../../utils/hasPermission';
import { validateProp } from '../../../../../utils/validateProp';
import { ModalAlertConfirm } from '../CancelOrderModal';
import * as S from './styles';

export function ButtonSetCanceled({ children, onDelete, disabled, page }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { userRole } = useUser();
  const canDelete = hasPermission(userRole, page, 'D');

  const handleDelete = () => {
    if (canDelete) {
      setIsModalVisible(true);
    } else {
      toast.warning('🙅🏻‍♂️ Você não tem permissão para executar essa operação!');
    }
  };

  const handleConfirm = () => {
    if (typeof onDelete === 'function') {
      onDelete();
    }
    setIsModalVisible(false);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <S.ButtonContainer
        className="delete-button"
        onClick={handleDelete}
        disabled={disabled}
      >
        <S.CancelIcon />
        {children}
      </S.ButtonContainer>
      <ModalAlertConfirm
        visible={isModalVisible}
        onCancel={handleCancel}
        onConfirm={handleConfirm}
      />
    </>
  );
}

ButtonSetCanceled.propTypes = {
  children: validateProp(['object', 'string', 'number']),
  onDelete: validateProp('function'),
  disabled: validateProp('boolean'),
  page: validateProp('string'),
};
