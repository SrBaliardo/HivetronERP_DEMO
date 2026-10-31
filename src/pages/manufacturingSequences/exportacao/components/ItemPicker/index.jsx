import { useState } from 'react';

import { CodePicker } from '../../../../../components/CodePicker';
import { validateProp } from '../../../../../utils/validateProp';
import { useItemSearch } from '../../hooks/useItemSearch';
export function ItemPicker({
  initialItem,
  onSelect,
  label,
  placeholder,
  clearOnSelect = false,
  disabled = false,
  listboxHeight,
}) {
  const [term, setTerm] = useState(initialItem?.code || '');
  const [selected, setSelected] = useState(initialItem || null);
  const search = useItemSearch(term, selected);
  return (
    <CodePicker
      listboxHeight={listboxHeight}
      large
      options={search.items}
      loading={search.loading}
      error={search.error}
      onRetry={search.refresh}
      label={label}
      placeholder={placeholder}
      value={term}
      strict={false}
      disabled={disabled}
      onChange={(option) => {
        if (option.raw) {
          setTerm(clearOnSelect ? '' : option.code);
          setSelected(clearOnSelect ? null : option);
          onSelect(option);
        } else {
          setTerm(option.value);
          setSelected(null);
          if (!clearOnSelect) onSelect(null);
        }
      }}
    />
  );
}
ItemPicker.propTypes = {
  initialItem: validateProp('object'),
  onSelect: validateProp('function', true),
  label: validateProp('string', true),
  placeholder: validateProp('string'),
  clearOnSelect: validateProp('boolean'),
  disabled: validateProp('boolean'),
  listboxHeight: validateProp('number'),
};
