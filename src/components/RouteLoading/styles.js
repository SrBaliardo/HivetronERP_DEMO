import styled from '@emotion/styled';

export const Container = styled.div`
  min-height: 100vh;
  width: 100%;
  overflow: hidden;
`;

export const Row = styled.div`
  display: flex;
  height: calc(100vh - 11vh);
  width: 100%;
`;

export const Content = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-width: 0;
  padding: 15px;
  margin: 10px;
  overflow-y: auto;
  background: ${({ theme }) => theme.backgroundColor};
  color: ${({ theme }) => theme.TableHeaderText};
  .ant-spin-dot-item {
    background-color: ${({ theme }) => theme.iconPurple};
  }
`;
