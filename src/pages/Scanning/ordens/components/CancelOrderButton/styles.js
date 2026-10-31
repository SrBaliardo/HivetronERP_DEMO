import { CloseCircleOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';

export const ButtonContainer = styled.button`
  width: 200px;
  height: 40px;
  border: 1.5px solid #e33756;
  border-radius: 10px;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  font-size: 0.9rem;
`;

export const CancelIcon = styled(CloseCircleOutlined)`
  color: ${({ theme }) => theme.deleteButtonText} !important;
  font-size: 1rem;
`;
