import { Space } from 'antd';
import { format, parseISO, isValid } from 'date-fns';
import { createElement } from 'react';

import { compareServiceOrderRows } from '../../../../../contexts/scanning';
import { formatCodeWithSuffix } from '../../../../../utils/formatCodeWithSuffix';
import * as S from './styles';

const translateOrderStatus = (status) => {
  switch (status) {
    case 'NOT_STARTED':
      return 'NÃO INICIADO';
    case 'STARTED':
      return 'INICIADO';
    case 'FINISHED':
      return 'FINALIZADO';
    case 'CANCELED':
      return 'CANCELADO';
    default:
      return status;
  }
};

export const tabTableColumns = [
  {
    title: 'Número O.S.',
    dataIndex: 'code',
    key: 'code',
    sorter: true,
    compareRows: compareServiceOrderRows,
    render: (code, record) => formatCodeWithSuffix(code, record.branch),
    width: 'minmax(140px, 1fr)',
  },
  {
    title: 'Cliente',
    dataIndex: 'client',
    key: 'client',
    sorter: true,
    width: 'minmax(250px, 1fr)',
  },
  {
    title: 'Item/Conjunto',
    dataIndex: 'item',
    key: 'item',
    sorter: true,
    width: 'minmax(180px, 1fr)',
  },
  {
    title: 'Prazo de Entrega',
    dataIndex: 'deadline',
    key: 'deadline',
    sorter: true,
    render: (date) => {
      if (!date) return '';
      const parsedDate = parseISO(date);
      return isValid(parsedDate) ? format(parsedDate, 'dd/MM/yyyy') : '';
    },
    width: 'minmax(150px, 1fr)',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    sorter: true,
    render: (status) => {
      return createElement(
        Space,
        null,
        createElement(S.StatusDot, { 'data-status': status }),
        translateOrderStatus(status),
      );
    },
    width: 'minmax(160px, 1fr)',
  },
];

export const actionColumnWidth = 85;

export const actionColumnTitle = 'Ações';
