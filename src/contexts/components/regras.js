export function componentAdditionError(amount, code, parentCode, tree) {
  if (amount <= 0) return 'A quantidade não pode ser zero ou vazia.';
  if (code === parentCode)
    return 'O código do sub-conjunto não pode ser o mesmo do conjunto.';
  const duplicate = (node) =>
    (node.key.split('.').length === 2 && node.title.includes(code)) ||
    (node.children || []).some(duplicate);
  return tree.some(duplicate) ? 'Código já foi adicionado!' : null;
}
export function adjacentComponent(tree, key, direction) {
  const children = tree[0]?.children || [];
  const index = children.findIndex((child) => child.key === key);
  const adjacent = direction === 'up' ? index - 1 : index + 1;
  return index >= 0 && adjacent >= 0 && adjacent < children.length
    ? {
        currentItemCode: children[index].itemCode,
        otherItemCode: children[adjacent].itemCode,
      }
    : null;
}
export function findComponentId(nodes, key) {
  for (const node of nodes) {
    if (node.key === key) return node.itemId;
    const result = findComponentId(node.children || [], key);
    if (result) return result;
  }
  return null;
}

export function canChangeComponent(key) {
  return key.split('.').length === 2;
}
