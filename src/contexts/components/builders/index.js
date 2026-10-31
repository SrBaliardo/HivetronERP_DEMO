export function buildParameters(id) {
  return { id, code: id };
}
export function buildComponentReference(data) {
  return data ? { id: data.id, description: data.description } : null;
}
export function buildComponentPayload(itemId, setId, amount) {
  return { itemId, setId, amount };
}
export function buildMoveParameters(id, currentItemCode, otherItemCode) {
  return { id, currentItemCode, otherItemCode };
}
export function buildDeleteParameters(itemId, setId) {
  return { itemId, setId };
}
export function buildHierarchy(parentKey, hierarchy) {
  return (hierarchy || []).map((child, index) => {
    const key = parentKey + '.' + (index + 1);
    return {
      title:
        key +
        ' ' +
        child.itemCode +
        ' - ' +
        child.amount +
        'un - ' +
        child.itemDescription,
      key,
      itemId: child.itemId,
      itemCode: child.itemCode,
      children: buildHierarchy(key, child.simpleComponents || []),
    };
  });
}

export function buildCodeOptions(data) {
  return data.map((item) => ({
    value: item.code.replace(/\s+/g, '').trim(),
    label:
      item.code.replace(/\s+/g, '').trim() + ' - ' + item.description.trim(),
    itemId: item.id,
  }));
}

export function buildRoot(parent, hierarchy) {
  return [
    {
      title: '1. ' + parent.description,
      key: '1',
      children: buildHierarchy('1', hierarchy),
    },
  ];
}

export function buildList(data) {
  if (data == null) return [];
  if (!Array.isArray(data)) throw new Error('Resposta de listagem inválida.');
  return data;
}
