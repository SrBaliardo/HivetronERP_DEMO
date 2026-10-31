import { SendOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';

export const Container = styled.div`
  height: calc(100vh - 31vh);
  width: 100%;
  overflow: auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-right: 1px;

  .button-goback {
    button {
      width: 120px;

      span {
        font-size: 1rem;
      }
    }
  }

  .buttons {
    display: flex;
    justify-content: flex-end;
    flex-wrap: wrap;
    min-width: 0;
    gap: 20px;

    @media (max-width: 1150px) {
      width: 100%;
      flex-wrap: wrap;
    }

    @media (max-width: 806px) {
      justify-content: flex-end;
    }
  }

  .buttons-expadd {
    display: flex;
    gap: 20px;
    margin-left: auto;
    justify-content: flex-end;
    flex-wrap: wrap;
    min-width: 0;
    max-width: 100%;
  }
`;

export const ContainerContent = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  padding: 25px 0 15px;

  h1 {
    color: ${({ theme }) => theme.font};

    span {
      color: ${({ theme }) => theme.font};
    }
  }

  button {
    span {
      font-size: 1.5rem;
    }
  }

  @media (max-width: 1150px) {
    flex-wrap: wrap;
  }
`;

export const Export = styled(SendOutlined)`
  font-size: 1.2rem !important;
`;
