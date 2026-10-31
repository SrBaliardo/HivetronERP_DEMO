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

  &:focus-visible {
    outline: 2px solid #e33756;
    outline-offset: 2px;
  }
`;

export const TrashIcon = styled.img`
  width: 18px;
  height: 18px;
`;
