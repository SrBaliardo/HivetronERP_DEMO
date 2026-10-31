export function buildParameters(value) {
  return { id: value, code: value };
}
export function buildSearchOptions(data) {
  return data.map(({ code, description }) => ({ code, description }));
}
export function buildSetPayload(data, { set, setCode, setDescription }) {
  return set
    ? { ...data, id: set.id }
    : { ...data, code: setCode, description: setDescription };
}
export function buildSetForm(set) {
  return {
    code: set?.code || '',
    description: set?.description || '',
    drawingNumber: set?.drawingNumber || '',
    isActive: set ? set.isActive : true,
  };
}

export function buildNavigation(item, tabKey, fromTab) {
  const state = { set: item, setId: item.id, setCode: item.code, tabKey };
  if (tabKey === '8') state.setDescription = item.description;
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
      description: item.description.toUpperCase(),
      normalizedDescription: item.description
        .toUpperCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, ''),
    })),
  };
}
export function hasRecord(data) {
  return Boolean(data?.id);
}
