import { hasPermission } from '../../utils/hasPermission';

export function noticePermissions(role) {
  return {
    create: Boolean(hasPermission(role, 'settings', 'C', 2)),
    update: Boolean(hasPermission(role, 'settings', 'U', 2)),
    remove: Boolean(hasPermission(role, 'settings', 'D')),
  };
}

export function hasNoticeCapacity(count) {
  return count < 5;
}
