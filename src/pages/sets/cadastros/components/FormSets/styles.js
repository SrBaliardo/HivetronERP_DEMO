import { FormOutlined, SaveOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';

export const Form = styled.form`
  max-height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 15px;
  gap: 24px;
  font-family: 'Roboto';
  overflow: auto;

  input {
    height: 35px;
    border: 1.5px solid;
    border-color: ${({ theme }) => theme.formNoticeAdminBorder};
    color: ${({ theme }) => theme.formNoticeAdminText};
    background-color: ${({ theme }) => theme.formNoticeAdminBackground};
    border-radius: 7px;
    padding-left: 10px;
  }
  input[type='number']::-webkit-inner-spin-button,
  input[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none;
  }

  label {
    color: ${({ theme }) => theme.labelPrimary};
    margin-bottom: 5px;
  }

  span {
    color: ${({ theme }) => theme.spanRequired};
  }

  div {
    width: 100%;
  }

  button {
    font-size: 0.9rem;

    span {
      color: #ffffff;
    }
  }

  h1 {
    padding-top: 24px;
    color: ${({ theme }) => theme.font};

    span {
      color: ${({ theme }) => theme.font};
    }
  }

  .div-active {
    padding: 30px 15px;
  }
`;

export const Container1 = styled.div`
  padding: 10px 0 20px;
  display: flex;
  gap: 20px;

  div {
    display: flex;
    flex-direction: column;
  }
`;

export const Save = styled(SaveOutlined)`
  font-size: 1.2rem;
`;
export const Edit = styled(FormOutlined)`
  font-size: 1.2rem;
`;

export const ContainerButtons = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 70px 7px 10px;

  .div {
    display: flex;
    gap: 20px;
    justify-content: end;
  }

  @media (max-width: 930px) {
    button {
      width: 130px;
    }
  }
`;

export const ContainerE = styled.div`
  display: flex;
  justify-content: left;
`;
