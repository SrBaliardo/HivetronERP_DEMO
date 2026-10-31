import styled from '@emotion/styled';

import { listSearchToolbarStyles } from '../../../../../styles/filterLayouts';

export const Container = styled.div`
  height: calc(100vh - 31vh);
  width: 100%;
  overflow: auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 0 2px;
`;

export const ContainerContent = styled.div`
  ${({ theme }) => listSearchToolbarStyles(theme)}
`;
