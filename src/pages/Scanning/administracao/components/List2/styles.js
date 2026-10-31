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
`;
