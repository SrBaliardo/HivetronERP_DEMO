import { ButtonBorder } from '../../../../../components/ButtonBorder';
import { ServerTableList } from '../../../../../components/ServerTableList';
import { TableFilterActions } from '../../../../../components/TableFilterActions';
import { TooltipCustom } from '../../../../../components/TooltipCustom';
import { validateProp } from '../../../../../utils/validateProp';
import { useScanningList } from '../../hooks/useScanningList';
import * as Filters from '../filterStyles';
import * as S from './styles';
import {
  actionColumnTitle,
  actionColumnWidth,
  tabTableColumns,
} from './tabTableColumns';
export function ScanningList1({ active = true }) {
  const {
    criteria,
    setCriteria,
    filteredData,
    pagination,
    handleTableChange,
    sorter,
    handleFilter,
    hasFilters,
    clearFilters,
    open,
    pending,
    loading,
    error,
    refresh,
  } = useScanningList('invoices', active);
  const { searchInput, startDate, endDate } = criteria;
  const actionLinks = [
    {
      label: 'Exibir Detalhes',
      onClick: open,
      icon: (record) => (
        <TooltipCustom
          icon={() => (
            <S.WalletIcon data-present={Boolean(record.hasInspection)} />
          )}
          content="Exibir Detalhes"
        />
      ),
    },
  ];
  return (
    <S.Container>
      <Filters.ContainerContent>
        <div className="responsive-div">
          <div className="div">
            <p>Informe para busca:</p>
            <input
              aria-label="NF/Item/Cliente/Descrição"
              className="input"
              placeholder="NF/Item/Cliente/Descrição"
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
              <p>De:</p>
              <input
                aria-label="dd/mm/aaaa"
                type="date"
                className="input input-date"
                placeholder="dd/mm/aaaa"
                value={startDate}
                onChange={(e) =>
                  setCriteria((value) => ({
                    ...value,
                    startDate: e.target.value,
                  }))
                }
              />
            </div>
            <div className="div">
              <p>Até:</p>
              <input
                aria-label="dd/mm/aaaa"
                type="date"
                className="input input-date"
                placeholder="dd/mm/aaaa"
                value={endDate}
                onChange={(e) =>
                  setCriteria((value) => ({
                    ...value,
                    endDate: e.target.value,
                  }))
                }
              />
            </div>
          </div>
        </div>
        <TableFilterActions
          onSearch={handleFilter}
          disabled={loading || pending}
          hasFilters={hasFilters}
          onClear={clearFilters}
        />
      </Filters.ContainerContent>
      {error && (
        <p role="alert">
          Não foi possível carregar a lista.{' '}
          <ButtonBorder onClick={refresh}>Tentar novamente</ButtonBorder>
        </p>
      )}
      <ServerTableList
        loading={loading || pending}
        actionLinks={actionLinks}
        columns={tabTableColumns}
        actionColumnWidth={actionColumnWidth}
        actionColumnTitle={actionColumnTitle}
        data={filteredData}
        pagination={pagination}
        onChange={handleTableChange}
        sorter={sorter}
        error={error}
      />
    </S.Container>
  );
}

ScanningList1.propTypes = { active: validateProp('boolean') };
