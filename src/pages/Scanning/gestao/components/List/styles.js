import { SendOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';
import CircleIcon from '@mui/icons-material/Circle';

import {
  codeDateRowStyles,
  dateRangeStyles,
  dateStatusRowStyles,
  filterMetrics,
} from '../../../../../styles/filterLayouts';

export const Container = styled.div`
  height: calc(100vh - 31vh);
  width: 100%;
  overflow: auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
  font-family: 'Roboto';

  a,
  span {
    color: #ffffff;
  }

  .input-date {
    width: 120px;
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

  .button-goback {
    button {
      width: 120px;
    }
  }

  .select-status {
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
  padding: 0 2px 15px;
  margin-top: 24px;
  .div,
  .select-status {
    display: flex;
    flex-direction: column;
    min-width: 0;
  }
  input {
    width: 100%;
    min-width: 0;
    height: 40px;
  }
  .primary-filters {
    ${codeDateRowStyles}
  }
  .div-date {
    ${dateRangeStyles}
  }
  .date-status-row {
    ${dateStatusRowStyles}
  }
  .secondary-filters {
    display: flex;
    align-items: flex-end;
    gap: var(--filter-gap);
    min-width: 0;
    > .select-status {
      width: var(--status-width);
      flex: 0 1 var(--status-width);
      min-width: 60px;
    }
    > [data-filter-actions] {
      width: auto;
      margin-left: auto;
      flex: 0 1 210px;
      min-width: 100px;
      flex-wrap: wrap;
    }
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

export const Filters = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;

  label {
    color: ${({ theme }) => theme.labelPrimary};
  }

  input {
    min-width: 0;
  }

  .report-fields {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 180px), 1fr));
    flex: 1 1 100%;
    min-width: 0;
    gap: 20px;
  }

  .report-fields input {
    width: 100%;
  }
`;

export const StatusDot = styled(CircleIcon, {
  shouldForwardProp: (prop) => prop !== 'status',
})`
  font-size: 14px;
  color: ${({ status, theme }) =>
    ({
      NOT_STARTED: theme.statusNotStarted,
      STARTED: theme.statusStarted,
      FINISHED: theme.iconGreen,
      CANCELED: '#e33756',
    })[status] || '#a65c16'};
`;
