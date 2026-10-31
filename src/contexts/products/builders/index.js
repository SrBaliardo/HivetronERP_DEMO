export function buildParameters(value, encode = false) {
  return { id: value, code: encode ? encodeURIComponent(value) : value };
}
export function buildSearchOptions(data) {
  return data.map(({ code, description }) => ({ code, description }));
}
export function buildProductPayload(
  data,
  { product, productCode, productDescription, rawMaterialCode },
) {
  return product
    ? { ...data, rawMaterialCode, id: product.id }
    : {
        ...data,
        rawMaterialCode,
        code: productCode,
        description: productDescription,
      };
}
export function buildProductForm(product) {
  const values = {
    code: product?.code || '',
    description: product?.description || '',
    drawingNumber: product?.drawingNumber || '',
    rawMaterialProfile: product?.rawMaterialProfile || '',
    rawMaterialCode: product?.rawMaterialCode || '',
    rawMaterialStandard: product?.rawMaterialStandard || '',
    isActive: product ? product.isActive : true,
  };
  for (const key of [
    'rawMaterialSpecificWeight',
    'rawMaterialDimensionA',
    'rawMaterialDimensionB',
    'rawMaterialDimensionLength',
    'finalDimensionA',
    'finalDimensionB',
    'finalLength',
    'finalWeight',
  ])
    values[key] =
      product?.[key]?.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
        useGrouping: false,
      }) ?? '';
  return values;
}

export function buildNavigation(item, tabKey, fromTab) {
  const state = {
    product: item,
    productId: item.id,
    productCode: item.code,
    tabKey,
  };
  if (tabKey === '6') state.productDescription = item.description;
  if (fromTab) state.fromTab = fromTab;
  return state;
}

export function buildCodeOptions(data) {
  return data.map((item) => ({
    value: item.code.replace(/\s+/g, '').trim(),
    label:
      item.code.replace(/\s+/g, '').trim() + ' - ' + item.description.trim(),
    itemId: item.id,
  }));
}
export function buildRawMaterialOptions(data) {
  return data.map((item) => ({
    value: item.code,
    label: item.code.replace(/\s+/g, '').trim(),
  }));
}

export function normalizeDimensionInput(value) {
  return value.replace(',', '.').replace(/[a-zA-Z\s]/g, '');
}

export function buildList(data) {
  if (data == null) return [];
  if (!Array.isArray(data)) throw new Error('Resposta de listagem inválida.');
  return data;
}

export function buildCatalogValidation(data, code) {
  const normalize = (value) =>
    String(value ?? '')
      .replace(/\s+/g, '')
      .trim();
  return {
    code: normalize(code),
    items: buildList(data).map((item) => ({
      ...item,
      code: normalize(item.code),
    })),
  };
}
export function hasRecord(data) {
  return Boolean(data?.id);
}
