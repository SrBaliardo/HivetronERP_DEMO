import { Global, ThemeProvider as EmotionThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material/styles';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { calendarStyles } from '../styles/calendarStyles';
import { disabledControlStyles } from '../styles/disabledControlStyles';
import { inputFocusStyles } from '../styles/inputFocusStyles';
import { modalStyles } from '../styles/modalStyles';
import { darkTheme, lightTheme } from '../styles/themeStyles';
import { validateProp } from '../utils/validateProp';

export const ThemeContext = createContext();

export const ThemeContextProvider = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(() => {
    try {
      return localStorage.getItem('theme') === 'dark';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('theme', isDarkTheme ? 'dark' : 'light');
    } catch {
      console.warn('Não foi possível salvar a preferência de tema.');
    }
  }, [isDarkTheme]);

  const changeTheme = useCallback(() => {
    setIsDarkTheme((previousTheme) => !previousTheme);
  }, []);
  const value = useMemo(
    () => ({ isDarkTheme, setIsDarkTheme, changeTheme }),
    [isDarkTheme, changeTheme],
  );
  const emotionTheme = useMemo(
    () => createTheme(isDarkTheme ? darkTheme : lightTheme),
    [isDarkTheme],
  );

  return (
    <ThemeContext.Provider value={value}>
      <EmotionThemeProvider theme={emotionTheme}>
        <Global
          styles={[
            inputFocusStyles,
            modalStyles,
            disabledControlStyles,
            calendarStyles,
          ]}
        />
        {children}
      </EmotionThemeProvider>
    </ThemeContext.Provider>
  );
};

ThemeContextProvider.propTypes = {
  children: validateProp(['object', 'string', 'number', 'boolean']),
};

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error(
      'useThemeContext must be used within a ThemeContextProvider',
    );
  }
  const { isDarkTheme, changeTheme } = context;
  return {
    isDarkTheme,
    changeTheme,
  };
};
