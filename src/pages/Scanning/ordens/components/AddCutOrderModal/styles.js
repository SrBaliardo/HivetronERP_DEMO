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
  }

  .ant-modal-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 70px;
  }

  p {
    color: ${({ theme }) => theme.font};
    margin-top: 30px;
    margin-bottom: 30px;
    text-align: center;
    font-size: 1rem;
  }
`;
