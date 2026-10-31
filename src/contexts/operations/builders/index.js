export function buildOptions(data) {
  if (!Array.isArray(data)) throw new Error('Resposta inválida do catálogo.');
  return data.map((item) => ({
    value: item.id,
    label:
      item.code.replace(/\s+/g, '').trim() + ' - ' + item.description.trim(),
    operationType: item.operationTypeDescription.trim(),
    isActive: item.isActive,
  }));
}

export function buildList(data) {
  if (!Array.isArray(data)) throw new Error('Resposta de listagem inválida.');
  return data;
}
export function buildPage(data) {
  return buildList(data.content);
}
export function buildForm(record) {
  return {
    code: record?.code || '',
    description: record?.description || '',
    operationTypeId: record?.operationTypeId || '',
    isActive: record ? record.isActive : true,
    collectiveTime: record?.collectiveTime === true,
  };
}
export function buildPayload(data, record) {
  const payload = { ...data, collectiveTime: data.collectiveTime === true };
  return record ? { ...payload, id: record.id } : payload;
}
export function buildParameters(id) {
  return { id };
}
export function buildAuxiliaryOptions(data) {
  return buildList(data).map((item) => ({
    value: item.id,
    label: item.description,
  }));
}
