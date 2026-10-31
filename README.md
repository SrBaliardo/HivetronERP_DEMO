# Hivetron ERP DEMO

Demonstração navegável e independente do Hivetron ERP. Dados exclusivamente fictícios; não utiliza backend e não persiste cadastros, exclusões ou alterações.

## Executar

Node compatível com Vite 5 e Yarn 1.

```sh
yarn install --frozen-lockfile
yarn dev
```

Acesso: usuário **demo**, senha **demo** (pré-preenchidos). As credenciais são apenas uma apresentação local, sem autenticação real.

## Experiência

Menus, formulários, modais e detalhes usam registros fixos. Salvar e excluir concluem a interação sem mudar os registros. Apontamentos é exibido diretamente. PDFs reais usam o logo Hivetron, fontes incorporadas no renderizador e identificação de demonstração. Campos, filtros locais e seleção podem manter estado em memória durante a navegação. Sessão demonstrativa e preferências visuais podem ser mantidas no navegador; cadastros não são gravados.

## Publicar na Vercel

Crie um repositório próprio no GitHub para esta pasta e importe-o na Vercel. Framework: Vite; build: `yarn build`; saída: `dist`. O arquivo `vercel.json` configura as rotas da SPA e restringe conexões à própria origem. Não configurar API, banco ou credenciais de produção.

## Arquitetura

Respostas fictícias: `contexts/<domínio>/builders/demonstracao.js`. Fachadas: `contexts/<domínio>/index.js`. Services locais recebem os contratos preparados e devolvem cópias, sem rede nem gravação. `utils/readDemonstrationResponse.js` realiza apenas consulta genérica e cópia defensiva. O original permanece em outra pasta.

## Verificações

```sh
yarn test:contracts
yarn build
yarn test:smoke
```

O smoke usa um Chromium já instalado (Edge ou Chrome), com perfil exclusivo. Não acessa a aplicação original nem a API real.
