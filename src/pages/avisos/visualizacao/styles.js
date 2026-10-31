import styled from '@emotion/styled';

export const Container = styled.div`
  width: 100%;
`;

export const ContainerContent = styled.div`
  .ant-list-item-meta {
    padding: 0 10px;
    gap: 10px;
  }

  .ant-list-item-meta-avatar,
  .ant-list-item-meta-description {
    color: ${({ theme }) => theme.textSecondary} !important;
    font-size: 0.85rem !important;
    align-self: center;
  }

  .ant-list-item-meta-title {
    color: ${({ theme }) => theme.accentText} !important;
    font-size: 1rem !important;
    font-weight: bold;
  }

  .ant-list-item {
    margin-bottom: 15px;
    background-color: ${({ theme }) => theme.noticeboardBackground};
    border-color: ${({ theme }) => theme.noticeboardStroke};
    padding: 10px;
  }
`;
