import { css } from '@emotion/react';

export const radioInputStyles = ({ theme }) => css`
  appearance: none;
  -webkit-appearance: none;
  background-color: transparent;
  border: thin solid ${theme.formNoticeAdminBorder};
  border-radius: 50%;
  width: 15px;
  height: 15px;
  display: inline-block;
  cursor: pointer;
  outline: none;
  position: relative;

  &:checked {
    border-color: ${theme.labelPrimary};
    background-color: transparent;
  }

  &:checked::before {
    content: '';
    position: absolute;
    top: 2px;
    left: 2px;
    width: 9px;
    height: 9px;
    border-radius: 50%;
    background-color: ${theme.spanRequired};
  }
`;
