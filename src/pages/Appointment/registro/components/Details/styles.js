import { SaveOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';

export const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 25px;
  font-family: 'Roboto';
  min-width: 0;
  flex-shrink: 0;

  input {
    height: 35px;
    min-width: 0;
    border: 1.5px solid;
    color: ${({ theme }) => theme.formNoticeAdminText};
    border-color: ${({ theme }) => theme.formNoticeAdminBorder};
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

  .div {
    display: flex;
    flex-direction: column;
    min-width: 0;
  }

  .date {
    align-items: flex-end !important;
  }

  h1,
  h2 {
    color: ${({ theme }) => theme.font};

    span {
      color: ${({ theme }) => theme.font};
    }
  }

  .selects {
    display: flex;
    flex-direction: column;
    width: 345px;

    span {
      color: ${({ theme }) => theme.accentText};
    }

    label {
      span {
        color: ${({ theme }) => theme.spanRequired};
      }
    }
  }

  .div-status {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 20px;
  }

  hr {
    width: 100%;
    padding: 0.01rem;
    opacity: 0.35;
    background-color: #6c7883;
    margin-bottom: 25px;
  }

  .batchs {
    min-width: 0;
    overflow-wrap: anywhere;
    display: flex;
    flex-direction: column;
  }

  .input-date {
    width: 120px;
    max-width: 100%;
    cursor: text;
    padding: 0 0 0 7px;
  }

  .selected-sequence {
    display: flex;
    align-items: center;
  }

  .input-satus {
    width: 100%;
    font-size: 0.9rem;
  }

  @media (max-width: 768px) {
    .datestatus {
      margin-bottom: 40px;
    }

    .divMW {
      width: 200px;
    }

    .observation {
      margin-bottom: 20px;
    }
  }
`;

export const ContainerBatch = styled.div`
  display: flex;
  flex-direction: column;

  .container-batch {
    flex-wrap: wrap;
    > .div-status {
      flex: 2 1 300px;
      width: auto;
      min-width: 0;
    }
    > .date {
      flex: 1 1 140px;
      width: auto;
      min-width: 0;
    }
    display: flex;
    gap: 20px;
    margin-bottom: 30px;
  }
`;

export const RowBatchContent = styled.div`
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 20px;
  padding: 20px 10px 15px;
  background-color: ${({ theme }) => theme.noticeboardAdminItemBackground};
  align-items: center;

  input {
    width: 100%;
  }

  span {
    color: ${({ theme }) => theme.accentText};
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

export const RowBatchContentMW1 = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 20px;
    padding: 20px 10px 15px;
    background-color: ${({ theme }) => theme.noticeboardAdminItemBackground};
    align-items: center;
  }
`;

export const RowBatchContentMW2 = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 20px;
    padding: 20px 10px 15px;
    background-color: ${({ theme }) => theme.noticeboardAdminItemBackground};
    align-items: center;
  }
`;

export const Save = styled(SaveOutlined)`
  font-size: 1.2rem;
`;

export const ContainerButtons = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 50px 3px;

  .div-b {
    display: flex;
    gap: 20px;
    justify-content: end;
  }

  @media (max-width: 768px) {
    button {
      width: 130px;
    }
  }
`;
