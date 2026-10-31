import { Modal } from 'antd';
import { useEffect } from 'react';

import { useLoading } from '../../contexts/LoadingContext';
import { validateProp } from '../../utils/validateProp';
import { LoadingFeedback } from '../LoadingRegion';

export function LoadingModal({ open, modalRender, ...props }) {
  const loading = useLoading();
  const busy = Boolean(loading?.isLoading);
  const registerModal = loading?.registerModal;
  useEffect(() => {
    if (open) return registerModal?.();
  }, [open, registerModal]);
  return (
    <Modal
      {...props}
      open={open}
      closable={busy ? false : props.closable}
      keyboard={busy ? false : props.keyboard}
      maskClosable={busy ? false : props.maskClosable}
      modalRender={(node) => (
        <LoadingFeedback modal active={Boolean(open)}>
          {modalRender ? modalRender(node) : node}
        </LoadingFeedback>
      )}
    />
  );
}

LoadingModal.propTypes = {
  open: validateProp('boolean'),
  modalRender: validateProp('function'),
  closable: validateProp(['boolean', 'object']),
  keyboard: validateProp('boolean'),
  maskClosable: validateProp('boolean'),
};
