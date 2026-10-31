import { CaretLeftOutlined } from '@ant-design/icons';

import { ActiveSwitcher } from '../../../../../components/ActiveSwitcher';
import { ButtonBorder } from '../../../../../components/ButtonBorder';
import { DeleteTrigger } from '../../../../../components/ButtonDelete';
import { ButtonFill } from '../../../../../components/ButtonFill';
import { ModalAlert } from '../../../../../components/ModalAlert';
import { validateProp } from '../../../../../utils/validateProp';
import { TreeSets } from '../../../../components/estrutura';
import { useSetForm } from '../../hooks/useSetForm';
import * as S from './styles';

export function FormSets(props) {
  const { isNew = false, set, setCode } = props;
  const {
    register,
    handleSubmit,
    setValue,
    errors,
    isEditing,
    isDeleteButtonVisible,
    description,
    currentIsActiveValue,
    handleDiscard,
    handleEdit,
    handleDelete,
    confirmDelete,
    onSubmit,
    deleting,
    setDeleting,
    pending,
  } = useSetForm({ ...props, isNew });
  return (
    <>
      <S.Form noValidate onSubmit={handleSubmit(onSubmit)} aria-busy={pending}>
        <h1>
          Código: <span>{isNew ? setCode : set?.code || setCode}</span>
        </h1>

        <S.Container1>
          <div>
            <label>
              Descrição: <span>*</span>
            </label>
            <input
              aria-label="Descrição"
              type="text"
              placeholder="Descrição"
              value={description}
              disabled={!isEditing || pending}
              readOnly
            />
            {errors.description && <span>Descrição é obrigatória</span>}
          </div>
          <div>
            <label>
              Desenho: <span>*</span>
            </label>
            <input
              aria-label="Número do Desenho"
              type="text"
              placeholder="Número do Desenho"
              {...register('drawingNumber')}
              disabled={!isEditing || pending}
              className={errors.drawingNumber ? 'input-error' : ''}
            />
            {errors.drawingNumber && (
              <span className="error-message">
                Número do Desenho é obrigatório
              </span>
            )}
          </div>
        </S.Container1>

        {set && <TreeSets parentSet={set} isEditing={isEditing && !pending} />}

        {!isNew && (
          <div className="div-active">
            <label>Cadastro ativo?</label>
            <ActiveSwitcher
              checked={
                currentIsActiveValue === undefined
                  ? true
                  : Boolean(currentIsActiveValue)
              }
              onChange={(checked) => setValue('isActive', checked)}
              disabled={!isEditing || pending}
            />
          </div>
        )}

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
              <ButtonFill key="save" type="submit" disabled={pending}>
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

FormSets.propTypes = {
  onChange: validateProp('function'),
  disabled: validateProp('boolean'),
  isNew: validateProp('boolean'),
  setCode: validateProp('string'),
  setDescription: validateProp('string'),
  onCancel: validateProp('function'),
  onSave: validateProp('function'),
  parentSet: validateProp('object'),
  handleSave: validateProp('function'),
  handleCancel: validateProp('function'),
  set: validateProp('object'),
};
