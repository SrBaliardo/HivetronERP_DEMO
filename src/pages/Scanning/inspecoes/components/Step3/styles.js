import styled from '@emotion/styled';

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
    align-items: flex-end;
    gap: 20px;

    > div {
      justify-content: flex-end;
    }
  }

  @media (max-width: 895px) {
    flex-direction: row;
    align-items: stretch;

    > div:not(.div-b) {
      justify-content: flex-start;
    }

    button {
      width: 115px;
    }
  }
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
  ContainerE,
  Form,
  Container6,
  Container7,
  Back,
} from '../formStyles';
