import styled from '@emotion/styled';

export const Container = styled.div`
  height: auto;
  flex-shrink: 0;
  width: 100%;
  overflow: visible;
  display: flex;
  flex-direction: column;
  gap: 20px;
  font-family: 'Roboto';

  .tool {
    color: ${({ theme }) => theme.accentText};
    font-size: 1rem;
    animation: spin 3s linear infinite;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  .tool2 {
    position: relative;
    top: 7px;
    animation: spin-reverse 3s linear infinite;

    @keyframes spin-reverse {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(-360deg);
      }
    }
  }

  a,
  span {
    color: #ffffff;
  }

  h1 {
    color: ${({ theme }) => theme.font};
    margin-top: 30px;
  }

  .div {
    display: flex;
    flex-direction: column;
  }

  .select-status {
    display: flex;
    flex-direction: column;
    width: 500px;
  }
`;

export const ContainerContent = styled.div`
  width: 100%;
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  min-width: 0;
  > .div {
    flex: 0 1 350px;
    min-width: 0;
    max-width: 100%;
  }
  border-bottom: 1.5px solid ${({ theme }) => theme.TableRowsStroke};
  padding: 0 2px 15px 2px;
  margin-top: 30px;

  input {
    width: 100%;
    min-width: 0;
    height: 40px;
  }

  button {
    width: 150px;
    flex: 0 0 auto;
    max-width: 100%;
    align-self: flex-end;
  }
`;
