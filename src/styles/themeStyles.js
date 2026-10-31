import { css, Global } from '@emotion/react';
import { createElement } from 'react';

export const darkTheme = {
  palette: { mode: 'dark', primary: { main: '#ff8c00' } },
  background: '#151515',
  backgroundColor: '#151515',
  loginLink: '#ffae42',
  tabText: '#ffffff',
  tabUnderline: '#ff7f00',
  tabNavBorder: '#384049',
  noticeboardBackground: '#282522',
  noticeboardStroke: '#384049',
  noticeboardAdminItemBackground: '#282522',
  noticeboardAdminItemText: '#d5cec7',
  formNoticeAdminBackground: '#1e1e1e',
  formNoticeAdminBorder: '#a5682e',
  formNoticeAdminText: '#e0d9d2',
  formNoticeAdminLabel: '#cbb59e',
  formNoticeAdminDisabledInput: '#2d2a27',
  spanRequired: '#ff7f00',
  deleteButtonText: '#ffffff',
  deleteButtonIcon: '#ffffff',
  editButtonIcon: '#b85b00',
  fillButtonBackground: '#d98b39',
  fillButtonText: '#21180f',
  borderButton: '#b68b5d',
  borderButtonText: '#f0d5b6',
  dropdownBackground: '#282522',
  dropdownText: '#e0d9d2',
  dropdownStroke: '#a5682e',
  dropdownHover: '#38312a',
  TableHeaderBackground: '#2b2b2b',
  TableHeaderText: '#f6eee7',
  TableHeaderStroke: '#6c7883',
  TableHeaderHoverBackground: '#3a3129',
  TableIconsColor: '#bbb0a5',
  TableRowsXBackground: '#262320',
  TableRowHoverBackground: '#332d27',
  TableRowsText: '#d5cec7',
  TableRowsStroke: '#384049',
  paginationItemColor: '#b8aca1',
  TableSorterArrowColor: '#dfab74',
  paginationActiveItemColor: '#ffae42',
  checkboxForm: '#ff8c00',
  treeNodeHighLevel: '#9c541b',
  treeNodeLowLevel: '#3a291c',
  popTitle: '#ffae42',
  popText: '#e0d9d2',
  buttonPrimary: '#d98b39',
  font: '#edf0f3',
  textSecondary: '#b8aca1',
  scrollbarThumb: '#a58a70',
  scrollbarThumbHover: '#c9a77f',
  paragraphPrimary: '#d5cec7',
  labelPrimary: '#cbb59e',
  iconPurple: '#ffae42',
  statusNotStarted: '#e4ce69',
  statusStarted: '#80a6ff',
  iconGreen: '#00e0aa',
  iconRed: '#e33756',
  disabled: '#6c7883',
  backgroundContent: '#151515',
  defaultBackground: '#161d30',
  secondaryText: '#b8aca1',
  allInputsBackground: '#1e1e1e',
  allInputsText: '#e0e0e9',
  allInputsPlaceholder: '#b8aca1',
  allInputsBorder: 'rgba(108, 120, 131, .4)',
  backgroundHeader: '#151515',
  defaultTextHeader: '#ffffff',
  DateTimeHeader: '#b8aca1',
  textHelloEmailHeader: '#b8aca1',
  spanUserHeader: '#e7bd8e',
  colorButtonsHeader: '#b8aca1',
  hoverButtonsHeader: '#f0d5b6',
  thumbThemeSwitch: '#fff3e4',
  trackThemeSwitch: '#9f5e22',
  inputLoginBackground: '#f5f5f5',
  inputLoginBorder: '#ff8c00',
  inputLoginLabel: '#ffffff',
  inputLoginText: '#6c7883',
  backgroundSideMenu: '#24201d',
  activeLinkSideMenu: '#ffffff',
  defaultLinkSideMenu: '#c4b5a7',
  selectedSideMenu: '#ff8c00',
  hoverLinkSideMenu: '#ffcf96',
  hoverSideMenu: '#ff8c00',
  noticeHomeBackground: '#282522',
  noticeHomeStroke: '#384049',
  noticeHomeDate: '#ff8c00',
  noticeHomeTitle: '#ffffff',
  noticeHomeText: '#ffffff',
  TableHoverIconsColor: '#dfab74',
  buttonFilledBackground: '#d98b39',
  buttonFilledText: '#21180f',
  buttonBorderedBorderCancel: '#e33756',
  buttonBorderedBorderPrev: '#b68b5d',
  buttonBorderedText: '#f0d5b6',
  blackDefault: '#000000',
  whiteDefault: '#ffffff',
  whiteF5: '#f5f5f5',
  orangeLight: '#f9b802',
  orangeMedium: '#ff8c00',
  grayA1: '#a1a1a1',
  grayBA: '#bababa',
  accent: '#ff8c00',
  accentText: '#ffae42',
  fillButtonHoverBackground: '#eba04e',
  borderButtonHoverBackground: '#34291e',
  switchTrackBorder: '#c99a69',
  dangerFillBackground: '#b5223f',
  dangerFillText: '#ffffff',
  dangerFillHoverBackground: '#c22c49',
  focusRing: '#ff8c00',
  menuHover: '#3a291c',
  menuStripe: '#ff8c00',
  menuActiveText: '#ffae42',
};

