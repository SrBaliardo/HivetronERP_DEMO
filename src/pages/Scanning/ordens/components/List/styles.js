import styled from '@emotion/styled';

export const Container = styled.div`
  height: calc(100vh - 31vh);
  width: 100%;
  overflow: auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
  font-family: 'Roboto';

  a,
  span {
    color: #ffffff;
  }

  .input-date {
    width: 120px;
    cursor: text;
    padding: 0 0 0 7px;
  }

  input[type='date']::-webkit-calendar-picker-indicator {
    cursor: pointer;
    font-size: 0.9rem;
    padding: 3px 7px 0 0;
  }

  .div {
    display: flex;
    flex-direction: column;
  }

  .button-goback {
    button {
      width: 110px;
    }
  }

  .select-status {
    display: flex;
    flex-direction: column;
  }
`;

export const ContainerContent = styled.div`
  width: 100%;
  min-width: 0;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  gap: 20px;
  border-bottom: 1.5px solid ${({ theme }) => theme.TableRowsStroke};
  padding: 0 2px 15px 2px;
  margin-top: 24px;

  > .div {
    flex: 1 1 280px;
    min-width: 0;
  }

  input {
    width: 100%;
    min-width: 0;
    max-width: 100%;
    height: 40px;
  }

  .div-date {
    display: flex;
    flex: 0 1 120px;
    min-width: 120px;
  }

  .status-n-buttons {
    display: flex;
    flex: 1 1 450px;
    min-width: 0;
    flex-wrap: wrap;
    align-items: flex-end;
    gap: 20px;
    justify-content: space-between;
    padding-right: 3px;
  }

  .select-status {
    flex: 0 1 200px;
    min-width: 0;
    max-width: 100%;

    > div {
      width: 100%;
    }

    [role='combobox'] {
      height: 40px;
    }
  }
`;

export const ContainerButtonsHeader = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  gap: 20px;
  max-width: 100%;
  padding-right: 3px;
  justify-content: flex-end;

  > button,
  .button-goback > button {
    flex-shrink: 0;
  }
`;

export const ContainerButtons = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 10px 7px 10px;

  .div-b {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  @media (max-width: 768px) {
    position: relative;
    bottom: 20px;
    padding-bottom: 30px;
    p {
      font-size: 0.8rem;
    }
    button {
      width: 130px;
    }
  }
`;

export const StatusDot = styled.span`
  display: inline-block;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: #a65c16;
  &[data-status='NOT_STARTED'] {
    background: ${({ theme }) => theme.statusNotStarted};
  }
  &[data-status='STARTED'] {
    background: ${({ theme }) => theme.statusStarted};
  }
  &[data-status='FINISHED'] {
    background: ${({ theme }) => theme.iconGreen};
  }
  &[data-status='CANCELED'] {
    background: #e33756;
  }
`;
