import { css } from '@emotion/react';

// O contorno pertence ao controle completo, inclusive campos compostos.
export const inputFocusStyles = css`
  html:root
    body
    input:where(
      :not([type='hidden']):not([type='checkbox']):not([type='radio']):not(
          [type='range']
        ):not([type='button']):not([type='submit']):not([type='reset']):not(
          [type='image']
        ):not([type='color'])
    ),
  html:root body textarea,
  html:root body select,
  html:root body [data-input-container],
  html:root body .ant-input-affix-wrapper,
  html:root body .ant-picker,
  html:root body .ant-select-selector,
  html:root body .MuiInputBase-root,
  html:root body .MuiOutlinedInput-notchedOutline {
    /* Raio absoluto, independente da largura e do breakpoint do controle. */
    border-radius: 10px;
  }

  button:focus-visible,
  a[href]:focus-visible {
    outline: 2px solid #ff8c00;
    outline-offset: 3px;
  }

  html:root
    body
    input:where(
      :not([type='hidden']):not([type='checkbox']):not([type='radio']):not(
          [type='range']
        )
    ):focus,
  html:root body textarea:focus,
  html:root body select:focus,
  html:root body [data-input-container]:focus-within,
  html:root body .ant-input-affix-wrapper:focus-within,
  html:root body .ant-picker:focus-within,
  html:root body .ant-select-focused .ant-select-selector,
  html:root body .MuiInputBase-root:focus-within {
    outline: 2px solid #ff8c00;
    outline-offset: -1px;
    border-color: transparent;
    box-shadow: none;
  }

  html:root body [data-input-container] input,
  html:root body .ant-input-affix-wrapper input,
  html:root body .ant-picker input,
  html:root body .ant-select-selector input,
  html:root body .MuiInputBase-root input,
  html:root body .MuiInputBase-root textarea {
    border-radius: 0;
    outline: none;
    border: 0;
    background: transparent;
    box-shadow: none;
  }

  html:root body .MuiInputBase-root:focus-within fieldset {
    border-color: transparent;
  }
  html:root
    body
    input:is([type='checkbox'], [type='radio'], [type='range']):focus-visible {
    outline: 2px solid #ff8c00;
    outline-offset: -1px;
  }
`;
