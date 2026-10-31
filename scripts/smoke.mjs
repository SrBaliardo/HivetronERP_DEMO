import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { access, mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import { createServer } from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const output = path.join(root, '.validation');
await mkdir(output, { recursive: true });
const downloadPath = path.join(output, 'downloads');
await mkdir(downloadPath, { recursive: true });
const {
  headers: [{ headers }],
} = JSON.parse(await readFile(path.join(root, 'vercel.json'), 'utf8'));
const mime = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
};
const server = createServer(async (request, response) => {
  try {
    const requested = decodeURIComponent(
      new URL(request.url, 'http://localhost').pathname,
    );
    let file = path.resolve(root, 'dist', '.' + requested);
    if (!file.startsWith(path.join(root, 'dist') + path.sep))
      file = path.join(root, 'dist/index.html');
    try {
      await access(file);
      if (!path.extname(file)) throw new Error('route');
    } catch {
      file = path.join(root, 'dist/index.html');
    }
    for (const header of headers) response.setHeader(header.key, header.value);
    response.setHeader(
      'Content-Type',
      mime[path.extname(file)] || 'application/octet-stream',
    );
    response.end(await readFile(file));
  } catch {
    response.writeHead(500);
    response.end('Test server failed');
  }
});
await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
const base = `http://127.0.0.1:${server.address().port}`;
const executables = [
  process.env.TEST_BROWSER_PATH,
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
].filter(Boolean);
let executable;
for (const candidate of executables) {
  try {
    await access(candidate);
    executable = candidate;
    break;
  } catch {
    /* next */
  }
}
if (!executable)
  throw new Error(
    'Install no browser: point TEST_BROWSER_PATH to an existing Chromium browser.',
  );
const profile = path.join(output, `browser-${Date.now()}`);
const browser = spawn(
  executable,
  [
    '--headless=new',
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check',
    '--remote-debugging-port=0',
    '--remote-allow-origins=*',
    '--user-data-dir=' + profile,
    'about:blank',
  ],
  { windowsHide: true, stdio: 'ignore' },
);
const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const results = [],
  errors = [],
  warnings = [],
  forbidden = [],
  downloads = [];
