import { hasPermission } from '../../utils/hasPermission';
export function selectionError(option) {
  return !option.isActive
    ? 'A ferramenta selecionada está inativa. Escolha outra.'
    : null;
}

export function getPermissions(role) {
  return {
    create: Boolean(hasPermission(role, 'scripting', 'C', 3)),
    update: Boolean(hasPermission(role, 'scripting', 'U', 10)),
    remove: Boolean(hasPermission(role, 'scripting', 'D')),
  };
}
