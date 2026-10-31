import styled from '@emotion/styled';

export const State = styled.section`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding: 20px;
  background: ${({ theme }) => theme.backgroundColor};
  color: ${({ theme }) => theme.TableHeaderText};
`;
