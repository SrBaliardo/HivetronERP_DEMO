import { FolderViewOutlined, PlusCircleOutlined } from '@ant-design/icons';

import { useTableSearch } from '../../hooks/useTableSearch';
import { validateProp } from '../../utils/validateProp';
import { ButtonBorder } from '../ButtonBorder';
import { ButtonFill } from '../ButtonFill';
import { TableFilterActions } from '../TableFilterActions';
import { TableList } from '../TableList';
import { TooltipCustom } from '../TooltipCustom';
import * as S from './styles';
const keys = ['code', 'description'];
export function RecordList({
  items,
  loading,
  error,
  refresh,
  columns,
  actionColumnWidth = 120,
  actionColumnTitle = 'Ações',
  onAdd,
  onSelect,
  errorMessage,
}) {
  const table = useTableSearch(items, keys);
  const links = [
    {
      label: 'Exibir Detalhes',
      onClick: onSelect,
      icon: () => (
        <TooltipCustom icon={FolderViewOutlined} content="Exibir Detalhes" />
      ),
    },
  ];
  return (
    <S.Container>
      {error && (
        <div role="alert">
          {errorMessage}{' '}
          <ButtonBorder type="button" onClick={refresh}>
            Tentar novamente
          </ButtonBorder>
        </div>
      )}
      <S.ContainerContent>
        <div>
          <input
            className="input"
            aria-label="Buscar por código ou descrição"
            placeholder="Informe o Código ou Descrição"
            value={table.searchInput}
            onChange={(event) => table.setSearchInput(event.target.value)}
          />
        </div>
        <TableFilterActions
          type="button"
          onSearch={table.search}
          hasFilters={table.hasFilters}
          onClear={table.clearFilters}
        />
        <ButtonFill type="button" onClick={onAdd}>
          <PlusCircleOutlined /> Adicionar Novo
        </ButtonFill>
      </S.ContainerContent>
      <TableList
        actionLinks={links}
        columns={columns}
        actionColumnWidth={actionColumnWidth}
        actionColumnTitle={actionColumnTitle}
        data={table.filteredData}
        loading={loading}
        pagination={table.pagination}
        setPagination={table.setPagination}
      />
    </S.Container>
  );
}
RecordList.propTypes = {
  items: validateProp('object', true),
  loading: validateProp('boolean'),
  error: validateProp('boolean'),
  refresh: validateProp('function'),
  columns: validateProp('object', true),
  actionColumnWidth: validateProp('number'),
  actionColumnTitle: validateProp('string'),
  onAdd: validateProp('function', true),
  onSelect: validateProp('function', true),
  errorMessage: validateProp('string'),
};
