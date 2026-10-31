import iconLightTheme from '../../assets/images/TrashRed.png';
import iconDarkTheme from '../../assets/images/TrashWhite.png';
import { useThemeContext } from '../../contexts/ThemeContext';
import { validateProp } from '../../utils/validateProp';
import * as S from './styles';

export function DeleteTrigger({ children, onClick, disabled, type }) {
  const { isDarkTheme } = useThemeContext();
  return (
    <S.ButtonContainer
      className="delete-button"
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      <S.TrashIcon
        src={isDarkTheme ? iconDarkTheme : iconLightTheme}
        alt=""
        aria-hidden="true"
      />
      {children}
    </S.ButtonContainer>
  );
}

DeleteTrigger.propTypes = {
  children: validateProp(['object', 'string', 'number', 'boolean']),
  onClick: validateProp('function'),
  disabled: validateProp('boolean'),
  type: validateProp('string'),
};
