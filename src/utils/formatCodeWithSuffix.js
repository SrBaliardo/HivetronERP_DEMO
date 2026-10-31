// Formatação visual genérica: zero é um sufixo válido.
export function formatCodeWithSuffix(code, suffix) {
  const text = String(code ?? '');
  return suffix == null || suffix === '' ? text : text + '-' + suffix;
}
