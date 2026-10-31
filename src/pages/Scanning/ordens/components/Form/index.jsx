import { CaretLeftOutlined, ClockCircleOutlined } from '@ant-design/icons';

import { ButtonBorder } from '../../../../../components/ButtonBorder';
import { ButtonFill } from '../../../../../components/ButtonFill';
import { ModalAlert } from '../../../../../components/ModalAlert';
import { convertSecondsToTime } from '../../../../../utils/formatTimeInput';
import { validateProp } from '../../../../../utils/validateProp';
import { useOrderForm } from '../../hooks/useOrderForm';
import { useOrderPdf } from '../../hooks/useOrderPdf';
import { ButtonSetCanceled } from '../CancelOrderButton';
import { OperationFields } from '../OperationFields';
import { SequenceInfo } from '../SequenceInfo';
import { SequencePicker } from '../SequencePicker';
import * as S from './styles';
export function OrderForm({ order, orderList, mode }) {
  const {
    currentOrder,
    scheduleVisible,
    handleOpenSchedule,
    handleSchedule,
    handleCancelSchedule,
    register,
    handleSubmit,
    isEditing,
    editedSequences,
    observation,
    setObservation,
    itemId,
    isSmallScreen,
    infoData,
    setInfoData,
    infoVisible,
    setInfoVisible,
    pending,
    handleDiscard,
    handleEdit,
    handleSetCanceledServiceOrderStatus,
    onSubmit,
    handleSelectSequence,
    handleInputChange,
    formatDisplayDate,
    formatDisplayExitDate,
  } = useOrderForm(order, orderList, mode);
  const handleExportPDF = useOrderPdf(currentOrder, editedSequences);
  return (
    <S.Form onSubmit={handleSubmit(onSubmit)} noValidate>
      <h1>
        O.S.: {currentOrder?.code} - {currentOrder?.branch}
      </h1>

      <S.Container1>
        <div>
          <label>Código do Cliente:</label>
          <input
            aria-label="Código do cliente"
            className="input"
            type="text"
            value={currentOrder?.clientCode || ''}
            readOnly
          />
        </div>

        <div className="container-1-1">
          <div>
            <label>Cliente:</label>
            <input
              aria-label="Nome do Cliente"
              type="text"
              placeholder="Nome do Cliente"
              value={currentOrder?.client || ''}
              readOnly
            />
          </div>
          <div>
            <label>Observação:</label>
            <input
              aria-label="Observação da O.S."
              type="text"
              placeholder=""
              value={observation}
              onChange={(e) => setObservation(e.target.value)}
              disabled={!isEditing || pending}
            />
          </div>
        </div>

        <div className="container-1-2">
          <div>
            <label>Produto:</label>
            <input
              aria-label="Código"
              type="text"
              placeholder="Código"
              value={currentOrder?.item || ''}
              readOnly
            />
          </div>
          <div>
            <label>Desenho:</label>
            <input
              aria-label="Desenho"
              type="text"
              placeholder="Desenho"
              value={currentOrder?.drawingNumber || ''}
              readOnly
            />
          </div>
        </div>

        <div className="container-1-3">
          <div>
            <label>Descrição:</label>
            <input
              aria-label="Descrição"
              type="text"
              placeholder="Descrição"
              value={currentOrder?.description || ''}
              readOnly
            />
          </div>
          <div className="container-1-3-1">
            <div>
              <label>MP:</label>
              <input
                aria-label="Matéria Prima"
                type="text"
                placeholder="Matéria Prima"
                value={currentOrder?.rawMaterial || ''}
                readOnly
              />
            </div>
            <div>
              <label>Quantidade:</label>
              <input
                aria-label="Quantidade"
                type="text"
                placeholder="Quantidade"
                value={currentOrder?.amount || ''}
                readOnly
              />
            </div>
            <div>
              <label>UM:</label>
              <input
                aria-label="UM"
                type="text"
                placeholder="UM"
                value={currentOrder?.unit || ''}
                readOnly
              />
            </div>
            <div>
              <label>Prazo de Entrega:</label>
              <input
                aria-label="dd/mm/aaaa"
                type="text"
                placeholder="dd/mm/aaaa"
                value={formatDisplayExitDate(currentOrder?.deadline) || ''}
                readOnly
              />
            </div>
          </div>
        </div>
      </S.Container1>

      <h2>Operações</h2>
      <S.ScheduleActions>
        <ButtonFill
          type="button"
          onClick={handleOpenSchedule}
          disabled={pending || !isEditing}
        >
          <ClockCircleOutlined aria-hidden="true" />
          Planejamento Automático
        </ButtonFill>
      </S.ScheduleActions>
      <ModalAlert
        visible={scheduleVisible}
        title="Planejamento Automático"
        message="Deseja preencher automaticamente as datas de início planejado das operações ?"
        pending={pending}
        onCancel={handleCancelSchedule}
        onConfirm={handleSchedule}
      />

      <S.ContainerBatch>
        <S.RowBatchHeader>
          <p>Seq</p>
          <p>Operação</p>
          <p>Máquina</p>
          <p>Tempo Estimado</p>
          <p>Ferramental</p>
        </S.RowBatchHeader>

        {editedSequences?.map((sequence, index) => (
          <div className="batchsequence" key={sequence.id || index}>
            <S.RowBatchContent>
              <div className="div-modal">
                <label className="selected-sequence">
                  {sequence.sequence || ''}
                </label>
                <SequencePicker
                  name={`editedSequences[${index}].selectedSequence`}
                  value={
                    sequence.selectedSequence ||
                    sequence.manufacturingSequenceId ||
                    sequence.id
                  }
                  disabled={!isEditing || pending}
                  itemId={itemId}
                  sequenceNumber={sequence.sequence}
                  onConfirm={(selectedSeq) =>
                    handleSelectSequence(index, selectedSeq)
                  }
                />
              </div>
              <div className="batchs">
                <input
                  aria-label="Descrição"
                  className="input-operations"
                  placeholder="Descrição"
                  {...register(`sequences.${index}.operationDescription`)}
                  readOnly
                />
                <input
                  aria-label="Tipo"
                  className="input-operations"
                  placeholder="Tipo"
                  {...register(`sequences.${index}.operationType`)}
                  readOnly
                />
              </div>
              <div className="batchs">
                <input
                  aria-label="Descrição"
                  className="input-operations"
                  placeholder="Descrição"
                  {...register(`sequences.${index}.machineDescription`)}
                  readOnly
                />
                <input
                  aria-label="Grupo"
                  className="input-operations"
                  placeholder="Grupo"
                  {...register(`sequences.${index}.machineGroup`)}
                  readOnly
                />
              </div>
              <S.TimeSummary>
                <input
                  aria-label="00:00:00"
                  className="input-operations"
                  placeholder="00:00:00"
                  value={convertSecondsToTime(sequence.totalTime)}
                  readOnly
                />
                <p>
                  {sequence.collectiveTime === true ? 'Coletivo' : 'Individual'}
                </p>
              </S.TimeSummary>
              <S.InfoChip
                type="button"
                onClick={() => {
                  setInfoData(editedSequences[index]);
                  setInfoVisible(true);
                }}
              >
                Ver detalhes
              </S.InfoChip>
            </S.RowBatchContent>
            <hr />

            <OperationFields
              sequence={sequence}
              disabled={!isEditing || pending}
              onChange={(field, value) =>
                handleInputChange(index, field, value)
              }
              formatDate={formatDisplayDate}
            />

            <hr />
          </div>
        ))}
      </S.ContainerBatch>

      {isSmallScreen && (
        <S.ContainerBatchMW>
          {editedSequences.map((sequence, index) => (
            <div className="batchsequence" key={sequence.id || index}>
              <S.RowBatchHeader>
                <p>Sequência:</p>
                <label className="selected-sequence">
                  {sequence.sequence || ''}
                  <div className="div divMW">
                    <SequencePicker
                      name={`editedSequences[${index}].selectedSequence`}
                      value={
                        sequence.selectedSequence ||
                        sequence.manufacturingSequenceId ||
                        sequence.id
                      }
                      disabled={!isEditing || pending}
                      itemId={itemId}
                      sequenceNumber={sequence.sequence}
                      onConfirm={(selectedSeq) =>
                        handleSelectSequence(index, selectedSeq)
                      }
                    />
                  </div>
                </label>
              </S.RowBatchHeader>

              <S.RowBatchContentMW>
                <div className="div-batch1">
                  <div className="batchs">
                    <p>Operação:</p>
                    <input
                      aria-label="Descrição"
                      className="input-operations"
                      placeholder="Descrição"
                      {...register(`sequences.${index}.operationDescription`)}
                      readOnly
                    />
                    <input
                      aria-label="Tipo"
                      className="input-operations"
                      placeholder="Tipo"
                      {...register(`sequences.${index}.operationType`)}
                      readOnly
                    />
                  </div>
                  <div className="batchs">
                    <p>Máquina:</p>
                    <input
                      aria-label="Descrição"
                      className="input-operations"
                      placeholder="Descrição"
                      {...register(`sequences.${index}.machineDescription`)}
                      readOnly
                    />
                    <input
                      aria-label="Grupo"
                      className="input-operations"
                      placeholder="Grupo"
                      {...register(`sequences.${index}.machineGroup`)}
                      readOnly
                    />
                  </div>
                  <div className="batchs">
                    <p>Ferramental:</p>
                    <S.InfoChip
                      type="button"
                      onClick={() => {
                        setInfoData(editedSequences[index]);
                        setInfoVisible(true);
                      }}
                    >
                      Ver detalhes
                    </S.InfoChip>
                  </div>
                </div>

                <div className="div-batch2">
                  <p>
                    Tempo Estimado:{' '}
                    <S.TimeValue>
                      {convertSecondsToTime(sequence.totalTime)} -{' '}
                      {sequence.collectiveTime === true
                        ? 'Coletivo'
                        : 'Individual'}
                    </S.TimeValue>
                  </p>
                </div>
              </S.RowBatchContentMW>
              <hr />

              <OperationFields
                sequence={sequence}
                disabled={!isEditing || pending}
                onChange={(field, value) =>
                  handleInputChange(index, field, value)
                }
                formatDate={formatDisplayDate}
              />

              <hr />
            </div>
          ))}
        </S.ContainerBatchMW>
      )}

      <SequenceInfo
        visible={infoVisible}
        data={infoData}
        onCancel={() => setInfoVisible(false)}
      />

      <S.ContainerButtons>
        <S.ContainerE>
          {!isEditing && (
            <>
              <ButtonSetCanceled
                onDelete={handleSetCanceledServiceOrderStatus}
                disabled={pending}
                page={mode === 'pcp' ? 'pcp' : 'scanning'}
              >
                Cancelar O.S.
              </ButtonSetCanceled>
              <ButtonFill
                type="button"
                disabled={pending}
                onClick={handleExportPDF}
              >
                <S.Export />
                Exportar
              </ButtonFill>
            </>
          )}
        </S.ContainerE>
        <div className="div-b">
          <ButtonBorder
            type="button"
            disabled={pending}
            onClick={handleDiscard}
          >
            {!isEditing && <CaretLeftOutlined aria-hidden="true" />}
            {isEditing ? 'Cancelar' : 'Voltar'}
          </ButtonBorder>
          {!isEditing ? (
            <ButtonFill
              key="edit"
              type="button"
              disabled={pending}
              onClick={handleEdit}
            >
              <S.Edit />
              Editar
            </ButtonFill>
          ) : (
            <ButtonFill key="save" type="submit" disabled={pending}>
              <S.Save />
              Salvar
            </ButtonFill>
          )}
        </div>
      </S.ContainerButtons>
    </S.Form>
  );
}

OrderForm.propTypes = {
  mode: validateProp('string'),
  order: validateProp('object'),
  orderList: validateProp('object'),
};
