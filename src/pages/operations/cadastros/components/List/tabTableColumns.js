export const tabTableColumns = [
  {
    title: 'Código',
    dataIndex: 'code',
    key: 'code',
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
    title: 'Tipo',
    dataIndex: 'operationTypeDescription',
    key: 'operationTypeDescription',
    sorter: true,
    width: 'minmax(250px, 1fr)',
  },
  {
    title: 'Modalidade',
    dataIndex: 'collectiveTime',
    key: 'collectiveTime',
    sorter: true,
    width: 'minmax(180px, 1fr)',
    render: (collectiveTime) =>
      collectiveTime === true ? 'Coletivo' : 'Individual',
  },
];

export const actionColumnWidth = 60;

export const actionColumnTitle = 'Ação';
