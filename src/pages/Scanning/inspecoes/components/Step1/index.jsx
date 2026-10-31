import { ButtonBorder } from '../../../../../components/ButtonBorder';
import { ButtonFill } from '../../../../../components/ButtonFill';
import { validateProp } from '../../../../../utils/validateProp';
import { useInspectionForm } from '../../hooks/useInspectionForm';
import { TreeInspection } from '../Tree';
import * as S from './styles';

export function FormInspectionsStep1({ inspection }) {
  const {
    register,
    handleSubmit,
    errors,
    parentSet,
    setSelectedItems,
    isEditing,
    registrationStarted,
    loading,
    loadError,
    retry,
    pending,
    currentStage,
    onSubmit,
    handleAdd,
    handleDiscard,
  } = useInspectionForm(inspection, 1);

  return (
    <S.Form onSubmit={handleSubmit(onSubmit)} noValidate>
      {loading && (
        <p role="status" className="loading-message">
          Carregando itens...
        </p>
      )}
      {loadError && (
        <p role="alert">
          Não foi possível carregar os itens.{' '}
          <ButtonBorder type="button" onClick={retry}>
            Tentar novamente
          </ButtonBorder>
        </p>
      )}
      <S.Container1>
        <div>
          <label>
            NF: <span>*</span>
          </label>
          <input
            aria-label="NF"
            type="text"
            placeholder="Número da NF"
            {...register('invoice')}
            readOnly
            className={errors.invoice ? 'input-error' : ''}
          />
          {errors.invoice && (
            <span className="error-message">NF é obrigatória</span>
          )}
        </div>
        <div>
          <label>
            Cliente: <span>*</span>
          </label>
          <input
            aria-label="Cliente"
            type="text"
            placeholder="Nome do cliente"
            {...register('client')}
            readOnly
            className={errors.client ? 'input-error' : ''}
          />
          {errors.client && (
            <span className="error-message">Cliente é obrigatório</span>
          )}
        </div>
        <div>
          <label>
            Item NF: <span>*</span>
          </label>
          <input
            aria-label="Item NF"
            type="text"
            placeholder="Item NF"
            {...register('invoiceItemCode')}
            readOnly
            className={errors.invoiceItemCode ? 'input-error' : ''}
          />
          {errors.invoiceItemCode && (
            <span className="error-message">Item NF é obrigatório</span>
          )}
        </div>
      </S.Container1>

      <div>
        {parentSet && currentStage === 'REGISTER' && (
          <TreeInspection
            parentSet={parentSet}
            disabled={pending || registrationStarted}
            isEditing={isEditing}
            onSave={undefined}
            onCancel={undefined}
            setSelectedItems={setSelectedItems}
          />
        )}
      </div>

      <S.ContainerButtons>
        <div className="div-b">
          <ButtonBorder
            type="button"
            disabled={pending}
            onClick={handleDiscard}
          >
            Cancelar
          </ButtonBorder>
          {!parentSet ? (
            <ButtonFill type="button" disabled={pending} onClick={handleAdd}>
              <S.Add />
              Adicionar
            </ButtonFill>
          ) : (
            <ButtonFill
              type="submit"
              disabled={pending || loading || loadError}
            >
              <S.Check />
              Cadastrar
            </ButtonFill>
          )}
        </div>
      </S.ContainerButtons>
    </S.Form>
  );
}

FormInspectionsStep1.propTypes = { inspection: validateProp('object') };
