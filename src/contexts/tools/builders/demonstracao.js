// Dados exclusivamente fictícios. Nenhum registro é persistido.
export function buildDemonstrationResponses() {
  return {
    readCatalog: {
      value: [
        {
          id: 501,
          code: 'FER-001',
          description: 'Pastilha de metal duro — Demonstração',
          isActive: true,
        },
        {
          id: 502,
          code: 'FER-002',
          description: 'Broca 10 mm — Demonstração',
          isActive: true,
        },
      ],
    },
    readList: {
      value: {
        content: [
          {
            id: 501,
            code: 'FER-001',
            description: 'Pastilha de metal duro — Demonstração',
            isActive: true,
          },
          {
            id: 502,
            code: 'FER-002',
            description: 'Broca 10 mm — Demonstração',
            isActive: true,
          },
        ],
      },
    },
    createRecord: {
      value: {
        id: 501,
        code: 'FER-001',
        description: 'Pastilha de metal duro — Demonstração',
        isActive: true,
      },
    },
    updateRecord: {
      value: {
        id: 501,
        code: 'FER-001',
        description: 'Pastilha de metal duro — Demonstração',
        isActive: true,
      },
      byKey: {
        501: {
          id: 501,
          code: 'FER-001',
          description: 'Pastilha de metal duro — Demonstração',
          isActive: true,
        },
        502: {
          id: 502,
          code: 'FER-002',
          description: 'Broca 10 mm — Demonstração',
          isActive: true,
        },
      },
    },
    deleteRecord: {
      value: null,
    },
  };
}
