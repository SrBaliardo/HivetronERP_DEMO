import JsBarcode from 'jsbarcode';

export const generateBarcodePath = (id) => {
  if (!id) return null;

  const canvas = document.createElement('canvas');
  JsBarcode(canvas, id, { format: 'CODE128', width: 2, height: 40 });
  return canvas.toDataURL('image/png');
};
