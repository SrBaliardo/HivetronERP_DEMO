import { css, Global } from '@emotion/react';
import { createElement } from 'react';

function GlobalStyles() {
  return createElement(Global, {
    styles: (theme) => css`
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        outline: none;
        border: none;
        text-decoration: none;
        list-style: none;

        &::-webkit-scrollbar {
          width: 8px;
        }

        &::-webkit-scrollbar-thumb {
          background-color: ${theme.scrollbarThumb};
          border-radius: 5px;
        }

        &::-webkit-scrollbar-thumb:hover {
          background-color: ${theme.scrollbarThumbHover};
        }

        &::-webkit-scrollbar-track {
          background: transparent;
        }
      }

      a {
        cursor: pointer;
      }

      button {
        cursor: pointer;
        transition:
          filter 160ms ease,
          opacity 160ms ease;
      }

      button:not([role='option']) {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 5px;
      }

      button > .anticon {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        line-height: 0;
        flex-shrink: 0;
        align-self: center;
      }

      button > .anticon > svg,
      button > svg,
      button > img {
        display: block;
        flex-shrink: 0;
        align-self: center;
      }

      @media (hover: hover) {
        button:not(:disabled):not([aria-disabled='true']):not(
            [role='option']
          ):hover {
          filter: brightness(1.25);
        }
      }

      button:not(:disabled):not([aria-disabled='true']):not(
          [role='option']
        ):active {
        filter: brightness(0.92);
      }

      @media (prefers-reduced-motion: reduce) {
        html:root body button {
          transition: none;
          transform: none;
        }
      }

      input,
      textarea {
        font-family: 'Roboto';

        &::placeholder {
          color: ${theme.textSecondary};
          opacity: 1;
        }
      }
    `,
  });
}

export default GlobalStyles;
