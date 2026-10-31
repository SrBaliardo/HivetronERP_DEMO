import { validateProp } from '../../utils/validateProp';
import * as S from './styles';

export function ButtonFill({ children, onClick, disabled, type, form }) {
  return (
    <S.ButtonContainer
      className="fill-button"
      onClick={onClick}
      disabled={disabled}
      type={type}
      form={form}
    >
      {children}
    </S.ButtonContainer>
  );
}

ButtonFill.propTypes = {
  children: validateProp(['object', 'string', 'number', 'boolean']),
  onClick: validateProp('function'),
  disabled: validateProp('boolean'),
  type: validateProp('string'),
  form: validateProp('string'),
};
