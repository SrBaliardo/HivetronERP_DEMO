import styled from '@emotion/styled';

export const Container = styled.div`
  width: 100%;
  height: calc(100vh - 31vh);
  overflow: auto;
  display: flex;
  padding: clamp(16px, 4vw, 48px);

  @media (max-width: 600px) {
    padding: 16px 6px;
  }
`;

export const Panel = styled.section`
  width: 100%;
  max-width: 640px;
  margin: auto;
  flex-shrink: 0;
  padding: clamp(24px, 4vw, 44px);
  border: 1px solid ${({ theme }) => theme.TableRowsStroke};
  border-radius: 20px;
  background: ${({ theme }) => theme.TableRowsXBackground};
  box-shadow: 0 12px 32px #0000000a;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  @media (max-width: 600px) {
    padding: 28px 18px;
  }
`;

export const Illustration = styled.div`
  position: relative;
  width: 150px;
  height: 134px;
  flex-shrink: 0;
  margin-bottom: 24px;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    ${({ theme }) => theme.iconPurple}20,
    ${({ theme }) => theme.iconPurple}05 70%,
    transparent 71%
  );
  color: ${({ theme }) => theme.paragraphPrimary};

  .gear {
    position: absolute;
    display: flex;
    color: inherit;
    animation: appointment-gear-turn 16s linear infinite;
  }

  .gear-main {
    font-size: 74px;
    top: 20px;
    left: 20px;
  }

  .gear-secondary {
    font-size: 46px;
    top: 73px;
    left: 80px;
    animation-duration: 12s;
    animation-direction: reverse;
  }

  .gear-small {
    font-size: 30px;
    top: 20px;
    left: 100px;
    animation-duration: 10s;
    animation-direction: reverse;
    opacity: 0.65;
  }

  @keyframes appointment-gear-turn {
    to {
      transform: rotate(360deg);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .gear {
      animation: none;
    }
  }
`;

export const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 999px;
  background: ${({ theme }) => theme.TableHeaderBackground};
  color: ${({ theme }) => theme.paragraphPrimary};
  font-size: 0.8rem;
  line-height: 1.4;
  font-weight: 500;
`;

export const Title = styled.h2`
  margin: 20px 0 12px;
  color: ${({ theme }) => theme.TableHeaderText};
  font-size: clamp(1.35rem, 2.4vw, 1.8rem);
  font-weight: 600;
  line-height: 1.3;
`;

export const Description = styled.p`
  max-width: 440px;
  margin: 0;
  color: ${({ theme }) => theme.TableRowsText};
  font-size: 0.95rem;
  line-height: 1.7;
`;

export const DemonstrationButton = styled.button`
  margin-top: 24px;
  padding: 10px 24px;
  min-height: 40px;
  border: 1px solid ${({ theme }) => theme.borderButton};
  border-radius: 10px;
  background: transparent;
  color: ${({ theme }) => theme.borderButtonText};
  font-size: 0.9rem;
  font-weight: 500;
  box-shadow: 0 2px 8px #0000000a;
  transition: background-color 160ms ease;
  &&:focus-visible {
    outline: 2px solid ${({ theme }) => theme.focusRing};
    outline-offset: 3px;
  }
  @media (hover: hover) {
    &&:not(:disabled):not([aria-disabled='true']):not([role='option']):hover {
      filter: none;
      background-color: ${({ theme }) => theme.borderButtonHoverBackground};
    }
  }
`;
