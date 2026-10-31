import { format } from 'date-fns';

export const tabTableColumns = [
  {
    title: 'NF',
    dataIndex: 'invoice',
    key: 'invoice',
    sorter: true,
    width: 'minmax(140px, 1fr)',
  },
  {
    title: 'Item',
    dataIndex: 'itemCode',
    key: 'itemCode',
    sorter: true,
    width: 'minmax(180px, 1fr)',
  },
  {
    title: 'Cliente',
    dataIndex: 'customer',
    key: 'customer',
    sorter: true,
    width: 'minmax(250px, 1fr)',
  },
  {
    title: 'Data Entrada',
    dataIndex: 'issueDate',
    key: 'issueDate',
    sorter: true,
    render: (date) => (date ? format(new Date(date), 'dd/MM/yyyy') : ''),
    width: 'minmax(120px, 1fr)',
  },
  {
    title: 'Descrição',
    dataIndex: 'itemDescription',
    key: 'itemDescription',
    sorter: true,
    width: 'minmax(300px, 1fr)',
  },
  {
    title: 'Quantidade',
    dataIndex: 'itemAmount',
    key: 'itemAmount',
    sorter: true,
    width: 'minmax(120px, 1fr)',
  },
  {
    title: 'UM',
    dataIndex: 'unit',
    key: 'unit',
    sorter: true,
    width: 'minmax(80px, 1fr)',
  },
];

export const actionColumnWidth = 60;

export const actionColumnTitle = 'Ação';
