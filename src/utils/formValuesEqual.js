export function formValuesEqual(left, right) {
  if (Object.is(left, right)) return true;
  if (left instanceof Date && right instanceof Date)
    return left.getTime() === right.getTime();
  if (!left || !right || typeof left !== 'object' || typeof right !== 'object')
    return false;
  if (Array.isArray(left) !== Array.isArray(right)) return false;
  const keys = [...new Set([...Object.keys(left), ...Object.keys(right)])];
  return keys.every((key) => formValuesEqual(left[key], right[key]));
}
