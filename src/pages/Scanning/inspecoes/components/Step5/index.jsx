import { ButtonDelete } from '../../../../../components/ButtonDelete';
import { ButtonFill } from '../../../../../components/ButtonFill';
import { validateProp } from '../../../../../utils/validateProp';
import { useInspectionForm } from '../../hooks/useInspectionForm';
import { useInspectionPdf } from '../../hooks/useInspectionPdf';
import { AdminModal } from '../AdminModal';
import { ReleaseItemsList, ShipmentItemsList } from '../ItemLists';
import { ReadOnlyInspection } from '../ReadOnly';
import { ModalRectification } from '../Rectification';
import * as S from './styles';
export function FormInspectionsStep5({ inspection }) {
  const {
    inspectionItems,
    approvalStatus,
    itemToEdit,
    pending,
    isSmallScreen,
    handleRadioChange,
    handleCheckboxChange,
    formatDisplayDate,
    handleDelete,
    handleBack,
    hideModalDelete,
    hideModalBack,
    hideModalRectification,
    showModalRectification,
    isModalDeleteVisible,
    isModalBackVisible,
    isModalRectificationVisible,
    isCheckingAdmin,
    modalConfirmDeletion,
    modalConfirmBack,
    modalRectification,
  } = useInspectionForm(inspection, 5);
  const handleExportPDF = useInspectionPdf(inspection, inspectionItems);
  return (
    <S.Form as="section">
      <ReadOnlyInspection
        inspection={inspection}
        inspectionItems={inspectionItems}
        isSmallScreen={isSmallScreen}
        formatDisplayDate={formatDisplayDate}
      />

      <h2>Liberação</h2>
      <S.Container6>
        <div className="container6">
          <div className="container6-radios">
            <label>
              Orçamento: <span>*</span>
            </label>
            <div className="radios">
              <label>
                <input
                  type="radio"
                  name="approvalStatus"
                  value="FAILED"
                  checked={approvalStatus === 'FAILED'}
                  onChange={() => handleRadioChange('FAILED')}
                  disabled
                />
                Reprovado
              </label>
              <label>
                <input
                  type="radio"
                  name="approvalStatus"
                  value="APPROVED"
                  checked={approvalStatus === 'APPROVED'}
                  onChange={() => handleRadioChange('APPROVED')}
                  disabled
                />
                Aprovado
              </label>
              <label>
                <input
                  type="radio"
                  name="approvalStatus"
                  value="PARTIAL"
                  checked={approvalStatus === 'PARTIAL'}
                  onChange={() => handleRadioChange('PARTIAL')}
                  disabled
                />
                Parcial
              </label>
            </div>
          </div>
          <div className="container-os">
            <label>O.S.:</label>
            <input
              aria-label="Pedido de orçamento"
              type="text"
              value={inspection?.budgetOrder ?? ''}
              readOnly
            />
          </div>
        </div>

        {approvalStatus !== 'FAILED' && (
          <ReleaseItemsList
            items={inspectionItems}
            onCheckboxChange={handleCheckboxChange}
          />
        )}
      </S.Container6>

      <S.Container7>
        <div className="observation">
          <label>Observação Geral:</label>
          <input
            aria-label="Observação da liberação"
            type="text"
            value={inspection?.releaseObservation ?? ''}
            readOnly
          />
        </div>
        <div className="release">
          <div className="input-release">
            <label>
              Liberado por: <span>*</span>
            </label>
            <input
              aria-label="Responsável pela liberação"
              type="text"
              value={inspection?.releaseResponsible ?? ''}
              readOnly
            />
          </div>
          <div className="input-data">
            <label>
              Data: <span>*</span>
            </label>
            <input
              aria-label="Data da liberação"
              type="text"
              defaultValue={formatDisplayDate(inspection?.releaseDate)}
              readOnly
            />
          </div>
        </div>
      </S.Container7>

      {approvalStatus !== 'FAILED' && (
        <>
          <h2>Expedição</h2>
          <S.Container8>
            <ShipmentItemsList
              items={inspectionItems.filter((item) => item.isReleased)}
              completed
              onRectify={showModalRectification}
            />
          </S.Container8>

          <S.Container9>
            <div className="observation">
              <label>Observação Geral:</label>
              <input
                aria-label="Observação da expedição"
                type="text"
                value={inspection?.shipmentObservation ?? ''}
                readOnly
              />
            </div>
            <div className="release">
              <div className="input-release">
                <label>
                  Expedido por: <span>*</span>
                </label>
                <input
                  aria-label="Expedido por"
                  type="text"
                  value={inspection?.shippedBy ?? ''}
                  readOnly
                />
              </div>
              <div className="input-data">
                <label>
                  Data: <span>*</span>
                </label>
                <input
                  aria-label="Data da expedição"
                  type="text"
                  defaultValue={formatDisplayDate(inspection?.shipmentDate)}
                  readOnly
                />
              </div>
            </div>
          </S.Container9>
        </>
      )}

      <S.ContainerButtons>
        <S.ContainerE>
          <ButtonDelete
            onDelete={handleDelete}
            disabled={pending}
            page="scanningInspectionStep4"
          >
            Excluir
          </ButtonDelete>
          <ButtonFill type="button" disabled={pending} onClick={handleBack}>
            <S.Back />
            Retroceder
          </ButtonFill>
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
        </div>
      </S.ContainerButtons>
      {isModalDeleteVisible && (
        <AdminModal
          visible={isModalDeleteVisible}
          onCancel={hideModalDelete}
          onConfirm={(username, password) =>
            modalConfirmDeletion(username, password)
          }
          isLoading={isCheckingAdmin}
        />
      )}
      {isModalBackVisible && (
        <AdminModal
          visible={isModalBackVisible}
          onCancel={hideModalBack}
          onConfirm={(username, password) =>
            modalConfirmBack(username, password)
          }
          isLoading={isCheckingAdmin}
        />
      )}
      {isModalRectificationVisible && (
        <ModalRectification
          pending={pending}
          visible={isModalRectificationVisible}
          onCancel={hideModalRectification}
          onConfirm={(newShippedAmount) =>
            modalRectification({
              ...itemToEdit,
              shippedAmount: newShippedAmount,
            })
          }
          item={itemToEdit}
        />
      )}
    </S.Form>
  );
}

FormInspectionsStep5.propTypes = { inspection: validateProp('object') };
