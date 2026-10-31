import * as yup from 'yup';
const required = yup
  .mixed()
  .required()
  .test('required-value', 'Obrigatório', (value) => value !== '');
export const setSchema = yup.object({ drawingNumber: required });
