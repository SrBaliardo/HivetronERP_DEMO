import styled from '@emotion/styled';

export const Container = styled.div`
  min-height: 100vh;
  width: 100%;
  overflow: hidden;
`;

export const ContainerItensContent = styled.div`
  height: calc(100vh - 11vh);
  width: 100%;
  display: flex;
`;

export const ContainerContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 15px;
  margin: 10px;
  overflow: hidden;
`;

export const Panel = styled.div`
  height: 100%;
  min-width: 0;
  overflow: auto;
`;
