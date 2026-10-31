import { SendOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';

import {
  dateRangeStyles,
  dateStatusRowStyles,
  filterMetrics,
} from '../../../styles/filterLayouts';

export const Container = styled.div`
  height: auto;
  flex-shrink: 0;
  width: 100%;
  overflow: visible;
  display: flex;
  flex-direction: column;
  gap: 20px;
  font-family: 'Roboto';

  .tool {
    color: ${({ theme }) => theme.accentText};
    font-size: 1rem;
    animation: spin 3s linear infinite;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  .tool2 {
    position: relative;
    top: 7px;
    animation: spin-reverse 3s linear infinite;

    @keyframes spin-reverse {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(-360deg);
      }
    }
  }

  a,
  span {
    color: #ffffff;
  }

  .input-date {
    width: 100%;
    min-width: 0;
    max-width: 100%;
    cursor: text;
    padding: 0 0 0 7px;
  }

  input[type='date']::-webkit-calendar-picker-indicator {
    cursor: pointer;
    font-size: 0.9rem;
    padding: 3px 7px 0 0;
  }

  .div {
    display: flex;
    flex-direction: column;
  }
`;

export const ContainerContent = styled.div`
  ${filterMetrics}
  width: 100%;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
  border-bottom: 1.5px solid ${({ theme }) => theme.TableRowsStroke};
  padding: 0 3px 15px;
  margin-top: 30px;
  .div,
  .select-status {
    display: flex;
    flex-direction: column;
    min-width: 0;
  }
  input {
    height: 40px;
    width: 100%;
    min-width: 0;
  }
  .history-fields {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    align-items: end;
    gap: var(--filter-gap);
  }
  .div-date {
    ${dateRangeStyles}
  }
  .date-status-row {
    ${dateStatusRowStyles}
  }
  .select-status > div {
    width: 100%;
    min-width: 0;
  }
  .select-status [role='combobox'] {
    height: 40px;
  }
`;

export const Export = styled(SendOutlined)`
  font-size: 1.2rem;
`;

export const ContainerButtons = styled.div`
  width: 100%;
  padding: 10px 7px 10px;

  @media (max-width: 768px) {
    button {
      width: 130px;
    }
  }
`;
