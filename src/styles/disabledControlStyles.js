import { css } from '@emotion/react';

export const disabledControlStyles = (theme) => css`
  html:root body :disabled,
  html:root
    body
    input[readonly]:not(
      :where(
          [data-input-container] input,
          .ant-input-affix-wrapper input,
          .ant-picker input,
          .ant-select-selector input,
          .MuiInputBase-root input
        )
    ),
  html:root body textarea[readonly]:not(:where(.MuiInputBase-root textarea)),
  html:root body [aria-disabled='true'],
  html:root body [aria-disabled='true'] *,
  html:root body label:has(input:disabled),
  html:root body label:has(input:disabled) *,
  html:root
    body
    [data-input-container]:has(:is(input, textarea, select):disabled),
  html:root
    body
    [data-input-container]:has(:is(input, textarea, select):disabled)
    *,
  html:root body .MuiSwitch-root:has(input:disabled),
  html:root body .MuiSwitch-root:has(input:disabled) *,
  html:root body .ant-input-affix-wrapper-disabled,
  html:root body .ant-input-affix-wrapper-disabled *,
  html:root body .ant-select-disabled,
  html:root body .ant-select-disabled *,
  html:root body .ant-picker-disabled,
  html:root body .ant-picker-disabled *,
  html:root body .MuiInputBase-root.Mui-disabled,
  html:root body .MuiInputBase-root.Mui-disabled * {
    /* A regra global prevalece sobre os cursores dos ícones e controles locais. */
    cursor: not-allowed !important;
  }

  html:root
    body
    input:is(
      [type='date'],
      [type='datetime-local'],
      [type='time'],
      [type='month'],
      [type='week']
    ):is(:disabled, [readonly])::-webkit-calendar-picker-indicator,
  html:root body input:is(:disabled, [readonly])::-webkit-inner-spin-button,
  html:root body input:is(:disabled, [readonly])::-webkit-outer-spin-button,
  html:root body input:disabled::file-selector-button {
    cursor: not-allowed !important;
  }

  html:root
    body
    input:where(
      :not([type='hidden']):not([type='checkbox']):not([type='radio']):not(
          [type='range']
        ):not([type='button']):not([type='submit']):not([type='reset']):not(
          [type='image']
        ):not([type='color'])
    ):is(:disabled, [readonly]):not(
      :where(
          [data-input-container] input,
          .ant-input-affix-wrapper input,
          .ant-picker input,
          .ant-select-selector input,
          .MuiInputBase-root input
        )
    ),
  html:root
    body
    textarea:is(:disabled, [readonly]):not(:where(.MuiInputBase-root textarea)),
  html:root body select:disabled,
  html:root body [data-input-container][aria-disabled='true'],
  html:root
    body
    [data-input-container]:has(:is(input, textarea, select):disabled),
  html:root body .ant-input-affix-wrapper-disabled,
  html:root body .ant-select.ant-select-disabled .ant-select-selector,
  html:root body .ant-picker-disabled,
  html:root body .MuiInputBase-root.Mui-disabled {
    background-color: var(
      --disabled-input-background,
      ${theme.formNoticeAdminDisabledInput}
    );
  }
`;
