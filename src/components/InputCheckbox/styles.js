import { CheckOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';

export const ContainerRemember = styled.div`
  .chk {
    position: relative;
    width: 15px;
    height: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    background-color: ${({ theme }) => theme.backgroundColor} !important;
    border: 1px solid ${({ theme }) => theme.checkboxForm} !important;
    font-size: 0.8rem;
  }
  .chk input {
    position: absolute;
    opacity: 0;
    width: 15px;
    height: 15px;
    margin: 0;
    cursor: pointer;
  }

  .chk span {
    width: 15px;
    height: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
  }

  .chk input:focus-visible + span {
    outline: 2px solid #ff8c00;
    outline-offset: -1px;
  }
  .chk input:disabled {
    cursor: default;
  }
  .chk input:checked + span {
    background-color: ${({ theme }) => theme.checkboxForm} !important;
  }
`;

export const Checked = styled(CheckOutlined)`
  color: ${({ theme }) => theme.backgroundColor} !important;
  cursor: pointer;
`;
