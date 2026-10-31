import { ClearOutlined, SearchOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';

import { validateProp } from '../../utils/validateProp';
import { ButtonSearch } from '../ButtonSearch';
import * as S from './styles';

export function TableFilterActions({
  onSearch,
  onClear,
  hasFilters,
  disabled = false,
  type = 'button',
  form,
  children,
}) {
  return (
    <S.Actions data-filter-actions>
      {children}
      {hasFilters && (
        <Tooltip title="Limpar Filtros de Busca" trigger={['hover', 'focus']}>
          <S.ClearButton
            type="button"
            aria-label="Limpar Filtros de Busca"
            onClick={onClear}
            disabled={disabled}
          >
            <ClearOutlined aria-hidden="true" /> Filtros
          </S.ClearButton>
        </Tooltip>
      )}
      <ButtonSearch
        type={type}
        form={form}
        onClick={onSearch}
        disabled={disabled}
      >
        <SearchOutlined aria-hidden="true" /> Buscar
      </ButtonSearch>
    </S.Actions>
  );
}

TableFilterActions.propTypes = {
  onSearch: validateProp('function'),
  onClear: validateProp('function', true),
  hasFilters: validateProp('boolean', true),
  disabled: validateProp('boolean'),
  type: validateProp('string'),
  form: validateProp('string'),
  children: validateProp(['object', 'string', 'number', 'boolean']),
};
