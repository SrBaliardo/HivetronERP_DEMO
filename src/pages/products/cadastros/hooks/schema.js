import * as yup from 'yup';
const required = yup
  .mixed()
  .required()
  .test('required-value', 'Obrigatório', (value) => value !== '');

export const productSchema = yup.object({
  drawingNumber: required,
  rawMaterialStandard: required,
  rawMaterialSpecificWeight: required,
  rawMaterialDimensionA: required,
  rawMaterialDimensionB: required,
  rawMaterialDimensionLength: required,
  finalDimensionA: required,
  finalDimensionB: required,
  finalLength: required,
  finalWeight: required,
});
