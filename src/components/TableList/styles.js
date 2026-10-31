import styled from '@emotion/styled';
import { Empty } from 'antd';

export const Container = styled('div', {
  shouldForwardProp: (prop) => prop !== '$fixedColumns',
})`
  height: 100%;
  width: 100%;
  min-width: 0;
  && .ant-table-content {
    scrollbar-width: auto;
    scrollbar-color: ${({ theme }) =>
      `${theme.scrollbarThumb} ${theme.backgroundColor}`};
  }

  .table-list-cell {
    max-width: ${({ $fixedColumns }) => ($fixedColumns ? 'none' : '200px')};
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  span {
    color: #6c7883;
  }

  .ant-table {
    border-radius: 0;
    background-color: transparent;
    height: 100%;
    font-family: 'Roboto';
    span {
      display: flex;
      justify-content: left;
      color: ${({ theme }) => theme.TableHeaderText};
    }

    @media (max-width: 768px) {
      font-size: 0.8rem;
    }
  }

  .table-actions,
  .table-actions .ant-space-item,
  .table-actions .ant-space-item > button,
  .table-actions .tooltip-icon {
    display: flex;
    align-items: center;
    line-height: 1;
  }

  .table-actions .tooltip-icon {
    justify-content: center;
  }

  .table-actions .chk {
    margin: 0;
  }

  .table-actions .chk svg {
    width: 0.8rem;
    height: 0.8rem;
  }

  .ant-table-column-sorters {
    cursor: pointer;
    display: flex;
    &:focus-visible {
      outline: 2px solid #b85b00;
      outline-offset: 2px;
    }
  }

  .ant-table-cell .ant-table-column-has-sorters,
  .ant-table-cell .ant-table-cell-scrollbar {
    border-radius: 0;
  }

  .ant-table-thead .ant-table-cell {
    background-color: ${({ theme }) => theme.TableHeaderBackground};
    color: ${({ theme }) => theme.TableHeaderText};
    border-color: ${({ theme }) => theme.TableHeaderStroke};
    height: 50px;
    line-height: 50px;
    padding: 0 8px;
    letter-spacing: 0.5px;

    &::before {
      display: none;
    }
  }

  .ant-table-tbody > tr > td {
    background-color: ${({ theme }) => theme.backgroundColor};
    color: ${({ theme }) => theme.TableRowsText};
    border-color: ${({ theme }) => theme.TableRowsStroke};
    height: 50px;
    line-height: 50px;
    padding: 0 8px;

    span {
      color: ${({ theme }) => theme.TableIconsColor};
      font-size: 1.5rem;
    }
  }

  .ant-table-tbody > tr.even-row > td {
    background-color: ${({ theme }) => theme.backgroundColor};
  }

  .ant-table-tbody > tr.odd-row > td {
    background-color: ${({ theme }) => theme.TableRowsXBackground};
  }

  .ant-table-tbody > tr:hover > td {
    background-color: ${({ theme }) =>
      theme.TableRowHoverBackground} !important;
  }

  .ant-table-column-has-sorters:hover {
    background-color: ${({ theme }) =>
      theme.TableHeaderHoverBackground} !important;
  }

  .ant-table-thead > tr > th.ant-table-column-sort {
    background-color: ${({ theme }) => theme.TableHeaderBackground};
  }

  .ant-table-column-has-sorters:focus-visible {
    outline: 2px solid #b85b00;
    outline-offset: -2px;
  }

  .ant-pagination-item {
    a {
      color: #6c7883;
    }
  }

  .ant-pagination-prev .ant-pagination-item-link,
  .ant-pagination-next .ant-pagination-item-link {
    background-color: transparent;
    color: #6c7883;

    .anticon {
      color: inherit;
    }
  }

  .ant-pagination-prev:not(.ant-pagination-disabled):hover
    .ant-pagination-item-link,
  .ant-pagination-next:not(.ant-pagination-disabled):hover
    .ant-pagination-item-link {
    color: ${({ theme }) => theme.paginationActiveItemColor};
  }

  .ant-pagination-disabled .ant-pagination-item-link {
    opacity: 0.45;
  }

  .ant-pagination-item-active {
    a {
      color: ${({ theme }) => theme.paginationActiveItemColor};

      &:hover {
        color: ${({ theme }) => theme.paginationActiveItemColor};
      }
    }

    border-color: ${({ theme }) => theme.paginationActiveItemColor};
    background-color: ${({ theme }) => theme.backgroundColor};

    &:hover {
      border-color: ${({ theme }) => theme.paginationActiveItemColor};
    }
  }

  .ant-table-column-sorter-inner .anticon {
    color: ${({ theme }) => theme.TableSorterArrowColor};
  }

  .ant-table-thead th[aria-sort='ascending'] .ant-table-column-sorter-down,
  .ant-table-thead th[aria-sort='descending'] .ant-table-column-sorter-up {
    display: none;
  }

  .ant-table-thead th[aria-sort='descending'] .ant-table-column-sorter-down {
    margin-top: 0;
  }

  .ant-select-show-search {
    display: none;
  }
`;

export const ActionButton = styled.button`
  border: 0;
  padding: 0;
  background: transparent;
  font: inherit;
  cursor: pointer;
  &:focus-visible {
    outline: 2px solid #b85b00;
    outline-offset: 3px;
  }
`;

export const EmptyState = styled(Empty)`
  .ant-empty-description {
    color: ${({ theme }) => theme.TableHeaderText};
  }

  .ant-empty-image {
    g[stroke] {
      stroke: ${({ theme }) => theme.TableHeaderText};
    }

    path[fill] {
      fill: ${({ theme }) => theme.TableHeaderBackground};
    }

    ellipse {
      fill: ${({ theme }) => theme.TableHeaderText};
      opacity: 0.15;
    }
  }
`;
