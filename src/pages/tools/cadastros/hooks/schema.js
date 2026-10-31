import * as yup from 'yup';
export const schema = yup.object({
  code: yup.string().required('Código é obrigatório'),
  description: yup.string().required('Descrição é obrigatória'),
});
