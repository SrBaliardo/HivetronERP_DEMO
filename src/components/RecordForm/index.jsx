import { CaretLeftOutlined } from '@ant-design/icons';

import { validateProp } from '../../utils/validateProp';
import { ActiveSwitcher } from '../ActiveSwitcher';
import { ButtonBorder } from '../ButtonBorder';
import { DeleteTrigger } from '../ButtonDelete';
import { ButtonFill } from '../ButtonFill';
import { InputCheckboxForm } from '../InputCheckboxForm';
import { ModalAlert } from '../ModalAlert';
import * as S from './styles';
export function RecordForm({
  form,
  isNew,
  navigationLabel,
  auxiliary,
  inlineDescription = false,
}) {
  const {
    register,
    handleSubmit,
    onSubmit,
    formState: { errors },
    watch,
    setValue,
    isEditing,
    pending,
  } = form;
  const description = (
    <div className="div">
      <label htmlFor="record-description">
        Descrição: <span>*</span>
      </label>
      <input
        id="record-description"
        type="text"
        placeholder="Descrição"
        {...register('description')}
        className={errors.description ? 'input-error' : ''}
        disabled={!isEditing || pending}
      />
      {errors.description && (
        <span className="error-message">Descrição é obrigatória</span>
      )}
    </div>
  );
  return (
    <>
      <S.Form noValidate onSubmit={handleSubmit(onSubmit)} aria-busy={pending}>
        <S.Container1>
          <div className="div div-c1">
            <label htmlFor="record-code">
              Código: <span>*</span>
            </label>
            <input
              id="record-code"
              type="text"
              placeholder="Código"
              {...register('code')}
              className={errors.code ? 'input-error' : ''}
              disabled={!isEditing || pending}
            />
            {errors.code && (
              <span className="error-message">Código é obrigatório</span>
            )}
          </div>
          {auxiliary}
          {inlineDescription && description}
        </S.Container1>
        {!inlineDescription && description}
        <div className="div-checkbox">
          <label>Navegar para {navigationLabel} após salvar:</label>
          <InputCheckboxForm
            ariaLabel="Navegar após salvar"
            checked={form.navigateCheck}
            onChange={(event) => form.setNavigateCheck(event.target.checked)}
            disabled={!isEditing || pending}
          />
        </div>
        {!isNew && (
          <div className="div-active">
            <label>Cadastro ativo?</label>
            <ActiveSwitcher
              initialValue={watch('isActive')}
              onChange={(checked) => setValue('isActive', checked)}
              disabled={!isEditing || pending}
            />
          </div>
        )}
        <S.ContainerButtons>
          <S.ContainerE>
            {!isNew && !isEditing && (
              <DeleteTrigger
                type="button"
                onClick={form.handleDelete}
                disabled={pending}
              >
                Excluir
              </DeleteTrigger>
            )}
          </S.ContainerE>
          <div className="div-b">
            <ButtonBorder
              type="button"
              onClick={form.handleDiscard}
              disabled={pending}
            >
              {!isEditing && <CaretLeftOutlined aria-hidden="true" />}
              {isEditing ? 'Cancelar' : 'Voltar'}
            </ButtonBorder>
            {isEditing ? (
              <ButtonFill key="save" type="submit" disabled={pending}>
                <S.Save /> Salvar
              </ButtonFill>
            ) : (
              <ButtonFill
                key="edit"
                type="button"
                onClick={form.handleEdit}
                disabled={pending}
              >
                <S.Edit /> Editar
              </ButtonFill>
            )}
          </div>
        </S.ContainerButtons>
      </S.Form>
      <ModalAlert
        visible={form.deleting}
        onCancel={() => form.setDeleting(false)}
        onConfirm={form.confirmDelete}
        disabled={pending}
      />
    </>
  );
}
RecordForm.propTypes = {
  form: validateProp('object', true),
  isNew: validateProp('boolean'),
  navigationLabel: validateProp('string', true),
  auxiliary: validateProp('object'),
  inlineDescription: validateProp('boolean'),
};
