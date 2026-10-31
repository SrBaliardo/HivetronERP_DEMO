import { hasPermission } from '../../utils/hasPermission';
export function canRegister(role) {
  return hasPermission(role, 'appointment', 'C');
}
export function validDateRange(criteria) {
  return !(
    criteria.startDate &&
    criteria.endDate &&
    new Date(criteria.startDate) > new Date(criteria.endDate)
  );
}
function day(value) {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date.toISOString().split('T')[0];
}
const fields = {
  searchInputCode: 'serviceOrderCode',
  searchInputOperation: 'operation',
  searchInputMachine: 'machine',
  searchInputItem: 'itemCode',
};
export function filterOrders(items, criteria) {
  return items.filter((order) => {
    const general = (criteria.searchInput || '').toLowerCase();
    if (
      !['serviceOrderCode', 'itemCode', 'operation', 'machine'].some(
        (key) =>
          order[key] && String(order[key]).toLowerCase().includes(general),
      )
    )
      return false;
    for (const [criterion, key] of Object.entries(fields)) {
      if (
        criteria[criterion] &&
        !String(order[key] ?? '')
          .toLowerCase()
          .includes(criteria[criterion].toLowerCase())
      )
        return false;
    }
    if (criteria.selectedStatus && order.newStatus !== criteria.selectedStatus)
      return false;
    const start = day(criteria.startDate),
      end = day(criteria.endDate),
      date = day(order.createdAt);
    return start && end
      ? date >= start && date <= end
      : start
        ? date === start
        : end
          ? date <= end
          : true;
  });
}
export function exportOrders(filtered, all) {
  return filtered.length ? filtered : all;
}
