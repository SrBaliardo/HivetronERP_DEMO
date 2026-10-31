import { validateProp } from '../../utils/validateProp';
import * as S from './styles';

export function ButtonSearch({
  children,
  data,
  searchCriteria,
  onFilter,
  onClick,
  disabled,
  type = 'button',
  form,
}) {
  const handleSearch = (event) => {
    if (onClick) return onClick(event);
    if (!onFilter) return;
    if (!searchCriteria) {
      onFilter();
      return;
    }

    if (!searchCriteria.value) {
      onFilter(data);
      return;
    }

    const lowercasedSearchInput = searchCriteria.value.toLowerCase();
    const newFilteredData = data.filter((item) =>
      searchCriteria.keys.some((key) =>
        item[key]?.toLowerCase().includes(lowercasedSearchInput),
      ),
    );

    onFilter(newFilteredData);
  };

  return (
    <S.ButtonContainer
      className="fill-button"
      onClick={handleSearch}
      disabled={disabled}
      type={type}
      form={form}
    >
      {children}
    </S.ButtonContainer>
  );
}

ButtonSearch.propTypes = {
  children: validateProp(['object', 'string', 'number']),
  data: validateProp('object'),
  searchCriteria: validateProp('object'),
  onFilter: validateProp('function'),
  onClick: validateProp('function'),
  disabled: validateProp('boolean'),
  type: validateProp('string'),
  form: validateProp('string'),
};
