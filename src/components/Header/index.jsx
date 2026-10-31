import {
  HomeOutlined,
  ReloadOutlined,
  PoweroffOutlined,
} from '@ant-design/icons';
import { Tooltip } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import darkLogo from '../../assets/images/logoHeaderHivetron_.png';
import lightLogo from '../../assets/images/logoHeaderHivetron.png';
import { useAutenticacao as useUser } from '../../contexts/autenticacao';
import { useScreen } from '../../contexts/ScreenContext';
import { useThemeContext } from '../../contexts/ThemeContext';
import { useNavigationConfirmation } from '../../hooks/useUnsavedChanges';
import { ThemeSwitcher } from '../ThemeSwitcher';
import * as S from './styles';

export function Header() {
  const { isDarkTheme } = useThemeContext();
  const { clearUserData, userData } = useUser();
  const navigate = useNavigate();
  const screen = useScreen();
  const confirmNavigation = useNavigationConfirmation();
  const [currentDateTime, setCurrentDateTime] = useState({
    date: new Date().toLocaleDateString(),
    time: new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    }),
  });

  const home = () => {
    confirmNavigation(() => {
      screen?.setActiveScreen('/home');
      navigate('/home');
    });
  };

  const logout = () => {
    confirmNavigation(() => {
      clearUserData();
      navigate('/');
    });
  };

  const reloadPage = () => {
    confirmNavigation(() => window.location.reload());
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime({
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
      });
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <S.ContainerHeader>
      <S.Logo src={isDarkTheme ? darkLogo : lightLogo} alt="Hivetron ERP" />

      <S.ContainerCentralInfo>
        <S.ContainerIcons>
          <Tooltip title="Página inicial" trigger={['hover', 'focus']}>
            <button type="button" aria-label="Página inicial" onClick={home}>
              <HomeOutlined />
            </button>
          </Tooltip>
          <Tooltip title="Atualizar página" trigger={['hover', 'focus']}>
            <button
              type="button"
              aria-label="Atualizar página"
              onClick={reloadPage}
            >
              <ReloadOutlined />
            </button>
          </Tooltip>
          <Tooltip title="Sair" trigger={['hover', 'focus']}>
            <button type="button" aria-label="Sair" onClick={logout}>
              <PoweroffOutlined />
            </button>
          </Tooltip>
        </S.ContainerIcons>
        <S.ContainerDateTime>
          <h2>{currentDateTime.date}</h2>
          <span> - </span>
          <h2>{currentDateTime.time}</h2>
        </S.ContainerDateTime>
      </S.ContainerCentralInfo>

      <S.ContainerHelloUser>
        <p>
          Olá, <span>{userData.name || 'Usuário'}</span>
        </p>
        <label>{userData.email || 'email@email.com'}</label>
      </S.ContainerHelloUser>
      <ThemeSwitcher />
    </S.ContainerHeader>
  );
}
