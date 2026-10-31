// Dados exclusivamente fictícios. Nenhum registro é persistido.
export function buildDemonstrationResponses() {
  return {
    authenticate: {
      value: {
        token:
          'eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0.eyJpZCI6MSwiZXhwIjo0MTAyNDQ0ODAwfQ.demo',
      },
    },
    recoverPassword: {
      value: {
        demonstration: true,
      },
    },
    fetchUserProfile: {
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
  };
}
