export function buildIdentifier(value) {
  if (value == null || value === '')
    throw new Error('Por favor, insira um código de ordem antes de apontar.');
  return value;
}
export function buildList(data) {
  if (data == null) return [];
  if (!Array.isArray(data)) throw new Error('Lista de apontamentos inválida.');
  return data;
}
