import { ToolOutlined, ProductOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';

import { LoadingModal } from '../../../../../components/LoadingModal';

export const ModalContainer = styled(LoadingModal)`
  font-family: 'Roboto';

  .ant-modal-content {
    background-color: ${({ theme }) => theme.backgroundColor};
  }

  .ant-modal-header {
    background-color: ${({ theme }) => theme.backgroundColor};
  }

  .ant-modal-title {
    color: ${({ theme }) => theme.font};
    font-size: 1.5rem;
    text-align: center;
  }

  .ant-modal-body {
    display: flex;
    flex-direction: column;
    text-align: center;
  }

  .ant-modal-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .container-details {
    display: flex;
    flex-direction: column;
    gap: 10px;
    justify-content: center;
    align-items: center;
    text-align: left;
  }

  .tools-list {
    margin-top: 20px;
  }

  p {
    color: ${({ theme }) => theme.dropdownText};
    margin-bottom: 8px;
  }

  hr {
    width: 100%;
    padding: 0.01rem;
    opacity: 0.35;
    background-color: #6c7883;
    margin-bottom: 25px;
  }

  h3 {
    color: ${({ theme }) => theme.font};
  }
`;

export const ToolIcon = styled(ToolOutlined)`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.iconPurple};
  padding-right: 10px;
`;

export const ToolDataIcon = styled(ProductOutlined)`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.iconPurple};
  padding-right: 10px;
`;
