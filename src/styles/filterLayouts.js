import { css } from '@emotion/react';

export const filterMetrics = css`
  --filter-gap: 20px;
  --search-width: 350px;
  --date-width: 120px;
  --status-width: 160px;

  @media (max-width: 768px) {
    --filter-gap: 8px;
    --search-width: 230px;
  }
`;

export const listSearchToolbarStyles = (theme) => css`
  ${filterMetrics}
  width: 100%;
  min-width: 0;
  display: grid;
  grid-template-columns: minmax(0, var(--search-width)) auto;
  align-items: end;
  justify-content: space-between;
  gap: 20px var(--filter-gap);
  border-bottom: 1.5px solid;
  border-color: ${theme.TableRowsStroke};
  padding: 0 2px 16px;
  margin-top: 24px;

  > div:first-of-type,
  > form {
    min-width: 0;
    max-width: 100%;
  }

  input {
    width: 100%;
    min-width: 0;
    height: 40px;
  }

  && > [data-filter-actions] {
    grid-column: 2;
    grid-row: 1;
    width: auto;
    flex-wrap: wrap;
  }

  > button,
  > .button-goback {
    grid-column: 1 / -1;
    grid-row: 2;
    justify-self: end;
    min-width: 0;
    max-width: 100%;
  }

  > button {
    width: 100%;
    max-width: 200px;
  }
`;

export const dateRangeStyles = css`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--filter-gap);
  width: calc(2 * var(--date-width) + var(--filter-gap));
  min-width: 0;
  flex: 0 1 calc(2 * var(--date-width) + var(--filter-gap));

  > .div {
    min-width: 0;
  }

  .input-date {
    width: 100%;
    min-width: 0;
    height: 40px;
  }

  &:has(> .div:only-child) {
    grid-template-columns: minmax(0, 1fr);
    width: var(--date-width);
    flex-basis: var(--date-width);
  }
`;

export const codeDateRowStyles = css`
  display: flex;
  align-items: flex-end;
  gap: var(--filter-gap);
  width: 100%;
  min-width: 0;

  > .div,
  > .responsive-div {
    flex: 0 1000 var(--search-width);
    min-width: 60px;
    max-width: var(--search-width);
  }
`;

export const dateStatusRowStyles = css`
  display: flex;
  align-items: flex-end;
  gap: var(--filter-gap);
  width: 100%;
  min-width: 0;

  .select-status {
    flex: 0 1 var(--status-width);
    width: var(--status-width);
    min-width: 0;
  }
`;
