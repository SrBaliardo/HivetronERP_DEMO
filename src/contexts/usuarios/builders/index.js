export function buildUserForm(user) {
  return {
    registration: user?.registration || '',
    name: user?.name || '',
    phone: user?.phone || '',
    email: user?.email || '',
    employeePosition: user?.employeePosition || '',
    sector: user?.sector || '',
    username: user?.username || '',
    password: '',
    confirm_password: '',
    role: user?.role || '',
    isActive: user ? user.isActive : true,
  };
}

export function buildUserPayload(values, user) {
  if (!user) return { ...values };
  return {
    ...values,
    password: values.password || user.password,
    id: user.id,
  };
}

export function buildUserList(response) {
  if (
    !Array.isArray(response) ||
    response.some(
      (item) => !item || typeof item !== 'object' || Array.isArray(item),
    )
  )
    throw new Error('Resposta inválida ao buscar usuários.');
  return response;
}
