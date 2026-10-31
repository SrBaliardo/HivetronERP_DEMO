import { css } from '@emotion/react';

export const modalStyles = (theme) => css`
  html:root body .ant-modal .ant-modal-content {
    border: 1px solid var(--modal-border-color, ${theme.borderButton});
  }

  html:root body .ant-modal .ant-modal-close,
  html:root body .ant-modal .ant-modal-close .anticon {
    color: #e33756;
  }
`;
