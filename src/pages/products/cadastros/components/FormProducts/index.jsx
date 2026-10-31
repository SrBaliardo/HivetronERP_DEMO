import { CaretLeftOutlined } from '@ant-design/icons';

import { ActiveSwitcher } from '../../../../../components/ActiveSwitcher';
import { ButtonBorder } from '../../../../../components/ButtonBorder';
import { DeleteTrigger } from '../../../../../components/ButtonDelete';
import { ButtonFill } from '../../../../../components/ButtonFill';
import { CodePicker } from '../../../../../components/CodePicker';
import { InputCheckboxForm } from '../../../../../components/InputCheckboxForm';
import { ModalAlert } from '../../../../../components/ModalAlert';
import { validateProp } from '../../../../../utils/validateProp';
import { useProductForm } from '../../hooks/useProductForm';
import { RawMaterialPicker } from '../RawMaterialPicker';
import { TooltipProfile } from '../TooltipProfile';
import * as S from './styles';

export function FormProducts(props) {
  const { isNew = false, product, productCode } = props;
  const {
    register,
    handleSubmit,
    setValue,
    errors,
    isEditing,
    isDeleteButtonVisible,
    navigateCheck,
    setNavigateCheck,
    calculatedWeight,
    rawMaterialCode,
    description,
    currentSelectValue,
    currentIsActiveValue,
    selectOptions,
    handleSelect,
    rawMaterialCodeChange,
    changeToDot,
    handleDiscard,
    handleEdit,
    handleDelete,
    confirmDelete,
    onSubmit,
    deleting,
    setDeleting,
    pending,
    profileError,
    rawMaterialSpecificWeightError,
    rawMaterialDimensionAError,
    rawMaterialDimensionBError,
    rawMaterialDimensionLengthError,
    finalDimensionAError,
    finalDimensionBError,
    finalLengthError,
    finalWeightError,
  } = useProductForm({ ...props, isNew });
  return (
    <>
      <S.Form noValidate onSubmit={handleSubmit(onSubmit)} aria-busy={pending}>
        <h1>
          Código: <span>{isNew ? productCode : product?.code}</span>
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

        <h2>Matéria Prima</h2>
        <S.Container2>
          <div className="container2-1">
            <div className="div-container">
              <div className="div">
                <label>
                  <TooltipProfile /> Tipo do Perfil: <span>*</span>
                </label>
                <S.Select>
                  <CodePicker
                    label="Tipo do Perfil"
                    options={selectOptions}
                    onChange={(option) => handleSelect(option?.value || '')}
                    value={currentSelectValue}
                    placeholder="Selecione o Perfil"
                    className={errors.rawMaterialProfile ? 'input-error' : ''}
                    disabled={!isEditing || pending}
                  />
                  {errors.rawMaterialProfile && (
                    <span className="error-message">Perfil é obrigatório</span>
                  )}
                  {profileError && (
                    <S.ErrorMessage>{profileError}</S.ErrorMessage>
                  )}
                </S.Select>
              </div>
              <div className="div">
                <label>
                  Código MP: <span>*</span>
                </label>
                <S.Select>
                  <RawMaterialPicker
                    onChange={rawMaterialCodeChange}
                    value={rawMaterialCode}
                    className={errors.rawMaterialCode ? 'input-error' : ''}
                    disabled={!isEditing || pending}
                  />
                  {errors.rawMaterialProfile && (
                    <span className="error-message">
                      Código MP é obrigatório
                    </span>
                  )}
                </S.Select>
              </div>
            </div>

            <div className="div-container">
              <div className="div">
                <label>
                  Norma: <span>*</span>
                </label>
                <input
                  aria-label="Norma"
                  type="text"
                  placeholder="Norma"
                  {...register('rawMaterialStandard')}
                  disabled={!isEditing || pending}
                  className={errors.rawMaterialStandard ? 'input-error' : ''}
                />
                {errors.rawMaterialStandard && (
                  <span className="error-message">Norma é obrigatória</span>
                )}
              </div>
              <div className="div">
                <label>
                  Peso Específico: <span>*</span>
                </label>
                <input
                  aria-label="Peso Específico"
                  type="text"
                  placeholder="g / cm³"
                  {...register('rawMaterialSpecificWeight')}
                  onChange={changeToDot}
                  disabled={!isEditing || pending}
                  className={
                    errors.rawMaterialSpecificWeight ? 'input-error' : ''
                  }
                />
                {errors.rawMaterialSpecificWeight && (
                  <span className="error-message">
                    Peso Específico é obrigatório
                  </span>
                )}
                {rawMaterialSpecificWeightError && (
                  <S.ErrorMessage>
                    {rawMaterialSpecificWeightError}
                  </S.ErrorMessage>
                )}
              </div>
            </div>
          </div>

          <div className="container2-2">
            <div className="div-container">
              <div className="div">
                <label>
                  Dimensão &quot;A&quot; MP: <span>*</span>
                </label>
                <input
                  aria-label="Dimensão A MP"
                  type="text"
                  placeholder="mm"
                  {...register('rawMaterialDimensionA')}
                  onChange={changeToDot}
                  disabled={!isEditing || pending}
                  className={errors.rawMaterialDimensionA ? 'input-error' : ''}
                />
                {errors.rawMaterialDimensionA && (
                  <span className="error-message">
                    Dimensão &quot;A&quot; MP é obrigatória
                  </span>
                )}
                {rawMaterialDimensionAError && (
                  <S.ErrorMessage>{rawMaterialDimensionAError}</S.ErrorMessage>
                )}
              </div>
              <div className="div">
                <label>
                  Dimensão &quot;B&quot; MP: <span>*</span>
                </label>
                <input
                  aria-label="Dimensão B MP"
                  type="text"
                  placeholder="mm"
                  {...register('rawMaterialDimensionB')}
                  onChange={changeToDot}
                  disabled={!isEditing || pending}
                  className={errors.rawMaterialDimensionB ? 'input-error' : ''}
                />
                {errors.rawMaterialDimensionB && (
                  <span className="error-message">
                    Dimensão &quot;B&quot; MP é obrigatória
                  </span>
                )}
                {rawMaterialDimensionBError && (
                  <span>{rawMaterialDimensionBError}</span>
                )}
              </div>
            </div>
            <div className="div-container">
              <div className="div">
                <label>
                  Comprimento do blank: <span>*</span>
                </label>
                <input
                  aria-label="Comprimento do blank"
                  type="text"
                  placeholder="mm"
                  {...register('rawMaterialDimensionLength')}
                  onChange={changeToDot}
                  disabled={!isEditing || pending}
                  className={
                    errors.rawMaterialDimensionLength ? 'input-error' : ''
                  }
                />
                {errors.rawMaterialDimensionLength && (
                  <span className="error-message">
                    Comprimento do blank é obrigatório
                  </span>
                )}
                {rawMaterialDimensionLengthError && (
                  <S.ErrorMessage>
                    {rawMaterialDimensionLengthError}
                  </S.ErrorMessage>
                )}
              </div>
              <div className="div">
                <label>Peso MP:</label>
                <input
                  aria-label="kg"
                  type="text"
                  placeholder="kg"
                  value={calculatedWeight}
                  readOnly
                  disabled={!isEditing || pending}
                />
              </div>
            </div>
          </div>
        </S.Container2>

        <h2>Produto Acabado</h2>
        <S.Container3>
          <div className="div-container">
            <div className="div">
              <label>
                Dimensão &quot;A&quot; Acabado: <span>*</span>
              </label>
              <input
                aria-label="Dimensão A Acabado"
                type="text"
                placeholder="mm"
                onChange={changeToDot}
                {...register('finalDimensionA')}
                className={errors.finalDimensionA ? 'input-error' : ''}
                disabled={!isEditing || pending}
              />
              {errors.finalDimensionA && (
                <span className="error-message">
                  Dimensão &quot;A&quot; Acabado é obrigatória
                </span>
              )}
              {finalDimensionAError && <span>{finalDimensionAError}</span>}
            </div>
            <div className="div">
              <label>
                Dimensão &quot;B&quot; Acabado: <span>*</span>
              </label>
              <input
                aria-label="Dimensão B Acabado"
                type="text"
                placeholder="mm"
                onChange={changeToDot}
                {...register('finalDimensionB')}
                className={errors.finalDimensionB ? 'input-error' : ''}
                disabled={!isEditing || pending}
              />
              {errors.finalDimensionB && (
                <span className="error-message">
                  Dimensão &quot;B&quot; Acabado é obrigatória
                </span>
              )}
              {finalDimensionBError && <span>{finalDimensionBError}</span>}
            </div>
          </div>
          <div className="div-container">
            <div className="div">
              <label>
                Comprimento Acabado: <span>*</span>
              </label>
              <input
                aria-label="Comprimento Acabado"
                type="text"
                placeholder="mm"
                onChange={changeToDot}
                {...register('finalLength')}
                className={errors.finalLength ? 'input-error' : ''}
                disabled={!isEditing || pending}
              />
              {errors.finalLength && (
                <span className="error-message">
                  Comprimento Acabado é obrigatório
                </span>
              )}
              {finalLengthError && <span>{finalLengthError}</span>}
            </div>
            <div className="div">
              <label>
                Peso Acabado: <span>*</span>
              </label>
              <input
                aria-label="Peso Acabado"
                type="text"
                placeholder="kg"
                {...register('finalWeight')}
                onChange={changeToDot}
                disabled={!isEditing || pending}
                className={errors.finalWeight ? 'input-error' : ''}
              />
              {errors.finalWeight && (
                <span className="error-message">
                  Peso Acabado é obrigatório
                </span>
              )}
              {finalWeightError && <span>{finalWeightError}</span>}
            </div>
          </div>
        </S.Container3>

        <S.Container4>
          <div className="navigation-option">
            <label>Navegar para o produto após salvar:</label>
            <InputCheckboxForm
              ariaLabel="Navegar para o produto após salvar"
              checked={navigateCheck}
              disabled={!isEditing || pending}
              onChange={(e) => setNavigateCheck(e.target.checked)}
            />
          </div>

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
        </S.Container4>

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
          <div className="div-b">
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

FormProducts.propTypes = {
  onChange: validateProp('function'),
  disabled: validateProp('boolean'),
  isNew: validateProp('boolean'),
  productCode: validateProp('string'),
  productDescription: validateProp('string'),
  onCancel: validateProp('function'),
  product: validateProp('object'),
};
