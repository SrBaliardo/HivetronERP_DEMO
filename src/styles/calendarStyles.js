import { css } from '@emotion/react';

export const calendarStyles = (theme) => css`
  html:root body input[type='date'] {
    padding-right: 10px;
  }

  html:root body input[type='date']::-webkit-calendar-picker-indicator {
    padding-right: 0;
    margin-right: 0;
    filter: none;
    background-image: none;
    background-color: ${theme.accentText};
    mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cpath%20d%3D%22M19%204h-1V2h-2v2H8V2H6v2H5c-1.11%200-1.99.9-1.99%202L3%2020c0%201.1.89%202%202%202h14c1.1%200%202-.9%202-2V6c0-1.1-.9-2-2-2m0%2016H5V10h14zM9%2014H7v-2h2zm4%200h-2v-2h2zm4%200h-2v-2h2zm-8%204H7v-2h2zm4%200h-2v-2h2zm4%200h-2v-2h2z%22%2F%3E%3C%2Fsvg%3E');
    mask-size: 16px 16px;
    mask-repeat: no-repeat;
    mask-position: center;
  }
`;
