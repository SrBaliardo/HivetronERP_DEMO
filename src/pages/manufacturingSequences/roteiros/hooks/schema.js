import * as yup from 'yup';
const required = yup
  .mixed()
  .required()
  .test('required-value', 'Obrigatório', (value) => value !== '')
  .test(
    'required-number',
    'Obrigatório',
    (value) => !(typeof value === 'number' && Number.isNaN(value)),
  );
export const sequenceSchema = yup.object({
  sequence: required,
  sequenceTools: yup.array().of(
    yup.object({
      toolId: required,
      inputCode: required,
      ap: required,
      toolFeed: required,
      cuttingSpeed: required,
    }),
  ),
});
