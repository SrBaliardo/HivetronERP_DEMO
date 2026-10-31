import styled from '@emotion/styled';

import { ButtonContainer } from '../ButtonSearch/styles';

export const Actions = styled.span`
  && {
    display: flex;
    flex: 0 0 auto;
    width: 100%;
    min-width: 0;
    max-width: 100%;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-end;
    gap: 10px;
  }
  > button {
    flex-shrink: 0;
    white-space: nowrap;
    padding: 0 10px;
  }
`;

export const ClearButton = styled(ButtonContainer)`
  background-color: ${({ theme }) => theme.dangerFillBackground};
  color: ${({ theme }) => theme.dangerFillText};
  @media (hover: hover) {
    &&:not(:disabled):not([aria-disabled='true']):hover {
      filter: none;
      background-color: ${({ theme }) => theme.dangerFillHoverBackground};
    }
  }
  span {
    color: inherit;
  }
`;
