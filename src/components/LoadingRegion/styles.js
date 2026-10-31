import styled from '@emotion/styled';

export const Region = styled.div`
  position: relative;
  width: 100%;
  min-width: 0;
  height: 100%;

  > [data-loading-content] {
    display: contents;
  }
`;

export const Overlay = styled.div`
  position: absolute;
  inset: 0;
  z-index: 20;
  min-height: 48px;
  background: ${({ theme }) => theme.backgroundColor}b8;
  border-radius: inherit;
  cursor: progress;

  .ant-spin-dot-item {
    background-color: ${({ theme }) => theme.iconPurple};
  }
`;

export const Indicator = styled('div', {
  shouldForwardProp: (prop) => prop !== '$top',
})`
  position: absolute;
  left: 50%;
  top: ${({ $top }) => ($top === null ? '50%' : `${$top}px`)};
  transform: translate(-50%, -50%);
`;
