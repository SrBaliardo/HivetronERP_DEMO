import { forwardRef } from 'react';

import { validateProp } from '../../utils/validateProp';
import { InputCheckboxForm } from '../InputCheckboxForm';

export const InputCheckboxIsMain = forwardRef(function InputCheckboxIsMain(
  { checked, onChange, disabled, ariaLabel = 'Tornar Principal' },
  ref,
) {
  return (
    <InputCheckboxForm
      ref={ref}
      checked={checked}
      onChange={(event) => onChange(event.target.checked)}
      disabled={disabled}
      ariaLabel={ariaLabel}
    />
  );
});

InputCheckboxIsMain.propTypes = {
  checked: validateProp('boolean'),
  onChange: validateProp('function'),
  disabled: validateProp('boolean'),
  ariaLabel: validateProp('string'),
};
