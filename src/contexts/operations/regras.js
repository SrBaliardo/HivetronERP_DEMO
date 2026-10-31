import { hasPermission } from '../../utils/hasPermission';
export function selectionError(option) {
  return !option.isActive
    ? 'A operação selecionada está inativa. Escolha outra.'
    : null;
}

export function getPermissions(role) {
  return {
    create: Boolean(hasPermission(role, 'scripting', 'C', 1)),
    update: Boolean(hasPermission(role, 'scripting', 'U', 6)),
    remove: Boolean(hasPermission(role, 'scripting', 'D')),
  };
}