export const lightTheme = {
  palette: { mode: 'light', primary: { main: '#ff8c00' } },
  background: '#fcfcfc',
  backgroundColor: '#fcfcfc',
  loginLink: '#9c4d00',
  tabText: '#1f1f1f',
  tabUnderline: '#ff7f00',
  tabNavBorder: '#bababa',
  noticeboardBackground: '#f2ede7',
  noticeboardStroke: '#bababa',
  noticeboardAdminItemBackground: '#f2ede7',
  noticeboardAdminItemText: '#65594e',
  formNoticeAdminBackground: '#f5f5f5',
  formNoticeAdminBorder: '#b98c64',
  formNoticeAdminText: '#3d352e',
  formNoticeAdminLabel: '#65594e',
  formNoticeAdminDisabledInput: '#e5e5e5',
  spanRequired: '#ff7f00',
  deleteButtonText: '#e33756',
  deleteButtonIcon: '#e33756',
  editButtonIcon: '#6c7883',
  fillButtonBackground: '#a84e00',
  fillButtonText: '#ffffff',
  borderButton: '#a87950',
  borderButtonText: '#874000',
  dropdownBackground: '#faf7f3',
  dropdownText: '#3d352e',
  dropdownStroke: '#b98c64',
  dropdownHover: '#efe4d8',
  TableHeaderBackground: '#ffdcb5',
  TableHeaderText: '#49311f',
  TableHeaderStroke: '#bababa',
  TableHeaderHoverBackground: '#f0cda7',
  TableIconsColor: '#6c7883',
  TableRowsXBackground: '#f5f5f5',
  TableRowHoverBackground: '#f1e8de',
  TableRowsText: '#40372f',
  TableRowsStroke: '#d3d3d3',
  paginationItemColor: '#3d3c4b',
  TableSorterArrowColor: '#9c4d00',
  paginationActiveItemColor: '#9c4d00',
  checkboxForm: '#ff8c00',
  treeNodeHighLevel: '#c67b38',
  treeNodeLowLevel: '#ead4bf',
  popTitle: '#9c4d00',
  popText: '#3d352e',
  buttonPrimary: '#a84e00',
  font: '#34302c',
  textSecondary: '#65594e',
  scrollbarThumb: '#94765c',
  scrollbarThumbHover: '#72543b',
  paragraphPrimary: '#40372f',
  labelPrimary: '#65594e',
  iconPurple: '#b85b00',
  statusNotStarted: '#8b6900',
  statusStarted: '#2353d8',
  iconGreen: '#087b59',
  disabled: '#6c7883',
  iconRed: '#e33756',
  backgroundContent: '#fcfcfc',
  defaultBackground: '#161d30',
  secondaryText: '#65594e',
  allInputsText: '#3d3c4b',
  allInputsPlaceholder: '#6c7883',
  allInputsBorder: 'rgba(108, 120, 131, .4)',
  backgroundHeader: '#fcfcfc',
  defaultTextHeader: '#1f1f1f',
  DateTimeHeader: '#65594e',
  textHelloEmailHeader: '#65594e',
  spanUserHeader: '#874000',
  colorButtonsHeader: '#65594e',
  hoverButtonsHeader: '#874000',
  thumbThemeSwitch: '#fffdf9',
  trackThemeSwitch: '#927b66',
  inputLoginBackground: '#f5f5f5',
  inputLoginBorder: '#ff8c00',
  inputLoginLabel: '#ffffff',
  inputLoginText: '#6c7883',
  backgroundSideMenu: '#f0e9e2',
  activeLinkSideMenu: '#ffffff',
  defaultLinkSideMenu: '#574737',
  selectedSideMenu: '#ff8c00',
  hoverLinkSideMenu: '#7a3b08',
  hoverSideMenu: '#ff8c00',
  noticeHomeBackground: '#f2ede7',
  noticeHomeStroke: '#bababa',
  noticeHomeDate: '#ff8c00',
  noticeHomeTitle: '#384049',
  noticeHomeText: '#384049',
  TableHoverIconsColor: '#9c4d00',
  buttonFilledBackground: '#a84e00',
  buttonFilledText: '#ffffff',
  buttonBorderedBorderCancel: '#e33756',
  buttonBorderedBorderPrev: '#a87950',
  buttonBorderedText: '#874000',
  blackDefault: '#000000',
  whiteDefault: '#ffffff',
  whiteF5: '#f5f5f5',
  orangeLight: '#f9b802',
  orangeMedium: '#ff8c00',
  grayA1: '#a1a1a1',
  grayBA: '#bababa',
  accent: '#ff8c00',
  accentText: '#9c4d00',
  fillButtonHoverBackground: '#b15300',
  borderButtonHoverBackground: '#f4e8dc',
  switchTrackBorder: '#79614d',
  dangerFillBackground: '#b5223f',
  dangerFillText: '#ffffff',
  dangerFillHoverBackground: '#c22c49',
  focusRing: '#ff8c00',
  allInputsBackground: '#f5f5f5',
  menuHover: '#f5dfc8',
  menuStripe: '#ff8c00',
  menuActiveText: '#8b4200',
};

