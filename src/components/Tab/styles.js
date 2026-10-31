import styled from '@emotion/styled';

export const Container = styled.div`
  width: 100%;
  background-color: transparent;

  .ant-tabs-content {
    overflow-y: auto;
  }

  .ant-tabs-ink-bar.ant-tabs-ink-bar-animated {
    background-color: ${({ theme }) => theme.tabUnderline};
  }

  .ant-tabs-nav::before {
    border-color: ${({ theme }) => theme.tabNavBorder};
  }

  .ant-tabs-tab {
    font-family: 'Roboto';
    color: ${({ theme }) => theme.tabText};
    &:hover {
      color: ${({ theme }) => theme.tabText};
    }
  }

  .ant-tabs-tab-btn {
    font-size: 1rem;
  }

  &&
    .ant-tabs-tab:not(.ant-tabs-tab-disabled)
    .ant-tabs-tab-btn:focus:not(:focus-visible) {
    color: ${({ theme }) => theme.tabText};
  }

  && .ant-tabs-tab:not(.ant-tabs-tab-disabled) .ant-tabs-tab-btn:active,
  && .ant-tabs-tab:not(.ant-tabs-tab-disabled):active .ant-tabs-tab-btn {
    color: ${({ theme }) => theme.tabText};
    filter: brightness(0.82);
  }

  .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
    color: ${({ theme }) => theme.tabText};
  }

  .ant-tabs-tab.ant-tabs-tab-disabled {
    color: #6c7883;
  }
`;
