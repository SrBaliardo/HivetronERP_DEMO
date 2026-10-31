import styled from '@emotion/styled';

import { LoadingModal } from '../../../../../components/LoadingModal';

export const ModalContainer = styled(LoadingModal)`
  font-family: 'Roboto';
  input:focus-visible {
    outline: 2px solid #ff8c00;
    outline-offset: -1px;
  }
  button:focus-visible {
    outline: 2px solid #b85b00;
    outline-offset: 2px;
  }

  .ant-modal-content {
    background-color: ${({ theme }) => theme.backgroundColor};
  }

  .ant-modal-header {
    background-color: ${({ theme }) => theme.backgroundColor};
  }

  .ant-modal-title {
    color: ${({ theme }) => theme.font};
    font-size: 1.5rem;
  }

  .ant-modal-body {
    display: flex;
    flex-direction: column;
  }

  form {
    display: flex;
    flex-direction: column;
  }

  .ant-modal-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 70px;
  }

  input {
    height: 40px;
    border-radius: 10px;
    margin-bottom: 15px;
  }

  label {
    color: ${({ theme }) => theme.font};
    padding: 10px 0 5px 2px;
  }
`;
