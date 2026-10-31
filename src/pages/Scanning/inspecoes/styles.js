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
    /* color: #ffffff; */
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
    padding-right: 30px;

    p {
      padding-left: 5px;
      color: ${({ theme }) => theme.labelPrimary};
      font-size: 0.9rem;
    }
  }
`;

export const ContainerContent = styled.div`
  width: 100%;
  display: flex;
  gap: 20px;
  justify-content: space-between;
  /* border-bottom: 1.5px solid ${({ theme }) => theme.TableRowsStroke}; */
  padding-bottom: 30px;
  margin-top: 30px;

  div {
    display: flex;

    input {
      width: 350px;
      height: 40px;
    }
  }

  button {
    align-self: flex-end;
  }
`;
