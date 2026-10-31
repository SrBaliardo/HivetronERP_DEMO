import { hasPermission } from '../../utils/hasPermission';

export const userRoles = [
  { value: 'WEB101', label: 'Eng. Produtos' },
  { value: 'WEB136', label: 'Eng. Processos' },
  { value: 'WEB147', label: 'Admin' },
  { value: 'WEB166', label: 'Pcp' },
  { value: 'WEB173', label: 'Comercial' },
  { value: 'WEB198', label: 'Expedição' },
];

export function userPermissions(role) {
  return {
    create: Boolean(hasPermission(role, 'settings', 'C', 1)),
    update: Boolean(hasPermission(role, 'settings', 'U', 6)),
    remove: Boolean(hasPermission(role, 'settings', 'D')),
  };
}
