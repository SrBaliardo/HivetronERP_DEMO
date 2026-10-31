import styled from '@emotion/styled';

export const TooltipContainer = styled.span`
  display: inline-block;
  font-family: 'Roboto';
  background-color: ${({ theme }) => theme.fillButtonBackground};
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

  .popover-content {
    position: absolute;
    bottom: 30px;
    left: 0;
    background-color: ${({ theme }) => theme.dropdownBackground};
    border: 1px solid ${({ theme }) => theme.formNoticeAdminBorder};
    padding: 10px;
    z-index: 1000;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
  }

  .pop-info {
    font-size: 0.7rem;
  }

  .pop-header {
    font-weight: bold;
    display: grid;
    grid-template-columns: repeat(3, 1fr);

    p {
      color: ${({ theme }) => theme.popTitle};
    }
  }

  .pop-content {
    display: grid;
    grid-template-columns: repeat(3, 1fr);

    p {
      color: ${({ theme }) => theme.popText};
    }
  }
`;
