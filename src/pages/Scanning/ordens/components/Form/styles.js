import { FormOutlined, SaveOutlined, SendOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';

import { ButtonBorder } from '../../../../../components/ButtonBorder';

export const Form = styled.form`
  height: calc(100vh - 31vh);
  min-height: 0;
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

  hr {
    width: 100%;
    padding: 0.01rem;
    opacity: 0.35;
    background-color: #6c7883;
    margin-bottom: 25px;
  }

  .batchs {
    display: flex;
    flex-direction: column;
  }

  .input-date {
    width: 120px;
    cursor: text;
    padding: 0 0 0 7px;
  }

  input[type='date']::-webkit-calendar-picker-indicator {
    cursor: pointer;
    font-size: 0.9rem;
    padding: 3px 7px 0 0;
  }

  .selected-sequence {
    display: flex;
    align-items: center;
  }

  .div-modal {
    display: flex;
    align-items: center;
    gap: 20px;
  }

  .input-operations {
    --disabled-input-background: transparent;
    border: none;
    background: transparent;
    padding: 0;
    font-size: 0.9rem;
    color: ${({ theme }) => theme.labelPrimary};
  }

  .input {
    width: 150px;
  }

  @media (max-width: 768px) {
    .divMW {
      width: fit-content;
      margin-left: 15px;
      padding-bottom: 3px;

      span {
        font-size: 1.2rem;
      }
    }
  }
`;

export const Container1 = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 10px 2px 30px 2px;
  border-bottom: 1.5px solid ${({ theme }) => theme.TableRowsStroke};

  div {
    display: flex;
    flex-direction: column;
  }

  .container-1-1,
  .container-1-2,
  .container-1-3 {
    display: flex;
    flex-direction: row;
    gap: 20px;
  }

  .container-1-3-1 {
    display: flex;
    flex-direction: row;
    gap: 20px;

    input {
      width: 110px;
    }
  }

  @media (max-width: 940px) {
    .container-1-3 {
      flex-wrap: wrap;
    }
  }
`;

export const ContainerBatch = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const RowBatchHeader = styled.div`
  display: grid;
  grid-template-columns: 80px repeat(4, 1fr);
  width: 100%;
  background-color: ${({ theme }) => theme.TableHeaderBackground};
  gap: 20px;
  padding: 20px 10px 20px;
  border-bottom: 1.5px solid ${({ theme }) => theme.TableRowsStroke};

  @media (max-width: 768px) {
    display: flex;
    font-size: 0.8rem;
    padding: 10px 0 0 10px;
    align-items: baseline;
    gap: 10px;
  }
`;

export const RowBatchContent = styled.div`
  display: grid;
  grid-template-columns: 80px repeat(4, 1fr);
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
`;

export const ContainerBatchMW = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
  }
`;

export const RowBatchContentMW = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 10px;
  background-color: ${({ theme }) => theme.noticeboardAdminItemBackground};
  align-items: center;

  .div-batch1 {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }

  .div-batch2 {
    display: flex;
    align-items: center !important;
    gap: 5px;
  }
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

  @media (max-width: 1150px) {
    flex-direction: column;
    gap: 20px;
  }

  @media (max-width: 768px) {
    button {
      width: 130px;
    }
  }
`;

export const ContainerE = styled.div`
  display: flex;
  justify-content: left;
  gap: 20px;

  @media (max-width: 1150px) {
    justify-content: right;
  }
`;

export const SelecSequence = styled(ButtonBorder)`
  border: none !important;
  width: fit-content !important;
`;

export const InfoChip = styled.button`
  border: none !important;
  width: fit-content !important;
  background-color: ${({ theme }) => theme.treeNodeHighLevel};
  color: #ffffff !important;
  padding: 3px 5px;
  border-radius: 25px;
  cursor: pointer;

  @media (max-width: 768px) {
    font-size: 0.8rem;
    margin-top: 10px;
  }
`;

export const TimeSummary = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;

  > p {
    color: ${({ theme }) => theme.labelPrimary};
    font-size: 0.9rem;
  }
`;

export const TimeValue = styled.span`
  && {
    color: ${({ theme }) => theme.labelPrimary};
    font-size: 0.9rem;
    overflow-wrap: anywhere;
  }
`;

export const ScheduleActions = styled.div`
  display: flex;

  button {
    width: auto;
    min-width: 200px;
    max-width: 100%;
    padding: 0 12px;
  }
`;
