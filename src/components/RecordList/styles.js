import styled from '@emotion/styled';

import { listSearchToolbarStyles } from '../../styles/filterLayouts';

export const Container = styled.div`
  height: 100%;
  min-height: 0;
  width: 100%;
  overflow: auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 0 2px;

  > div {
    flex-shrink: 0;
    height: auto;
  }

  a,
  span {
    color: #ffffff;
  }
`;

export const ContainerContent = styled.div`
  ${({ theme }) => listSearchToolbarStyles(theme)}
`;
