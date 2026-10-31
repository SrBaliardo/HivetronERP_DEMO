import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';

export const Container = styled.div`
  width: 200px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: relative;
`;

export const SelectInput = styled.div`
  display: flex;
  flex-direction: row !important;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 35px;
  padding: 0 10px;
  border: 1.5px solid;
  border-color: ${({ theme }) => theme.formNoticeAdminBorder};
  background-color: ${({ theme }) => theme.formNoticeAdminBackground};
  color: ${({ theme }) => theme.formNoticeAdminText};
  cursor: pointer;
  border-radius: 7px;
`;

export const DropdownItem = styled.div`
  padding: 10px 10px 5px 10px;
  background: transparent;
  border: 0;
  text-align: left;
  font: inherit;
  cursor: pointer;
  color: ${({ theme }) => theme.dropdownText};
  border-radius: 7px;

  hr {
    width: 95% !important;
    border-top: 1.5px solid;
    border-color: ${({ theme }) => theme.dropdownStroke};
    margin: 10px 0 0 0 !important;
  }
`;

export const ArrowIconDown = styled(CaretDownOutlined)`
  font-size: 1rem;
  margin-left: 8px;
  color: ${({ theme }) => theme.accentText} !important;
`;

export const ArrowIconUp = styled(CaretUpOutlined)`
  font-size: 1rem;
  margin-left: 8px;
  color: ${({ theme }) => theme.accentText} !important;
`;

export const Placeholder = styled.div`
  padding: 10px;
`;
