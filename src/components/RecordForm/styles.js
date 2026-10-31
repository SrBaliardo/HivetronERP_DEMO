import { FormOutlined, SaveOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';

export const Form = styled.form`
  height: 100%;
  min-height: 0;
  max-height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 24px 16px;
  gap: 24px;
  font-family: 'Roboto';
  overflow: auto;

  > * {
    flex-shrink: 0;
  }

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.scrollbarThumb};
    border-radius: 4px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  input {
    height: 35px;
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
  }

  .div-checkbox {
    display: flex;
    gap: 5px;
    align-items: center;
    margin-top: 20px;

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

export const Container1 = styled.div`
  padding: 10px 0 20px;
  display: flex;
  gap: 20px;
  flex-wrap: wrap;

  > .div {
    width: min(300px, 100%);
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
  margin-top: auto;
  padding: 32px 0 0;

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

export const ContainerE = styled.div`
  display: flex;
  justify-content: left;
`;
