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
  overflow: auto;
`;

export const Panel = styled.div`
  height: calc(100vh - 31vh);
  overflow: auto;
`;

export const HiddenTabLabel = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
`;
