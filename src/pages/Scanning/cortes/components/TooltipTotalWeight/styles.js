import styled from '@emotion/styled';
import Popper from '@mui/material/Popper';

export const TooltipContainer = styled.span`
  display: inline-block;
  font-family: 'Roboto';
  background-color: ${({ theme }) => theme.fillButtonBackground} !important;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  position: relative;

  .tooltip-container {
    display: inline-block;
  }

  .tooltip-icon {
    color: ${({ theme }) => theme.fillButtonText};
    cursor: pointer;
    &:focus-visible {
      outline: 2px solid #ff8c00;
      outline-offset: 3px;
    }
    text-align: center;
  }
`;

export const Popover = styled(Popper)`
  z-index: 1000;
  width: max-content;
  max-width: min(260px, calc(100vw - 32px));
  box-sizing: border-box;
  font-family: 'Roboto';
  white-space: normal;
  overflow-wrap: anywhere;
  background-color: ${({ theme }) => theme.dropdownBackground};
  border: 1px solid ${({ theme }) => theme.formNoticeAdminBorder};
  padding: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;

  .pop-info {
    font-size: 0.7rem;
  }

  .pop-header {
    font-weight: bold;

    p {
      color: ${({ theme }) => theme.popTitle};
    }
  }

  .pop-content {
    p {
      color: ${({ theme }) => theme.popText};
    }
  }
`;
