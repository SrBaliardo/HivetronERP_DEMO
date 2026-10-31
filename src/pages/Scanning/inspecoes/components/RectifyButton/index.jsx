import { validateProp } from '../../../../../utils/validateProp';
import * as S from './styles';

export function ButtonRectification({ children, onClick, disabled }) {
  return (
    <S.ButtonContainer
      className="fill-button"
      onClick={onClick}
      disabled={disabled}
    >
      <S.EditIcon />
      {children}
    </S.ButtonContainer>
  );
}

ButtonRectification.propTypes = {
  children: validateProp(['object', 'string', 'number']),
  onClick: validateProp('function'),
  disabled: validateProp('boolean'),
};
