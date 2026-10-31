import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { ButtonBorder } from '../../../../../components/ButtonBorder';
import { ButtonFill } from '../../../../../components/ButtonFill';
import { useScanning } from '../../../../../contexts/scanning/index.js';
import { useUnsavedForm } from '../../../../../hooks/useUnsavedForm';
import { validateProp } from '../../../../../utils/validateProp';
import * as S from './styles';
export function ModalRectification({
  visible,
  onCancel,
  onConfirm,
  item,
  pending,
}) {
  const { limitShipment } = useScanning();
  const form = useForm({
    defaultValues: { quantity: '' },
  });
  const { register, reset, setValue, watch, handleSubmit } = form;
  useUnsavedForm(form, visible, onCancel);
  useEffect(() => {
    reset({ quantity: '' });
  }, [visible, item, reset]);
  return (
    <S.ModalContainer
      title="Retificar Item"
      open={visible}
      onCancel={pending ? undefined : onCancel}
      centered
      footer={[
        <ButtonBorder key="cancel" disabled={pending} onClick={onCancel}>
          Cancelar
        </ButtonBorder>,
        <ButtonFill
          key="confirm"
          disabled={pending}
          onClick={handleSubmit((values) => onConfirm(values.quantity))}
        >
          Confirmar
        </ButtonFill>,
      ]}
    >
      <p>Tem certeza que deseja alterar a quantidade expedida deste item ?</p>
      <p>Ao confirmar você irá alterar o total expedido deste item !</p>
      <br />
      <div className="container-item">
        <label className="item">
          {item?.position} - {item?.itemCode}
        </label>
        <label>
          Total expedido: {item?.shippedAmount} / {item?.releasedAmount}
        </label>
        <div>
          <label htmlFor="rectified-quantity">Substituir total por:</label>
          <input
            aria-label="Substituir total expedido por"
            {...register('quantity')}
            id="rectified-quantity"
            type="number"
            className="input"
            autoFocus
            min={0}
            max={item?.releasedAmount}
            value={watch('quantity')}
            onChange={(event) =>
              setValue(
                'quantity',
                limitShipment(event.target.value, item.releasedAmount),
              )
            }
          />
        </div>
      </div>
    </S.ModalContainer>
  );
}

ModalRectification.propTypes = {
  visible: validateProp('boolean'),
  onCancel: validateProp('function'),
  onConfirm: validateProp('function'),
  item: validateProp('object'),
  pending: validateProp('boolean'),
};
