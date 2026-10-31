import styled from '@emotion/styled';
import EditNoteIcon from '@mui/icons-material/EditNote';

export const ButtonContainer = styled.button`
  width: fit-content;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  font-size: 0.9rem;
  background-color: transparent !important;
`;

export const EditIcon = styled(EditNoteIcon)`
  color: ${({ theme }) => theme.font} !important;
  font-size: 1rem;
`;
