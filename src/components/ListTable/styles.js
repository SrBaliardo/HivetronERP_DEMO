import styled from '@emotion/styled';

export const ScrollArea = styled.div`
  width: 100%;
  max-width: 100%;
  min-width: 0;
  overflow-x: auto;
  scrollbar-width: auto;
  scrollbar-color: ${({ theme }) =>
    `${theme.scrollbarThumb} ${theme.backgroundColor}`};

  &:focus-visible {
    outline: 2px solid #ff8c00;
    outline-offset: -2px;
  }
`;

export const Table = styled('table', {
  shouldForwardProp: (prop) => prop !== '$width' && prop !== '$showHeader',
})`
  width: ${({ $width }) => ($width ? $width + 'px' : '100%')};
  min-width: 100%;
  table-layout: fixed;
  border-collapse: separate;
  border-spacing: 0;
  color: inherit;
  font: inherit;

  th {
    height: 50px;
    line-height: 50px;
    padding: 0 8px;
    font-weight: inherit;
    letter-spacing: 0.5px;
    color: ${({ theme }) => theme.TableHeaderText};
    background-color: ${({ theme }) => theme.TableHeaderBackground};
    border-bottom: 1.5px solid ${({ theme }) => theme.TableHeaderStroke};
  }

  thead > tr:first-of-type {
    th:first-of-type {
      border-top-left-radius: 8px;
    }

    th:last-child {
      border-top-right-radius: 8px;
    }
  }

  td {
    padding: ${({ $showHeader }) => ($showHeader ? '0 8px' : '15px 20px')};
    vertical-align: middle;
    border-bottom: 1px solid ${({ theme }) => theme.TableRowsStroke};
  }

  thead + tbody td {
    height: 50px;
    line-height: 50px;
  }

  p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

export const Column = styled('col', {
  shouldForwardProp: (prop) => prop !== '$width',
})`
  width: ${({ $width }) => ($width ? $width + 'px' : 'auto')};
`;

export const ActionCell = styled.td`
  position: sticky;
  right: 0;
  z-index: 1;
  text-align: center;
  background-color: ${({ theme }) => theme.backgroundColor};
`;

export const ActionContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;

  button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    line-height: 1;
  }
`;

const cellOptions = {
  shouldForwardProp: (prop) => prop !== '$right' && prop !== '$align',
};

export const Cell = styled(
  'td',
  cellOptions,
)(({ $right, $align, theme }) => ({
  textAlign: $align,
  ...($right != null && {
    position: 'sticky',
    right: $right,
    zIndex: 1,
    backgroundColor: theme.backgroundColor,
  }),
}));

export const HeaderCell = styled(
  'th',
  cellOptions,
)(({ $right, $align, theme }) => ({
  textAlign: $align ?? 'left',
  ...($right != null && {
    position: 'sticky',
    right: $right,
    zIndex: 1,
    backgroundColor: theme.TableHeaderBackground,
  }),
}));
