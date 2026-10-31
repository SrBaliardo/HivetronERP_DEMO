import * as yup from 'yup';

import { isValidPhone } from '../../../../utils/phone';

export const userSchema = yup.object({
  registration: yup.string().required('Matrícula é obrigatória'),
  name: yup.string().required('Nome é obrigatório'),
  phone: yup
    .string()
    .test(
      'phone',
      'Telefone incompleto.',
      (value) => !value || isValidPhone(value),
    ),
  email: yup.string().required('E-mail é obrigatório'),
  username: yup.string().required('Login é obrigatório'),
  password: yup.string().when('$passwordEnabled', {
    is: true,
    then: (schema) => schema.required('Senha é obrigatória'),
  }),
  confirm_password: yup.string().when('$passwordEnabled', {
    is: true,
    then: (schema) =>
      schema
        .required('')
        .oneOf([yup.ref('password')], 'As senhas não coincidem'),
  }),
});
