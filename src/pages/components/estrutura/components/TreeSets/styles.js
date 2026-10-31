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
    color: ${({ theme }) => theme.spanRequired};
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

  .ant-tree-node-content-wrapper,
  .ant-tree-node-content-wrapper:hover {
    width: 100%;
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

  .ant-tree-switcher,
  .ant-tree-switcher:hover {
    color: #ffffff;
    &:hover:disabled {
      background-color: ${({ $isGrandChild, theme }) =>
        $isGrandChild ? theme.treeNodeLowLevel : theme.treeNodeHighLevel};
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
  background-color: ${({ $isGrandChild, theme }) =>
    $isGrandChild ? theme.treeNodeLowLevel : theme.treeNodeHighLevel};
  padding: 10px;
  border-radius: 7px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 30px;
  width: 100%;
  cursor: auto;

  span {
    width: 100%;
    font-size: 0.8rem;
  }
`;

export const DelButton = styled.button`
  background: transparent;
  cursor: pointer;
  font-size: 1rem;
`;
export const DownButton = styled.button`
  background: transparent;
  cursor: pointer;
  font-size: 1rem;
`;
export const UpButton = styled.button`
  background: transparent;
  cursor: pointer;
  font-size: 1rem;
`;
export const DetailButton = styled.button`
  background: transparent;
  cursor: pointer;
  font-size: 1rem;
`;

export const Container2 = styled.div`
  padding: 50px 0 20px;
  display: flex;
  gap: 20px;
  border-top: 1.5px solid ${({ theme }) => theme.TableRowsStroke};

  .div {
    display: flex;
    flex-direction: column;
    width: 83%;

    input {
      border: transparent;
      border-color: transparent;
      height: 30px;
    }

    span {
      color: ${({ theme }) => theme.accentText};
    }
  }

  .div-quantity {
    display: flex;
    flex-direction: column;
    width: 100px;
    justify-content: end;
  }

  .div-add {
    display: flex;
    align-items: end;

    button {
      width: 150px;
    }
  }
`;

export const ContainerButtons = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

  .div {
    display: flex;
    gap: 30px;
    justify-content: end;
  }
`;

export const ContainerE = styled.div`
  display: flex;
  justify-content: left;
`;
