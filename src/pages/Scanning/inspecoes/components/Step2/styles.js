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

  @media (max-width: 768px) {
    .input-release {
      width: 100%;
    }
  }
`;

export const ErrorMessage = styled.p`
  color: ${({ theme }) => theme.spanRequired};
`;

export {
  Container1,
  Check,
  Container2,
  Container3,
  Container4,
  ContainerBatch,
  RowBatchHeader,
  RowBatchContent,
  ContainerBatchMW,
  RowBatchContentMW,
  Container5,
  Export,
  ContainerButtons,
  ContainerE,
} from '../formStyles';
