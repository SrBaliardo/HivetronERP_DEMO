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
  }

  .ant-modal-body {
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
