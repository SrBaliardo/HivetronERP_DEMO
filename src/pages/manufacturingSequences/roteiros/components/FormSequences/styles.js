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
    font-size: 1rem;

    span {
      color: #ffffff;
    }
  }

  h2 {
    padding-top: 24px;
    color: ${({ theme }) => theme.font};
    border-bottom: 1.5px solid ${({ theme }) => theme.TableRowsStroke};
  }

  .div-M {
    display: flex;
    flex-direction: column;
    width: 350px;
  }

  .div-S {
    display: flex;
    flex-direction: column;
    width: 100px;
  }

  .div-SM {
    display: flex;
    flex-direction: column;
    width: 78px;
  }

  .div-XS {
    display: flex;
    flex-direction: column;
    width: 50px;
  }

  .order-buttons {
    display: flex;
    align-items: end;
    flex-direction: column;
    width: fit-content;
    cursor: pointer;
    color: ${({ theme }) => theme.iconPurple};
    position: relative;
    top: 6px;
  }

  @media (max-width: 1180px) {
    .div-M {
      width: auto;
      min-width: 0;
    }
    .div-M input {
      width: 100%;
      min-width: 0;
    }
  }
`;

export const Container1 = styled.div`
  padding: 0 7px;
  display: flex;
  gap: 20px;
  justify-content: space-between;

  .div {
    display: flex;
    flex-direction: column;
  }

  .div-chks {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 25px 10px 0 0;
    gap: 20px;
    min-width: 0;
  }

  .div-label {
    justify-self: left;
    width: auto;
    min-width: 0;

    span {
      padding-left: 5px;
      color: ${({ theme }) => theme.font};
      font-weight: bold;
    }
  }

  .checkbox {
    display: flex;
    align-items: center;
    justify-content: end;
    gap: 5px;
    width: auto;
    min-width: 0;
    flex: 0 1 auto;

    > label {
      flex: 0 1 auto;
      min-width: 0;
      margin-bottom: 0;
      overflow-wrap: anywhere;
    }

    > div {
      width: 15px;
      flex: 0 0 15px;
    }
  }

  @media (max-width: 795px) {
    display: grid;
    grid-template-columns: 50px minmax(0, 1fr);

    > .div {
      min-width: 0;

      input {
        width: 100%;
        min-width: 0;
      }
    }

    > .div-chks {
      grid-column: 1 / -1;
      padding-top: 0;
    }
  }
`;

export const Container2 = styled.div`
  padding: 0 7px;
  display: flex;
  gap: 20px;

  @media (max-width: 1180px) {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr)) 100px;
    min-width: 0;
  }
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    > .div-S {
      grid-column: 1 / -1;
      width: 100px;
    }
  }
`;

export const Container3 = styled.div`
  padding: 0 7px;
  display: flex;
  gap: 20px;

  @media (max-width: 1180px) {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr)) 100px;
    min-width: 0;
  }
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    > .div-S {
      grid-column: 1 / -1;
      width: 100px;
    }
  }
`;

export const Container4 = styled.div`
  display: flex;
  padding: 0 7px;
  gap: 20px;

  .div-min {
    display: flex;
    gap: 20px;
  }

  .actions {
    width: fit-content;
    align-items: flex-end !important;
    display: flex;
    gap: 10px;
  }

  @media (max-width: 1180px) {
    > .div-min:first-of-type {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr)) 100px;
      min-width: 0;
    }
  }
  @media (max-width: 768px) {
    > .div-min:first-of-type {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
    > .div-min {
      min-width: 0;
      flex-wrap: wrap;
    }
  }

  @media (max-width: 1470px) {
    flex-direction: column;
  }
`;

export const Select = styled.div`
  span {
    color: ${({ theme }) => theme.accentText};
    font-size: 1rem;
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

export const ToolOrderButton = styled.button`
  padding: 0;
  border: 0;
  background: transparent;
  color: inherit;
  display: flex;
  cursor: pointer;
  &:disabled {
    cursor: default;
    opacity: 0.4;
  }
  &:focus-visible {
    outline: 2px solid #ff8c00;
  }
`;
