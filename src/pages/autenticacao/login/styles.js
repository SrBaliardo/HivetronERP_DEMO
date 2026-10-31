import { css } from '@emotion/react';
import styled from '@emotion/styled';

import BackgroundLogin from '../../../assets/images/bgDarkBlueCircles.png';
import { LoadingModal } from '../../../components/LoadingModal';

export const Container = styled.div`
  display: flex;
  min-height: 100vh;
  min-height: 100svh;
  height: 100vh;
  @media (max-height: 700px) {
    height: auto;
  }
  width: 100vw;
  align-items: center;
  justify-content: center;
  background: url(${BackgroundLogin}) center / cover no-repeat;
  button:focus-visible {
    outline: 2px solid #ff8c00;
    outline-offset: 3px;
  }
  button:disabled {
    cursor: default;
    opacity: 0.65;
  }
`;
export const ContainerContent = styled.div`
  height: 80%;
  width: 80%;
  display: flex;
  align-items: stretch;
  justify-content: center;
  padding: 30px;

  @media (max-width: 430px) {
    width: 100%;
    height: 100%;
    padding: 16px;
  }

  @media (max-height: 700px) {
    height: auto;
    min-height: 100%;
  }
`;
export const LeftContainer = styled.div`
  width: 60%;
  min-width: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 30px;
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 10px 0 0 10px;
  @media (max-width: 430px) {
    width: 100%;
    border-radius: 10px;
    padding: 24px;
  }
`;
export const Logo = styled.img`
  height: 200px;
  max-width: 100%;
  object-fit: contain;
`;
export const RightContainer = styled.div`
  width: 40%;
  min-width: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
  border-radius: 0 10px 10px 0;
  @media (max-width: 430px) {
    display: none;
  }
`;
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 30px;
  width: 100%;
  max-width: 400px;
  margin-top: 70px;
`;
const loginPrimaryButtonStyles = css`
  color: #ffffff;
  font-weight: 600;
  font-size: 1rem;
  background: linear-gradient(110deg, #2563eb 0%, #4338ca 100%);
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.22);
  transition:
    filter 160ms ease,
    box-shadow 160ms ease;

  @media (hover: hover) {
    &&:not(:disabled):not([aria-disabled='true']):not([role='option']):hover {
      filter: brightness(1.06);
      box-shadow: 0 5px 16px rgba(37, 99, 235, 0.32);
    }
  }

  &&:not(:disabled):not([aria-disabled='true']):not([role='option']):active {
    filter: brightness(0.96);
  }

  &&:focus-visible {
    outline: 2px solid #93c5fd;
    outline-offset: 3px;
  }

  &:disabled {
    box-shadow: none;
  }
`;
export const SubmitButton = styled.button`
  margin-top: 30px;
  width: 100%;
  height: 44px;
  border-radius: 10px;
  align-self: center;
  ${loginPrimaryButtonStyles}
`;
export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  font-size: 1rem;
  font-weight: 500;
  color: #ff8c00;
  label {
    margin-left: 7px;
    color: #ffffff;
  }
`;
export const Input = styled.input`
  &:focus-visible {
    outline: 2px solid #ff8c00;
    outline-offset: -1px;
  }
  &::placeholder {
    color: #65594e;
    opacity: 1;
  }
  border-radius: 10px;
  height: 40px;
  font-size: 1rem;
  padding-left: 10px;
  color: #3d352e;
  border: 1.5px solid #b98c64;
  background-color: #ffffff;
`;
export const InputPassword = styled.div`
  &:focus-within {
    outline: 2px solid #ff8c00;
    outline-offset: -1px;
  }
  display: flex;
  justify-content: space-between;
  border-radius: 10px;
  height: 45px;
  font-size: 1rem;
  padding-left: 10px;
  color: #3d352e;
  background-color: #ffffff;
  input {
    &::placeholder {
      color: #65594e;
      opacity: 1;
    }
    outline: none;
    background-color: transparent;
    color: #3d352e;
    width: 100%;
    font-size: 1rem;
    min-width: 0;
  }
  button {
    background-color: transparent;
    padding-right: 10px;
    color: #3d352e;
  }
`;
export const ContainerSupplement = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
  align-items: center;
`;
export const RecoveryLink = styled.button`
  color: #ffae42;
  background: transparent;
  text-decoration: underline;
  font-size: inherit;
`;
export const RememberLabel = styled.label`
  display: flex;
  gap: 5px;
  font-size: 0.8rem;
  align-items: center;
  position: relative;
  color: #ffffff;
  cursor: pointer;
`;
export const Checkbox = styled.input`
  position: absolute;
  width: 15px;
  height: 15px;
  opacity: 0;
  margin: 0;
  &:checked + span {
    background-color: #ff8c00;
  }
  &:focus-visible + span {
    outline: 2px solid #ff8c00;
    outline-offset: -1px;
  }
`;
export const Checkmark = styled.span`
  width: 15px;
  height: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  background-color: #f5f5f5;
  border: 1px solid #ff8c00;
  color: #ffffff;
`;
export const recoveryModalStyles = {
  mask: { backgroundColor: 'rgba(3, 8, 18, 0.35)' },
};

export const RecoveryModal = styled(LoadingModal)`
  color: #dce5f2;
  font-family: 'Roboto';
  .ant-modal-content,
  .ant-modal-header {
    background-color: #344764;
  }
  .ant-modal-content {
    --modal-border-color: #617591;
    border: 1px solid #617591;
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.24);
  }
  .ant-modal-body,
  .ant-modal-body p {
    color: #dce5f2;
  }
  .ant-modal-title {
    color: #ffffff;
    font-size: 1.5rem;
    text-align: center;
  }
  .ant-modal-body {
    display: flex;
    flex-direction: column;
  }
  .ant-modal-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 70px;
  }
  input {
    height: 40px;
    margin-top: 30px;
  }
  input:focus-visible {
    outline: 2px solid #ff8c00;
    outline-offset: -1px;
  }
  button:focus-visible {
    outline: 2px solid #ff8c00;
    outline-offset: 3px;
  }
`;
export const RecoveryInput = styled(Input)`
  width: 100%;
  border: 1.5px solid #91a3bc;
  &&:focus {
    border-color: transparent;
    outline: 2px solid #ff8c00;
    outline-offset: -1px;
  }
`;
const RecoveryButton = styled.button`
  width: 200px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  font-size: 0.9rem;
  &:disabled {
    cursor: default;
    opacity: 0.65;
  }
  @media (max-width: 430px) {
    width: 45%;
  }
`;
export const CancelButton = styled(RecoveryButton)`
  border: 1.5px solid #91a3bc;
  color: #f1f5fb;
  background: transparent;
  &&:focus-visible {
    outline: 2px solid #93c5fd;
    outline-offset: 3px;
  }
  @media (hover: hover) {
    &&:not(:disabled):not([aria-disabled='true']):not([role='option']):hover {
      background-color: rgba(255, 255, 255, 0.08);
      filter: none;
    }
  }
`;
export const RecoverButton = styled(RecoveryButton)`
  ${loginPrimaryButtonStyles}
  font-size: 0.9rem;
`;

export const Title = styled.h1`
  font-size: clamp(1.25rem, 2.4vw, 2rem);
  text-align: center;
  color: #ffffff;
`;
