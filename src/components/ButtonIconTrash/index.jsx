import iconLightTheme from '../../assets/images/TrashRed.png';
import iconDarkTheme from '../../assets/images/TrashWhite.png';
import { useThemeContext } from '../../contexts/ThemeContext';
import { validateProp } from '../../utils/validateProp';
import * as S from './styles';

export function ButtonIconTrash({
  children,
  onClick,
  disabled,
  type,
  ariaLabel = 'Excluir',
}) {
  const { isDarkTheme } = useThemeContext();

  return (
    <S.ButtonContainer
      type={type}
      aria-label={ariaLabel}
      className="fill-button"
      onClick={onClick}
      disabled={disabled}
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

ButtonIconTrash.propTypes = {
  children: validateProp(['object', 'string', 'number']),
  onClick: validateProp('function'),
  disabled: validateProp('boolean'),
  type: validateProp('string'),
  ariaLabel: validateProp('string'),
};