let socket;
try {
  let port;
  for (let i = 0; i < 150; i++) {
    try {
      port = Number(
        (
          await readFile(path.join(profile, 'DevToolsActivePort'), 'utf8')
        ).split('\n')[0],
      );
      break;
    } catch {
      await pause(100);
    }
  }
  assert(port, 'Browser startup');
  const targets = await (
    await fetch(`http://127.0.0.1:${port}/json/list`)
  ).json();
  socket = new WebSocket(
    targets.find((t) => t.type === 'page').webSocketDebuggerUrl,
  );
  await new Promise((resolve, reject) => {
    socket.onopen = resolve;
    socket.onerror = reject;
  });
  let seq = 0;
  const pending = new Map();
  socket.onmessage = ({ data }) => {
    const message = JSON.parse(data);
    if (message.id) {
      const callback = pending.get(message.id);
      pending.delete(message.id);
      if (message.error) callback.reject(Error(message.error.message));
      else callback.resolve(message.result);
      return;
    }
    if (message.method === 'Runtime.exceptionThrown')
      errors.push(
        message.params.exceptionDetails.exception?.description ||
          message.params.exceptionDetails.text,
      );
    if (
      message.method === 'Runtime.consoleAPICalled' &&
      ['error', 'warning'].includes(message.params.type)
    )
      warnings.push(
        message.params.args
          .map((a) => a.value || a.description || '')
          .join(' '),
      );
    if (message.method === 'Network.requestWillBeSent') {
      const url = message.params.request.url;
      if (
        /^https?:/.test(url) &&
        (!url.startsWith(base + '/') || /\/(api|auth)\//.test(url))
      )
        forbidden.push(url);
    }
    if (
      message.method === 'Network.responseReceived' &&
      message.params.response.status >= 400
    )
      errors.push(
        'HTTP ' +
          message.params.response.status +
          ': ' +
          message.params.response.url,
      );
    if (message.method === 'Page.downloadWillBegin')
      downloads.push(message.params.suggestedFilename);
  };
  const command = (method, params = {}) =>
    new Promise((resolve, reject) => {
      const id = ++seq;
      pending.set(id, { resolve, reject });
      socket.send(JSON.stringify({ id, method, params }));
    });
  const evaluate = async (expression) => {
    const r = await command('Runtime.evaluate', {
      expression,
      awaitPromise: true,
      returnByValue: true,
    });
    if (r.exceptionDetails)
      throw Error(
        r.exceptionDetails.exception?.description || r.exceptionDetails.text,
      );
    return r.result.value;
  };
  const wait = async (expression, timeout = 20000) => {
    const end = Date.now() + timeout;
    while (Date.now() < end) {
      if (await evaluate(`Boolean(${expression})`)) return;
      await pause(60);
    }
    throw Error(
      'Timeout: ' +
        expression +
        '\n' +
        (await evaluate('document.body.innerText.slice(0,1800)')),
    );
  };
  const snapshot = async (name) => {
    const r = await command('Page.captureScreenshot', {
      format: 'png',
      captureBeyondViewport: false,
    });
    await writeFile(
      path.join(output, name + '.png'),
      Buffer.from(r.data, 'base64'),
    );
  };
  const clickText = async (text, selector = 'button') => {
    const clicked = await evaluate(
      `(()=>{const e=[...document.querySelectorAll(${JSON.stringify(selector)})].find(e=>e.getClientRects().length&&!e.disabled&&e.textContent.trim()===${JSON.stringify(text)});if(!e)return false;e.click();return true;})()`,
    );
    assert(clicked, `Visible control: ${text}`);
    await pause(180);
  };
  const route = async (url, state = {}) => {
    await evaluate(
      `history.pushState({usr:${JSON.stringify(state)},key:Math.random().toString(),idx:(history.state?.idx||0)+1},'',${JSON.stringify(url)});window.dispatchEvent(new PopStateEvent('popstate'));`,
    );
    await pause(500);
    await wait("!document.body.innerText.includes('Carregando...')");
    assert(
      !(await evaluate(
        '/Algo deu errado|Não foi possível carregar|Erro inesperado/.test(document.body.innerText)',
      )),
      url + ' rendered without failure',
    );
    results.push({
      case: url + ' ' + JSON.stringify(state.tabKey || ''),
      status: 'passed',
    });
  };
  const exportPdf = async (label) => {
    await evaluate(
      "(()=>{window.__demoPdfBlob=null;if(!window.__demoCreateObjectURL){window.__demoCreateObjectURL=URL.createObjectURL.bind(URL);URL.createObjectURL=(blob)=>{if(blob.type==='application/pdf')window.__demoPdfBlob=blob;return window.__demoCreateObjectURL(blob);};}})()",
    );
    const targetsBefore = await (
      await fetch('http://127.0.0.1:' + port + '/json/list')
    ).json();
    const ids = new Set(targetsBefore.map((target) => target.id));
    const before = (await readdir(downloadPath)).filter((file) =>
      file.endsWith('.pdf'),
    ).length;
    const position = await evaluate(
      "(()=>{const button=[...document.querySelectorAll('button')].find(e=>e.getClientRects().length&&!e.disabled&&e.innerText.trim()==='Exportar');if(!button)return null;button.scrollIntoView({block:'center'});const rect=button.getBoundingClientRect();return {x:rect.left+rect.width/2,y:rect.top+rect.height/2};})()",
    );
    assert(position, 'PDF export control exists');
    await command('Page.bringToFront');
    await command('Input.dispatchMouseEvent', {
      type: 'mousePressed',
      button: 'left',
      clickCount: 1,
      ...position,
    });
    await command('Input.dispatchMouseEvent', {
      type: 'mouseReleased',
      button: 'left',
      clickCount: 1,
      ...position,
    });
    const end = Date.now() + 30000;
    while (Date.now() < end) {
      const targets = await (
        await fetch('http://127.0.0.1:' + port + '/json/list')
      ).json();
      const preview = targets.find(
        (target) =>
          !ids.has(target.id) &&
          target.type === 'page' &&
          target.url.startsWith('blob:'),
      );
      if (preview) {
        const encoded = await evaluate(
          "(async()=>{const blob=window.__demoPdfBlob;if(!blob)throw Error('PDF blob not prepared');return await new Promise(resolve=>{const reader=new FileReader();reader.onload=()=>resolve(reader.result.split(',')[1]);reader.readAsDataURL(blob);});})()",
        );
        const bytes = Buffer.from(encoded, 'base64');
        assert.equal(bytes.subarray(0, 5).toString(), '%PDF-');
        assert.equal(
          downloads.length,
          0,
          'Preview does not trigger automatic download',
        );
        assert.equal(
          (await readdir(downloadPath)).filter((file) => file.endsWith('.pdf'))
            .length,
          before,
        );
        if (label === 'inspecao') {
          const viewer = new WebSocket(preview.webSocketDebuggerUrl);
          await new Promise((resolve, reject) => {
            viewer.onopen = resolve;
            viewer.onerror = reject;
          });
          await pause(1500);
          const screenshot = await new Promise((resolve, reject) => {
            viewer.onmessage = ({ data }) => {
              const result = JSON.parse(data);
              if (result.id === 1) {
                if (result.error) reject(Error(result.error.message));
                else resolve(result.result.data);
              }
            };
            viewer.send(
              JSON.stringify({
                id: 1,
                method: 'Page.captureScreenshot',
                params: { format: 'png' },
              }),
            );
          });
          await writeFile(
            path.join(output, 'pdf-native-viewer.png'),
            Buffer.from(screenshot, 'base64'),
          );
          viewer.close();
        }
        const file = 'preview-' + label + '.pdf';
        await writeFile(path.join(downloadPath, file), bytes);
        results.push({
          case: 'PDF ' + label,
          status: 'passed',
          file,
          newTab: true,
          automaticDownload: false,
        });
        await fetch('http://127.0.0.1:' + port + '/json/close/' + preview.id);
        return;
      }
      await pause(150);
    }
    throw Error(
      'PDF preview failed: ' +
        label +
        '\n' +
        (await evaluate('document.body.innerText.slice(-2000)')),
    );
  };
  await command('Page.enable');
  await command('Runtime.enable');
  await command('Network.enable');
  await command('Page.setDownloadBehavior', {
    behavior: 'allow',
    downloadPath,
  });
  await command('Emulation.setDeviceMetricsOverride', {
    width: 1440,
    height: 1000,
    deviceScaleFactor: 1,
    mobile: false,
  });
  await command('Page.navigate', { url: base + '/' });
  await wait("document.querySelector('#login-username')");
  assert.equal(
    await evaluate("document.querySelector('#login-username').value"),
    'demo',
  );
  await clickText('Entrar na demonstração');
  await wait("location.pathname==='/home' && document.querySelector('nav')");
  results.push({ case: 'Login demo/demo', status: 'passed' });
  await snapshot('01-home');
  const load = async (domain) =>
    (
      await import(`../src/contexts/${domain}/builders/demonstracao.js`)
    ).buildDemonstrationResponses();
  const p = (await load('products')).listProducts.value[0],
    s = (await load('sets')).listSets.value[0],
    sc = await load('scanning');
  await route('/bom');
  await wait("document.body.innerText.includes('PRD-001')");
  await snapshot('02-produtos');
  // Actual list interaction opens details (rather than only injected route state).
  await evaluate(
    "document.querySelector('tbody tr button, tbody tr a')?.click()",
  );
  await pause(400);
  await route('/bom', { tabKey: '5' });
  assert(await evaluate("document.querySelectorAll('input').length>0"));
  await evaluate(
    'document.querySelector(\'button[aria-label="Abrir opções de Produto"]\')?.click()',
  );
  await wait(
    "[...document.querySelectorAll('[role=option]')].some(e=>e.innerText.includes('PRD-004'))",
  );
  await evaluate(
    "[...document.querySelectorAll('[role=option]')].find(e=>e.innerText.includes('PRD-004')).click()",
  );
  await clickText('Adicionar');
  await wait("document.querySelectorAll('input').length > 5");
  results.push({
    case: 'Cadastro de produto exibe todos os campos',
    status: 'passed',
  });
  await route('/bom', { tabKey: '7' });
  await route('/bom-products', {
    product: p,
    productId: p.id,
    productCode: p.code,
    tabKey: '6',
  });
  await snapshot('03-detalhes-produto');
  const deleteBefore = await evaluate(
    "document.querySelectorAll('[role=dialog]').length",
  );
  await clickText('Excluir');
  await wait("document.querySelector('[role=dialog]')");
  assert(
    (await evaluate("document.querySelectorAll('[role=dialog]').length")) >
      deleteBefore,
  );
  const modalText = await evaluate(
    "document.querySelector('[role=dialog]').innerText",
  );
  await writeFile(path.join(output, 'delete-modal.txt'), modalText);
  // Cancel closes the real modal; confirm is covered through a dedicated record form below.
  const cancel = await evaluate(
    "(()=>{const d=document.querySelector('[role=dialog]');const b=[...d.querySelectorAll('button')].find(b=>/cancelar|não/i.test(b.innerText));b?.click();return Boolean(b)})()",
  );
  assert(cancel);
  await pause(250);
  await clickText('Editar');
  await clickText('Salvar');
  await pause(500);
  await route('/bom-products', {
    product: p,
    productId: p.id,
    productCode: p.code,
    tabKey: '6',
  });
  await clickText('Excluir');
  await wait("document.querySelector('[role=dialog]')");
  await clickText('Sim', '[role=dialog] button');
  await wait("location.pathname === '/bom'");
  await wait("document.body.innerText.includes('PRD-001')");
  results.push({
    case: 'Confirmar exclusão mantém produto demonstrativo',
    status: 'passed',
  });
  await route('/bom-products', {
    product: p,
    productId: p.id,
    productCode: p.code,
    tabKey: '11',
  });
  await wait("document.body.innerText.includes('Usinagem')");
  await route('/bom-products', {
    product: p,
    productId: p.id,
    productCode: p.code,
    tabKey: '12',
  });
  await route('/bom-sets', {
    set: s,
    setId: s.id,
    setCode: s.code,
    tabKey: '8',
  });
  await route('/scripting');
  await wait("document.body.innerText.includes('OP-001')");
  await snapshot('04-roteirizacao');
  for (const tabKey of ['2', '3', '4', '5', '7', '9'])
    await route('/scripting', { tabKey });
  await route('/scanning');
  await wait("document.body.innerText.includes('NF-DEMO')");
  await route('/scanning', { tabKey: '2' });
  await wait("document.body.innerText.includes('NF-DEMO')");
  await snapshot('05-inspecoes');
  for (let step = 1; step <= 5; step++) {
    const inspection =
      step === 1 ? undefined : sc.listInspections.value[step - 2];
    await route('/scanning-inspection-step' + step, {
      inspection,
      tabKey: String(step + 9),
    });
    if (step === 2) await exportPdf('inspecao');
  }
  await route('/scanning', { tabKey: '3' });
  await route('/scanning-orders', {
    orderList: sc.listAllServiceOrders.value,
    tabKey: '15',
  });
  await route('/scanning-orders', {
    order: sc.listAllServiceOrders.value[0],
    orderList: sc.listAllServiceOrders.value,
    tabKey: '16',
  });
  await exportPdf('ordem-servico');
  for (const [tabKey, label] of [
    ['1', 'lista-os'],
    ['2', 'lista-oc'],
    ['3', 'relatorio'],
  ]) {
    await route('/pcp', { tabKey });
    await wait("document.querySelector('tbody tr')");
    await exportPdf(label);
  }
  await route('/pcp-service-orders', {
    order: sc.listAllServiceOrders.value[0],
  });
  await route('/pcp-cut-orders', { order: sc.listCutOrders.value[0] });
  await exportPdf('ordem-corte');
  await route('/appointment');
  assert(
    !(await evaluate("document.body.innerText.includes('não habilitado')")),
  );
  assert(
    await evaluate("Boolean(document.querySelector('#appointment-code'))"),
  );
  await snapshot('06-apontamento');
  await evaluate(
    "(()=>{const i=document.querySelector('#appointment-code');const set=Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value').set;set.call(i,'1001-10');i.dispatchEvent(new Event('input',{bubbles:true}));})()",
  );
  await clickText('Apontar');
  await wait("document.body.innerText.includes('Dados:')");
  await clickText('Salvar');
  await wait("!document.body.innerText.includes('Dados:')");
  results.push({
    case: 'Salvar apontamento conclui sem persistir',
    status: 'passed',
  });
  await clickText('Histórico', '[role=tab]');
  await wait("document.body.innerText.includes('Operador Demonstração')");
  await exportPdf('apontamentos');
  await route('/settings');
  await snapshot('07-configuracoes');
  await route('/bom');
  assert(await evaluate("document.body.innerText.includes('PRD-001')"));
  await command('Page.reload');
  await wait("document.body.innerText.includes('PRD-001')");
  results.push({
    case: 'Reload em rota interna mantém sessão e registros fixos',
    status: 'passed',
  });
  await command('Emulation.setDeviceMetricsOverride', {
    width: 390,
    height: 844,
    deviceScaleFactor: 1,
    mobile: true,
  });
  await route('/home');
  await wait("document.querySelector('header')");
  const headerFits = await evaluate(
    "(()=>{const h=document.querySelector('header');const [clock,user]=[h.children[1].getBoundingClientRect(),h.children[2].getBoundingClientRect()];return clock.right<=user.left || clock.bottom<=user.top;})()",
  );
  assert(headerFits, 'Mobile header has no overlapping clock and user label');
  await snapshot('08-mobile');
  await route('/bom');
  await snapshot('09-mobile-produtos');
  assert.equal(errors.length, 0, errors.join('\n'));
  assert.equal(forbidden.length, 0, forbidden.join('\n'));
  await writeFile(
    path.join(output, 'smoke-results.json'),
    JSON.stringify(
      { results, errors, warnings, forbidden, downloads },
      null,
      2,
    ),
  );
  console.log(
    JSON.stringify(
      {
        passed: results.length,
        pdfs: results.filter((r) => r.case.startsWith('PDF')).length,
        errors,
        warnings,
        forbidden,
      },
      null,
      2,
    ),
  );
} catch (error) {
  await writeFile(
    path.join(output, 'smoke-failure.json'),
    JSON.stringify(
      {
        message: error.message,
        results,
        errors,
        warnings,
        forbidden,
        downloads,
      },
      null,
      2,
    ),
  );
  console.error(error.stack);
  process.exitCode = 1;
} finally {
  socket?.close();
  browser.kill();
  server.close();
}
