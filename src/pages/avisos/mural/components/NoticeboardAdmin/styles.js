import {
  PlusCircleOutlined,
  FileTextOutlined,
  NotificationOutlined,
} from '@ant-design/icons';
import styled from '@emotion/styled';
import { List } from 'antd';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  input:focus-visible,
  textarea:focus-visible {
    outline: 2px solid #ff8c00;
    outline-offset: -1px;
  }
  button:focus-visible {
    outline: 2px solid #b85b00;
    outline-offset: 2px;
  }
  @media (max-width: 800px) {
    height: auto;
    flex-direction: column;
    & > div {
      flex-shrink: 0;
      width: 100%;
      height: auto;
    }
    & > div:nth-of-type(2) {
      min-height: 0;
      border-right: 0;
      border-top: 1.5px solid ${({ theme }) => theme.tabNavBorder};
      margin: 15px 0;
    }
  }
`;

export const LeftDiv = styled.div`
  width: 50%;
  height: calc(100vh - 32vh);
  padding: 0 20px 0 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  button {
    align-self: center;
  }

  @media (max-width: 800px) {
    justify-content: flex-start;
    gap: 15px;
  }
`;

export const StyledList = styled(List)`
  .ant-list-items {
  }

  .ant-list-item {
    padding: 10px;
    margin-bottom: 15px;
    border-bottom: 1.5px solid;
    border-color: ${({ theme }) => theme.noticeboardStroke};
  }

  .ant-list-item-meta-avatar,
  .ant-list-item-meta-title,
  .ant-list-item-meta-description {
    color: ${({ theme }) => theme.noticeboardAdminItemText} !important;
    display: flex;
    align-items: center;
    height: 35px;
    width: 75px;
    overflow: hidden;
  }

  .ant-list-item-action {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 135px;
  }

  .ant-list-item .ant-list-item-meta {
    align-items: center;
  }

  .ant-list-item .ant-list-item-meta .ant-list-item-meta-title {
    margin-bottom: 0;
  }

  .ant-list-item .ant-list-item-action > li,
  .ant-list-item-action button,
  .ant-list-item-action .anticon {
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 1;
  }

  .ant-list-item-action-split {
    display: none;
  }

  .ant-list-item.notice-item-admin {
  }

  @media (max-width: 800px) {
    .ant-list-item:last-of-type {
      margin-bottom: 0;
    }
  }
`;

export const TrashButton = styled.img`
  height: 20px;
  cursor: pointer;
`;

export const EditButton = styled(FileTextOutlined)`
  font-size: 1.2rem;
`;

export const PlusIcon = styled(PlusCircleOutlined)`
  font-size: 1.1rem;
`;

export const PostIcon = styled(NotificationOutlined)`
  font-size: 1.1rem;
`;

export const Divider = styled.div`
  min-height: 100%;
  border-right: 1.5px solid;
  border-color: ${({ theme }) => theme.tabNavBorder};
`;

export const RightDiv = styled.div`
  width: 50%;
  padding: 0 10px 0 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }

  form {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 15px;
  }
  min-width: 0;
  max-width: 100%;
  form {
    min-width: 0;
    gap: 20px;
  }
  @media (max-width: 800px) {
    form {
      height: auto;
      justify-content: flex-start;
    }
  }
`;

export const DivH1 = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-align: center;

  hr {
    width: 80%;
    margin: 20px 0;
    border: 1.5px solid;
    border-color: ${({ theme }) => theme.noticeboardStroke};
  }

  h1 {
    color: ${({ theme }) => theme.font};
    font-size: 2rem;
  }

  span {
    color: #e33756;
    padding-left: 5px;
  }
`;

export const DivAlert = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-align: center;

  hr {
    width: 80%;
    margin: 20px 0;
    border: 1.5px solid;
    border-color: ${({ theme }) => theme.noticeboardStroke};
  }

  h1 {
    color: ${({ theme }) => theme.font};
    font-size: 1.9rem;
    width: 80%;
  }

  span {
    color: #e33756;
    padding-left: 5px;
  }
`;

export const ContainerFormContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const ContainerData = styled.div`
  display: flex;
  flex-direction: column;

  input {
    width: 93px;
    border: 1.5px solid #b85b00;
    border-radius: 7px;
    height: 30px;
    cursor: not-allowed;
    padding: 0 10px;
    text-align: center;
  }
`;

export const ContainerTitle = styled.div`
  display: flex;
  flex-direction: column;

  input {
    width: 100%;
    border: 1.5px solid #b85b00;
    border-radius: 7px;
    height: 35px;
    font-size: 0.9rem;
    padding: 0 10px;
  }

  .not-allowed {
    cursor: not-allowed;
  }
`;

export const ContainerDescription = styled.div`
  display: flex;
  flex-direction: column;

  textarea {
    resize: none;
    min-height: 100%;
    width: 100%;
    border: 1.5px solid #b85b00;
    border-radius: 7px;
    font-size: 0.9rem;
    padding: 10px;
  }

  p {
    text-align: end;
    padding: 5px;
  }

  .not-allowed {
    cursor: not-allowed;
  }

  @media (max-width: 800px) {
    textarea {
      min-height: 7rem;
    }
  }
`;

export const ContainerButtons = styled.div`
  width: 100%;
  display: flex;
  gap: 20px;
  justify-content: space-between;
`;

export const ActionButton = styled.button`
  border: 0;
  background: transparent;
  cursor: pointer;
  color: ${({ theme }) => theme.noticeboardAdminItemText};
  &:focus-visible {
    outline: 2px solid #b85b00;
    outline-offset: 3px;
  }
`;
export const ViewButton = styled(ActionButton)`
  font: inherit;
  padding: 0;
  text-align: left;
`;
