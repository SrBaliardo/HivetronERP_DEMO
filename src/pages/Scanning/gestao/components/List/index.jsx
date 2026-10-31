import { FolderViewOutlined } from '@ant-design/icons';

import { ButtonBorder } from '../../../../../components/ButtonBorder';
import { ButtonFill } from '../../../../../components/ButtonFill';
import { InputSelect } from '../../../../../components/InputSelect';
import { TableFilterActions } from '../../../../../components/TableFilterActions';
import { TableList } from '../../../../../components/TableList';
import { TooltipCustom } from '../../../../../components/TooltipCustom';
import { validateProp } from '../../../../../utils/validateProp';
import { usePcpList } from '../../hooks/usePcpList';
import { usePcpPdf } from '../../hooks/usePcpPdf';
import * as S from './styles';
import {
  actionColumnTitle,
  actionColumnWidth,
  tabTableColumns,
} from './tabTableColumns';

const statuses = [
  { value: '', label: 'Todos' },
  { value: 'NOT_STARTED', label: 'Não Iniciado' },
  { value: 'STARTED', label: 'Iniciado' },
  { value: 'FINISHED', label: 'Finalizado' },
  { value: 'CANCELED', label: 'Cancelado' },
];

const reportFields = [
  ['code', 'Número da O.S.'],
  ['client', 'Cliente'],
  ['operation', 'Processo'],
  ['type', 'Tipo'],
  ['machine', 'Máquina'],
  ['group', 'Grupo de Máquina'],
  ['item', 'Produto'],
];

export function PcpList({ kind, active }) {
  const state = usePcpList(kind, active);
  const pdf = usePcpPdf(kind, state.data, state.records, state.filters);
  const report = kind === 'report';
  const actions = report
    ? []
    : [
        {
          label: 'Exibir Detalhes',
          onClick: state.open,
          icon: () => (
            <TooltipCustom
              icon={FolderViewOutlined}
              content="Exibir Detalhes"
            />
          ),
        },
      ];

  const dateFields = (
    <div className="div-date">
      <div className="div">
        <label htmlFor={'pcp-start-' + kind}>De:</label>
        <input
          id={'pcp-start-' + kind}
          type="date"
          className="input input-date"
          {...state.register('startDate')}
        />
      </div>

      <div className="div">
        <label htmlFor={'pcp-end-' + kind}>Até:</label>
        <input
          id={'pcp-end-' + kind}
          type="date"
          className="input input-date"
          {...state.register('endDate')}
        />
      </div>
    </div>
  );
  const statusField = (
    <div className="select-status">
      <label>Status:</label>
      <InputSelect
        ariaLabel="Status"
        selectOptions={statuses}
        value={state.status}
        onChange={(event) => state.setValue('status', event.target.value)}
        placeholder="Todos"
      />
    </div>
  );
  return (
    <S.Container>
      <S.Filters onSubmit={state.apply} noValidate>
        <S.ContainerContent>
          {report && (
            <div className="report-fields">
              {reportFields.map(([name, label]) => (
                <div className="div" key={name}>
                  <label htmlFor={'pcp-' + name}>{label}:</label>
                  <input
                    id={'pcp-' + name}
                    className="input"
                    placeholder={label}
                    {...state.register(name)}
                  />
                </div>
              ))}
            </div>
          )}
          <div className={report ? 'date-status-row' : 'primary-filters'}>
            {!report && (
              <div className="responsive-div">
                <div className="div">
                  <label htmlFor={'pcp-search-' + kind}>
                    Informe para busca:
                  </label>
                  <input
                    id={'pcp-search-' + kind}
                    className="input"
                    placeholder="OS/Cliente/Código"
                    {...state.register('search')}
                  />
                </div>
              </div>
            )}
            {dateFields}
            {report && statusField}
          </div>
          <div className="secondary-filters">
            {!report && statusField}

            <TableFilterActions
              type="submit"
              disabled={state.loading}
              hasFilters={state.hasFilters}
              onClear={state.clearFilters}
            />
          </div>
        </S.ContainerContent>
      </S.Filters>

      {state.error && (
        <div role="alert">
          Não foi possível carregar a lista.{' '}
          <ButtonBorder onClick={state.refresh}>Tentar novamente</ButtonBorder>
        </div>
      )}

      <TableList
        actionLinks={actions}
        columns={tabTableColumns[kind]}
        actionColumnWidth={actionColumnWidth}
        actionColumnTitle={actionColumnTitle}
        data={state.data}
        pagination={state.pagination}
        setPagination={state.setPagination}
        loading={state.loading || state.pending}
        currentTab={report ? '/pcp' : undefined}
      />

      <S.ContainerButtons>
        <ButtonFill
          type="button"
          disabled={state.loading || state.error || pdf.pending}
          onClick={pdf.exportPdf}
        >
          <S.Export />
          Exportar
        </ButtonFill>
      </S.ContainerButtons>
    </S.Container>
  );
}

PcpList.propTypes = {
  kind: validateProp('string', true),
  active: validateProp('boolean'),
};
