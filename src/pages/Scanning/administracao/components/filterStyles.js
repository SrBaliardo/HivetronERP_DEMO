import styled from '@emotion/styled';

import {
  codeDateRowStyles,
  dateRangeStyles,
  filterMetrics,
} from '../../../../styles/filterLayouts';

export const ContainerContent = styled.div`
  ${filterMetrics}
  width: 100%;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
  border-bottom: 1.5px solid ${({ theme }) => theme.TableRowsStroke};
  padding: 0 2px 15px;
  margin-top: 24px;

  .responsive-div {
    ${codeDateRowStyles}
  }
  .div-date {
    ${dateRangeStyles}
  }
  input {
    width: 100%;
    min-width: 0;
    height: 40px;
  }
`;
