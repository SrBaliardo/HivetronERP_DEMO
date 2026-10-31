import {
  UnlockOutlined,
  LockOutlined,
  FormOutlined,
  SaveOutlined,
} from '@ant-design/icons';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

// Cada linha compartilha as alturas de rótulo, controle e mensagem de validação.
const fieldRowStyles = css`
  display: grid;
  width: 100%;
  min-width: 0;
  grid-template-rows: auto 35px auto;
  column-gap: 20px;
  && {
    row-gap: 0;
  }

  > div {
    min-width: 0;
    grid-row: span 3;
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    grid-template-rows: subgrid;
    row-gap: 0;
  }

  input {
    width: 100%;
  }

  .error-message {
    overflow-wrap: anywhere;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  button:focus-visible {
    outline: 2px solid #b85b00;
    outline-offset: 2px;
  }
`;

export const Form = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 15px;
  gap: 24px;
  font-family: 'Roboto';
  @media (max-width: 800px) {
    .container4 {
      grid-template-columns: repeat(2, minmax(0, 1fr)) auto;
      > .div-user,
      > .div-pass {
        grid-column: 1 / -1;
      }
    }
    && .div-user {
      width: 100%;
    }
    && .div-pass {
      column-gap: 10px;
      row-gap: 0;
    }
    .div-modal {
      grid-column: 3;
    }
  }

  input,
  select {
    height: 35px;
    border: 1.5px solid;
    color: ${({ theme }) => theme.formNoticeAdminText};
    border-color: ${({ theme }) => theme.formNoticeAdminBorder};
    background-color: ${({ theme }) => theme.formNoticeAdminBackground};
    border-radius: 7px;
    padding-left: 10px;
    min-width: 0;
    &:focus-visible {
      outline: 2px solid #ff8c00;
      outline-offset: -1px;
    }
  }

  input[type='tel'][aria-invalid='true']:not(:focus) {
    border-color: ${({ theme }) => theme.iconRed};
  }

  && input[type='tel'][aria-invalid='true']:focus {
    outline-color: ${({ theme }) => theme.iconRed};
  }

  @media (max-width: 800px) {
    > div {
      gap: 10px;
    }
  }

  @media (max-width: 480px) {
    padding-inline: 0;
  }

  label {
    color: ${({ theme }) => theme.labelPrimary};
    margin-bottom: 5px;
  }

  span {
    color: ${({ theme }) => theme.spanRequired};
  }

  button {
    font-size: 1rem;

    span {
      color: #ffffff;
    }
  }

  .anticon-lock {
    color: #e33756;
    font-size: 1.2rem;
    cursor: pointer;
  }

  .anticon-unlock {
    color: ${({ theme }) => theme.iconGreen};
    font-size: 1.2rem;
    cursor: pointer;
  }
`;

export const Container1 = styled.div`
  ${fieldRowStyles}
  grid-template-columns: minmax(130px, 180px) minmax(0, 1fr);
  .div-id {
    min-width: 130px;
  }
`;

export const Container2 = styled.div`
  ${fieldRowStyles}
  grid-template-columns: minmax(130px, 180px) minmax(0, 1fr);
  .div-phone {
    min-width: 130px;
    input {
      font-size: 0.85rem;
    }
  }
`;

export const Container3 = styled.div`
  ${fieldRowStyles}
  grid-template-columns: repeat(2, minmax(0, 1fr));
`;

export const Container4 = styled.div`
  ${fieldRowStyles}
  grid-template-columns: repeat(3, minmax(0, 1fr)) auto;

  .div-user {
    width: 100%;
    min-width: 0;
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    grid-row: span 3;
    grid-template-rows: subgrid;
    row-gap: 0;
  }

  .div-pass {
    width: 100%;
    min-width: 0;
    grid-column: span 3;
    grid-template-columns: subgrid;
    column-gap: 20px;
    row-gap: 0;
  }

  .div-modal {
    grid-column: 3;
    grid-row: 2;
    margin-top: 0;
  }
`;

export const Container5 = styled.div`
  display: flex;
  gap: 20px;
  width: 100%;
  justify-content: space-between;

  .div-role {
    label {
      display: flex;
      gap: 5px;
    }
  }

  .navigation-option {
    min-width: 0;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 15px 5px 0 0;
    gap: 5px;

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

  .div-active {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    padding: 15px 5px 0 0;

    label {
      align-self: center;
      margin-top: 6px;
    }
  }

  @media (max-width: 800px) {
    flex-direction: column;
    .div-active,
    .navigation-option {
      justify-content: flex-start;
    }
  }
`;

export const Select = styled.div`
  display: flex;
  gap: 20px;
`;

export const DivModal = styled.div`
  display: flex;
  align-items: center;
`;

export const Unlock = styled(UnlockOutlined)``;
export const Lock = styled(LockOutlined)``;
export const Save = styled(SaveOutlined)`
  font-size: 1.2rem;
`;
export const Edit = styled(FormOutlined)`
  font-size: 1.2rem;
`;

export const ContainerButtons = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 70px 7px 10px;

  div {
    display: flex;
    gap: 20px;
  }

  @media (max-width: 800px) {
    button {
      width: 130px;
    }
  }
`;

export const ContainerE = styled.div`
  display: flex;
  justify-content: left;
`;

export const UnlockButton = styled.button`
  border: 0;
  background: transparent;
  padding: 0;
  &:focus-visible {
    outline: 2px solid #b85b00;
    outline-offset: 3px;
  }
`;
