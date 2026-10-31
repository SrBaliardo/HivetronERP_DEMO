import styled from '@emotion/styled';

export const Container = styled.div`
  height: calc(100vh - 31vh);

  .bar {
    width: 100%;
    border-bottom: 1.5px solid ${({ theme }) => theme.TableRowsStroke};
    padding-bottom: 15px;
  }
`;

export const ContainerContent = styled.div`
  width: 830px;
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
      width: 100%;
    }

    button {
      width: 130px;
    }
  }

  @media (max-width: 768px) {
    width: 100%;

    div {
      input {
        width: 300px;
      }
    }
  }
`;
