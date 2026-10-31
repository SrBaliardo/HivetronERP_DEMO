import styled from '@emotion/styled';

export const TooltipContainer = styled.span`
  display: inline-block;
  font-family: 'Roboto';
  position: relative;

  .tooltip-container {
    display: inline-block;
  }

  .tooltip-icon {
    color: #ffffff;
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
    right: 0;
    background-color: ${({ theme }) => theme.dropdownBackground};
    border: 1px solid ${({ theme }) => theme.formNoticeAdminBorder};
    padding: 5px;
    z-index: 1000;
    width: max-content;
    height: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 7px;
    color: ${({ theme }) => theme.popText};
    font-size: 0.8rem;
  }
`;
