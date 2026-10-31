export const tabTableColumns = [
  { key: 'selection', title: '', width: 50 },
  { key: 'sequence', title: 'Seq.', width: 60 },
  { key: 'isMain', title: 'Roteiro', width: 110 },
  {
    key: 'operationDescription',
    title: 'Operação',
    width: 'minmax(225px, 1fr)',
  },
  {
    key: 'operationTypeDescription',
    title: 'Tipo',
    width: 'minmax(250px, 1fr)',
  },
  { key: 'estimatedTime', title: 'Tempo', width: 'minmax(110px, 1fr)' },
  {
    key: 'machineGroupDescription',
    title: 'Grupo',
    width: 'minmax(250px, 1fr)',
  },
  {
    key: 'collectiveTime',
    title: 'Modalidade',
    width: 'minmax(180px, 1fr)',
  },
];

export const destinationTableColumns = [
  { key: 'code', title: 'Código', width: 150 },
  { key: 'drawingNumber', title: 'Desenho', width: 150 },
  { key: 'description', title: 'Descrição', width: 'minmax(250px, 1fr)' },
];

export const destinationActionColumnWidth = 60;
