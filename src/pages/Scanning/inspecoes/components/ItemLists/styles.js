import styled from '@emotion/styled';

import { ListTable } from '../../../../../components/ListTable';

export const ItemsList = styled(ListTable)`
  && {
    display: block;
  }

  table th {
    height: auto;
    line-height: normal;
    padding: 0 20px 10px;
    border: 0;
    background-color: ${({ theme }) => theme.backgroundColor};
    color: ${({ theme }) => theme.font};
    letter-spacing: normal;
    border-radius: 0;
  }

  table td {
    height: auto;
    line-height: normal;
    padding: 10px 20px;
    border-bottom-color: ${({ theme }) => theme.TableRowsStroke};
  }
`;

export const Control = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  margin-inline: auto;
  line-height: 1;

  .chk {
    margin: 0;
  }

  .tooltip-icon,
  button {
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 1;
  }

  > div {
    width: 15px;
  }
`;

export const QuantityInput = styled.input`
  width: 50px;
  max-width: 100%;
`;
