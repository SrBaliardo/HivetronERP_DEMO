import { ButtonBorder } from '../../../../../components/ButtonBorder';
import { ButtonFill } from '../../../../../components/ButtonFill';
import { formatDate } from '../../../../../utils/formatDate';
import { validateProp } from '../../../../../utils/validateProp';
import { displayStatus } from '../../../status';
import * as S from './styles';
const formatDisplayDate = (value) =>
  formatDate(value) || formatDate(new Date());
export function AppointmentDetails({
  order,
  onSave,
  onCancel,
  pending,
  allowed,
}) {
  const onSubmit = (event) => {
    event.preventDefault();
    onSave();
  };
  return (
    <S.Form onSubmit={onSubmit} noValidate>
      <S.ContainerBatch>
        <S.RowBatchContent>
          <div className="batchs">
            <label>OS: {order?.serviceOrderCode || ''}</label>
          </div>
          <div className="batchs">
            <label>{order?.sequenceNumber || ''}</label>
          </div>
          <div className="batchs">
            <label>{order?.operation || ''}</label>
            <label>{order?.operationType || ''}</label>
          </div>
          <div className="batchs">
            <label>{order?.machine || ''}</label>
            <label>{order?.machineGroup || ''}</label>
          </div>
          <div className="batchs">
            <label>{order?.tool || ''}</label>
            <label>{order?.input_code || ''}</label>
          </div>
        </S.RowBatchContent>

        <S.RowBatchContentMW1>
          <div className="batchs">
            <label>OS: {order?.serviceOrderCode || ''}</label>
          </div>
          <div className="batchs">
            <label>{order?.sequenceNumber || ''}</label>
          </div>
        </S.RowBatchContentMW1>
        <S.RowBatchContentMW2>
          <div className="batchs">
            <label>{order?.operation || ''}</label>
            <label>{order?.operationType || ''}</label>
          </div>
          <div className="batchs">
            <label>{order?.machine || ''}</label>
            <label>{order?.machineGroup || ''}</label>
          </div>
          <div className="batchs">
            <label>{order?.tool || ''}</label>
            <label>{order?.input_code || ''}</label>
          </div>
        </S.RowBatchContentMW2>
        <hr className="hr" />

        <div className="container-batch">
          <div className="div-status">
            <div className="div">
              <label>Status Anterior:</label>
              <input
                aria-label="Status anterior"
                className="input-satus"
                value={displayStatus(order?.oldStatus) || ''}
                placeholder="Selecione"
                readOnly
              />
            </div>
            <div className="div">
              <label>Novo Status:</label>
              <input
                aria-label="Novo status"
                className="input-satus"
                value={displayStatus(order?.newStatus) || ''}
                placeholder="Selecione"
                readOnly
              />
            </div>
          </div>

          <div className="div date">
            <label>Data Apontamento:</label>
            <input
              aria-label="Data do apontamento"
              type="text"
              className="input input-date"
              placeholder="dd/mm/aaaa"
              value={formatDisplayDate(order?.pointingDate)}
              readOnly
            />
          </div>
        </div>
        <hr className="hr" />
      </S.ContainerBatch>

      <S.ContainerButtons>
        <div className="div-b">
          <ButtonBorder type="button" disabled={pending} onClick={onCancel}>
            Cancelar
          </ButtonBorder>

          <ButtonFill type="submit" disabled={pending || !allowed}>
            <S.Save />
            Salvar
          </ButtonFill>
        </div>
      </S.ContainerButtons>
    </S.Form>
  );
}
AppointmentDetails.propTypes = {
  order: validateProp('object'),
  onSave: validateProp('function'),
  onCancel: validateProp('function'),
  pending: validateProp('boolean'),
  allowed: validateProp('boolean'),
};
