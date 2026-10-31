import { CheckOutlined } from '@ant-design/icons';

import { validateProp } from '../../../../utils/validateProp';
import * as S from '../styles';

export function InputCheckboxLogin({ rememberMe, onChange }) {
  return (
    <S.RememberLabel>
      <S.Checkbox
        type="checkbox"
        checked={rememberMe}
        onChange={(event) => onChange(event.target.checked)}
      />
      <S.Checkmark aria-hidden="true">
        <CheckOutlined />
      </S.Checkmark>
      <span>Lembrar-me</span>
    </S.RememberLabel>
  );
}

InputCheckboxLogin.propTypes = {
  rememberMe: validateProp('boolean', true),
  onChange: validateProp('function', true),
};
