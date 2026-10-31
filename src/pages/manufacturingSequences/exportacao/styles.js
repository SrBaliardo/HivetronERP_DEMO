import { SendOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';

export const Container = styled.div`
  height: 100%;
  min-height: 0;
  width: 100%;
  max-width: 100%;
  min-width: 0;
  padding-right: 15px;
  box-sizing: border-box;
  overflow: auto;

  .bar {
    width: 100%;
    border-bottom: 1.5px solid ${({ theme }) => theme.TableRowsStroke};
    padding-bottom: 15px;
  }

  .checkBox {
    margin-inline: auto;
    width: fit-content;
    align-self: center;
    justify-self: center;
  }
`;

const ContentBase = styled.div`
  width: min(830px, 100%);
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: space-between;
  h1 {
    padding: 0 0 25px;
    color: ${({ theme }) => theme.font};
  }
`;
export const ContainerContent = styled(ContentBase)`
  margin-top: 30px;
`;
export const ContainerContentBatch = styled(ContentBase)`
  margin: 30px 0;
`;
export const ContainerContentBatch2 = styled(ContentBase)`
  margin-top: 50px;
`;

export const ContainerBatch = styled.div`
  padding-top: 20px;
`;

export const ContainerBatch2 = styled.div`
  padding-top: 20px;

  .bar2 {
    margin-bottom: 15px;
  }
`;

export const TrashButton = styled.button`
  border: 0;
  background: transparent;
  padding: 0;
  cursor: pointer;
  img {
    height: 20px;
  }
`;

export const ContainerButtons = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding: 70px 7px 10px;
`;

export const Export = styled(SendOutlined)`
  font-size: 1.2rem;
`;

export const SearchRow = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  > button {
    flex-shrink: 0;
  }
`;
export const Picker = styled.div`
  width: min(350px, 100%) !important;
  min-width: 0;
  > div {
    width: 100%;
  }
`;
