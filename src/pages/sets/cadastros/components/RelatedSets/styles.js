import styled from '@emotion/styled';

import { ButtonBorder } from '../../../../../components/ButtonBorder';
import { listSearchToolbarStyles } from '../../../../../styles/filterLayouts';

export const Container = styled.div`
  height: calc(100vh - 31vh);
  width: 100%;
  overflow: auto;
  display: flex;
  flex-direction: column;
  gap: 20px;

  .button-goback {
    button {
      width: 120px;
    }
  }
`;

export const ContainerContent = styled.div`
  ${({ theme }) => listSearchToolbarStyles(theme)}
`;

export const ButtonGoBack = styled(ButtonBorder)`
  width: 120px;
`;
