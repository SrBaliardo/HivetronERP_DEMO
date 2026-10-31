// Dados exclusivamente fictícios. Nenhum registro é persistido.
export function buildDemonstrationResponses() {
  return {
    fetchNotices: {
      value: {
        content: [
          {
            id: 1,
            title: 'Bem-vindo ao Hivetron ERP DEMO',
            description:
              'Explore as telas, os formulários e os relatórios. Os dados são fictícios. Nenhuma alteração é gravada e nenhuma ação é enviada a um servidor.',
            createdAt: '2026-10-31T12:00:00Z',
            updatedAt: null,
          },
        ],
      },
    },
    createNotice: {
      value: {
        id: 1,
        title: 'Bem-vindo ao Hivetron ERP DEMO',
        description:
          'Explore as telas, os formulários e os relatórios. Os dados são fictícios. Nenhuma alteração é gravada e nenhuma ação é enviada a um servidor.',
        createdAt: '2026-10-31T12:00:00Z',
        updatedAt: null,
      },
    },
    updateNotice: {
      value: {
        id: 1,
        title: 'Bem-vindo ao Hivetron ERP DEMO',
        description:
          'Explore as telas, os formulários e os relatórios. Os dados são fictícios. Nenhuma alteração é gravada e nenhuma ação é enviada a um servidor.',
        createdAt: '2026-10-31T12:00:00Z',
        updatedAt: null,
      },
    },
    removeNotice: {
      value: null,
    },
  };
}
