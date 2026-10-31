import styled from '@emotion/styled';

export const OptionsRow = styled.div`
  flex: 1 1 420px;
  min-width: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(200px, 100%), 1fr));
  gap: 20px;

  > div {
    min-width: 0;
  }
`;
