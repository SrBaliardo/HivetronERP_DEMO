import { format } from 'date-fns';

export const tabTableColumns = [
  {
    title: 'Número O.S.',
    dataIndex: 'id',
    key: 'id',
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
    title: 'Prazo de Entrega',
    dataIndex: 'exitDate',
    key: 'exitDate',
    sorter: true,
    render: (date) => (date ? format(new Date(date), 'dd/MM/yyyy') : ''),
    width: 'minmax(150px, 1fr)',
  },
  {
    title: 'Código Produto',
    dataIndex: 'itemCode',
    key: 'itemCode',
    sorter: true,
    width: 'minmax(180px, 1fr)',
  },
  {
    title: 'Descrição',
    dataIndex: 'description',
    key: 'description',
    sorter: true,
    width: 'minmax(300px, 1fr)',
  },
  {
    title: 'Quantidade',
    dataIndex: 'quantity',
    key: 'quantity',
    sorter: true,
    width: 'minmax(120px, 1fr)',
  },
];

export const actionColumnWidth = 80;

export const actionColumnTitle = 'Ações';
