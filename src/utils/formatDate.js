import { format, isValid } from 'date-fns';

export function formatDate(value) {
  if (!value) return '';
  const date = new Date(value);
  return isValid(date) ? format(date, 'dd/MM/yyyy') : '';
}
