export function buildOptions(data) {
  if (!Array.isArray(data)) throw new Error('Resposta inválida do catálogo.');
  return data.map((item) => ({
    value: item.code,
    label:
      item.code.replace(/\s+/g, '').trim() + ' - ' + item.description.trim(),
  }));
}
