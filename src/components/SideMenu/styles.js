import styled from '@emotion/styled';

export const ContainerSideMenu = styled.div`
  min-height: calc(100vh - 11vh);
  width: 26%;
  background-color: transparent;
  font-family: 'Roboto';
`;

export const MenuItens = styled.div`
  width: 100%;
  background-color: transparent;
  display: flex;
  flex-direction: column;
`;

export const MenuLink = styled('a', {
  shouldForwardProp: (prop) => prop !== '$isActive',
})`
  height: 60px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ $isActive, theme }) =>
    $isActive ? 'transparent' : theme.backgroundSideMenu};
  color: ${({ $isActive, theme }) =>
    $isActive ? theme.menuActiveText : theme.defaultLinkSideMenu};
  box-shadow: ${({ $isActive, theme }) =>
    $isActive ? 'inset 3px 0 ' + theme.menuStripe : 'none'};
  padding: 10px 25px;
  transition: all 0.2s ease;
  &:hover {
    background-color: ${({ $isActive, theme }) =>
      $isActive ? 'transparent' : theme.menuHover};
  }
  &:focus-visible {
    outline: 2px solid #ff8c00;
    outline-offset: -3px;
  }
  &:active {
    background-color: ${({ $isActive, theme }) =>
      $isActive ? 'transparent' : theme.menuHover};
  }
`;

export const IconLink = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;

  label {
    cursor: pointer;
  }

  @media (max-width: 768px) {
    label {
      font-size: 0.8rem;
    }
  }

  @media (max-width: 720px) {
    label {
      display: none;
    }
  }
`;

export const SideMenuSupp = styled.div`
  min-height: 100%;
  width: 100%;
  background-color: ${({ theme }) => theme.backgroundSideMenu};
`;
