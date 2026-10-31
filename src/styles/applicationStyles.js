import styled from '@emotion/styled';

export const PageLoading = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.TableHeaderText};
  background: ${({ theme }) => theme.backgroundColor};
`;

export const DemonstrationNotice = styled.aside`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 4px 16px;
  padding: 8px 16px;
  background: #ffbf00;
  color: #242424;
  font-size: 13px;
  line-height: 1.5;
  text-align: center;
`;
