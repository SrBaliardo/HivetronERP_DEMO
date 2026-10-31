import { IdcardOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { useId, useMemo, useState } from 'react';
import { toast } from 'react-toastify';

import { ButtonBorder } from '../../../../../components/ButtonBorder';
import { ButtonFill } from '../../../../../components/ButtonFill';
import { TableFilterActions } from '../../../../../components/TableFilterActions';
import { TableList } from '../../../../../components/TableList';
import { TooltipCustom } from '../../../../../components/TooltipCustom';
import { useUsuarios } from '../../../../../contexts/usuarios';
import { useAsyncList } from '../../../../../hooks/useAsyncList';
import { validateProp } from '../../../../../utils/validateProp';
import * as S from './styles';
import {
  actionColumnTitle,
  actionColumnWidth,
  tabTableColumns,
} from './tabTableColumns';

export function UserList({ active, onSelect, onNew, refreshKey }) {
  const searchFormId = useId();
  const { listUsers, permissions } = useUsuarios();
  const { items, loading, error, refresh } = useAsyncList(
    listUsers,
    active,
    refreshKey,
  );
  const [search, setSearch] = useState('');
  const [appliedSearch, setAppliedSearch] = useState('');
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 8,
    total: 0,
  });
  const data = useMemo(
    () =>
      items.filter((item) =>
        ['registration', 'name'].some((key) =>
          String(item[key] ?? '')
            .toLowerCase()
            .includes(appliedSearch),
        ),
      ),
    [items, appliedSearch],
  );
  const hasFilters = Boolean(appliedSearch);
  const clearFilters = () => {
    setSearch('');
    setAppliedSearch('');
    setPagination((previous) => ({ ...previous, current: 1 }));
  };
  const add = () => {
    if (permissions.create) onNew();
    else
      toast.warning('🙅🏻‍♂️ Você não tem permissão para executar essa operação!');
  };
  return (
    <S.Container>
      <S.ContainerContent>
        <form
          id={searchFormId}
          onSubmit={(event) => {
            event.preventDefault();
            setAppliedSearch(search.toLowerCase());
            setPagination((previous) => ({ ...previous, current: 1 }));
          }}
        >
          <input
            className="input"
            aria-label="Buscar por Nome ou Matrícula"
            placeholder="Informe o Nome ou Matrícula"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </form>
        <TableFilterActions
          type="submit"
          form={searchFormId}
          hasFilters={hasFilters}
          onClear={clearFilters}
        />
        <ButtonFill type="button" onClick={add}>
          <PlusCircleOutlined />
          Adicionar Novo
        </ButtonFill>
      </S.ContainerContent>
      {error && (
        <div role="alert">
          Erro ao buscar usuários.{' '}
          <ButtonBorder type="button" onClick={refresh}>
            Tentar novamente
          </ButtonBorder>
        </div>
      )}
      <TableList
        loading={loading}
        data={data}
        columns={tabTableColumns}
        actionColumnWidth={actionColumnWidth}
        actionColumnTitle={actionColumnTitle}
        actionLinks={[
          {
            label: 'Exibir Detalhes',
            onClick: onSelect,
            icon: () => (
              <TooltipCustom icon={IdcardOutlined} content="Exibir Detalhes" />
            ),
          },
        ]}
        pagination={pagination}
        setPagination={setPagination}
      />
    </S.Container>
  );
}
UserList.propTypes = {
  active: validateProp('boolean'),
  onSelect: validateProp('function', true),
  onNew: validateProp('function', true),
  refreshKey: validateProp('number'),
};
