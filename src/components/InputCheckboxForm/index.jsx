import { forwardRef } from 'react';

import { validateProp } from '../../utils/validateProp';
import * as S from './styles';
export const InputCheckboxForm = forwardRef(function InputCheckboxForm(
  { onChange, checked, disabled = false, ariaLabel = 'Selecionar opção' },
  ref,
) {
  return (
    <S.ContainerRemember>
      <label className="chk">
        <input
          ref={ref}
          aria-label={ariaLabel}
          type="checkbox"
          checked={checked ?? false}
          disabled={disabled}
          onChange={onChange}
        />
        <span>
          <S.Checked />
        </span>
      </label>
    </S.ContainerRemember>
  );
});
InputCheckboxForm.propTypes = {
  onChange: validateProp('function'),
  checked: validateProp('boolean'),
  disabled: validateProp('boolean'),
  ariaLabel: validateProp('string'),
};
