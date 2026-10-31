import { CaretLeftOutlined } from '@ant-design/icons';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { Controller } from 'react-hook-form';

import { ButtonBorder } from '../../../../../components/ButtonBorder';
import { DeleteTrigger } from '../../../../../components/ButtonDelete';
import { ButtonFill } from '../../../../../components/ButtonFill';
import { ButtonIconPlus } from '../../../../../components/ButtonIconPlus';
import { ButtonIconTrash } from '../../../../../components/ButtonIconTrash';
import { CodePicker } from '../../../../../components/CodePicker';
import { InputCheckboxIsMain } from '../../../../../components/InputCheckboxIsMain';
import { ModalAlert } from '../../../../../components/ModalAlert';
import { TimePickerInput } from '../../../../../components/TimePickerInput';
import { validateProp } from '../../../../../utils/validateProp';
import { useSequenceForm } from '../../hooks/useSequenceForm';
import * as S from './styles';

export function FormSequences(props) {
  const { isNew = false } = props;
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    errors,
    toolFields,
    addTool,
    remove,
    move,
    isEditing,
    isDeleteButtonVisible,
    operationId,
    machineId,
    operationType,
    machineGroup,
    resetTime,
    selectedSequence,
    showCheckbox,
    currentIsMainValue,
    setIsMain,
    operationChange,
    machineChange,
    estimatedTimeError,
    handleDiscard,
    handleEdit,
    handleDelete,
    confirmDelete,
    onSubmit,
    deleting,
    setDeleting,
    pending,
    catalogs,
    initializing,
    formVersion,
    validateOperationSelection,
    validateMachineSelection,
    validateToolSelection,
  } = useSequenceForm({ ...props, isNew });

  return (
    <>
      <S.Form noValidate onSubmit={handleSubmit(onSubmit)} aria-busy={pending}>
        <S.Container1>
          <div className="div-XS">
            <label>
              Seq: <span>*</span>
            </label>
            <input
              aria-label="Sequência"
              type="text"
              placeholder="Seq"
              value={watch('sequence') || ''}
              {...register('sequence')}
              aria-busy={initializing}
              className={errors.sequence ? 'input-error' : ''}
              disabled={!isEditing || pending || initializing}
            />
            {errors.sequence && (
              <span className="error-message">Sequência é obrigatória</span>
            )}
          </div>

          <div className="div">
            <label>Observação:</label>
            <input
              aria-label="Observação"
              type="text"
              placeholder="Observação"
              {...register('observation')}
              disabled={!isEditing || pending}
            />
          </div>

          <div className="div-chks">
            <div className="div-label">
              <label>Sequência principal:</label>
              <span>{currentIsMainValue ? 'Sim' : 'Não'}</span>
            </div>

            {showCheckbox && (
              <div className="checkbox">
                <label>Tornar Principal:</label>
                <InputCheckboxIsMain
                  checked={currentIsMainValue}
                  onChange={(checked) => {
                    setValue('isMain', checked);
                    setIsMain(checked);
                  }}
                  disabled={!isEditing || pending}
                />
              </div>
            )}
          </div>
        </S.Container1>

        <h2>Operação</h2>
        <S.Container2>
          <div className="div-M">
            <label>
              Operação: <span>*</span>
            </label>
            <S.Select>
              <CodePicker
                key={formVersion}
                options={catalogs.operations.items}
                loading={catalogs.operations.loading}
                error={catalogs.operations.error}
                onRetry={catalogs.operations.refresh}
                label="Operação"
                validateSelection={validateOperationSelection}
                clearInvalid={false}
                onChange={(option) => option && operationChange(option)}
                value={operationId || ''}
                disabled={!isEditing || pending}
              />
              {errors.operationId && (
                <span className="error-message">Tempo é obrigatório</span>
              )}
            </S.Select>
          </div>

          <div className="div-M">
            <label>
              Tipo: <span>*</span>
            </label>
            <input
              aria-label="Tipo"
              type="text"
              placeholder="Tipo"
              value={operationType || ''}
              disabled={!isEditing || pending}
              readOnly
            />
          </div>

          <div className="div-S">
            <label>
              Tempo: <span>*</span>
            </label>
            <TimePickerInput
              key={formVersion}
              onChange={(valueInSeconds) =>
                setValue('estimatedTime', valueInSeconds)
              }
              initialSeconds={selectedSequence?.estimatedTime || 0}
              className={errors.estimatedTime ? 'input-error' : ''}
              reset={resetTime}
              disabled={!isEditing || pending}
            />
            {errors.estimatedTime && (
              <span className="error-message">Tempo é obrigatório</span>
            )}
            {estimatedTimeError && <span>{estimatedTimeError}</span>}
          </div>
        </S.Container2>

        <h2>Máquina</h2>
        <S.Container3>
          <div className="div-M">
            <label>
              Máquina: <span>*</span>
            </label>
            <S.Select>
              <CodePicker
                key={formVersion}
                options={catalogs.machines.items}
                loading={catalogs.machines.loading}
                error={catalogs.machines.error}
                onRetry={catalogs.machines.refresh}
                label="Máquina"
                validateSelection={validateMachineSelection}
                clearInvalid={false}
                onChange={(option) => option && machineChange(option)}
                value={machineId || ''}
                disabled={!isEditing || pending}
              />
              {errors.machineId && (
                <span className="error-message">Tempo é obrigatório</span>
              )}
            </S.Select>
          </div>

          <div className="div-M">
            <label>
              Grupo: <span>*</span>
            </label>
            <input
              aria-label="Grupo"
              type="text"
              placeholder="Grupo"
              value={machineGroup}
              disabled={!isEditing || pending}
              readOnly
            />
          </div>
        </S.Container3>

        <h2>Ferramentas / Insumos</h2>
        {toolFields.map((field, index) => (
          <S.Container4 key={field.id}>
            <div className="div-min">
              <div className="div-M">
                <label>Ferramenta:</label>
                <S.Select>
                  <Controller
                    control={control}
                    name={`sequenceTools.${index}.toolId`}
                    render={({ field }) => (
                      <CodePicker
                        key={formVersion}
                        options={catalogs.tools.items}
                        loading={catalogs.tools.loading}
                        error={catalogs.tools.error}
                        onRetry={catalogs.tools.refresh}
                        label="Ferramenta"
                        value={field.value}
                        onChange={(option) =>
                          field.onChange(option?.value || '')
                        }
                        validateSelection={validateToolSelection}
                        disabled={!isEditing || pending}
                      />
                    )}
                  />
                </S.Select>
                {errors.sequenceTools?.[index]?.toolId && (
                  <span>Obrigatório</span>
                )}
              </div>

              <div className="div-M">
                <label>Código do Insumo:</label>
                <S.Select>
                  <Controller
                    control={control}
                    name={`sequenceTools.${index}.inputCode`}
                    render={({ field }) => (
                      <CodePicker
                        key={formVersion}
                        options={catalogs.inputs.items}
                        loading={catalogs.inputs.loading}
                        error={catalogs.inputs.error}
                        onRetry={catalogs.inputs.refresh}
                        label="Código do Insumo"
                        value={field.value}
                        onChange={(option) =>
                          field.onChange(option?.value || '')
                        }
                        disabled={!isEditing || pending}
                      />
                    )}
                  />
                </S.Select>
                {errors.sequenceTools?.[index]?.inputCode && (
                  <span>Obrigatório</span>
                )}
              </div>
            </div>

            <div className="div-min">
              <div className="div-SM">
                <label>AP:</label>
                <input
                  aria-label="AP"
                  type="number"
                  placeholder="0"
                  {...register(`sequenceTools.${index}.ap`, {
                    valueAsNumber: true,
                  })}
                  disabled={!isEditing || pending}
                />
                {errors.sequenceTools?.[index]?.ap && <span>Obrigatório</span>}
              </div>

              <div className="div-SM">
                <label>Avanço:</label>
                <input
                  aria-label="Avanço"
                  type="number"
                  placeholder="0"
                  {...register(`sequenceTools.${index}.toolFeed`, {
                    valueAsNumber: true,
                  })}
                  disabled={!isEditing || pending}
                />
                {errors.sequenceTools?.[index]?.toolFeed && (
                  <span>Obrigatório</span>
                )}
              </div>

              <div className="div-SM">
                <label>VC:</label>
                <input
                  aria-label="VC"
                  type="number"
                  placeholder="0"
                  {...register(`sequenceTools.${index}.cuttingSpeed`, {
                    valueAsNumber: true,
                  })}
                  disabled={!isEditing || pending}
                />
                {errors.sequenceTools?.[index]?.cuttingSpeed && (
                  <span>Obrigatório</span>
                )}
              </div>

              <div className="actions">
                {index === toolFields.length - 1 ? (
                  <>
                    <ButtonIconPlus
                      ariaLabel="Adicionar ferramenta"
                      type="button"
                      onClick={addTool}
                      disabled={!isEditing || pending}
                    />

                    {toolFields.length > 1 && (
                      <ButtonIconTrash
                        ariaLabel={`Excluir ferramenta ${index + 1}`}
                        type="button"
                        onClick={() => remove(index)}
                        disabled={!isEditing || pending}
                      />
                    )}

                    <div className="order-buttons">
                      <S.ToolOrderButton
                        type="button"
                        aria-label="Mover ferramenta para cima"
                        disabled={!isEditing || pending || index === 0}
                        onClick={() => move(index, index - 1)}
                      >
                        <ArrowDropUpIcon />
                      </S.ToolOrderButton>

                      <S.ToolOrderButton
                        type="button"
                        aria-label="Mover ferramenta para baixo"
                        disabled={
                          !isEditing ||
                          pending ||
                          index === toolFields.length - 1
                        }
                        onClick={() => move(index, index + 1)}
                      >
                        <ArrowDropDownIcon />
                      </S.ToolOrderButton>
                    </div>
                  </>
                ) : (
                  <>
                    <ButtonIconTrash
                      ariaLabel={`Excluir ferramenta ${index + 1}`}
                      type="button"
                      onClick={() => remove(index)}
                      disabled={!isEditing || pending}
                    />

                    <div className="order-buttons">
                      <S.ToolOrderButton
                        type="button"
                        aria-label="Mover ferramenta para cima"
                        disabled={!isEditing || pending || index === 0}
                        onClick={() => move(index, index - 1)}
                      >
                        <ArrowDropUpIcon />
                      </S.ToolOrderButton>

                      <S.ToolOrderButton
                        type="button"
                        aria-label="Mover ferramenta para baixo"
                        disabled={
                          !isEditing ||
                          pending ||
                          index === toolFields.length - 1
                        }
                        onClick={() => move(index, index + 1)}
                      >
                        <ArrowDropDownIcon />
                      </S.ToolOrderButton>
                    </div>
                  </>
                )}
              </div>
            </div>

            <input
              aria-label="toolOrder"
              type="hidden"
              {...register(`sequenceTools.${index}.toolOrder`)}
              value={index}
            />
          </S.Container4>
        ))}

        <S.ContainerButtons>
          <S.ContainerE>
            {!isNew && isDeleteButtonVisible && (
              <DeleteTrigger
                type="button"
                onClick={handleDelete}
                disabled={pending}
              >
                Excluir
              </DeleteTrigger>
            )}
          </S.ContainerE>

          <div className="div">
            <ButtonBorder
              type="button"
              onClick={handleDiscard}
              onMouseDown={(event) => event.preventDefault()}
              disabled={pending}
            >
              {!isEditing && <CaretLeftOutlined aria-hidden="true" />}
              {isEditing ? 'Cancelar' : 'Voltar'}
            </ButtonBorder>

            {!isEditing ? (
              <ButtonFill
                key="edit"
                type="button"
                onClick={handleEdit}
                disabled={pending}
              >
                <S.Edit />
                Editar
              </ButtonFill>
            ) : (
              <ButtonFill
                key="save"
                type="submit"
                disabled={pending || initializing}
              >
                <S.Save />
                Salvar
              </ButtonFill>
            )}
          </div>
        </S.ContainerButtons>
      </S.Form>

      <ModalAlert
        visible={deleting}
        onCancel={() => setDeleting(false)}
        onConfirm={confirmDelete}
        disabled={pending}
      />
    </>
  );
}

FormSequences.propTypes = {
  onChange: validateProp('function'),
  disabled: validateProp('boolean'),
  isNew: validateProp('boolean'),
  onCancel: validateProp('function'),
  selectedProductId: validateProp(['string', 'number']),
  itemId: validateProp(['string', 'number']),
  sequence: validateProp('object'),
};
