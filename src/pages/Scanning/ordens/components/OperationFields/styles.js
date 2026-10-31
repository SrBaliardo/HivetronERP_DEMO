import styled from '@emotion/styled';

export const Fields = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr)) minmax(160px, 1fr);
  grid-template-areas:
    'plannedStartDate startDate plannedDeadline completionDeadline status'
    'observation observation observation observation observation';
  gap: 20px;
  padding: 0 2px;
  margin-bottom: 30px;
  min-width: 0;
  align-items: end;

  > label,
  > div {
    display: flex;
    flex-direction: column;
    min-width: 0;
    margin: 0;
    gap: 5px;
  }

  > [data-field='plannedStartDate'] {
    grid-area: plannedStartDate;
  }
  > [data-field='startDate'] {
    grid-area: startDate;
  }
  > [data-field='plannedDeadline'] {
    grid-area: plannedDeadline;
  }
  > [data-field='completionDeadline'] {
    grid-area: completionDeadline;
  }
  > [data-field='status'] {
    grid-area: status;
  }
  > [data-field='observation'] {
    grid-area: observation;
  }

  input {
    width: 100%;
    min-width: 0;
    padding-right: 7px;
  }

  [data-field='status'] > label {
    margin: 0;
  }

  [role='combobox'] {
    height: 35px;
    min-height: 35px;
  }

  @media (max-width: 1150px) {
    grid-template-columns: repeat(6, minmax(0, 1fr));
    grid-template-areas:
      'plannedStartDate plannedStartDate plannedStartDate startDate startDate startDate'
      'observation observation observation observation observation observation'
      'plannedDeadline plannedDeadline completionDeadline completionDeadline status status';
  }

  @media (max-width: 520px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-template-areas:
      'plannedStartDate startDate'
      'observation observation'
      'plannedDeadline completionDeadline'
      'status status';
  }
`;
