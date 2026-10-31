export function formatPhone(value) {
  const digits = String(value ?? '')
    .replace(/\D/g, '')
    .slice(0, 11);
  if (!digits) return '';
  if (digits.length < 2) return '(' + digits;
  const area = '(' + digits.slice(0, 2) + ')';
  const number = digits.slice(2);
  if (!number) return area;
  const prefixLength = digits.length === 11 ? 5 : 4;
  const prefix = number.slice(0, prefixLength);
  const suffix = number.slice(prefixLength);
  return area + ' ' + prefix + (suffix ? '-' + suffix : '');
}

export function isValidPhone(value) {
  const digits = String(value ?? '').replace(/\D/g, '');
  return digits.length === 10 || digits.length === 11;
}
