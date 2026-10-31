import { FormOutlined, SaveOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';

export const Form = styled.form`
  height: 100%;
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

  h2 {
    padding-top: 24px;
    color: ${({ theme }) => theme.font};
    border-bottom: 1.5px solid ${({ theme }) => theme.TableRowsStroke};
  }

  .div {
    display: flex;
    flex-direction: column;
  }

  .div-container {
    display: flex;
    gap: 20px;
  }
`;

export const ErrorMessage = styled.p`
  color: ${({ theme }) => theme.spanRequired};
`;

export const Container1 = styled.div`
  padding: 0 7px;
  display: flex;
  gap: 20px;

  div {
    display: flex;
    flex-direction: column;
  }
`;

export const Container2 = styled.div`
  padding: 0 7px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;

  .container2-1,
  .container2-2 {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 20px;

    > .div-container {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      min-width: 0;

      > .div {
        min-width: 0;
      }
    }

    input {
      width: 100%;
      min-width: 0;
    }

    @media (max-width: 995px) {
      grid-template-columns: minmax(0, 1fr);
    }
  }

  .container2-1 label {
    display: flex;
    gap: 5px;
  }
`;

export const Select = styled.div`
  span {
    color: ${({ theme }) => theme.accentText};
    font-size: 1rem;
  }
`;

export const Container3 = styled.div`
  padding: 0 7px;
  display: flex;
  gap: 20px;

  @media (max-width: 995px) {
    flex-wrap: wrap;
  }
`;

export const Container4 = styled.div`
  padding: 20px 7px;
  display: flex;
  flex-direction: column;
  gap: 24px;

  div {
    display: flex;
    align-items: flex-end;
    gap: 5px;
  }

  .navigation-option {
    align-items: center;

    > label {
      flex: 0 1 auto;
      min-width: 0;
      overflow-wrap: anywhere;
    }

    > div {
      width: 15px;
      flex: 0 0 15px;
    }
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

  .div-b {
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
