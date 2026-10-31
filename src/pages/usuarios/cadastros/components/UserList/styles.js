import styled from '@emotion/styled';

import { listSearchToolbarStyles } from '../../../../../styles/filterLayouts';

export const Container = styled.div`
  height: calc(100vh - 31vh);
  width: 100%;
  overflow: auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-right: 1px;
  input:focus-visible {
    outline: 2px solid #ff8c00;
    outline-offset: -1px;
  }
  button:focus-visible {
    outline: 2px solid #b85b00;
    outline-offset: 2px;
  }
`;

export const ContainerContent = styled.div`
  ${({ theme }) => listSearchToolbarStyles(theme)}
`;
