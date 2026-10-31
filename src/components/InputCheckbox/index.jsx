import { validateProp } from '../../utils/validateProp';
import * as S from './styles';

export const InputCheckbox = ({
  onChange,
  checked,
  disabled = false,
  ariaLabel = 'Selecionar opção',
}) => (
  <S.ContainerRemember>
    <label className="chk">
      <input
        aria-label={ariaLabel}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
      />
      <span aria-hidden="true">
        <S.Checked />
      </span>
    </label>
  </S.ContainerRemember>
);
InputCheckbox.propTypes = {
  onChange: validateProp('function'),
  checked: validateProp('boolean'),
  disabled: validateProp('boolean'),
  ariaLabel: validateProp('string'),
};
