import styled from '@emotion/styled';

export const ContainerHeader = styled.header`
  height: 11vh;
  min-width: 100%;
  background-color: ${({ theme }) => theme.backgroundHeader};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  color: ${({ theme }) => theme.defaultTextHeader};
  font-family: 'Roboto';

  @media (max-width: 430px) {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    height: auto;
    min-height: 120px;
    gap: 8px 12px;

    > :nth-child(2) {
      grid-column: 1;
      grid-row: 1 / span 2;
      justify-self: start;
    }

    > :nth-child(3) {
      grid-column: 2;
      grid-row: 1;
      min-width: 0;
      text-align: right;
      overflow-wrap: anywhere;
    }

    > :last-child {
      grid-column: 2;
      grid-row: 2;
      justify-self: end;
    }

    img {
      display: none;
    }
  }
`;

export const ContainerCentralInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;

  @media (max-width: 430px) {
    flex-direction: column-reverse;
  }
`;

export const ContainerIcons = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;

  button,
  a {
    background-color: transparent;
    font-size: 1.7rem;
    color: ${({ theme }) => theme.colorButtonsHeader};
    transition: all 0.2s ease;
    &:not(:disabled):not([aria-disabled='true']):hover {
      color: ${({ theme }) => theme.hoverButtonsHeader};
    }
  }

  @media (max-width: 800px) {
    font-size: 1.7rem;
  }
`;

export const ContainerDateTime = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.DateTimeHeader};
  font-family: 'Roboto';

  h2 {
    font-size: inherit;
    font-weight: 400;
  }

  @media (max-width: 800px) {
    flex-direction: column;
    font-size: 0.85rem;

    span {
      display: none;
    }
  }

  @media (max-width: 430px) {
    flex-direction: row;
    font-size: 0.7rem;

    span {
      display: block;
    }
  }
`;

export const ContainerHelloUser = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  gap: 10px;
  font-size: 1rem;

  span {
    color: ${({ theme }) => theme.spanUserHeader};
  }

  label {
    font-size: 0.8rem;
    color: ${({ theme }) => theme.textHelloEmailHeader};
  }

  p {
    color: ${({ theme }) => theme.defaultTextHeader};
  }

  @media (max-width: 800px) {
    font-size: 0.95rem;

    label {
      font-size: 0.8rem;
    }
  }

  @media (max-width: 430px) {
  }
`;

export const Logo = styled.img`
  width: 200px;
  max-width: 24vw;
  height: auto;
`;
