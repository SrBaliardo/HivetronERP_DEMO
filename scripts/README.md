# Validação do DEMO

Build: `yarn build`. Smoke de produção: `node scripts/smoke.mjs`. O smoke serve apenas o dist local, abre Edge headless com perfil descartável, verifica rotas, formulários e downloads, registra falhas JS e chamadas de API indevidas. Os artefatos ficam em .validation (ignorada pelo Git).

Contratos locais: `node scripts/contracts.mjs` (13 domínios e 108 operações).
