import { Space } from 'antd';
import { createElement } from 'react';

import { formatCodeWithSuffix } from '../../../../../utils/formatCodeWithSuffix';
import { formatDate } from '../../../../../utils/formatDate';
import { displayStatus } from '../../../status';
import * as S from './styles';

export const tabTableColumns = [
  {
    title: 'Número O.S.',
    dataIndex: 'serviceOrderCode',
    key: 'serviceOrderCode',
    sorter: true,
    render: (code, record) => formatCodeWithSuffix(code, record.branch),
    width: 'minmax(140px, 1fr)',
  },
  {
    title: 'Item/Conjunto',
    dataIndex: 'itemCode',
    key: 'itemCode',
    sorter: true,
    width: 'minmax(180px, 1fr)',
  },
  {
    title: 'Seq',
    dataIndex: 'sequenceNumber',
    key: 'sequenceNumber',
    sorter: true,
    width: 'minmax(80px, 1fr)',
  },
  {
    title: 'Processo',
    dataIndex: 'operation',
    key: 'operation',
    sorter: true,
    width: 'minmax(250px, 1fr)',
  },
  {
    title: 'Máquina',
    dataIndex: 'machine',
    key: 'machine',
    sorter: true,
    width: 'minmax(250px, 1fr)',
  },
  {
    title: 'Usuário',
    dataIndex: 'responsible',
    key: 'responsible',
    sorter: true,
    width: 'minmax(250px, 1fr)',
  },
  {
    title: 'Data',
    dataIndex: 'createdAt',
    key: 'createdAt',
    sorter: true,
    render: formatDate,
    width: 'minmax(150px, 1fr)',
  },
  {
    title: 'Status',
    dataIndex: 'newStatus',
    key: 'newStatus',
    sorter: true,
    render: (status) => {
      return createElement(
        Space,
        null,
        createElement(S.StatusDot, { 'data-status': status }),
        displayStatus(status, true),
      );
    },
    width: 'minmax(160px, 1fr)',
  },
];
