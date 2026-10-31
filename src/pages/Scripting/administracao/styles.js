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
  > div:last-child {
    flex: 1;
    min-height: 0;
    display: flex;
    flex-direction: column;

    .ant-tabs {
      flex: 1;
      min-height: 0;
    }

    .ant-tabs-content-holder {
      min-height: 0;
      flex: 1;
    }

    .ant-tabs-content {
      height: 100%;
      overflow: hidden;
    }

    .ant-tabs-tabpane-active {
      height: 100%;
    }
  }

  width: 100%;
  min-width: 0;
  display: flex;
  flex-direction: column;
  padding: 15px;
  margin: 10px;
  overflow: hidden;
`;
