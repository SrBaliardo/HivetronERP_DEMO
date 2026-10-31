import { FolderViewOutlined, CaretLeftOutlined } from '@ant-design/icons';
import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { ButtonBorder } from '../../../../../components/ButtonBorder';
import { TableFilterActions } from '../../../../../components/TableFilterActions';
import { TableList } from '../../../../../components/TableList';
import { TooltipCustom } from '../../../../../components/TooltipCustom';
import { useSets } from '../../../../../contexts/sets';
import { useAsyncList } from '../../../../../hooks/useAsyncList';
import { useTableSearch } from '../../../../../hooks/useTableSearch';
import { validateProp } from '../../../../../utils/validateProp';
import * as S from './styles';
import {
  actionColumnTitle,
  actionColumnWidth,
  tabTableColumns,
} from './tabTableColumns';
const keys = ['code', 'description'];
export function BomTab10({ selectedProductId, selectedSetId, active = true }) {
  const { listRelatedSets, prepareNavigation } = useSets();
  const itemId = selectedProductId || selectedSetId;
  const load = useCallback(
    () => listRelatedSets(itemId),
    [listRelatedSets, itemId],
  );
  const { items, loading, error, refresh } = useAsyncList(
    load,
    active && itemId != null,
  );
  const {
    searchInput,
    setSearchInput,
    search,
    hasFilters,
    clearFilters,
    filteredData,
    pagination,
    setPagination,
  } = useTableSearch(items, keys);
  const navigate = useNavigate();
  const location = useLocation();
  const goBack = () =>
    navigate('/bom', {
      state: { tabKey: location.state?.fromTab === 'BomTab2' ? '2' : '1' },
    });
  const actionLinks = [
    {
      label: 'Exibir Detalhes',
      onClick: (item) =>
        navigate('/bom-sets', { state: prepareNavigation(item, '8') }),
      icon: () => (
        <TooltipCustom icon={FolderViewOutlined} content="Exibir Detalhes" />
      ),
    },
  ];
  return (
    <S.Container>
      {error && (
        <div role="alert">
          Erro ao buscar conjuntos relacionados.{' '}
          <ButtonBorder type="button" onClick={refresh}>
            Tentar novamente
          </ButtonBorder>
        </div>
      )}
      <S.ContainerContent>
        <div>
          <input
            className="input"
            aria-label="Código ou Descrição"
            placeholder="Informe o Código ou Descrição"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
        <TableFilterActions
          type="button"
          onSearch={search}
          hasFilters={hasFilters}
          onClear={clearFilters}
        />
        <div className="button-goback">
          <ButtonBorder type="button" onClick={goBack}>
            <CaretLeftOutlined aria-hidden="true" /> Voltar
          </ButtonBorder>
        </div>
      </S.ContainerContent>
      <TableList
        loading={loading}
        actionLinks={actionLinks}
        columns={tabTableColumns}
        actionColumnWidth={actionColumnWidth}
        actionColumnTitle={actionColumnTitle}
        data={filteredData}
        pagination={pagination}
        setPagination={setPagination}
      />
    </S.Container>
  );
}
BomTab10.propTypes = {
  selectedProductId: validateProp(['string', 'number']),
  selectedSetId: validateProp(['string', 'number']),
  active: validateProp('boolean'),
};
