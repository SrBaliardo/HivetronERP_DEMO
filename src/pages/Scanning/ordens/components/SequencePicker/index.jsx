import { FolderOpenOutlined, FolderOutlined } from '@ant-design/icons';
import { useCallback, useEffect, useState } from 'react';

import { ButtonBorder } from '../../../../../components/ButtonBorder';
import { ButtonFill } from '../../../../../components/ButtonFill';
import { TooltipCustom2 } from '../../../../../components/TooltipCustom2';
import { useManufacturingSequences } from '../../../../../contexts/manufacturingSequences/index.js';
import { useAsyncList } from '../../../../../hooks/useAsyncList';
import { validateProp } from '../../../../../utils/validateProp';
import * as S from './styles';
export function SequencePicker({
  value,
  name,
  disabled,
  itemId,
  sequenceNumber,
  onConfirm,
}) {
  const [visible, setVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [expandedOption, setExpandedOption] = useState(null);
  const { listAlternatives } = useManufacturingSequences();
  const load = useCallback(
    () => listAlternatives(itemId, sequenceNumber),
    [itemId, sequenceNumber, listAlternatives],
  );
  const {
    items: sequenceData,
    loading,
    error,
    refresh,
  } = useAsyncList(load, visible);
  useEffect(() => {
    setSelectedOption(value);
    setExpandedOption(null);
  }, [value, visible]);
  const showModal = () => {
    if (!disabled) setVisible(true);
  };
  const handleConfirm = () => {
    onConfirm(selectedOption);
    setVisible(false);
  };
  const handleCancel = () => setVisible(false);
  return (
    <>
      <TooltipCustom2
        icon={
          <S.ButtonModal
            type="button"
            aria-label="Mudar sequência"
            disabled={disabled}
            onClick={showModal}
          >
            {visible ? <FolderOpenOutlined /> : <FolderOutlined />}
          </S.ButtonModal>
        }
        content={'Mudar'}
      />

      <S.ModalContainer
        title="Sequências Cadastradas"
        open={visible}
        onCancel={handleCancel}
        footer={[
          <ButtonBorder key="cancel" onClick={handleCancel}>
            Cancelar
          </ButtonBorder>,
          <ButtonFill
            key="confirm"
            onClick={handleConfirm}
            disabled={
              !sequenceData.some(
                (sequence) => sequence.id === selectedOption,
              ) ||
              loading ||
              error
            }
          >
            Confirmar
          </ButtonFill>,
        ]}
        centered
      >
        <p>Escolha uma sequência e confirme para alterar.</p>
        <div className="options-list">
          {loading && (
            <p role="status" className="loading-message">
              Carregando sequências...
            </p>
          )}
          {error && (
            <p role="alert">
              Não foi possível carregar as sequências.{' '}
              <ButtonBorder onClick={refresh}>Tentar novamente</ButtonBorder>
            </p>
          )}
          {!loading && !error && sequenceData.length === 0 && (
            <p>Nenhuma opção disponível</p>
          )}
          {sequenceData.map((seq, idx) => (
            <div key={`${seq.id}-${idx}`} className="container-details">
              <div className="item-header">
                <label className="item">
                  <input
                    type="radio"
                    name={name}
                    value={seq.id}
                    checked={selectedOption === seq.id}
                    onChange={() => setSelectedOption(seq.id)}
                  />
                  {`${seq.sequence} - ${seq.isMain ? 'Principal' : 'Alternativa'}`}
                </label>
                {expandedOption === seq.id ? (
                  <S.DetailButton
                    type="button"
                    aria-label="Recolher detalhes"
                    onClick={() => setExpandedOption(null)}
                  >
                    <S.OpenedFolder />
                  </S.DetailButton>
                ) : (
                  <S.DetailButton
                    type="button"
                    aria-label="Expandir detalhes"
                    onClick={() => setExpandedOption(seq.id)}
                  >
                    <S.ClosedFolder />
                  </S.DetailButton>
                )}
              </div>
              {expandedOption === seq.id && (
                <div className="details">
                  {(seq.sequenceTools || []).map((tool, toolIdx) => (
                    <div key={`${seq.id}-${tool.id}-${toolIdx}`}>
                      <p>
                        <S.ToolIcon /> <strong>{tool.toolCode}</strong> -{' '}
                        {tool.toolDescription}
                      </p>
                      <p>
                        <S.ToolDataIcon /> <strong>Insumo: </strong>{' '}
                        {tool.inputCode} | <strong>VC: </strong>{' '}
                        {tool.cuttingSpeed} | <strong>AV: </strong>{' '}
                        {tool.toolFeed} | <strong>AP: </strong> {tool.ap}
                      </p>
                      <hr />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </S.ModalContainer>
    </>
  );
}

SequencePicker.propTypes = {
  value: validateProp(['string', 'number']),
  name: validateProp('string'),
  disabled: validateProp('boolean'),
  itemId: validateProp(['string', 'number']),
  sequenceNumber: validateProp(['string', 'number']),
  onConfirm: validateProp('function'),
};
