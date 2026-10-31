import styled from '@emotion/styled';

export const Container = styled.section`
  box-sizing: border-box;
  width: 100%;
  max-width: 720px;
  margin: 24px auto;
  padding: 24px;
  border: 1px solid ${({ theme }) => theme.TableRowsStroke};
  border-radius: 10px;
  background: ${({ theme }) => theme.backgroundColor};
  color: ${({ theme }) => theme.font};
  font-family: Roboto, Arial, sans-serif;
  overflow-wrap: anywhere;
  h2 {
    margin: 0 0 16px;
    color: ${({ theme }) => theme.TableHeaderText};
    font-size: 1.25rem;
  }
  p {
    margin: 0 0 16px;
    line-height: 1.5;
  }
  @media (max-width: 480px) {
    padding: 16px;
    margin: 12px auto;
  }
`;

export const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  button {
    max-width: 100%;
  }
`;
