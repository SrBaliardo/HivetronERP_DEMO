# Escopo e decisões

Autorização: clone demonstrativo independente, navegação e modais sem persistência, PDFs fictícios com logo Hivetron, Apontamentos diretamente disponível e preparo para Vercel.

Mapa: autenticação → autenticacao; usuários → usuarios; mural → avisos; produtos → products; conjuntos → sets; estrutura → components; roteiros → manufacturingSequences; catálogos → operations/machines/tools/inputs; digitalização, inspeções e PCP → scanning; apontamentos → appointment. Em cada domínio, contratos fictícios ficam em builders, a fachada compõe o transporte local e o service devolve respostas preparadas. Nenhuma nova fronteira ou dependência.

As operações demonstrativas não alteram a fonte dos registros. Navegação e rascunhos visuais podem mudar temporariamente. PDFs são exportações reais de dados fictícios. O clone não contém configuração de API de produção.

Validação: build e testes locais autorizados explicitamente pelo usuário em 31/10/2026. Evidências finais serão registradas após execução.

## Evidências

- Lint existente: apenas arquivos JavaScript/JSX e scripts criados ou alterados; sem erros ou avisos após correções mecânicas de layout e imports.
- Contratos: `node scripts/contracts.mjs` — 13 domínios e 108 operações, respostas imutáveis, seleção por identificador, cancelamento e paginação.
- Produção: `npm run build` — aprovado. Vite avisa sobre chunks maiores que 500 kB, principalmente a interface e o renderizador de PDF; carregamento tardio dos módulos foi preservado.
- Navegação: `node scripts/smoke.mjs` — resultado detalhado em `.validation/smoke-results.json`; testa build estático com a política CSP da Vercel, perfil exclusivo de Edge, login, telas, formulários, modais, exclusão sem remoção, apontamentos, sete downloads PDF, recarga de rota e apresentação móvel.
- PDFs: sete modelos renderizados e inspecionados visualmente, com logo Hivetron e identificação de demonstração.
- Escopo de rede: nenhum endpoint de API ou acesso externo permitido no smoke; fontes locais com licenças OFL em `public/fonts`. A permissão CSP `wasm-unsafe-eval` é necessária ao renderizador de PDF; não libera avaliação arbitrária de JavaScript.
- Diff: comparação por leitura contra o original, limitada aos arquivos da tarefa, via `git diff --no-index --check`.

## Limites

Não houve publicação em GitHub/Vercel. A instalação Yarn pela rede enfrentou falha de conexão; a validação local utilizou cópia das dependências já instaladas no projeto de origem. O yarn.lock foi preservado. A instalação limpa no provedor ainda precisa ocorrer no primeiro deploy. Os testes cobrem navegação e interações representativas, sem pretender comprovar cada combinação de campos do ERP original. Não há integração de backend na demonstração.

Nenhum arquivo da aplicação original foi editado. Configurações de API, histórico Git, backups e dados reais não foram copiados. Ferramentas de inspeção e artefatos de testes ficam somente em .validation, ignorada pelo Git.

## Ajuste das exportações PDF

Exportar reserva uma aba durante o clique e mostra o PDF nela quando a geração termina. O visitante pode baixar pelo visualizador do navegador. O hook compartilhado usePdfPreview coordena concorrência, cancelamento e erro; o util pdfPreview administra a janela e o tempo de vida do blob. Os cinco hooks de exportação consomem essa coordenação genérica. Nenhuma API ou operação de domínio foi modificada.

Os sete modelos usam logoHeaderHivetron.png fornecido em Pictures/erp, limitado a 150 x 42 pontos, e códigos CODE128 fictícios identificados com DEMO. Título, marca e código possuem espaços separados.

Validação: build aprovado; lint localizado sem erros; 47 verificações com sete novas abas PDF, sem downloads automáticos, erros de execução ou chamadas externas; sete páginas renderizadas e conferidas visualmente.
