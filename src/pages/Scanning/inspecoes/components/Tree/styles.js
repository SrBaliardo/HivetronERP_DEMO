import styled from '@emotion/styled';

export const Container = styled.div`
  max-height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 25px;
  font-family: 'Roboto';

  input {
    height: 35px;
    border: 1.5px solid;
    border-color: ${({ theme }) => theme.formNoticeAdminBorder};
    color: ${({ theme }) => theme.formNoticeAdminText};
    background-color: ${({ theme }) => theme.formNoticeAdminBackground};
    border-radius: 7px;
    padding-left: 10px;
  }
  input[type='number']::-webkit-inner-spin-button,
  input[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none;
  }

  label {
    color: ${({ theme }) => theme.labelPrimary};
    margin-bottom: 5px;
  }

  span {
    color: ${({ theme }) => theme.font} !important;
  }

  div {
    width: 100%;
  }

  button {
    font-size: 0.9rem;
    height: 35px;

    span {
      color: #ffffff;
      font-size: 1rem;
    }
  }

  .ant-tree {
    background: transparent;
    width: 100%;

    .anticon {
      font-size: 1rem;
      padding: 7px;
    }
  }

  .ant-tree-title {
    display: block;
    width: 100%;
  }

  .ant-tree-checkbox {
    display: none;
  }

  .ant-tree-node-content-wrapper,
  .ant-tree-node-content-wrapper:hover {
    flex: 1;
    min-width: 0;
    width: auto;
    border-radius: 0;
    border-top-right-radius: 7px;
    border-bottom-right-radius: 7px;

    span {
      color: #ffffff;
    }
  }

  .ant-tree-treenode.ant-tree-treenode-switcher-open,
  .ant-tree-treenode.ant-tree-treenode-switcher-close {
    width: 100%;
  }

  .ant-tree-node-content-wrapper.ant-tree-node-content-wrapper-open.ant-tree-node-selected,
  .ant-tree-node-content-wrapper.ant-tree-node-content-wrapper-close.ant-tree-node-selected,
  .ant-tree-node-content-wrapper.ant-tree-node-content-wrapper-normal.ant-tree-node-selected {
    background-color: transparent;
  }

  .ant-tree-switcher {
    display: flex;
    align-items: center;
    justify-content: center;
    align-self: stretch;

    .anticon {
      padding: 0;
    }
  }

  .ant-tree-switcher,
  .ant-tree-switcher:hover {
    color: #ffffff;
    &:hover:disabled {
      background-color: transparent;
    }

    span {
      color: ${({ theme }) => theme.borderButtonText};
    }
  }

  .ant-tree-switcher-leaf-line::after,
  .ant-tree-switcher-leaf-line::before,
  .ant-tree-indent-unit::before {
    border-color: #6c63b5;
    color: #6c63b5;
  }
`;

export const TreeNode = styled.div`
  background-color: transparent;
  padding: 10px;
  border-radius: 7px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 30px;
  gap: 12px;
  width: 100%;
  cursor: auto;

  > span {
    flex: 1;
    min-width: 0;
    overflow-wrap: anywhere;
    font-size: 0.8rem;
  }

  > div {
    flex: 0 0 15px;
    width: 15px;
    margin-left: auto;

    .chk {
      margin-bottom: 0;
    }
  }
`;
