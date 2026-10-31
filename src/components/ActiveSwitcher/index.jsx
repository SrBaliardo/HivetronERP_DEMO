import { useEffect, useState } from 'react';

import { validateProp } from '../../utils/validateProp';
import * as S from './styles';

export function ActiveSwitcher({
  initialValue = true,
  checked,
  onChange,
  disabled,
}) {
  const [localValue, setLocalValue] = useState(initialValue);
  useEffect(() => {
    if (checked === undefined) setLocalValue(initialValue);
  }, [initialValue, checked]);
  const value = checked === undefined ? localValue : checked;
  const toggle = () => {
    if (disabled) return;
    const next = !value;
    if (checked === undefined) setLocalValue(next);
    onChange(next);
  };
  return (
    <S.CustomSwitch
      checked={Boolean(value)}
      onChange={toggle}
      disabled={disabled}
      inputProps={{ 'aria-label': 'Cadastro ativo?' }}
      color={value ? 'success' : 'error'}
    />
  );
}
ActiveSwitcher.propTypes = {
  initialValue: validateProp('boolean'),
  checked: validateProp('boolean'),
  onChange: validateProp('function', true),
  disabled: validateProp('boolean'),
};
