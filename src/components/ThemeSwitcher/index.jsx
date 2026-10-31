import { useThemeContext } from '../../contexts/ThemeContext';
import * as S from './styles';

export function ThemeSwitcher() {
  const { isDarkTheme, changeTheme } = useThemeContext();

  return (
    <S.CustomSwitch
      checked={isDarkTheme}
      onChange={changeTheme}
      inputProps={{ 'aria-label': 'Ativar tema escuro' }}
    />
  );
}
