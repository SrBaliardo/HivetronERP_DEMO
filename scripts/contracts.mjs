import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

import { readDemonstrationResponse } from '../src/utils/readDemonstrationResponse.js';

const domains = [
  'autenticacao',
  'usuarios',
  'avisos',
  'products',
  'sets',
  'components',
  'manufacturingSequences',
  'operations',
  'machines',
  'tools',
  'inputs',
  'scanning',
  'appointment',
];
let operations = 0;
for (const domain of domains) {
  const { buildDemonstrationResponses } = await import(
    `../src/contexts/${domain}/builders/demonstracao.js`
  );
  const responses = buildDemonstrationResponses();
  const original = JSON.stringify(responses);
  const file = new URL(`../src/services/${domain}/index.js`, import.meta.url);
  const source = (await readFile(file, 'utf8')).replace(
    '../../utils/readDemonstrationResponse',
    new URL('../src/utils/readDemonstrationResponse.js', import.meta.url).href,
  );
  const { createDemonstrationService } = await import(
    'data:text/javascript;base64,' + Buffer.from(source).toString('base64')
  );
  const service = createDemonstrationService(responses);
  for (const name of Object.keys(responses)) {
    assert.equal(
      typeof service[name],
      'function',
      `${domain}.${name} has a consumer-compatible operation`,
    );
    const result = await service[name]({ id: 'test', code: 'test' });
    assert.deepEqual(
      result,
      responses[name].value,
      `${domain}.${name} returns the prepared fixture`,
    );
    if (result && typeof result === 'object') result.demoMutation = true;
    assert.equal(
      JSON.stringify(responses),
      original,
      `${domain}.${name} never modifies source records`,
    );
    const firstKey = Object.keys(responses[name].byKey || {})[0];
    if (firstKey) {
      assert.deepEqual(
        await service[name]({ id: firstKey }),
        responses[name].byKey[firstKey],
        `${domain}.${name} resolves detail identifiers`,
      );
    }
    const controller = new AbortController();
    controller.abort();
    await assert.rejects(
      service[name]({}, controller.signal),
      (error) => error.code === 'ERR_CANCELED',
    );
    operations++;
  }
  assert.deepEqual(
    buildDemonstrationResponses(),
    responses,
    `${domain} fixture construction is deterministic`,
  );
}
const { buildDemonstrationResponses: scanning } = await import(
  '../src/contexts/scanning/builders/demonstracao.js'
);
for (const name of [
  'listInvoicesPage',
  'listInspectionsPage',
  'listServiceOrdersPage',
]) {
  const data = scanning()[name].value;
  assert(Array.isArray(data.content));
  for (const key of ['number', 'size', 'totalElements', 'totalPages'])
    assert(Number.isInteger(data[key]));
  assert(data.content.length <= data.size);
}
const { isDemonstrationCredential } = await import(
  '../src/contexts/autenticacao/regras.js'
);
assert(isDemonstrationCredential('demo', 'demo'));
assert(!isDemonstrationCredential('admin', 'wrong'));
assert.equal(await readDemonstrationResponse({ value: null }), null);
console.log(
  `PASS: ${domains.length} domains, ${operations} local operations, immutable responses, cancellation, detail keys and pagination.`,
);
