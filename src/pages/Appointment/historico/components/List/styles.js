import styled from '@emotion/styled';
import CircleIcon from '@mui/icons-material/Circle';
export const StatusDot = styled(CircleIcon)`
  font-size: 14px;
  color: #a65c16;
  &[data-status='NOT_STARTED'] {
    color: ${({ theme }) => theme.statusNotStarted};
  }
  &[data-status='STARTED'] {
    color: ${({ theme }) => theme.statusStarted};
  }
  &[data-status='FINISHED'] {
    color: ${({ theme }) => theme.iconGreen};
  }
  &[data-status='CANCELED'] {
    color: #e33756;
  }
`;
