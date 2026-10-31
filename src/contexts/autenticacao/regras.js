export function canValidateAdmin(role) {
  return role === 'WEB147';
}

export function isDemonstrationCredential(username, password) {
  return username === 'demo' && password === 'demo';
}
