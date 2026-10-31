import { CaretLeftOutlined } from '@ant-design/icons';
import { Fragment } from 'react';

import { ButtonBorder } from '../../../../../components/ButtonBorder';
import { ButtonFill } from '../../../../../components/ButtonFill';
import { InputSelect } from '../../../../../components/InputSelect';
import { validateProp } from '../../../../../utils/validateProp';
import { useCutOrderForm } from '../../hooks/useCutOrderForm';
import { useCutOrderPdf } from '../../hooks/useCutOrderPdf';
import { TooltipTotalWeight } from '../TooltipTotalWeight';
import * as S from './styles';

const selectOptionStatus = [
  { value: 'NOT_STARTED', label: 'Não Iniciado' },
  { value: 'STARTED', label: 'Iniciado' },
  { value: 'FINISHED', label: 'Finalizado' },
  { value: 'CANCELED', label: 'Cancelado' },
];

const weight = (value) =>
  typeof value === 'number' && Number.isFinite(value)
    ? value.toFixed(2) + ' kg'
    : '';

const profile = (value) =>
  ({
    ROUND: 'REDONDO',
    RECTANGULAR: 'RETANGULAR',
    SHEET: 'CHAPA',
    ROUNDTUBE: 'TUBULAR REDONDO',
  })[value] || value;

