import * as yup from 'yup';
const required = yup.string().required('Campo obrigatório');
export function inspectionSchema(step) {
  const fields =
    step === 1
      ? ['invoice', 'client', 'invoiceItemCode']
      : step === 2
        ? [
            'invoice',
            'client',
            'invoiceItemCode',
            'itemCode',
            'itemDescription',
            'itemDrawingNumber',
            'gaugeDescription',
            'model',
            'manufacturer',
            'folder',
            'series',
            'inspector',
          ]
        : step === 3
          ? ['releaseResponsible']
          : step === 4
            ? ['shippedBy']
            : [];
  return yup.object(
    Object.fromEntries(fields.map((field) => [field, required])),
  );
}