function ThemeStyles() {
  return createElement(Global, {
    styles: (theme) => css`
      body {
        --hivetron-focus-ring: ${theme.focusRing};
        background: ${theme.background};
        color: ${theme.font};
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        font-family: 'Roboto';
      }

      .background-content {
        background-color: ${theme.backgroundColor};
      }

      .login-link {
        color: ${theme.loginLink};
      }

      .login-input {
        color: ${theme.formNoticeAdminText};
        border-color: ${theme.formNoticeAdminBorder};
        background-color: ${theme.formNoticeAdminBackground};
        border-radius: 10px;
      }

      .input {
        color: ${theme.formNoticeAdminText};
        border: 1.5px solid ${theme.formNoticeAdminBorder};
        background-color: ${theme.formNoticeAdminBackground};
        border-radius: 10px;
        padding-left: 10px;
      }

      .tab-text {
        color: ${theme.tabText};
      }

      .tab-underline {
        background-color: ${theme.tabUnderline};
      }

      .tab-nav-border {
        border-color: ${theme.tabNavBorder};
      }

      .noticeboard-background {
        background-color: ${theme.noticeboardBackground};
      }

      .noticeboard-stroke {
        border-color: ${theme.noticeboardStroke};
      }

      .notice-item-admin {
        background-color: ${theme.noticeboardAdminItemBackground};
        color: ${theme.noticeboardAdminItemText};
      }

      html:root body button.fill-button span {
        color: ${theme.fillButtonText};
      }
      html:root body button.border-button span {
        color: ${theme.borderButtonText};
      }

      .delete-button {
        color: ${theme.deleteButtonText};
      }

      .edit-button {
        color: ${theme.editButtonIcon};
      }

      html:root body button.fill-button {
        background-color: ${theme.fillButtonBackground};
        color: ${theme.fillButtonText};

        span {
          color: ${theme.fillButtonText};
        }
      }

      html:root body button.fill-button,
      html:root body button.border-button {
        font-weight: 500;
        transition: background-color 160ms ease;
        svg,
        .anticon {
          color: inherit;
        }
      }

      @media (hover: hover) {
        html:root
          body
          button.fill-button:not(:disabled):not([aria-disabled='true']):hover {
          filter: none;
          background-color: ${theme.fillButtonHoverBackground};
        }
        html:root
          body
          button.border-button:not(:disabled):not(
            [aria-disabled='true']
          ):hover {
          filter: none;
          background-color: ${theme.borderButtonHoverBackground};
        }
      }

      html:root body button.border-button {
        border-color: ${theme.borderButton};
        color: ${theme.borderButtonText};
      }

      .form-notice-admin-input {
        color: ${theme.formNoticeAdminText};
        border-color: ${theme.formNoticeAdminBorder};
        background-color: ${theme.formNoticeAdminBackground};
      }

      .form-notice-admin-label {
        color: ${theme.formNoticeAdminLabel};
      }

      .form-notice-admin-disabled-input {
        background-color: ${theme.formNoticeAdminDisabledInput};
        color: ${theme.formNoticeAdminText};
      }

      .span-required {
        color: ${theme.spanRequired};
      }

      .table-header-background {
        background-color: ${theme.TableHeaderBackground};
      }

      .table-rows-background {
        background-color: ${theme.backgroundColor};
      }

      .table-rows-x-background {
        background-color: ${theme.TableRowsXBackground};
      }

      .selected-column {
        background-color: ${theme.selectedColumnBackgroundColor};
      }

      :root .loading-message {
        color: ${theme.TableHeaderText};
      }

      .table-title {
        color: ${theme.TableHeaderText};
      }

      .table-rows-text {
        color: ${theme.TableRowsText};
      }

      .table-header-stroke {
        border-color: ${theme.TableHeaderStroke};
      }

      .table-rows-stroke {
        border-color: ${theme.TableRowsStroke};
      }

      .table-icons {
        color: ${theme.TableIconsColor};
      }

      .table-sorter-arrow {
        color: ${theme.TableSorterArrowColor};
      }

      .pagination-item {
        color: ${theme.paginationItemColor};
      }

      .pagination-active-item {
        color: ${theme.paginationActiveItemColor};
        border-color: ${theme.paginationActiveItemColor};
        background-color: ${theme.backgroundColor};
      }

      .checkbox-form {
        background-color: ${theme.checkboxForm};
      }

      .tree-node-high-background {
        background-color: ${theme.treeNodeHighLevel};
      }

      .tree-node-low-background {
        background-color: ${theme.treeNodeLowLevel};
      }

      .button-primary {
        background-color: ${theme.buttonPrimary};
      }

      .paragraph-primary {
        color: ${theme.paragraphPrimary};
      }

      .label-primary {
        color: ${theme.labelPrimary};
      }

      .icon-purple {
        color: ${theme.iconPurple};
      }

      .icon-green {
        color: ${theme.iconGreen};
      }

      .icon-red {
        color: ${theme.iconRed};
      }

      button {
        font-family: 'Roboto';
        background-color: ${theme.buttonPrimary}; /* Default button style */
      }

      p {
        color: ${theme.font}; /* Default button style */
      }
    `,
  });
}

export default ThemeStyles;
