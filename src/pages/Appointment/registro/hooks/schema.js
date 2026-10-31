import * as yup from 'yup';
export const schema = yup.object({
  code: yup
    .string()
    .required('Por favor, insira um código de ordem antes de apontar.'),
});
