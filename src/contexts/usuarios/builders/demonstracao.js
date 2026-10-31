// Dados exclusivamente fictícios. Nenhum registro é persistido.
export function buildDemonstrationResponses() {
  return {
    fetchUsers: {
      value: [
        {
          id: 1,
          registration: 'DEMO-001',
          name: 'Administrador Demonstração',
          phone: '',
          email: 'demo@example.invalid',
          employeePosition: 'Administrador',
          sector: 'Demonstração',
          username: 'demo',
          password: 'demo',
          role: 'WEB147',
          isActive: true,
        },
      ],
    },
    createUser: {
      value: {
        id: 1,
        registration: 'DEMO-001',
        name: 'Administrador Demonstração',
        phone: '',
        email: 'demo@example.invalid',
        employeePosition: 'Administrador',
        sector: 'Demonstração',
        username: 'demo',
        password: 'demo',
        role: 'WEB147',
        isActive: true,
      },
    },
    updateUser: {
      value: {
        id: 1,
        registration: 'DEMO-001',
        name: 'Administrador Demonstração',
        phone: '',
        email: 'demo@example.invalid',
        employeePosition: 'Administrador',
        sector: 'Demonstração',
        username: 'demo',
        password: 'demo',
        role: 'WEB147',
        isActive: true,
      },
    },
    removeUser: {
      value: null,
    },
  };
}
