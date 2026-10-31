import {
  CheckCircleOutlined,
  SendOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';
import styled from '@emotion/styled';

import { radioInputStyles } from '../../../../styles/radioStyles';

export const Container1 = styled.div`
  padding: 10px 2px 30px 2px;
  display: flex;
  gap: 20px;
  border-bottom: 1.5px solid ${({ theme }) => theme.TableRowsStroke};

  div {
    display: flex;
    flex-direction: column;
  }

  @media (max-width: 785px) {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));

    > div {
      width: 100%;
      min-width: 0;
    }

    > div:nth-of-type(2) {
      grid-column: 1 / -1;
      grid-row: 2;
    }

    > div:nth-of-type(3) {
      grid-column: 2;
      grid-row: 1;
    }

    input {
      width: 100%;
      min-width: 0;
    }
  }
`;

export const Check = styled(CheckCircleOutlined)`
  font-size: 1.2rem;
`;

export const Container2 = styled.div`
  padding: 10px 2px 30px 2px;
  display: flex;
  gap: 20px;
  border-bottom: 1.5px solid ${({ theme }) => theme.TableRowsStroke};

  div {
    display: flex;
    flex-direction: column;
  }

  @media (max-width: 785px) {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));

    > div {
      width: 100%;
      min-width: 0;
    }

    > div:nth-of-type(2) {
      grid-column: 1 / -1;
      grid-row: 2;
    }

    > div:nth-of-type(3) {
      grid-column: 2;
      grid-row: 1;
    }

    input {
      width: 100%;
      min-width: 0;
    }
  }
`;

export const Container3 = styled.div`
  width: 100%;
  padding: 10px 2px 30px 2px;
  display: flex;
  gap: 20px;
  border-bottom: 1.5px solid ${({ theme }) => theme.TableRowsStroke};

  div {
    display: flex;
    flex-direction: column;
    width: 23.8%;
  }

  @media (max-width: 1024px) {
    div {
      width: 23%;
    }
  }

  @media (max-width: 768px) {
    div {
      width: 47%;
    }
  }
`;

export const Container4 = styled.div`
  padding: 10px 2px 30px 2px;
  display: flex;
  gap: 20px;
  border-bottom: 1.5px solid ${({ theme }) => theme.TableRowsStroke};

  .divs4 {
    display: flex;
    gap: 20px;
  }

  .container4 {
    display: flex;
    flex-direction: column;
  }

  .selects2 {
    display: flex;
    flex-direction: column;

    input {
      display: flex;
    }

    span {
      color: ${({ theme }) => theme.accentText};
    }

    label {
      span {
        color: ${({ theme }) => theme.spanRequired};
      }
    }
  }

  @media (max-width: 885px) {
    flex-direction: column;
  }
`;

export const ContainerBatch = styled.div`
  padding-top: 20px;

  .batchItem {
    padding-left: 2px;
    padding-right: 2px;
  }

  @media (max-width: 820px) {
    display: none;
  }
`;

export const RowBatchHeader = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  width: 100%;
  background-color: ${({ theme }) => theme.TableHeaderBackground};
  grid-gap: 20px;
  padding: 10px;
  margin-bottom: 20px;
  border-bottom: 1.5px solid ${({ theme }) => theme.TableRowsStroke};
`;

export const RowBatchContent = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-gap: 20px;
  padding: 20px 0;

  input {
    width: 100%;
  }

  span {
    color: ${({ theme }) => theme.accentText};
  }

  p {
    padding-top: 7px;
  }
`;

export const ContainerBatchMW = styled.div`
  display: none;

  .batchItem {
    padding-left: 2px;
    padding-right: 2px;
  }

  @media (max-width: 820px) {
    display: flex;
    flex-direction: column;
  }
`;

export const RowBatchContentMW = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding-bottom: 20px;

  .divItem {
    display: flex;
    flex-direction: column;
  }

  .div-batch1,
  .div-batch2 {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 20px;

    input {
      width: 120px;
    }
  }
`;

export const Container5 = styled.div`
  padding: 10px 2px 30px 2px;
  display: flex;
  gap: 20px;
  border-bottom: 1.5px solid ${({ theme }) => theme.TableRowsStroke};

  div {
    display: flex;
    flex-direction: column;
  }
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

  @media (max-width: 895px) {
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

  h2 {
    padding-top: 15px;
    color: #6c7883;

    span {
      color: #6c7883;
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

  .input-data {
    width: 120px;
  }

  .observation {
    width: 100%;
  }

  .hr {
    width: 100%;
    padding: 0.01rem;
    opacity: 0.35;
    background-color: #6c7883;
    margin: 25px 0;
  }

  .release {
    display: flex;
    flex-direction: row;
    gap: 20px;
  }

  .input-release {
    width: 350px;
  }

  @media (max-width: 820px) {
    .input-release {
      width: 100%;
    }
  }
`;

export const Container6 = styled.div`
  padding: 10px 2px 30px 2px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;

  div {
    display: flex;
    flex-direction: column;
  }

  .container6 {
    width: 100%;
    display: flex;
    flex-direction: row;

    input {
      width: 200px;
    }
  }

  .container6-radios {
    width: 540px;
  }

  .radios {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-left: 7px;
    gap: 20px;

    label {
      display: flex;
      gap: 5px;
      padding: 7px 0;
      color: #6c7883;
    }
  }

  input[type='radio'] {
    ${radioInputStyles}
  }

  @media (max-width: 820px) {
    .container6-radios {
      width: 630px;
    }
  }
`;

export const Container7 = styled.div`
  padding: 10px 2px 30px 2px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  border-bottom: 1.5px solid ${({ theme }) => theme.TableRowsStroke};

  div {
    display: flex;
    flex-direction: column;
  }
`;

export const Back = styled(CloseCircleOutlined)`
  font-size: 1.2rem;
`;

export const Container9 = styled.div`
  padding: 10px 2px 30px 2px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  border-bottom: 1.5px solid ${({ theme }) => theme.TableRowsStroke};

  div {
    display: flex;
    flex-direction: column;
  }
`;
