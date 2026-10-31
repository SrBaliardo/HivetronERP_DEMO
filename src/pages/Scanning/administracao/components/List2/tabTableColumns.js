import { format } from 'date-fns';

const translateInspectionStage = (stage) => {
  switch (stage) {
    case 'REGISTER':
      return 'CADASTRO';
    case 'INSPECTION':
      return 'INSPEÇÃO';
    case 'RELEASE':
      return 'LIBERAÇÃO';
    case 'EXPEDITION':
      return 'EXPEDIÇÃO';
    case 'COMPLETED':
      return 'FINALIZADO';
    default:
      return stage;
  }
};

export const tabTableColumns = [
  {
    title: 'NF',
    dataIndex: 'invoice',
    key: 'invoice',
    sorter: true,
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
    dataIndex: 'invoiceItem',
    key: 'invoiceItem',
    sorter: true,
    width: 'minmax(180px, 1fr)',
  },
  {
    title: 'Data Entrada',
    dataIndex: 'createdAt',
    key: 'createdAt',
    sorter: true,
    render: (date) => (date ? format(new Date(date), 'dd/MM/yyyy') : ''),
    width: 'minmax(120px, 1fr)',
  },
  {
    title: 'Última Atualização',
    dataIndex: 'updatedAt',
    key: 'updatedAt',
    sorter: true,
    render: (date) => (date ? format(new Date(date), 'dd/MM/yyyy') : ''),
    width: 'minmax(158px, 1fr)',
  },
  {
    title: 'Status',
    dataIndex: 'inspectionStage',
    key: 'inspectionStage',
    sorter: true,
    render: (stage) => translateInspectionStage(stage),
    width: 'minmax(160px, 1fr)',
  },
];

export const actionColumnWidth = 60;

export const actionColumnTitle = 'Ação';