export function CutOrderForm({ order }) {
  const {
    cutItems,
    orderStatus,
    isEditing,
    isSmallScreen,
    pending,
    handleSubmit,
    handleStatusChange,
    handleInputChange,
    handleRadioChange,
    handleObservationChange,
    handleEdit,
    handleDiscard,
    onSubmit,
    formatDisplayDate,
  } = useCutOrderForm(order);
  const handleExportPDF = useCutOrderPdf(order, cutItems);

  return (
    <S.Form onSubmit={handleSubmit(onSubmit)} noValidate>
      <h1>O.C.: {order?.cutOrderCode}</h1>

      <div className="container-status">
        <div className="status-oc">
          <label>Status:</label>
          <InputSelect
            selectOptions={selectOptionStatus}
            onChange={(e) => handleStatusChange(e.target.value)}
            value={orderStatus}
            placeholder="Selecione"
            disabled={!isEditing || pending}
          />
        </div>
      </div>

      <S.Container1>
        <div className="div">
          <label>Código do Cliente:</label>
          <input
            aria-label="Código do Cliente"
            className="input-s"
            type="text"
            value={order?.clientCode || ''}
            readOnly
          />
        </div>

        <div className="container-1-1">
          <div className="div">
            <label>Cliente:</label>
            <input
              aria-label="Nome do Cliente"
              type="text"
              placeholder="Nome do Cliente"
              value={order?.client || ''}
              readOnly
            />
          </div>

          <div className="div">
            <label>Observação:</label>
            <input
              aria-label="Observação"
              type="text"
              placeholder="Observação"
              value={order?.observation || ''}
              readOnly
            />
          </div>
        </div>

        <div className="container-1-2">
          <div className="div">
            <label>Produto:</label>
            <input
              aria-label="Código"
              type="text"
              placeholder="Código"
              value={order?.itemCode || ''}
              readOnly
            />
          </div>

          <div className="div">
            <label>Desenho:</label>
            <input
              aria-label="Desenho"
              type="text"
              placeholder="Desenho"
              value={order?.itemDrawingNumber || ''}
              readOnly
            />
          </div>
        </div>

        <div className="container-1-3">
          <div className="div">
            <label>Descrição:</label>
            <input
              aria-label="Descrição"
              type="text"
              placeholder="Descrição"
              value={order?.itemDescription || ''}
              readOnly
            />
          </div>

          <div className="total-weight">
            <label>
              {' '}
              <TooltipTotalWeight /> Peso Total de Material:
            </label>
            <input
              aria-label="Peso Total"
              type="text"
              placeholder="Peso Total"
              value={weight(order?.totalMaterialsWeight)}
              readOnly
            />
          </div>
        </div>
      </S.Container1>

      <h2>Corte de Material</h2>
      {!isSmallScreen && (
        <S.ContainerBlock>
          {cutItems.map((block, blockIndex) => (
            <div key={block.id || blockIndex}>
              <hr />

              <div className="div">
                <div className="div-block">
                  <div className="div input-l">
                    <label>Certificado:</label>
                    <input
                      aria-label="Certificado"
                      type="text"
                      placeholder="Certificado"
                      disabled={!isEditing || pending}
                      value={block?.certificate || ''}
                      onChange={(e) =>
                        handleInputChange(
                          blockIndex,
                          'certificate',
                          e.target.value,
                        )
                      }
                    />
                  </div>

                  <div className="div input-s">
                    <label>Prazo Entrada MP:</label>
                    <input
                      aria-label="Prazo Entrada MP"
                      type="date"
                      className="input input-date input-s"
                      placeholder="dd/mm/aaaa"
                      disabled={!isEditing || pending}
                      value={formatDisplayDate(block?.inputDeadline) || ''}
                      onChange={(e) =>
                        handleInputChange(
                          blockIndex,
                          'inputDeadline',
                          e.target.value,
                        )
                      }
                    />
                  </div>

                  <div className="div input-s">
                    <label>Peso Total:</label>
                    <input
                      aria-label="Peso Total"
                      type="text"
                      placeholder="Peso Total"
                      value={weight(block?.blockWeight)}
                      readOnly
                    />
                  </div>
                </div>

                <div className="div-block material-fields">
                  <div className="div">
                    <label>Código MP:</label>
                    <input
                      aria-label="Código MP"
                      type="text"
                      placeholder="Código MP"
                      value={block?.rawMaterialCode || ''}
                      readOnly
                    />
                  </div>

                  <div className="div">
                    <label>Norma:</label>
                    <input
                      aria-label="Norma"
                      type="text"
                      placeholder="Norma"
                      value={block?.standard || ''}
                      readOnly
                    />
                  </div>

                  <div className="div input-s">
                    <label>Perfil:</label>
                    <input
                      aria-label="Perfil"
                      type="text"
                      placeholder="Perfil"
                      value={profile(block?.rawMaterialProfile) || ''}
                      readOnly
                    />
                  </div>

                  <div className="div input-s">
                    <label>Dimensão A:</label>
                    <input
                      aria-label="Dimensão A"
                      type="text"
                      placeholder="Dimensão A"
                      value={`${block?.dimensionA} mm` || ''}
                      readOnly
                    />
                  </div>

                  <div className="div input-s">
                    <label>Dimensão B:</label>
                    <input
                      aria-label="Dimensão B"
                      type="text"
                      placeholder="Dimensão B"
                      value={`${block?.dimensionB} mm` || ''}
                      readOnly
                    />
                  </div>
                </div>
              </div>

              <S.CutItemsHeader>
                <div className="row-row-1">
                  <p>Código do Item</p>
                  <p>Descrição</p>
                </div>
                <div className="row-row-2">
                  <p className="length">Comprimento (mm)</p>
                  <p>Quantidade</p>
                  <p>Comprado</p>
                  <p>Estoque</p>
                  <p>Peso (kg)</p>
                </div>
              </S.CutItemsHeader>

              {block?.cutItems?.map((item, itemIndex) => (
                <Fragment key={item.id || itemIndex}>
                  <S.RowCutItemsContent
                    key={item.id || itemIndex}
                    className={itemIndex % 2 === 0 ? 'even-row' : 'odd-row'}
                  >
                    <div className="row-row-1">
                      <div>
                        <label>{item?.code || ''}</label>
                      </div>

                      <div>
                        <label>{item?.description || ''}</label>
                      </div>
                    </div>

                    <div className="row-row-2">
                      <div className="length">
                        <label>{item?.rawMaterialLength || ''}</label>
                      </div>

                      <div>
                        <label>{item?.amount || ''}</label>
                      </div>

                      <div className="radio-purchased">
                        <input
                          aria-label={`Comprado ${item?.code || itemIndex}`}
                          type="radio"
                          name={`isStock-${blockIndex}-${itemIndex}`}
                          checked={!item.isStock}
                          onChange={() =>
                            handleRadioChange(blockIndex, itemIndex, false)
                          }
                          disabled={!isEditing || pending}
                        />
                      </div>

                      <div className="radio-stock">
                        <input
                          aria-label={`Estoque ${item?.code || itemIndex}`}
                          type="radio"
                          name={`isStock-${blockIndex}-${itemIndex}`}
                          checked={item.isStock}
                          onChange={() =>
                            handleRadioChange(blockIndex, itemIndex, true)
                          }
                          disabled={!isEditing || pending}
                        />
                      </div>

                      <div>
                        <label>{item?.totalWeight || ''}</label>
                      </div>
                    </div>
                  </S.RowCutItemsContent>

                  <div className="div-obs">
                    <label>Observação:</label>
                    <input
                      aria-label="Observação"
                      type="text"
                      placeholder="Observação"
                      disabled={!isEditing || pending}
                      value={item?.observation || ''}
                      onChange={(e) =>
                        handleObservationChange(
                          blockIndex,
                          itemIndex,
                          e.target.value,
                        )
                      }
                    />
                  </div>
                </Fragment>
              ))}
            </div>
          ))}
        </S.ContainerBlock>
      )}

      {isSmallScreen && (
        <S.ContainerBlockMW>
          {cutItems.map((block, blockIndex) => (
            <div key={block.id || blockIndex}>
              <hr />

              <div className="div">
                <div className="div-block">
                  <div className="div">
                    <label>Certificado:</label>
                    <input
                      aria-label="Certificado"
                      type="text"
                      placeholder="Certificado"
                      disabled={!isEditing || pending}
                      value={block?.certificate || ''}
                      onChange={(e) =>
                        handleInputChange(
                          blockIndex,
                          'certificate',
                          e.target.value,
                        )
                      }
                    />
                  </div>

                  <div className="div input-s">
                    <label>Prazo Entrada MP:</label>
                    <input
                      aria-label="Prazo Entrada MP"
                      type="date"
                      className="input input-date input-s"
                      placeholder="dd/mm/aaaa"
                      disabled={!isEditing || pending}
                      value={formatDisplayDate(block?.inputDeadline) || ''}
                      onChange={(e) =>
                        handleInputChange(
                          blockIndex,
                          'inputDeadline',
                          e.target.value,
                        )
                      }
                    />
                  </div>

                  <div className="div input-s">
                    <label>Peso Total:</label>
                    <input
                      aria-label="Peso Total"
                      type="text"
                      placeholder="Peso Total"
                      value={weight(block?.blockWeight)}
                      readOnly
                    />
                  </div>
                </div>

                <div className="div-block">
                  <div className="div">
                    <label>Código MP:</label>
                    <input
                      aria-label="Código MP"
                      type="text"
                      placeholder="Código MP"
                      value={block?.rawMaterialCode || ''}
                      readOnly
                    />
                  </div>

                  <div className="div">
                    <label>Norma:</label>
                    <input
                      aria-label="Norma"
                      type="text"
                      placeholder="Norma"
                      value={block?.standard || ''}
                      readOnly
                    />
                  </div>
                </div>

                <div className="div-block">
                  <div className="div">
                    <label>Perfil:</label>
                    <input
                      aria-label="Perfil"
                      type="text"
                      placeholder="Perfil"
                      value={profile(block?.rawMaterialProfile) || ''}
                      readOnly
                    />
                  </div>

                  <div className="div input-s">
                    <label>Dimensão A:</label>
                    <input
                      aria-label="Dimensão A"
                      type="text"
                      placeholder="Dimensão A"
                      value={`${block?.dimensionA} mm` || ''}
                      readOnly
                    />
                  </div>

                  <div className="div input-s">
                    <label>Dimensão B:</label>
                    <input
                      aria-label="Dimensão B"
                      type="text"
                      placeholder="Dimensão B"
                      value={`${block?.dimensionB} mm` || ''}
                      readOnly
                    />
                  </div>
                </div>
              </div>

              {block?.cutItems?.map((item, itemIndex) => (
                <Fragment key={item.id || itemIndex}>
                  <S.RowCutItemsContentMW
                    key={item.id || itemIndex}
                    className={itemIndex % 2 === 0 ? 'even-row' : 'odd-row'}
                  >
                    <div className="row-row-1">
                      <div>
                        <p>Código do Item:</p>
                        <label>{item?.code || ''}</label>
                      </div>

                      <div>
                        <p>Descrição:</p>
                        <label>{item?.description || ''}</label>
                      </div>
                    </div>

                    <div className="row-row-2">
                      <div className="length">
                        <p>Comprimento (mm):</p>
                        <label>{item?.rawMaterialLength || ''}</label>
                      </div>

                      <div>
                        <p>Quantidade:</p>
                        <label>{item?.amount || ''}</label>
                      </div>

                      <div className="radio-purchased">
                        <p>Comprado:</p>
                        <input
                          aria-label={`Comprado ${item?.code || itemIndex}`}
                          type="radio"
                          name={`isStock-${blockIndex}-${itemIndex}`}
                          checked={!item.isStock}
                          onChange={() =>
                            handleRadioChange(blockIndex, itemIndex, false)
                          }
                          disabled={!isEditing || pending}
                        />
                      </div>

                      <div className="radio-stock">
                        <p>Estoque:</p>
                        <input
                          aria-label={`Estoque ${item?.code || itemIndex}`}
                          type="radio"
                          name={`isStock-${blockIndex}-${itemIndex}`}
                          checked={item.isStock}
                          onChange={() =>
                            handleRadioChange(blockIndex, itemIndex, true)
                          }
                          disabled={!isEditing || pending}
                        />
                      </div>

                      <div>
                        <p>Peso (kg):</p>
                        <label>{item?.totalWeight || ''}</label>
                      </div>
                    </div>
                  </S.RowCutItemsContentMW>

                  <div className="div div-obs">
                    <label>Observação:</label>
                    <input
                      aria-label="Observação"
                      type="text"
                      placeholder="Observação"
                      disabled={!isEditing || pending}
                      value={item?.observation ?? ''}
                      onChange={(e) =>
                        handleObservationChange(
                          blockIndex,
                          itemIndex,
                          e.target.value,
                        )
                      }
                    />
                  </div>
                </Fragment>
              ))}
            </div>
          ))}
        </S.ContainerBlockMW>
      )}

      <S.ContainerButtons>
        <S.ContainerE>
          <ButtonFill
            type="button"
            disabled={pending}
            onClick={handleExportPDF}
          >
            <S.Export />
            Exportar
          </ButtonFill>
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

CutOrderForm.propTypes = { order: validateProp('object') };
