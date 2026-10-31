import {
  FolderOpenOutlined,
  FolderOutlined,
  ToolOutlined,
  ProductOutlined,
} from '@ant-design/icons';
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
    margin-top: 70px;
  }

  input {
    height: 35px;
    width: 60px;
    margin-left: 10px;
  }

  label {
    color: ${({ theme }) => theme.font};
    padding: 10px 0 5px 2px;
    font-weight: 500;
  }

  .options-list {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 16px 0;
    gap: 8px;
  }

  .container-details {
    display: flex;
    flex-direction: column;
    gap: 10px;
    justify-content: center;
    text-align: left;
  }

  .item {
    display: flex;
    align-items: center;
    font-size: 1rem;
    color: ${({ theme }) => theme.font};
    cursor: pointer;

    input[type='radio'] {
      appearance: none;
      -webkit-appearance: none;
      background-color: transparent;
      border: thin solid ${({ theme }) => theme.formNoticeAdminBorder};
      border-radius: 50%;
      width: 15px;
      height: 15px;
      display: inline-block;
      cursor: pointer;
      outline: none;
      position: relative;
      margin-right: 10px;

      &:checked {
        border-color: ${({ theme }) => theme.labelPrimary};
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
        background-color: ${({ theme }) => theme.spanRequired};
      }
    }
  }

  .details {
    padding-left: 50px;
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
`;

export const ButtonModal = styled.button`
  background: transparent;
  color: ${({ theme }) => theme.iconGreen};

  && .anticon {
    color: inherit;
  }

  font-size: 1.5rem;
  width: fit-content;
`;

export const OpenedFolder = styled(FolderOpenOutlined)`
  font-size: 1.5rem;
  width: fit-content;
  color: ${({ theme }) => theme.spanRequired};
  padding-left: 35px;
`;

export const ClosedFolder = styled(FolderOutlined)`
  font-size: 1.5rem;
  width: fit-content;
  color: ${({ theme }) => theme.spanRequired};
  padding-left: 35px;
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

export const DetailButton = styled.button`
  background: transparent;
  cursor: pointer;
  color: inherit;
`;
