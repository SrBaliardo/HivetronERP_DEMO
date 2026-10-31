import { RightOutlined } from '@ant-design/icons';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Tooltip } from 'antd';
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { useAutenticacao as useUser } from '../../contexts/autenticacao';
import { useScreen } from '../../contexts/ScreenContext';
import { useNavigationConfirmation } from '../../hooks/useUnsavedChanges';
import { hasPermission } from '../../utils/hasPermission';
import { validateProp } from '../../utils/validateProp';
import * as S from './styles';
import { tagsMenu } from './tags-menu';

export function SideMenu({ restoreScreen = true }) {
  const navigate = useNavigate();
  const compactMenu = useMediaQuery('(max-width: 720px)');
  const confirmNavigation = useNavigationConfirmation();
  const location = useLocation();
  const { setActiveScreen, readStoredScreen, consumeScreenRestore } =
    useScreen();
  const { userRole } = useUser();

  const handleClick = (screen, link) => {
    confirmNavigation(() => {
      setActiveScreen(screen);
      navigate(link);
    });
  };

  useEffect(() => {
    if (!restoreScreen) return;
    if (location.pathname !== '/home') {
      consumeScreenRestore();
      return;
    }
    if (!userRole || !consumeScreenRestore()) return;
    const storedScreen = readStoredScreen();
    if (storedScreen && storedScreen !== '/home') {
      const activeItem = tagsMenu.find(
        (item) => item.link === storedScreen || item.screen === storedScreen,
      );
      if (activeItem && hasPermission(userRole, activeItem.screen, 'R')) {
        navigate(activeItem.link, { replace: true });
      }
    }
  }, [
    navigate,
    readStoredScreen,
    restoreScreen,
    consumeScreenRestore,
    location.pathname,
    userRole,
  ]);

  return (
    <S.ContainerSideMenu as="nav" aria-label="Menu principal">
      <S.MenuItens>
        {tagsMenu.map((item) => {
          const hasAccess = hasPermission(userRole, item.screen, 'R');
          if (!hasAccess) return null;

          const isBomActive = location.pathname.startsWith('/bom');
          const isScanningActive = location.pathname.startsWith('/scanning');
          const isPcpActive = location.pathname.startsWith('/pcp');
          const isActive =
            (isBomActive && item.screen === 'bom') ||
            (isScanningActive && item.screen === 'scanning') ||
            (isPcpActive && item.screen === 'pcp') ||
            location.pathname === item.link;

          return (
            <Tooltip
              key={item.id}
              title={compactMenu ? item.label : null}
              placement="right"
              trigger={['hover', 'focus']}
            >
              <S.MenuLink
                $isActive={isActive}
                href={item.link}
                aria-label={item.label}
                aria-current={isActive ? 'page' : undefined}
                onClick={(event) => {
                  if (
                    event.button !== 0 ||
                    event.metaKey ||
                    event.ctrlKey ||
                    event.shiftKey ||
                    event.altKey
                  )
                    return;
                  event.preventDefault();
                  handleClick(item.screen, item.link);
                }}
              >
                <S.IconLink>
                  <item.icon />
                  <label>{item.label}</label>
                </S.IconLink>
                <RightOutlined />
              </S.MenuLink>
            </Tooltip>
          );
        })}
      </S.MenuItens>
      <S.SideMenuSupp />
    </S.ContainerSideMenu>
  );
}

SideMenu.propTypes = { restoreScreen: validateProp('boolean') };
