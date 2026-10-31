import { useState } from 'react';
import { toast } from 'react-toastify';

import { useAutenticacao as useUser } from '../../../../../contexts/autenticacao';
import { hasPermission } from '../../../../../utils/hasPermission';
import { validateProp } from '../../../../../utils/validateProp';
import { ModalAddOC } from '../AddCutOrderModal';
import * as S from './styles';

export function ButtonAdd({ children, onClick, disabled, page }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { userRole } = useUser();
  const canAdd = hasPermission(userRole, page, 'C');

  const handleEdit = () => {
    if (canAdd) {
      setIsModalVisible(true);
    } else {
      toast.warning('🙅🏻‍♂️ Você não tem permissão para executar essa operação!');
    }
  };

  const handleConfirm = () => {
    if (typeof onClick === 'function') {
      onClick();
    }
    setIsModalVisible(false);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <S.ButtonContainer
        className="fill-button"
        onClick={handleEdit}
        disabled={disabled}
      >
        <S.PlusIcon />
        {children}
      </S.ButtonContainer>
      <ModalAddOC
        visible={isModalVisible}
        onCancel={handleCancel}
        onConfirm={handleConfirm}
      />
    </>
  );
}

ButtonAdd.propTypes = {
  children: validateProp(['object', 'string', 'number']),
  onClick: validateProp('function'),
  disabled: validateProp('boolean'),
  page: validateProp('string'),
};
