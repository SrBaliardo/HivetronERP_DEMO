import { useState } from 'react';
import { toast } from 'react-toastify';

import { useAutenticacao as useUser } from '../../contexts/autenticacao';
import { hasPermission } from '../../utils/hasPermission';
import { validateProp } from '../../utils/validateProp';
import { ModalAlert } from '../ModalAlert';
import { DeleteTrigger } from './Trigger';

export { DeleteTrigger } from './Trigger';

export function ButtonDelete({ children, onDelete, disabled, page }) {
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
      <DeleteTrigger onClick={handleDelete} disabled={disabled}>
        {children}
      </DeleteTrigger>
      <ModalAlert
        visible={isModalVisible}
        onCancel={handleCancel}
        onConfirm={handleConfirm}
      />
    </>
  );
}

ButtonDelete.propTypes = {
  children: validateProp(['object', 'string', 'number', 'boolean']),
  onDelete: validateProp('function'),
  disabled: validateProp('boolean'),
  page: validateProp('string'),
};
