import styled from '@emotion/styled';

export const Container = styled.div`
  height: calc(100vh - 31vh);

  .bar {
    width: 100%;
    border-bottom: 1.5px solid ${({ theme }) => theme.TableRowsStroke};
    padding-bottom: 15px;
  }

  .div {
    display: flex;
    width: 635px;
  }
`;

export const ContainerContent = styled.div`
  width: 100%;
  display: flex;
  gap: 20px;
  justify-content: space-between;
  margin-top: 30px;
  padding: 0 2px;

  div {
    display: flex;
    gap: 20px;
    width: 100%;

    input {
      width: 350px;
      height: 40px;
    }

    button {
      width: 160px;
    }
  }

  @media (max-width: 768px) {
    flex-wrap: wrap;

    div {
      input {
        width: 300px;
      }
    }
  }

  .div-checkbox {
    width: fit-content;
    max-width: 100%;
    min-width: 0;
    flex: 0 1 auto;
    gap: 5px;
    align-items: center;
    justify-content: right;

    label {
      color: ${({ theme }) => theme.labelPrimary};
    }

    > label {
      flex: 0 1 auto;
      min-width: 0;
      overflow-wrap: anywhere;
    }

    > div {
      width: 15px;
      flex: 0 0 15px;
    }
  }
`;
