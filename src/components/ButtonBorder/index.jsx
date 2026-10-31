import { validateProp } from '../../utils/validateProp';
import * as S from './styles';

export function ButtonBorder({
  children,
  onClick,
  onMouseDown,
  disabled,
  type,
  form,
}) {
  return (
    <S.ButtonContainer
      className="border-button"
      onClick={onClick}
      onMouseDown={onMouseDown}
      disabled={disabled}
      type={type}
      form={form}
    >
      {children}
    </S.ButtonContainer>
  );
}

ButtonBorder.propTypes = {
  children: validateProp(['object', 'string', 'number', 'boolean']),
  onClick: validateProp('function'),
  onMouseDown: validateProp('function'),
  disabled: validateProp('boolean'),
  type: validateProp('string'),
  form: validateProp('string'),
};
