import { hasPermission } from '../../utils/hasPermission';
export function validateCatalogSet(data, code) {
  const matching = data.find((item) => item.code === code);
  if (!matching)
    return {
      error:
        'O código do informado é inválido ou não existe no banco de dados!',
    };
  const { description, normalizedDescription } = matching;
  if (
    matching.unity !== 'CJ' &&
    !['FACA CIRCULAR', 'ANEL EXPULSADOR', 'IMPEDER', 'BOBINA DE INDUCAO'].some(
      (keyword) => normalizedDescription.includes(keyword),
    )
  )
    return {
      error:
        'O código informado não é um CJ e não pode ser cadastrado como conjunto. Verifique e tente outro.',
    };
  return { isValid: true, description };
}

export function getPermissions(role) {
  return {
    create: hasPermission(role, 'bom', 'C', 2),
    update: hasPermission(role, 'bomSets', 'U', 8),
    remove: hasPermission(role, 'bomSets', 'D'),
  };
}

export function duplicateCodeError(product, set) {
  return product
    ? 'O código já foi utilizado para cadastrar um PRODUTO!'
    : set
      ? 'O código já foi utilizado para cadastrar um CONJUNTO!'
      : null;
}
