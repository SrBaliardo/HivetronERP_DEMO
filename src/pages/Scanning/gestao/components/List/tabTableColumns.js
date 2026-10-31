import { Space } from 'antd';
import { format, parseISO } from 'date-fns';
import { createElement } from 'react';

import { compareServiceOrderRows } from '../../../../../contexts/scanning';
import { formatCodeWithSuffix } from '../../../../../utils/formatCodeWithSuffix';
import { displayStatus } from '../../status';
import * as S from './styles';

const serviceColumns = [
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
      try {
        const parsedDate = parseISO(date);
        return format(parsedDate, 'dd/MM/yyyy');
      } catch (error) {
        return '';
      }
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
        createElement(S.StatusDot, { status: status }),
        displayStatus(status),
      );
    },
    width: 'minmax(160px, 1fr)',
  },
];

const cutColumns = [
  {
    title: 'Número O.C.',
    dataIndex: 'cutOrderCode',
    key: 'cutOrderCode',
    sorter: true,
    render: (code, record) =>
      `${code}${record.branch ? `-${record.branch}` : ''}`,
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
    dataIndex: 'itemCode',
    key: 'itemCode',
    sorter: true,
    width: 'minmax(180px, 1fr)',
  },
  {
    title: 'Prazo de Entrega',
    dataIndex: 'createdAt',
    key: 'createdAt',
    sorter: true,
    render: (date) => {
      if (!date) return '';
      try {
        const parsedDate = parseISO(date);
        return format(parsedDate, 'dd/MM/yyyy');
      } catch (error) {
        return '';
      }
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
        createElement(S.StatusDot, { status: status }),
        displayStatus(status),
      );
    },
    width: 'minmax(160px, 1fr)',
  },
];

const reportColumns = [
  {
    title: 'Número O.S.',
    dataIndex: 'serviceOrderCode',
    key: 'serviceOrderCode',
    sorter: true,
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
    title: 'Processo',
    dataIndex: 'operation',
    key: 'operation',
    sorter: true,
    width: 'minmax(250px, 1fr)',
  },
  {
    title: 'Tipo',
    dataIndex: 'operationType',
    key: 'operationType',
    sorter: true,
    width: 'minmax(250px, 1fr)',
  },
  {
    title: 'Item/Conjunto',
    dataIndex: 'itemCode',
    key: 'itemCode',
    sorter: true,
    width: 'minmax(180px, 1fr)',
  },
  {
    title: 'Máquina',
    dataIndex: 'machine',
    key: 'machine',
    sorter: true,
    width: 'minmax(250px, 1fr)',
  },
  {
    title: 'Grupo',
    dataIndex: 'machineGroup',
    key: 'machineGroup',
    sorter: true,
    width: 'minmax(150px, 1fr)',
  },
  {
    title: 'Status',
    dataIndex: 'sequenceStatus',
    key: 'sequenceStatus',
    sorter: true,
    render: (status) => {
      return createElement(
        Space,
        null,
        createElement(S.StatusDot, { status: status }),
        displayStatus(status),
      );
    },
    width: 'minmax(160px, 1fr)',
  },
  {
    title: 'Planejamento',
    dataIndex: 'plannedDeadline',
    key: 'plannedDeadline',
    sorter: true,
    render: (date) => {
      if (!date) return '';
      try {
        const parsedDate = parseISO(date);
        return format(parsedDate, 'dd/MM/yyyy');
      } catch (error) {
        return '';
      }
    },
    width: 'minmax(150px, 1fr)',
  },
  {
    title: 'Conclusão',
    dataIndex: 'completionDeadline',
    key: 'completionDeadline',
    sorter: true,
    render: (date) => {
      if (!date) return '';
      try {
        const parsedDate = parseISO(date);
        return format(parsedDate, 'dd/MM/yyyy');
      } catch (error) {
        console.error('Erro ao formatar a data:', error);
        return '';
      }
    },
    width: 'minmax(150px, 1fr)',
  },
];

export const tabTableColumns = {
  service: serviceColumns,
  cut: cutColumns,
  report: reportColumns,
};

export const actionColumnWidth = 60;

export const actionColumnTitle = 'Ação';
