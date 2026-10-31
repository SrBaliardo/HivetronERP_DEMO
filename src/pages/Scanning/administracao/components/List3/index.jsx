import EditNoteIcon from '@mui/icons-material/EditNote';

import { ButtonBorder } from '../../../../../components/ButtonBorder';
import { ButtonFill } from '../../../../../components/ButtonFill';
import { InputCheckboxForm } from '../../../../../components/InputCheckboxForm';
import { ServerTableList } from '../../../../../components/ServerTableList';
import { TableFilterActions } from '../../../../../components/TableFilterActions';
import { TooltipCustom } from '../../../../../components/TooltipCustom';
import { validateProp } from '../../../../../utils/validateProp';
import { useScanningList } from '../../hooks/useScanningList';
import { useServiceOrderBatch } from '../../hooks/useServiceOrderBatch';
import * as Filters from '../filterStyles';
import * as S from './styles';
import {
  actionColumnTitle,
  actionColumnWidth,
  tabTableColumns,
} from './tabTableColumns';
export function ScanningList3({ active = true }) {
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
    markGenerated,
  } = useScanningList('serviceOrders', active);
  const batch = useServiceOrderBatch(
    filteredData,
    active,
    loading || pending,
    markGenerated,
  );
  const orderActionLabel = (record) =>
    record.hasOrder ? 'Exibir Ordens Relacionadas' : 'Gerar OS';
  const { searchInput, dateExit } = criteria;
  const actionLinks = [
    {
      label: orderActionLabel,
      disabled: batch.pending,
      onClick: open,
      icon: (record) => (
        <TooltipCustom
          icon={() => <S.WalletIcon data-present={Boolean(record.hasOrder)} />}
          content={orderActionLabel(record)}
        />
      ),
    },
    {
      render: (record) => {
        if (!batch.canSelect(record)) return <S.CheckboxAction />;
        return (
          <S.CheckboxAction>
            <TooltipCustom content="Selecione para Gerar OS">
              <InputCheckboxForm
                ariaLabel={'Selecione para Gerar OS ' + record.id}
                checked={batch.selected.some((item) => item.id === record.id)}
                onChange={(event) => batch.toggle(record, event.target.checked)}
              />
            </TooltipCustom>
          </S.CheckboxAction>
        );
      },
    },
  ];
  return (
    <S.Container>
      <Filters.ContainerContent>
        <div className="responsive-div">
          <div className="div">
            <p>Informe para busca:</p>
            <input
              aria-label="OS/Cliente/Código/Descrição"
              className="input"
              placeholder="OS/Cliente/Código/Descrição"
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
                  setCriteria((value) => ({
                    ...value,
                    dateExit: e.target.value,
                  }))
                }
              />
            </div>
          </div>
        </div>
        <TableFilterActions
          onSearch={handleFilter}
          disabled={batch.pending}
          hasFilters={hasFilters}
          onClear={clearFilters}
        >
          {batch.selected.length > 0 && (
            <ButtonFill
              type="button"
              onClick={batch.generate}
              disabled={batch.pending}
            >
              <EditNoteIcon /> Gerar O.S. em Lote
            </ButtonFill>
          )}
        </TableFilterActions>
      </Filters.ContainerContent>
      {error && (
        <p role="alert">
          Não foi possível carregar a lista.{' '}
          <ButtonBorder onClick={refresh}>Tentar novamente</ButtonBorder>
        </p>
      )}
      <ServerTableList
        loading={batch.pending}
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

ScanningList3.propTypes = { active: validateProp('boolean') };
