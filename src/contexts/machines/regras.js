import { hasPermission } from '../../utils/hasPermission';
export function selectionError(option) {
  return !option.isActive
    ? 'A máquina selecionada está inativa. Escolha outra.'
    : null;
}

export function getPermissions(role) {
  return {
    create: Boolean(hasPermission(role, 'scripting', 'C', 2)),
    update: Boolean(hasPermission(role, 'scripting', 'U', 8)),
    remove: Boolean(hasPermission(role, 'scripting', 'D')),
  };
}
