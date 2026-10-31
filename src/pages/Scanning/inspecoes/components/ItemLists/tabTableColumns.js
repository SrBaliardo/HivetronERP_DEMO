const itemColumns = [
  {
    key: 'position',
    title: '',
    ariaLabel: 'Posição',
    width: 'minmax(120px, 1fr)',
  },
  {
    key: 'itemCode',
    title: '',
    ariaLabel: 'Código do item',
    width: 'minmax(180px, 1fr)',
  },
  {
    key: 'itemDrawingNumber',
    title: '',
    ariaLabel: 'Desenho',
    width: 'minmax(110px, 1fr)',
  },
  {
    key: 'itemDescription',
    title: '',
    ariaLabel: 'Descrição',
    width: 'minmax(250px, 2fr)',
  },
];

export const tabTableColumns = [
  ...itemColumns,
  { key: 'checked', title: '', width: 50, fixed: 'right', align: 'center' },
];

const shippedColumn = {
  key: 'shippedAmount',
  title: 'Total expedido',
  width: 140,
  fixed: 'right',
  align: 'right',
};

export const shipmentTableColumns = [
  ...itemColumns,
  shippedColumn,
  {
    key: 'quantity',
    title: 'Expedir',
    width: 100,
    fixed: 'right',
    align: 'right',
  },
];

export const completedShipmentTableColumns = [
  ...itemColumns,
  shippedColumn,
  {
    key: 'rectify',
    title: '',
    ariaLabel: 'Retificar',
    width: 60,
    fixed: 'right',
    align: 'right',
  },
];
