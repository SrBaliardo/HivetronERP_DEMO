// Dados exclusivamente fictícios. Nenhum registro é persistido.
export function buildDemonstrationResponses() {
  return {
    readCatalog: {
      value: [
        {
          id: 301,
          code: 'OP-001',
          description: 'Usinagem — Demonstração',
          operationTypeId: 1,
          operationTypeDescription: 'Usinagem',
          collectiveTime: false,
          isActive: true,
        },
        {
          id: 302,
          code: 'OP-002',
          description: 'Furação — Demonstração',
          operationTypeId: 1,
          operationTypeDescription: 'Usinagem',
          collectiveTime: true,
          isActive: true,
        },
      ],
    },
    readList: {
      value: {
        content: [
          {
            id: 301,
            code: 'OP-001',
            description: 'Usinagem — Demonstração',
            operationTypeId: 1,
            operationTypeDescription: 'Usinagem',
            collectiveTime: false,
            isActive: true,
          },
          {
            id: 302,
            code: 'OP-002',
            description: 'Furação — Demonstração',
            operationTypeId: 1,
            operationTypeDescription: 'Usinagem',
            collectiveTime: true,
            isActive: true,
          },
        ],
      },
    },
    readAuxiliary: {
      value: [
        {
          id: 1,
          description: 'Usinagem',
        },
      ],
    },
    createRecord: {
      value: {
        id: 301,
        code: 'OP-001',
        description: 'Usinagem — Demonstração',
        operationTypeId: 1,
        operationTypeDescription: 'Usinagem',
        collectiveTime: false,
        isActive: true,
      },
    },
    updateRecord: {
      value: {
        id: 301,
        code: 'OP-001',
        description: 'Usinagem — Demonstração',
        operationTypeId: 1,
        operationTypeDescription: 'Usinagem',
        collectiveTime: false,
        isActive: true,
      },
      byKey: {
        301: {
          id: 301,
          code: 'OP-001',
          description: 'Usinagem — Demonstração',
          operationTypeId: 1,
          operationTypeDescription: 'Usinagem',
          collectiveTime: false,
          isActive: true,
        },
        302: {
          id: 302,
          code: 'OP-002',
          description: 'Furação — Demonstração',
          operationTypeId: 1,
          operationTypeDescription: 'Usinagem',
          collectiveTime: true,
          isActive: true,
        },
      },
    },
    deleteRecord: {
      value: null,
    },
    readRecord: {
      value: {
        id: 301,
        code: 'OP-001',
        description: 'Usinagem — Demonstração',
        operationTypeId: 1,
        operationTypeDescription: 'Usinagem',
        collectiveTime: false,
        isActive: true,
      },
      byKey: {
        301: {
          id: 301,
          code: 'OP-001',
          description: 'Usinagem — Demonstração',
          operationTypeId: 1,
          operationTypeDescription: 'Usinagem',
          collectiveTime: false,
          isActive: true,
        },
        302: {
          id: 302,
          code: 'OP-002',
          description: 'Furação — Demonstração',
          operationTypeId: 1,
          operationTypeDescription: 'Usinagem',
          collectiveTime: true,
          isActive: true,
        },
      },
    },
  };
}
