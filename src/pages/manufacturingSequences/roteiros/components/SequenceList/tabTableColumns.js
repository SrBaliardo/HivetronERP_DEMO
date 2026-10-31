import { convertSecondsToTime } from '../../../../../utils/formatTimeInput';

export const tabTableColumns = [
  {
    title: 'Seq.',
    dataIndex: 'sequence',
    key: 'sequence',
    sorter: true,
    width: 'minmax(80px, 1fr)',
  },
  {
    title: 'Roteiro',
    dataIndex: 'isMain',
    key: 'isMain',
    sorter: true,
    render: (isMain) => (isMain ? 'Principal' : 'Alternativo'),
    width: 'minmax(110px, 1fr)',
  },
  {
    title: 'Operação',
    dataIndex: 'operationCode',
    key: 'operationCode',
    sorter: true,
    width: 'minmax(180px, 1fr)',
  },
  {
    title: 'Tipo',
    dataIndex: 'operationTypeDescription',
    key: 'operationTypeDescription',
    sorter: true,
    width: 'minmax(250px, 1fr)',
  },
  {
    title: 'Tempo',
    dataIndex: 'estimatedTime',
    key: 'estimatedTime',
    sorter: true,
    render: (text) => convertSecondsToTime(text),
    width: 'minmax(120px, 1fr)',
  },
  {
    title: 'Grupo',
    dataIndex: 'machineGroupDescription',
    key: 'machineGroupDescription',
    sorter: true,
    width: 'minmax(250px, 1fr)',
  },
];

export const actionColumnWidth = 60;

export const actionColumnTitle = 'Ação';
