import {
  CaretLeftOutlined,
  FolderViewOutlined,
  SyncOutlined,
} from '@ant-design/icons';

import { ButtonBorder } from '../../../../../components/ButtonBorder';
import { InputSelect } from '../../../../../components/InputSelect';
import { ModalAlert } from '../../../../../components/ModalAlert';
import { TableFilterActions } from '../../../../../components/TableFilterActions';
import { TableList } from '../../../../../components/TableList';
import { TooltipCustom } from '../../../../../components/TooltipCustom';
import { useOrdersList } from '../../hooks/useOrdersList';
import { ButtonAdd } from '../AddCutOrderButton';
import * as S from './styles';
import {
  actionColumnTitle,
  actionColumnWidth,
  tabTableColumns,
} from './tabTableColumns';
const selectOptionStatus = [
  { value: '', label: 'Todos' },
  { value: 'NOT_STARTED', label: 'Não Iniciado' },
  { value: 'STARTED', label: 'Iniciado' },
  { value: 'FINISHED', label: 'Finalizado' },
  { value: 'CANCELED', label: 'Cancelado' },
];
export function OrdersList() {
  const {
    criteria,
    setCriteria,
    filteredData,
    pagination,
    setPagination,
    selectedOrder,
    pending,
    editOrder,
    handleSync,
    syncSequences,
    addOC,
    hideModalSync,
    goBack,
    handleFilter,
    hasFilters,
    clearFilters,
  } = useOrdersList();
  const { searchInput, dateExit, status } = criteria;
  const actionLinks = [
    {
      label: 'Exibir Detalhes',
      onClick: editOrder,
      icon: () => (
        <TooltipCustom icon={FolderViewOutlined} content="Exibir Detalhes" />
      ),
    },
    {
      label: 'Sincronizar',
      onClick: handleSync,
      icon: () => <TooltipCustom icon={SyncOutlined} content="Sincronizar" />,
    },
  ];
  return (
    <S.Container>
      <S.ContainerContent>
        <div className="div">
          <p>Informe para busca:</p>
          <input
            aria-label="OS/Cliente/Código"
            className="input"
            placeholder="OS/Cliente/Código"
            value={searchInput}
            onChange={(e) =>
              setCriteria((value) => ({
                ...value,
                searchInput: e.target.value,
              }))
            }
          />
        </div>
        <div className="div-date">
          <div className="div">
            <p>Data:</p>
            <input
              aria-label="dd/mm/aaaa"
              type="date"
              className="input input-date"
              placeholder="dd/mm/aaaa"
              value={dateExit}
              onChange={(e) =>
                setCriteria((value) => ({ ...value, dateExit: e.target.value }))
              }
            />
          </div>
        </div>
        <div className="status-n-buttons">
          <div className="select-status">
            <p>Status:</p>
            <InputSelect
              selectOptions={selectOptionStatus}
              value={status}
              onChange={(e) =>
                setCriteria((value) => ({ ...value, status: e.target.value }))
              }
              placeholder="Todos"
            />
          </div>
          <S.ContainerButtonsHeader>
            <div className="button-goback">
              <ButtonBorder onClick={goBack}>
                <CaretLeftOutlined aria-hidden="true" /> Voltar
              </ButtonBorder>
            </div>
          </S.ContainerButtonsHeader>
        </div>
        <TableFilterActions
          onSearch={handleFilter}
          hasFilters={hasFilters}
          onClear={clearFilters}
        />
      </S.ContainerContent>
      <TableList
        loading={pending}
        actionLinks={actionLinks}
        columns={tabTableColumns}
        actionColumnWidth={actionColumnWidth}
        actionColumnTitle={actionColumnTitle}
        data={filteredData}
        pagination={pagination}
        setPagination={setPagination}
      />
      <S.ContainerButtons>
        <div className="div-b">
          <p>* Clique para adicionar Ordens de Corte.</p>
          <ButtonAdd onClick={addOC} disabled={pending} page="scanningOrders">
            Adicionar
          </ButtonAdd>
        </div>
      </S.ContainerButtons>
      {Boolean(selectedOrder) && (
        <ModalAlert
          pending={pending}
          title="Deseja sincronizar as sequências?"
          message="Para sincronizar não podem haver sequências iniciadas. Se o cadastro de algum item da O.S foi alterado, sincronize para atualizar as informações."
          visible={Boolean(selectedOrder)}
          onCancel={hideModalSync}
          onConfirm={syncSequences}
        />
      )}
    </S.Container>
  );
}
