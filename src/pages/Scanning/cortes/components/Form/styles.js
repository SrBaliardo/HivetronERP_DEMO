import { FormOutlined, SaveOutlined, SendOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';

export const Form = styled.form`
  max-height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 25px;
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
    color: ${({ theme }) => theme.font};

    span {
      color: ${({ theme }) => theme.font};
    }
  }

  h2 {
    padding-bottom: 30px;
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

  .observation {
    width: 100%;
  }

  .input-date {
    cursor: text;
    padding: 0 0 0 7px;
    width: 100% !important;
  }

  input[type='date']::-webkit-calendar-picker-indicator {
    cursor: pointer;
    font-size: 0.9rem;
    padding: 3px 7px 0 0;
  }

  hr {
    width: 100%;
    padding: 0.01rem;
    opacity: 0.35;
    background-color: #6c7883;
    margin: 15px 0;
  }

  .radio-purchased {
    padding-left: 30px;
  }

  .radio-stock {
    padding-left: 20px;
  }

  .minor-column {
    width: 80px;
  }

  .length {
    width: 130px;
  }

  .row-row-1 {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }

  .row-row-2 {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 20px;
    align-items: center;
  }

  .container-status {
    width: 100%;
    display: flex;
    padding: 30px 0;

    .status-oc {
      width: 200px;
    }
  }

  .even-row {
    background-color: ${({ theme }) => theme.backgroundColor};
  }

  .odd-row {
    background-color: ${({ theme }) => theme.TableRowsXBackground};
  }

  .div {
    display: flex;
    flex-direction: column;
  }

  .total-weight {
    display: flex;
    flex-direction: column;
    max-width: 200px;

    label {
      width: max-content;
      display: flex;
      gap: 5px;
    }
  }

  .div-block {
    display: flex;
    gap: 20px;
    padding-bottom: 20px;
  }

  .div-obs {
    border-bottom: 1.5px solid ${({ theme }) => theme.TableRowsStroke};
    display: flex;
    align-items: baseline;
    gap: 5px;
    padding: 10px 10px;

    input {
      width: 100%;
    }
  }

  .input-l {
    width: 470px;
  }

  .input-s {
    width: 150px;
  }

  input[type='radio'] {
    appearance: none;
    -webkit-appearance: none;
    background-color: transparent;
    border: thin solid ${({ theme }) => theme.formNoticeAdminBorder};
    border-radius: 50%;
    width: 15px;
    height: 15px;
    display: inline-block;
    cursor: pointer;
    outline: none;
    position: relative;

    &:checked {
      border-color: ${({ theme }) => theme.labelPrimary};
      background-color: transparent;
    }

    &:checked::before {
      content: '';
      position: absolute;
      top: 2px;
      left: 2px;
      width: 9px;
      height: 9px;
      border-radius: 50%;
      background-color: ${({ theme }) => theme.spanRequired};
    }
  }

  @media (max-width: 1440px) {
    .input-l {
      width: 280px;
    }
  }

  @media (max-width: 1024px) {
    .input-l {
      width: 170px;
    }
  }

  @media (max-width: 890px) {
    .input-l {
      width: 100%;
    }

    .radio-purchased {
      padding-left: 0;

      input {
        margin-left: 25px;
      }
    }

    .radio-stock {
      padding-left: 0;

      input {
        margin-left: 20px;
      }
    }

    p {
      margin-bottom: 3px;
    }
  }
`;

export const Container1 = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 10px 0 30px;
  border-bottom: 1.5px solid ${({ theme }) => theme.TableRowsStroke};

  .container-1-1,
  .container-1-2,
  .container-1-3 {
    display: flex;
    gap: 20px;
  }
`;

export const Container2 = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 10px 0 30px;
  border-bottom: 1.5px solid ${({ theme }) => theme.TableRowsStroke};
`;

export const ContainerBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;

  .container-batch {
    display: flex;
    gap: 20px;
    margin-bottom: 30px;
  }

  @media (max-width: 1145px) {
    .material-fields {
      display: grid;
      grid-template-columns: repeat(6, minmax(0, 1fr));

      > div {
        grid-column: span 2;
        width: 100%;
        min-width: 0;
      }

      > div:nth-of-type(-n + 2) {
        grid-column: span 3;
      }

      input {
        width: 100%;
        min-width: 0;
      }
    }
  }

  @media (max-width: 890px) {
    display: none;
  }
`;

export const CutItemsHeader = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  width: 100%;
  background-color: ${({ theme }) => theme.TableHeaderBackground};
  gap: 20px;
  padding: 15px 10px;
  border-bottom: 1.5px solid ${({ theme }) => theme.TableRowsStroke};
`;

export const RowCutItemsContent = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  padding: 10px 10px;
  background-color: ${({ theme }) => theme.noticeboardAdminItemBackground};
  align-items: center;
`;

export const ContainerBlockMW = styled.div`
  display: none;

  @media (max-width: 890px) {
    display: flex;
    flex-direction: column;
    gap: 20px;

    .input-s {
      width: 100%;
    }

    .div-obs {
      margin: 20px 0 20px 0;
    }
  }
`;

export const RowCutItemsContentMW = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-bottom: 20px;
`;

export const Save = styled(SaveOutlined)`
  font-size: 1.2rem;
`;
export const Edit = styled(FormOutlined)`
  font-size: 1.2rem;
`;
export const Export = styled(SendOutlined)`
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

  @media (max-width: 890px) {
    gap: 20px;

    button {
      width: 130px;
    }
  }
`;

export const ContainerE = styled.div`
  display: flex;
  justify-content: left;
  gap: 20px;
`;
