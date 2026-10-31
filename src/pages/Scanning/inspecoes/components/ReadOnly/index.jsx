import { InputSelect } from '../../../../../components/InputSelect';
import { validateProp } from '../../../../../utils/validateProp';
import * as S from '../formStyles';
import {
  selectOptionsModel,
  selectOptionsVisual,
  selectOptionsServiceType,
} from '../options';
export function ReadOnlyInspection({
  inspection,
  inspectionItems,
  isSmallScreen,
  formatDisplayDate,
}) {
  return (
    <>
      {' '}
      <h2>Dados do Romaneio</h2>
      <S.Container1>
        <div>
          <label>
            NF: <span>*</span>
          </label>
          <input
            aria-label="NF"
            type="text"
            value={inspection?.invoice ?? ''}
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
            value={inspection?.client ?? ''}
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
            value={inspection?.invoiceItem ?? ''}
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
            value={inspection?.itemCode ?? ''}
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
            value={inspection?.itemDescription ?? ''}
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
            value={inspection?.itemDrawingNumber ?? ''}
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
            value={inspection?.gaugeDescription ?? ''}
            readOnly
          />
        </div>
      </S.Container3>
      <S.Container4>
        <div className="divs4">
          <div className="selects2">
            <label>
              Modelo: <span>*</span>
            </label>
            <InputSelect
              onChange={() => {}}
              selectOptions={selectOptionsModel}
              value={inspection?.itemModel ?? ''}
              disabled
            />
          </div>
          <div className="container4">
            <label>
              Fabricante: <span>*</span>
            </label>
            <input
              aria-label="Fabricante"
              type="text"
              value={inspection?.manufacturer ?? ''}
              readOnly
            />
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
              value={inspection?.folder ?? ''}
              readOnly
            />
          </div>
          <div className="container4">
            <label>
              Série: <span>*</span>
            </label>
            <input
              aria-label="Série"
              type="text"
              value={inspection?.series ?? ''}
              readOnly
            />
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
              <input
                aria-label="Recebido"
                type="text"
                className="input"
                placeholder="0"
                value={item.received || ''}
                readOnly
              />
              <input
                aria-label="Liberado"
                type="text"
                className="input"
                placeholder="0"
                value={item.releasedAmount || ''}
                readOnly
              />
              <InputSelect
                onChange={() => {}}
                selectOptions={selectOptionsVisual}
                placeholder="Selecione"
                value={item.visual || ''}
                disabled
              />
              <InputSelect
                onChange={() => {}}
                selectOptions={selectOptionsServiceType}
                placeholder="Selecione"
                value={item.serviceType || ''}
                disabled
              />
            </S.RowBatchContent>
            <input
              aria-label="Observação"
              type="text"
              className="input observation"
              placeholder="Observação:"
              value={item.observation || ''}
              readOnly
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
                      aria-label="Recebido"
                      type="text"
                      className="input"
                      placeholder="0"
                      value={item.received || ''}
                      readOnly
                    />
                  </div>
                  <div className="divItem">
                    <label>Liberado:</label>
                    <input
                      aria-label="Liberado"
                      type="text"
                      className="input"
                      placeholder="0"
                      value={item.releasedAmount || ''}
                      readOnly
                    />
                  </div>
                  <div className="divItem">
                    <label>Visual:</label>
                    <InputSelect
                      onChange={() => {}}
                      selectOptions={selectOptionsVisual}
                      placeholder="Selecione"
                      value={item.visual || ''}
                      disabled
                    />
                  </div>
                  <div className="divItem">
                    <label>Serviço:</label>
                    <InputSelect
                      onChange={() => {}}
                      selectOptions={selectOptionsServiceType}
                      placeholder="Selecione"
                      value={item.serviceType || ''}
                      disabled
                    />
                  </div>
                </div>
              </S.RowBatchContentMW>
              <input
                aria-label="Observação"
                type="text"
                className="input observation"
                placeholder="Observação:"
                value={item.observation || ''}
                readOnly
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
            value={inspection?.Inspector ?? ''}
            readOnly
          />
        </div>
        <div className="input-data">
          <label>
            Data: <span>*</span>
          </label>
          <input
            aria-label="Data da inspeção"
            type="text"
            defaultValue={formatDisplayDate(inspection?.inspectionDate)}
            readOnly
          />
        </div>
      </S.Container5>
    </>
  );
}
ReadOnlyInspection.propTypes = {
  inspection: validateProp('object'),
  inspectionItems: validateProp('object'),
  isSmallScreen: validateProp('boolean'),
  formatDisplayDate: validateProp('function'),
};
