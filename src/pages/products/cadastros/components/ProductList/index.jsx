import {
  PlusCircleOutlined,
  FolderViewOutlined,
  ApartmentOutlined,
  FileSearchOutlined,
} from '@ant-design/icons';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { ButtonBorder } from '../../../../../components/ButtonBorder';
import { ButtonFill } from '../../../../../components/ButtonFill';
import { TableFilterActions } from '../../../../../components/TableFilterActions';
import { TableList } from '../../../../../components/TableList';
import { TooltipCustom } from '../../../../../components/TooltipCustom';
import { useProducts } from '../../../../../contexts/products';
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
export function BomTab1({ onChange, active = true }) {
  const { products, listProducts, prepareNavigation, permissions } =
    useProducts();
  const load = useCallback(
    () => (products === null ? listProducts() : Promise.resolve(products)),
    [products, listProducts],
  );
  const { items, loading, error, refresh } = useAsyncList(load, active);
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
  const go = (item, tabKey) =>
    navigate('/bom-products', {
      state: prepareNavigation(item, tabKey, 'BomTab1'),
    });
  const addNew = () => {
    if (permissions.create) onChange('5');
    else
      toast.warning('🙅🏻‍♂️ Você não tem permissão para executar essa operação!');
  };
  const actionLinks = [
    {
      label: 'Exibir Detalhes',
      onClick: (item) => go(item, '6'),
      icon: () => (
        <TooltipCustom icon={FolderViewOutlined} content="Exibir Detalhes" />
      ),
    },
    {
      label: 'Conjuntos Relacionados',
      onClick: (item) => go(item, '10'),
      icon: () => (
        <TooltipCustom
          icon={ApartmentOutlined}
          content="Conjuntos Relacionados"
        />
      ),
    },
    {
      label: 'Roteiros de Produção',
      onClick: (item) => go(item, '11'),
      icon: () => (
        <TooltipCustom
          icon={FileSearchOutlined}
          content="Roteiros de Produção"
        />
      ),
    },
  ];
  return (
    <S.Container>
      {error && (
        <div role="alert">
          Erro ao buscar produtos.{' '}
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
        <ButtonFill type="button" onClick={addNew}>
          <PlusCircleOutlined />
          Adicionar Novo
        </ButtonFill>
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
BomTab1.propTypes = {
  onChange: validateProp('function'),
  active: validateProp('boolean'),
};
