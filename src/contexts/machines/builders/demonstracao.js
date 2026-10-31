// Dados exclusivamente fictícios. Nenhum registro é persistido.
export function buildDemonstrationResponses() {
  return {
    readCatalog: {
      value: [
        {
          id: 401,
          code: 'MAQ-001',
          description: 'Torno CNC — Demonstração',
          machineGroupId: 1,
          machineGroupDescription: 'Usinagem CNC',
          isActive: true,
        },
        {
          id: 402,
          code: 'MAQ-002',
          description: 'Centro de usinagem — Demonstração',
          machineGroupId: 1,
          machineGroupDescription: 'Usinagem CNC',
          isActive: true,
        },
      ],
    },
    readList: {
      value: {
        content: [
          {
            id: 401,
            code: 'MAQ-001',
            description: 'Torno CNC — Demonstração',
            machineGroupId: 1,
            machineGroupDescription: 'Usinagem CNC',
            isActive: true,
          },
          {
            id: 402,
            code: 'MAQ-002',
            description: 'Centro de usinagem — Demonstração',
            machineGroupId: 1,
            machineGroupDescription: 'Usinagem CNC',
            isActive: true,
          },
        ],
      },
    },
    readAuxiliary: {
      value: [
        {
          id: 1,
          description: 'Usinagem CNC',
        },
      ],
    },
    createRecord: {
      value: {
        id: 401,
        code: 'MAQ-001',
        description: 'Torno CNC — Demonstração',
        machineGroupId: 1,
        machineGroupDescription: 'Usinagem CNC',
        isActive: true,
      },
    },
    updateRecord: {
      value: {
        id: 401,
        code: 'MAQ-001',
        description: 'Torno CNC — Demonstração',
        machineGroupId: 1,
        machineGroupDescription: 'Usinagem CNC',
        isActive: true,
      },
      byKey: {
        401: {
          id: 401,
          code: 'MAQ-001',
          description: 'Torno CNC — Demonstração',
          machineGroupId: 1,
          machineGroupDescription: 'Usinagem CNC',
          isActive: true,
        },
        402: {
          id: 402,
          code: 'MAQ-002',
          description: 'Centro de usinagem — Demonstração',
          machineGroupId: 1,
          machineGroupDescription: 'Usinagem CNC',
          isActive: true,
        },
      },
    },
    deleteRecord: {
      value: null,
    },
  };
}
