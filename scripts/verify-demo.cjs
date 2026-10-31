// Run against a dedicated Chrome QA session with --remote-debugging-port=9223.
const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
(async () => {
  const tabs = await fetch('http://127.0.0.1:9223/json').then(r => r.json());
  const ws = new WebSocket(tabs.find(t => t.type === 'page').webSocketDebuggerUrl);
  await new Promise(resolve => ws.addEventListener('open', resolve, { once: true }));
  let id = 0;
  const pending = new Map(), errors = [];
  ws.addEventListener('message', event => {
    const msg = JSON.parse(event.data);
    if (msg.id) {
      const p = pending.get(msg.id);
      pending.delete(msg.id);
      msg.error ? p.reject(msg.error) : p.resolve(msg.result);
    }
    if (msg.method === 'Runtime.exceptionThrown') errors.push(msg.params.exceptionDetails);
  });
  function call(method, params = {}) {
    return new Promise((resolve, reject) => {
      pending.set(++id, { resolve, reject });
      ws.send(JSON.stringify({ id, method, params }));
    });
  }
  async function evaluate(expression) {
    const result = await call('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
    assert.ok(!result.exceptionDetails, JSON.stringify(result.exceptionDetails));
    return result.result.value;
  }
  async function navigate(path) {
    await call('Page.navigate', { url: 'http://localhost:8080' + path });
    for (let attempt = 0; attempt < 80; attempt++) {
      await delay(50);
      if (await evaluate(`location.pathname === ${JSON.stringify(path.split('#')[0])} && document.readyState === 'complete' && !!document.querySelector('#content')?.children.length`)) return;
    }
    throw new Error('Navigation timed out: ' + path);
  }
  try {
    await call('Runtime.enable');
    await call('Page.enable');
    await call('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
    await navigate('/');
    assert.equal(await evaluate('document.querySelectorAll(".system-card").length'), 7);
    const systems = await evaluate('Object.keys(SYSTEMS)');
    let count = 0;
    for (const system of systems) {
      await navigate(`/systems/${system}/index.html`);
      const screens = await evaluate('system.screens.map(s=>[s[0],s[2]])');
      assert.equal(screens.length, 10);
      for (const [screen, type] of screens) {
        await evaluate(`document.querySelector('[data-screen="${screen}"]').click()`);
        await delay(40);
        const state = await evaluate(`({id:current()[0],html:document.querySelector('#content').innerHTML,overflow:document.documentElement.scrollWidth>innerWidth})`);
        assert.equal(state.id, screen);
        assert.ok(state.html.length > 100 && !state.html.includes('undefined'), system + '/' + screen);
        assert.equal(state.overflow, false, system + '/' + screen + ' desktop overflow');
        if (type === 'progress') {
          await evaluate(`(()=>{const el=document.querySelector('[data-progress="0"]');el.value=95;el.dispatchEvent(new Event('change',{bubbles:true}))})()`);
          assert.equal(await evaluate('records(current())[0][2]'), 95);
          await evaluate(`document.querySelector('[data-action="complete-progress"]').click()`);
          assert.equal(await evaluate('records(current())[0][2]'), 100);
        }
        if (type === 'checklist') {
          const before = await evaluate('records(current())[0][2]');
          await evaluate(`document.querySelector('[data-check="0"]').click()`);
          assert.equal(await evaluate('records(current())[0][2]'), !before);
        }
        count++;
      }
      await call('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
      for (const [screen, type] of screens) {
        await evaluate(`location.hash='screen=${screen}'`);
        await delay(30);
        assert.equal(await evaluate('document.documentElement.scrollWidth>innerWidth'), false, system+'/'+screen+' mobile overflow');
        if (['table','board','approval','calendar','docs','webhooks','apps','progress','checklist','attendance','logs'].includes(type) && screen !== 'audit') {
          const hasRecord=await evaluate('entries(current()).length>0');
          if(hasRecord) {
            await evaluate('openDetail(entries(current())[0].index)');
            assert.equal(await evaluate('document.querySelector("#detail-drawer").scrollWidth>innerWidth'),false,system+'/'+screen+' detail overflow');
            await evaluate('document.querySelector("#detail-drawer").close()');
          }
        }
      }
      await call('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
    }
    await navigate('/systems/crm/index.html#screen=campaigns');
    assert.equal(await evaluate('records(current())[0][2]'), 100, 'progress survives navigation');
    await evaluate(`document.querySelector('#create').click();document.querySelector('[name=f0]').value='QA campaign';document.querySelector('[name=f1]').value='QA description';document.querySelector('#form').requestSubmit()`);
    assert.equal(await evaluate('records(current())[0][0]'), 'QA campaign');
    await call('Page.reload');
    await delay(500);
    assert.equal(await evaluate('records(current())[0][0]'), 'QA campaign', 'new item survives reload');
    await evaluate('localStorage.clear()');
    await navigate('/');
    await delay(700);
    await fs.mkdir('artifacts', { recursive: true });
    const shot = await call('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false });
    await fs.writeFile('artifacts/mdu-orange-desktop.png', Buffer.from(shot.data, 'base64'));
    await navigate('/systems/hrm/index.html#screen=training');
    await call('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
    await delay(600);
    const mobile = await call('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false });
    await fs.writeFile('artifacts/mdu-orange-mobile.png', Buffer.from(mobile.data, 'base64'));
    await call('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
    assert.equal(await evaluate('getComputedStyle(document.querySelector(".progress-track span")).animationName'), 'none');
    assert.deepEqual(errors, [], 'browser runtime errors');
    console.log(`PASS: ${count} screens desktop/mobile; progress, checklist, create, reload persistence, reduced motion; no runtime errors.`);
  } finally {
    await call('Browser.close');
    ws.close();
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
