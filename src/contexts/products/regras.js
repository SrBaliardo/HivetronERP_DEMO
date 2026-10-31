import { hasPermission } from '../../utils/hasPermission';
export const calculateMPWeight = (
  profileType,
  dimensionA,
  dimensionB,
  length,
  specificWeight,
) => {
  const pi = 3.14;
  let weight = 0;

  switch (profileType) {
    case 'ROUND':
      weight = ((dimensionA ** 2 / 4) * pi * length * specificWeight) / 1000000;
      break;

    case 'RECTANGULAR':
    case 'SHEET':
      weight = (dimensionA * dimensionB * length * specificWeight) / 1000000;
      break;

    case 'ROUNDTUBE':
      weight =
        (pi *
          (dimensionA ** 2 / 4 - dimensionB ** 2 / 4) *
          length *
          specificWeight) /
        1000000;
      break;

    default:
      weight = 0;
  }
  return weight;
};

export const formatWeight = (weight) => {
  return weight.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    useGrouping: false,
  });
};

export function validateCatalogProduct(data, code) {
  const product = data.find((item) => item.code === code);
  if (!product)
    return {
      error:
        'O código do informado é inválido ou não existe no banco de dados!',
    };
  if (product.unity === 'CJ')
    return {
      error:
        'O código informado é um CJ e não pode ser cadastrado como produto. Verifique e tente outro.',
    };
  return { isValid: true, description: product.description };
}

export function validateProductDimensions(data, calculatedWeight) {
  const pesoAcabado = parseFloat(data.finalWeight) || 0;
  const pesoMP = parseFloat(calculatedWeight) || 0;
  const pesoEspecífico = parseFloat(data.rawMaterialSpecificWeight) || 0;
  const DimensãoA = parseFloat(data.rawMaterialDimensionA) || 0;
  const DimensãoAAcabado = parseFloat(data.finalDimensionA) || 0;
  const DimensãoB = parseFloat(data.rawMaterialDimensionB) || 0;
  const DimensãoBAcabado = parseFloat(data.finalDimensionB) || 0;
  const comprimento = parseFloat(data.rawMaterialDimensionLength) || 0;
  const comprimentoAcabado = parseFloat(data.finalLength) || 0;

  if (!data.rawMaterialProfile) {
    return {
      field: 'rawMaterialProfile',
      message: 'Selecione um perfil de material.',
    };
  }

  if (pesoEspecífico === 0) {
    return {
      field: 'rawMaterialSpecificWeight',
      message: 'Peso Específico não pode ser zero',
    };
  }

  if (DimensãoA === 0) {
    return {
      field: 'rawMaterialDimensionA',
      message: 'Dimensão "A" MP não pode ser zero',
    };
  }

  if (DimensãoAAcabado === 0) {
    return {
      field: 'finalDimensionA',
      message: 'Dimensão "A" Acabado não pode ser zero',
    };
  }

  if (comprimento === 0) {
    return {
      field: 'rawMaterialDimensionLength',
      message: 'Comprimento do blank não pode ser zero',
    };
  }

  if (data.rawMaterialProfile !== 'ROUND' && DimensãoB === 0) {
    return {
      field: 'rawMaterialDimensionB',
      message: 'Dimensão "B" MP não pode ser zero',
    };
  }

  if (data.rawMaterialProfile !== 'ROUND' && DimensãoBAcabado === 0) {
    return {
      field: 'finalDimensionB',
      message: 'Dimensão "B" Acabado não pode ser zero',
    };
  }

  if (
    data.rawMaterialProfile !== 'ROUND' &&
    DimensãoBAcabado > DimensãoAAcabado
  ) {
    return {
      field: 'finalDimensionB',
      message:
        'Dimensão "B" Acabado não pode ser maior do que a Dimensão "A" Acabado',
    };
  }

  if (
    data.rawMaterialProfile !== 'ROUND' &&
    data.rawMaterialProfile !== 'ROUNDTUBE' &&
    DimensãoBAcabado > DimensãoB
  ) {
    return {
      field: 'finalDimensionB',
      message:
        'Dimensão "B" Acabado não pode ser maior do que a Dimensão "B" MP',
    };
  }

  if (data.rawMaterialProfile === 'ROUNDTUBE' && DimensãoBAcabado < DimensãoB) {
    return {
      field: 'finalDimensionB',
      message:
        'Dimensão "B" Acabado não pode ser menor do que a Dimensão "B" MP',
    };
  }

  if (DimensãoAAcabado > DimensãoA) {
    return {
      field: 'finalDimensionA',
      message:
        'Dimensão "A" Acabado não pode ser maior do que a Dimensão "A" MP',
    };
  }

  if (comprimentoAcabado > comprimento) {
    return {
      field: 'finalLength',
      message:
        'Comprimento Acabado não pode ser maior do que o Comprimento do blank',
    };
  }

  if (comprimentoAcabado === 0) {
    return {
      field: 'finalLength',
      message: 'Comprimento Acabado não pode ser zero',
      notify: false,
    };
  }

  if (pesoAcabado > pesoMP) {
    return {
      field: 'finalWeight',
      message: 'Peso Acabado não pode ser maior do que o Peso MP',
    };
  }

  if (pesoAcabado === 0) {
    return { field: 'finalWeight', message: 'Peso Acabado não pode ser zero' };
  }

  return null;
}

export function getPermissions(role) {
  return {
    create: hasPermission(role, 'bom', 'C', 1),
    update: hasPermission(role, 'bomProducts', 'U', 6),
    remove: hasPermission(role, 'bomProducts', 'D'),
  };
}

export const productProfiles = [
  { value: 'ROUND', label: 'Redondo' },
  { value: 'RECTANGULAR', label: 'Retangular' },
  { value: 'SHEET', label: 'Chapa' },
  { value: 'ROUNDTUBE', label: 'Tubular Redondo' },
];
export function isInvalidTube(profile, a, b) {
  return profile === 'ROUNDTUBE' && b >= a;
}

export function duplicateCodeError(product, set) {
  return product
    ? 'O código já foi utilizado para cadastrar um PRODUTO!'
    : set
      ? 'O código já foi utilizado para cadastrar um CONJUNTO!'
      : null;
}

export function requiresDimensionB(profile) {
  return profile !== 'ROUND';
}
