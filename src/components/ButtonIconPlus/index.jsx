import AddIcon from '@mui/icons-material/Add';

import { validateProp } from '../../utils/validateProp';
import * as S from './styles';

export function ButtonIconPlus({
  children,
  onClick,
  disabled,
  type,
  ariaLabel = 'Adicionar',
}) {
  return (
    <S.ButtonContainer
      type={type}
      aria-label={ariaLabel}
      className="fill-button"
      onClick={onClick}
      disabled={disabled}
    >
      <AddIcon />
      {children}
    </S.ButtonContainer>
  );
}

ButtonIconPlus.propTypes = {
  children: validateProp(['object', 'string', 'number']),
  onClick: validateProp('function'),
  disabled: validateProp('boolean'),
  type: validateProp('string'),
  ariaLabel: validateProp('string'),
};
