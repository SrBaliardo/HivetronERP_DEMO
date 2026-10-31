import { ButtonBorder } from '../../../../../components/ButtonBorder';
import { ButtonDelete } from '../../../../../components/ButtonDelete';
import { ButtonFill } from '../../../../../components/ButtonFill';
import { InputSelect } from '../../../../../components/InputSelect';
import { validateProp } from '../../../../../utils/validateProp';
import { useInspectionForm } from '../../hooks/useInspectionForm';
import { useInspectionPdf } from '../../hooks/useInspectionPdf';
import { AdminModal } from '../AdminModal';
import {
  selectOptionsModel,
  selectOptionsVisual,
  selectOptionsServiceType,
} from '../options';
import * as S from './styles';

export function FormInspectionsStep2({ inspection }) {
  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    errors,
    inspectionItems,
    errorsByItem,
    loading,
    loadError,
    retry,
    pending,
    currentSelectModelValue,
    isManufacturerDisabled,
    isSmallScreen,
    onSubmit,
    handleInputChange,
    formatDisplayDate,
    handleDelete,
    hideModalDelete,
    isModalDeleteVisible,
    isCheckingAdmin,
    modalConfirmPassword,
  } = useInspectionForm(inspection, 2);
  const handleExportPDF = useInspectionPdf(inspection, inspectionItems);
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
      <h2>Dados do Romaneio</h2>

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
          />
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
          />
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
          />
        </div>
      </S.Container1>

      <S.Container2>
        <div>
          <label>
            Código Conjunto/Item: <span>*</span>
          </label>
          <input
            aria-label="Código do item"
            type="text"
            placeholder="Código do Conjunto/Item"
            {...register('itemCode')}
            readOnly
          />
        </div>
        <div>
          <label>
            Descrição: <span>*</span>
          </label>
          <input
            aria-label="Descrição do item"
            type="text"
            placeholder="Descrição"
            {...register('itemDescription')}
            readOnly
          />
        </div>
        <div>
          <label>
            Desenho: <span>*</span>
          </label>
          <input
            aria-label="Número do desenho"
            type="text"
            placeholder="Número do desenho"
            {...register('itemDrawingNumber')}
            readOnly
          />
        </div>
      </S.Container2>

      <S.Container3>
        <div>
          <label>
            Bitola: <span>*</span>
          </label>
          <input
            aria-label="Descrição da bitola"
            type="text"
            placeholder="Bitola"
            {...register('gaugeDescription')}
            className={errors.gaugeDescription ? 'input-error' : ''}
          />
          {errors.gaugeDescription && (
            <span className="error-message">Bitola é obrigatória</span>
          )}
        </div>
      </S.Container3>

      <S.Container4>
        <div className="divs4">
          <div className="selects2">
            <label>
              Modelo: <span>*</span>
            </label>
            <InputSelect
              selectOptions={selectOptionsModel}
              onChange={(e) => {
                setValue('model', e.target.value);
                setValue(
                  'manufacturer',
                  e.target.value === 'STAR' ? 'STAR' : '',
                );
              }}
              value={currentSelectModelValue}
              placeholder="Selecione"
              name="model"
              className={errors.model ? 'input-error' : ''}
            />
            {errors.model && (
              <span className="error-message">Modelo é obrigatório</span>
            )}
          </div>
          <div className="container4">
            <label>
              Fabricante: <span>*</span>
            </label>
            <input
              aria-label="Fabricante"
              type="text"
              placeholder="Fabricante"
              readOnly={isManufacturerDisabled}
              {...register('manufacturer')}
              className={errors.manufacturer ? 'input-error' : ''}
            />
            {errors.manufacturer && (
              <span className="error-message">Fabricante é obrigatório</span>
            )}
          </div>
        </div>
        <div className="divs4">
          <div className="container4">
            <label>
              Pasta: <span>*</span>
            </label>
            <input
              aria-label="Pasta"
              type="text"
              placeholder="Pasta"
              {...register('folder')}
              className={errors.folder ? 'input-error' : ''}
            />
            {errors.folder && (
              <span className="error-message">Pasta é obrigatória</span>
            )}
          </div>
          <div className="container4">
            <label>
              Série: <span>*</span>
            </label>
            <input
              aria-label="Série"
              type="text"
              placeholder="Série"
              {...register('series')}
              className={errors.series ? 'input-error' : ''}
            />
            {errors.series && (
              <span className="error-message">Série é obrigatória</span>
            )}
          </div>
        </div>
      </S.Container4>

      <h2>Inspeção</h2>
      <S.ContainerBatch>
        <S.RowBatchHeader>
          <p>Posição</p>
          <p>Desenho</p>
          <p>Código do Item</p>
          <p>Descrição</p>
          <p>Recebido</p>
          <p>Liberado</p>
          <p>Visual</p>
          <p>Serviço</p>
        </S.RowBatchHeader>

        {inspectionItems.map((item, index) => (
          <div className="batchItem" key={item.id || index}>
            <S.RowBatchContent>
              <p>{item.position || 'Posição não informada'}</p>
              <p>{item.itemDrawingNumber || 'N. do Desenho'}</p>
              <p>{item.itemCode || 'Código do Item'}</p>
              <p>{item.itemDescription || 'Descrição do Componente'}</p>
              <div>
                <input
                  aria-label="0"
                  type="number"
                  className={`input ${errors.received ? 'input-error' : ''}`}
                  placeholder="0"
                  value={item.received || ''}
                  onChange={(e) =>
                    handleInputChange(index, 'received', e.target.value)
                  }
                  onBlur={() => trigger(`inspectionItems[${index}].received`)}
                />
                {errors.received && (
                  <span className="error-message">
                    <S.ErrorMessage>
                      {'Recebido não pode ser zero'}
                    </S.ErrorMessage>
                  </span>
                )}
                {errorsByItem[index]?.received && (
                  <S.ErrorMessage>
                    {errorsByItem[index].received}
                  </S.ErrorMessage>
                )}
              </div>
              <div>
                <input
                  aria-label="0"
                  type="number"
                  className={`input ${errors.releasedAmount ? 'input-error' : ''}`}
                  placeholder="0"
                  value={item.releasedAmount || ''}
                  onChange={(e) =>
                    handleInputChange(index, 'releasedAmount', e.target.value)
                  }
                  onBlur={() =>
                    trigger(`inspectionItems[${index}].releasedAmount`)
                  }
                />
                {errors.releasedAmount && (
                  <span className="error-message">Liberado é obrigatório</span>
                )}
                {errorsByItem[index]?.releasedAmount && (
                  <S.ErrorMessage>
                    {errorsByItem[index].releasedAmount}
                  </S.ErrorMessage>
                )}
              </div>
              <InputSelect
                selectOptions={selectOptionsVisual}
                onChange={(e) =>
                  handleInputChange(index, 'visual', e.target.value)
                }
                value={item.visual || ''}
                placeholder="Selecione"
              />
              <InputSelect
                selectOptions={selectOptionsServiceType}
                onChange={(e) =>
                  handleInputChange(index, 'serviceType', e.target.value)
                }
                value={item.serviceType || ''}
                placeholder="Selecione"
              />
            </S.RowBatchContent>
            <input
              aria-label="Observação:"
              type="text"
              className="input observation"
              placeholder="Observação:"
              value={item.observation || ''}
              onChange={(e) =>
                handleInputChange(index, 'observation', e.target.value)
              }
            />
            <hr className="hr" />
          </div>
        ))}
      </S.ContainerBatch>

      {isSmallScreen && (
        <S.ContainerBatchMW>
          {inspectionItems.map((item, index) => (
            <div className="batchItem" key={item.id || index}>
              <S.RowBatchContentMW>
                <div className="div-batch1">
                  <div className="divItem">
                    <label>Posição:</label>
                    <p>{item.position || 'Posição não informada'}</p>
                  </div>
                  <div className="divItem">
                    <label>Desenho:</label>
                    <p>{item.itemDrawingNumber || 'N. do Desenho'}</p>
                  </div>
                  <div className="divItem">
                    <label>Código do Item:</label>
                    <p>{item.itemCode || 'Código do Item'}</p>
                  </div>
                  <div className="divItem">
                    <label>Descrição:</label>
                    <p>{item.itemDescription || 'Descrição do Componente'}</p>
                  </div>
                </div>

                <div className="div-batch2">
                  <div className="divItem">
                    <label>Recebido:</label>
                    <input
                      aria-label="0"
                      type="number"
                      className={`input ${errors.received ? 'input-error' : ''}`}
                      placeholder="0"
                      value={item.received || ''}
                      onChange={(e) =>
                        handleInputChange(index, 'received', e.target.value)
                      }
                      onBlur={() =>
                        trigger(`inspectionItems[${index}].received`)
                      }
                    />
                    {errors.received && (
                      <span className="error-message">
                        <S.ErrorMessage>
                          {'Recebido não pode ser zero'}
                        </S.ErrorMessage>
                      </span>
                    )}
                    {errorsByItem[index]?.received && (
                      <S.ErrorMessage>
                        {errorsByItem[index].received}
                      </S.ErrorMessage>
                    )}
                  </div>
                  <div className="divItem">
                    <label>Liberado:</label>
                    <input
                      aria-label="0"
                      type="number"
                      className={`input ${errors.releasedAmount ? 'input-error' : ''}`}
                      placeholder="0"
                      value={item.releasedAmount || ''}
                      onChange={(e) =>
                        handleInputChange(
                          index,
                          'releasedAmount',
                          e.target.value,
                        )
                      }
                      onBlur={() =>
                        trigger(`inspectionItems[${index}].releasedAmount`)
                      }
                    />
                    {errors.releasedAmount && (
                      <span className="error-message">
                        Liberado é obrigatório
                      </span>
                    )}
                    {errorsByItem[index]?.releasedAmount && (
                      <S.ErrorMessage>
                        {errorsByItem[index].releasedAmount}
                      </S.ErrorMessage>
                    )}
                  </div>
                  <div className="divItem">
                    <label>Visual:</label>
                    <InputSelect
                      selectOptions={selectOptionsVisual}
                      onChange={(e) =>
                        handleInputChange(index, 'visual', e.target.value)
                      }
                      value={item.visual || ''}
                      placeholder="Selecione"
                    />
                  </div>
                  <div className="divItem">
                    <label>Serviço:</label>
                    <InputSelect
                      selectOptions={selectOptionsServiceType}
                      onChange={(e) =>
                        handleInputChange(index, 'serviceType', e.target.value)
                      }
                      value={item.serviceType || ''}
                      placeholder="Selecione"
                    />
                  </div>
                </div>
              </S.RowBatchContentMW>
              <input
                aria-label="Observação:"
                type="text"
                className="input observation"
                placeholder="Observação:"
                value={item.observation || ''}
                onChange={(e) =>
                  handleInputChange(index, 'observation', e.target.value)
                }
              />
              <hr className="hr" />
            </div>
          ))}
        </S.ContainerBatchMW>
      )}

      <S.Container5>
        <div className="input-release">
          <label>
            Inspecionado por: <span>*</span>
          </label>
          <input
            aria-label="Inspetor"
            type="text"
            placeholder="Digite o nome do Inspetor"
            {...register('inspector')}
            className={errors.inspector ? 'input-error' : ''}
          />
          {errors.inspector && (
            <span className="error-message">Campo obrigatório</span>
          )}
        </div>
        <div className="input-data">
          <label>
            Data: <span>*</span>
          </label>
          <input
            aria-label="Data da inspeção"
            type="text"
            placeholder="dd/mm/aaaa"
            defaultValue={formatDisplayDate(inspection?.inspectionDate)}
            {...register('inspectionDate')}
            readOnly
          />
        </div>
      </S.Container5>

      <S.ContainerButtons>
        <S.ContainerE>
          <ButtonDelete
            onDelete={handleDelete}
            disabled={pending}
            page="scanningInspectionStep2"
          >
            Excluir
          </ButtonDelete>
        </S.ContainerE>
        <div className="div-b">
          <ButtonFill
            type="button"
            disabled={pending}
            onClick={handleExportPDF}
          >
            <S.Export />
            Exportar
          </ButtonFill>
          <ButtonFill type="submit" disabled={pending || loading || loadError}>
            <S.Check />
            Verificar
          </ButtonFill>
        </div>
      </S.ContainerButtons>
      {isModalDeleteVisible && (
        <AdminModal
          visible={isModalDeleteVisible}
          onCancel={hideModalDelete}
          onConfirm={(username, password) =>
            modalConfirmPassword(username, password)
          }
          isLoading={isCheckingAdmin}
        />
      )}
    </S.Form>
  );
}

FormInspectionsStep2.propTypes = { inspection: validateProp('object') };
