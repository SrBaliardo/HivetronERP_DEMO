import { useCallback } from 'react';

import { ButtonBorder } from '../../../../../components/ButtonBorder';
import { useScanning } from '../../../../../contexts/scanning/index.js';
import { useAsyncList } from '../../../../../hooks/useAsyncList';
import { validateProp } from '../../../../../utils/validateProp';
import * as S from './styles';
export function SequenceInfo({ visible, data, onCancel }) {
  const { getOrderSequenceById } = useScanning();
  const load = useCallback(
    async () => [await getOrderSequenceById(data.id)],
    [getOrderSequenceById, data?.id],
  );
  const { items, loading, error, refresh } = useAsyncList(
    load,
    visible && Boolean(data?.id),
  );
  const detail = items[0];
  if (!visible) return null;
  return (
    <S.ModalContainer
      title={`Detalhes da Sequência ${data.sequence}`}
      open={visible}
      onCancel={onCancel}
      footer={[]}
      centered
    >
      <div className="container-details">
        {error && (
          <p role="alert">
            Não foi possível carregar o detalhe.{' '}
            <ButtonBorder onClick={refresh}>Tentar novamente</ButtonBorder>
          </p>
        )}
        <h2 className="loading-message">{loading ? 'Carregando...' : ''}</h2>
        {loading ? (
          <p className="loading-message">Carregando informações...</p>
        ) : detail && !error ? (
          <div className="modal-body">
            <p>
              <strong>Sequência: </strong>
              {detail.sequence}&nbsp;
              {detail.isMain ? 'Principal' : 'Alternativa'} |{' '}
              {detail.operationDescription}
            </p>
            <p>
              <strong>Tipo Operação: </strong>
              {detail.operationType}
            </p>
            <p>
              <strong>Máquina: </strong>
              {detail.machineDescription} | <strong>Grupo: </strong>
              {detail.machineGroup}
            </p>

            {detail.tools && detail.tools.length > 0 && (
              <div className="tools-list">
                {detail.tools.map((tool, idx) => (
                  <div key={idx} className="tool-detail">
                    <p>
                      <S.ToolIcon />
                      <strong>Código: </strong>
                      {tool.toolCode} | <strong>Descrição: </strong>
                      {tool.toolDescription}
                    </p>
                    <p>
                      <S.ToolDataIcon />
                      <strong>Insumo: </strong>
                      {tool.inputCode} | <strong>AP: </strong>
                      {tool.ap} | <strong>AV: </strong>
                      {tool.toolFeed} | <strong>VC: </strong>
                      {tool.cuttingSpeed}
                    </p>
                    <hr />
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : null}
      </div>
    </S.ModalContainer>
  );
}

SequenceInfo.propTypes = {
  visible: validateProp('boolean'),
  data: validateProp('object'),
  onCancel: validateProp('function'),
};
