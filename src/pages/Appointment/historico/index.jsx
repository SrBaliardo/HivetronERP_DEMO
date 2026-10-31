import { ButtonBorder } from '../../../components/ButtonBorder';
import { ButtonFill } from '../../../components/ButtonFill';
import { InputSelect } from '../../../components/InputSelect';
import { TableFilterActions } from '../../../components/TableFilterActions';
import { TableList } from '../../../components/TableList';
import { displayStatus } from '../status';
import { tabTableColumns } from './components/List/tabTableColumns';
import { useAppointmentHistory } from './hooks/useAppointmentHistory';
import { useAppointmentPdf } from './hooks/useAppointmentPdf';
import * as S from './styles';
const selectOptionStatus = [
  { value: '', label: 'Todos' },
  { value: 'NOT_STARTED', label: 'Não Iniciado' },
  { value: 'STARTED', label: 'Iniciado' },
  { value: 'FINISHED', label: 'Finalizado' },
  { value: 'CANCELED', label: 'Cancelado' },
];
function describeFilters(criteria) {
  if (!criteria) return 'Todos';
  const names = {
    searchInputCode: 'Número da O.S.',
    searchInputOperation: 'Processo',
    searchInputMachine: 'Máquina',
    searchInputItem: 'Item/Conjunto',
  };
  const labels = Object.keys(names)
    .filter((key) => criteria[key])
    .map((key) => names[key]);
  if (criteria.selectedStatus)
    labels.push('Status: ' + displayStatus(criteria.selectedStatus, true));
  if (criteria.startDate || criteria.endDate) labels.push('Data');
  return labels.length ? labels.join(', ') : 'Todos';
}
export function AppointmentHistory() {
  const {
    criteria,
    setCriteria,
    applied,
    filteredData,
    pagination,
    setPagination,
    handleFilter,
    hasFilters,
    clearFilters,
    loading,
    error,
    refresh,
    dataToExport,
  } = useAppointmentHistory();
  const { pending, exportPdf } = useAppointmentPdf(
    dataToExport,
    describeFilters(applied),
  );
  const actionLinks = [];
  return (
    <S.Container>
      <S.ContainerContent>
        <div className="history-fields">
          <div className="div">
            <p>Número da O.S.:</p>
            <input
              aria-label="Número da O.S."
              className="input"
              placeholder="Número da O.S."
              value={criteria.searchInputCode}
              onChange={(e) =>
                setCriteria((prev) => ({
                  ...prev,
                  searchInputCode: e.target.value,
                }))
              }
            />
          </div>
          <div className="div">
            <p>Produto:</p>
            <input
              aria-label="Produto"
              className="input"
              placeholder="Código"
              value={criteria.searchInputItem}
              onChange={(e) =>
                setCriteria((prev) => ({
                  ...prev,
                  searchInputItem: e.target.value,
                }))
              }
            />
          </div>
          <div className="div">
            <p>Processo:</p>
            <input
              aria-label="Processo"
              className="input"
              placeholder="Processo"
              value={criteria.searchInputOperation}
              onChange={(e) =>
                setCriteria((prev) => ({
                  ...prev,
                  searchInputOperation: e.target.value,
                }))
              }
            />
          </div>
          <div className="div machine-filter">
            <p>Máquina:</p>
            <input
              aria-label="Máquina"
              className="input"
              placeholder="Máquina"
              value={criteria.searchInputMachine}
              onChange={(e) =>
                setCriteria((prev) => ({
                  ...prev,
                  searchInputMachine: e.target.value,
                }))
              }
            />
          </div>
        </div>
        <div className="date-status-row">
          <div className="div-date">
            <div className="div">
              <p>De:</p>
              <input
                aria-label="Data inicial"
                type="date"
                className="input input-date"
                placeholder="dd/mm/aaaa"
                value={criteria.startDate}
                onChange={(e) =>
                  setCriteria((prev) => ({
                    ...prev,
                    startDate: e.target.value,
                  }))
                }
              />
            </div>
            <div className="div">
              <p>Até:</p>
              <input
                aria-label="Data final"
                type="date"
                className="input input-date"
                placeholder="dd/mm/aaaa"
                value={criteria.endDate}
                onChange={(e) =>
                  setCriteria((prev) => ({ ...prev, endDate: e.target.value }))
                }
              />
            </div>
          </div>

          <div className="select-status">
            <p>Status:</p>
            <InputSelect
              ariaLabel="Status"
              selectOptions={selectOptionStatus}
              value={criteria.selectedStatus}
              onChange={(e) =>
                setCriteria((prev) => ({
                  ...prev,
                  selectedStatus: e.target.value,
                }))
              }
              placeholder="Todos"
            />
          </div>
        </div>
        <TableFilterActions
          type="button"
          onSearch={handleFilter}
          hasFilters={hasFilters}
          onClear={clearFilters}
        />
      </S.ContainerContent>
      {error && (
        <p role="alert">
          Não foi possível carregar o histórico.{' '}
          <ButtonBorder type="button" onClick={refresh}>
            Tentar novamente
          </ButtonBorder>
        </p>
      )}
      <TableList
        actionLinks={actionLinks}
        columns={tabTableColumns}
        currentTab="/appointment"
        data={filteredData}
        pagination={pagination}
        setPagination={setPagination}
        loading={loading}
      />
      <S.ContainerButtons>
        <ButtonFill
          disabled={loading || Boolean(error) || pending}
          onClick={exportPdf}
        >
          <S.Export />
          Exportar
        </ButtonFill>
      </S.ContainerButtons>
    </S.Container>
  );
}
