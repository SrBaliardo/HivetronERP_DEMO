import {
  FolderViewOutlined,
  SubnodeOutlined,
  CaretLeftOutlined,
} from '@ant-design/icons';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { ButtonBorder } from '../../../../../components/ButtonBorder';
import { ButtonFill } from '../../../../../components/ButtonFill';
import { TableList } from '../../../../../components/TableList';
import { TooltipCustom } from '../../../../../components/TooltipCustom';
import { useManufacturingSequences } from '../../../../../contexts/manufacturingSequences/index.js';
import { validateProp } from '../../../../../utils/validateProp';
import { useSequenceList } from '../../hooks/useSequenceList';
import * as S from './styles';
import {
  actionColumnTitle,
  actionColumnWidth,
  tabTableColumns,
} from './tabTableColumns';
export function BomTab11({
  onChange,
  onSelect,
  selectedProductId,
  selectedSetId,
  active = true,
}) {
  const { prepareExport, permissions } = useManufacturingSequences();
  const location = useLocation();
  const navigate = useNavigate();
  const currentId = selectedProductId || selectedSetId;
  const {
    items: filteredData,
    loading,
    error,
    refresh,
  } = useSequenceList(
    currentId,
    selectedProductId ? 'produto' : 'conjunto',
    active,
  );
  const pagination = { current: 1, pageSize: 8, total: 0 };
  const [paginationState, setPagination] = useState(pagination);
  const goBack = () =>
    navigate('/bom', {
      state: { tabKey: location.state?.fromTab === 'BomTab2' ? '2' : '1' },
    });
  const exportSequences = () =>
    navigate('/scripting', {
      state: prepareExport(
        currentId,
        location.state?.productCode || location.state?.setCode,
      ),
    });
  const addNew = () => {
    if (permissions.create) onChange('12');
    else
      toast.warning('🙅🏻‍♂️ Você não tem permissão para executar essa operação!');
  };
  const actionLinks = [
    {
      label: 'Exibir Detalhes',
      onClick: (sequence) => {
        onSelect(sequence);
        onChange('13');
      },
      icon: () => (
        <TooltipCustom icon={FolderViewOutlined} content="Exibir Detalhes" />
      ),
    },
  ];
  return (
    <S.Container>
      {error && (
        <div role="alert">
          Erro ao buscar sequências.{' '}
          <ButtonBorder type="button" onClick={refresh}>
            Tentar novamente
          </ButtonBorder>
        </div>
      )}
      <S.ContainerContent>
        <h1>
          Roteiro{' '}
          <span>
            {location.state?.productCode || location.state?.setCode || 'XXXXX'}
          </span>
        </h1>

        <div className="buttons">
          <div className="buttons-expadd">
            <ButtonFill type="button" onClick={exportSequences}>
              <S.Export />
              Exportar Roteiros
            </ButtonFill>

            <ButtonFill type="button" onClick={addNew}>
              <SubnodeOutlined />
              Adicionar Sequência
            </ButtonFill>
          </div>
          <div className="button-goback">
            <ButtonBorder type="button" onClick={goBack}>
              <CaretLeftOutlined aria-hidden="true" /> Voltar
            </ButtonBorder>
          </div>
        </div>
      </S.ContainerContent>

      <TableList
        loading={loading}
        actionLinks={actionLinks}
        columns={tabTableColumns}
        actionColumnWidth={actionColumnWidth}
        actionColumnTitle={actionColumnTitle}
        data={filteredData}
        pagination={paginationState}
        setPagination={setPagination}
      />
    </S.Container>
  );
}
BomTab11.propTypes = {
  onChange: validateProp('function'),
  onSelect: validateProp('function'),
  selectedProductId: validateProp(['string', 'number']),
  selectedSetId: validateProp(['string', 'number']),
  active: validateProp('boolean'),
};
