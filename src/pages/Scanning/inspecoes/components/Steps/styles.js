import styled from '@emotion/styled';
import { Steps } from 'antd';

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-bottom: 1.5px solid ${({ theme }) => theme.TableRowsStroke};
  padding-bottom: 45px;
`;

export const StepsCustom = styled(Steps)`
  width: 95%;
  height: 100px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.noticeboardBackground};
  padding: 0 15px;

  .ant-steps-item {
    display: flex;
    align-items: center;
  }

  .ant-steps-item-content {
    padding: 7px;
  }

  .ant-steps-item-title {
    font-size: 1.1rem;

    span {
      font-size: 1.3rem;
    }
  }

  .ant-steps-item-finish {
    .ant-steps-item-title {
      color: ${({ theme }) => theme.iconGreen} !important;

      span {
        color: ${({ theme }) => theme.iconGreen} !important;
      }
    }

    .ant-steps-item-title::after {
      background-color: ${({ theme }) => theme.iconGreen} !important;
    }
  }

  .ant-steps-item-process {
    .ant-steps-item-title {
      color: ${({ theme }) => theme.accentText} !important;

      span {
        color: ${({ theme }) => theme.accentText} !important;
      }
    }

    .ant-steps-item-title::after {
      background-color: ${({ theme }) => theme.accentText} !important;
    }
  }

  .ant-steps-item-wait {
    .ant-steps-item-title {
      color: #6c7883 !important;

      span {
        color: #6c7883 !important;
      }
    }

    .ant-steps-item-title::after {
      background-color: #6c7883 !important;
    }
  }

  .ant-steps-item-icon {
    display: none;
  }

  .ant-steps-item-expedition .ant-steps-item-title::after {
    /* display: none !important; */
  }

  @media (max-width: 830px) {
    padding: 0 6px;

    &.ant-steps-horizontal:not(.ant-steps-label-vertical) .ant-steps-item {
      padding-inline-start: 4px;

      &:first-of-type {
        padding-inline-start: 0;
      }
    }

    .ant-steps-item-content {
      padding: 7px 2px;
    }

    .ant-steps-item-title {
      font-size: 0.85rem;
      padding-inline-end: 6px;

      span {
        font-size: 1rem;
      }
    }
  }

  @media (max-width: 480px) {
    padding: 0 2px;

    .ant-steps-item-content {
      padding: 7px 1px;
    }

    .ant-steps-item-title {
      font-size: 0.75rem;
      padding-inline-end: 4px;

      span {
        font-size: 0.875rem;
      }
    }
  }
`;
