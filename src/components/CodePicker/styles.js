import { CaretDownOutlined, SearchOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';

export const Container = styled.div`
  width: 200px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: relative;
`;

export const ErrorMessage = styled.p`
  color: ${({ theme }) => theme.spanRequired};
`;

export const SelectInput = styled.div`
  &[data-large] {
    height: 40px;
    border-radius: 10px;
  }
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 35px;
  padding: 0 10px 0 0;
  border: 1.5px solid ${({ theme }) => theme.formNoticeAdminBorder};
  background-color: ${({ theme }) => theme.formNoticeAdminBackground};
  border-radius: 7px;
  cursor: pointer;

  input {
    flex-grow: 1;
    min-width: 0;
    border: none;
    outline: none;
    background: transparent;
    color: ${({ theme }) => theme.formNoticeAdminText};
    padding-left: 10px;
  }
`;

export const OpenButton = styled.button`
  && {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    flex: 0 0 24px;
    padding: 0;
    border: 0;
    background: transparent;
    color: ${({ theme }) => theme.formNoticeAdminBorder};
    cursor: pointer;

    .anticon {
      color: inherit;
    }
  }

  &:disabled {
    cursor: not-allowed;
  }
`;

export const DropdownItem = styled.button`
  && {
    display: block;
    width: 100%;
  }
  text-align: left;
  font: inherit;
  background: transparent;
  border: 0;
  padding: 10px;
  cursor: pointer;
  color: ${({ theme }) => theme.dropdownText};
  border-radius: 7px;

  hr {
    width: 95%;
    border-top: 1.5px solid ${({ theme }) => theme.dropdownStroke};
    margin-top: 10px;
  }
`;

export const ArrowIconDown = styled(CaretDownOutlined)`
  font-size: 1rem;
  margin-left: 8px;
`;

export const SearchIcon = styled(SearchOutlined)`
  font-size: 1rem;
  margin-left: 8px;
`;

export const Placeholder = styled.div`
  padding: 10px;
  color: ${({ theme }) => theme.dropdownText};
`;
