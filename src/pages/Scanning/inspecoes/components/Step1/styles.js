import { PlusCircleOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';

export const Form = styled.form`
  max-height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 25px;
  font-family: 'Roboto';
  overflow: auto;
  padding: 0 2px;

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
    padding-top: 25px;
    color: ${({ theme }) => theme.font};

    span {
      color: ${({ theme }) => theme.font};
    }
  }
`;

export const Add = styled(PlusCircleOutlined)`
  font-size: 1.2rem;
`;

export const ContainerButtons = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 70px 7px 10px;

  .div-b {
    display: flex;
    flex-direction: row;
    gap: 20px;
    justify-content: end;
  }

  @media (max-width: 768px) {
    button {
      width: 130px;
    }
  }
`;

export { Container1, Check } from '../formStyles';
