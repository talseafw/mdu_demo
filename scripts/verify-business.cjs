// Requires a dedicated, disposable Chrome profile on port 9223.
const assert=require('node:assert/strict');
const fs=require('node:fs/promises');
const delay=ms=>new Promise(resolve=>setTimeout(resolve,ms));
(async()=>{
  const tabs=await fetch('http://127.0.0.1:9223/json').then(r=>r.json());
  const ws=new WebSocket(tabs.find(t=>t.type==='page').webSocketDebuggerUrl);
  await new Promise(resolve=>ws.addEventListener('open',resolve,{once:true}));
  let id=0;const pending=new Map(),errors=[];
  ws.addEventListener('message',event=>{const m=JSON.parse(event.data);if(m.id){const p=pending.get(m.id);pending.delete(m.id);m.error?p.reject(m.error):p.resolve(m.result);}if(m.method==='Runtime.exceptionThrown')errors.push(m.params.exceptionDetails);});
  const call=(method,params={})=>new Promise((resolve,reject)=>{pending.set(++id,{resolve,reject});ws.send(JSON.stringify({id,method,params}));});
  async function run(expression){const r=await call('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});assert.ok(!r.exceptionDetails,JSON.stringify(r.exceptionDetails));return r.result.value;}
  async function nav(system,screen='dashboard'){
    const path=`/systems/${system}/index.html`;
    await call('Page.navigate',{url:`http://localhost:8080${path}#screen=${screen}`});
    for(let i=0;i<100;i++){await delay(40);if(await run(`location.pathname===${JSON.stringify(path)}&&document.readyState==='complete'&&typeof current==='function'&&current()[0]===${JSON.stringify(screen)}&&!!document.querySelector('#company-switch')`))return;}
    throw Error('Navigation timeout '+system+'/'+screen);
  }
  async function click(selector){await run(`(()=>{const e=document.querySelector(${JSON.stringify(selector)});if(!e)throw Error('Missing element: '+${JSON.stringify(selector)});e.click()})()`);await delay(25);}
  async function form(values){await run(`(()=>{for(const [name,value] of Object.entries(${JSON.stringify(values)})){const el=document.querySelector('#form [name="'+name+'"]');if(!el)throw Error('Missing field '+name);el.value=value;}document.querySelector('#form').requestSubmit();})()`);}
  async function action(name,index=0){await click(`[data-action="detail"][data-index="${index}"]`);await click(`[data-action="${name}"][data-index="${index}"]`);}
  async function screenshot(name){await fs.mkdir('artifacts',{recursive:true});await delay(500);const r=await call('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});await fs.writeFile('artifacts/'+name+'.png',Buffer.from(r.data,'base64'));}
  try {
    await call('Runtime.enable');await call('Page.enable');
    await call('Emulation.setDeviceMetricsOverride',{width:1440,height:1000,deviceScaleFactor:1,mobile:false});
    await nav('crm');await run("localStorage.removeItem('mdu-systems-v2');sessionStorage.removeItem('mdu-company')");await nav('crm');
    await screenshot('crm-business-dashboard');
    await nav('crm','leads');
    const before=await run("({customers:records('customers').length,pipeline:records('pipeline').length})");
    await action('convert-lead');
    await form({customer:'QA Multi-industry',contact:'QA Contact',sector:'Retail',opportunity:'QA Enterprise deal',amount:'125000000'});
    assert.equal(await run("records('customers').length"),before.customers+1);
    assert.equal(await run("records('pipeline').length"),before.pipeline+1);
    assert.equal(await run("records('leads')[0][3]"),'Đã chuyển đổi');
    await click('[data-action="detail"][data-index="0"]');
    assert.equal(await run("!!document.querySelector('[data-action=convert-lead]')"),false,'converted lead cannot duplicate');
    await nav('crm','pipeline');await action('new-quote');await form({customer:'QA Multi-industry',amount:'125000000'});
    await nav('crm','quotes');await action('send-quote');await action('accept-quote');await action('new-contract');
    assert.equal(await run("records('quotes')[0][3]"),'Đã lập hợp đồng');
    await nav('crm','contracts');assert.equal(await run("records('contracts')[0][2]"),'125.000.000 ₫');
    await action('activate-contract');await action('after-sales');
    assert.ok(await run("records('support')[0][0].includes('QA Multi-industry')"));
    await click('[data-action="detail"][data-index="0"]');
    assert.ok(await run("document.querySelectorAll('.related-records a').length>=2"));
    await screenshot('crm-contract-detail');
    await nav('crm','customers');await action('edit');await form({f1:'QA Updated Contact'});
    await nav('crm','customers');assert.equal(await run("records('customers')[0][1]"),'QA Updated Contact','edit persists');
    await run("document.querySelector('#company-switch').value='sunrise';document.querySelector('#company-switch').dispatchEvent(new Event('change'))");
    assert.equal(await run("entries(current()).every(e=>e.meta.company==='sunrise')"),true,'company filter');
    assert.equal(await run("document.querySelector('#table-area').textContent.includes('QA Multi-industry')"),false,'records isolated by selected unit');
    await run("document.querySelector('#company-switch').value='all';document.querySelector('#company-switch').dispatchEvent(new Event('change'))");
    await run("document.querySelector('#search').value='QA Multi';document.querySelector('#search').dispatchEvent(new Event('input'))");
    assert.equal(await run("document.querySelectorAll('#table-area tbody tr').length"),1,'search after filter');
    console.log('PASS CRM: lead > customer > opportunity > quote > contract > care; linked history; edit; unit filter; search');

    await nav('hrm','recruitment');await action('hire',2);await form({employee:'QA Employee',email:'qa@example.com',start:'2026-11-05'});
    assert.equal(await run("records('employees')[0][0]"),'QA Employee');
    assert.ok(await run("records('onboarding')[0][0].includes('QA Employee')"));
    await nav('hrm','leave');await action('approve');await form({employee:'QA Employee',from:'2026-11-05',to:'2026-11-06',reason:'Approved for QA'});
    assert.equal(await run("records('leave')[0][2]"),'Đã duyệt');
    assert.equal(await run("records('attendance')[0][0]"),'QA Employee');
    assert.equal(await run("records('attendance')[0][1]"),'2026-11-05 → 2026-11-06');
    console.log('PASS HRM: hire > employee > onboarding; leave decision > attendance');

    await nav('workspace','requests');await click('#create');await form({f0:'QA Purchase request',f1:'QA approval workflow',owner:'QA requester'});
    const requestId=await run("metadata('requests',0).id");
    await nav('collab','approval');assert.equal(await run("records('approval')[0][0]"),'QA Purchase request');await action('reject');await form({reason:'QA rejection reason'});
    await nav('workspace','requests');assert.equal(await run(`findEntry({system:'workspace',screen:'requests',id:${JSON.stringify(requestId)}}).row[2]`),'Từ chối');
    assert.ok(await run("records('notifications').some(r=>r[0].includes('QA Purchase request'))"));
    await nav('collab','projects');await click('[data-action="complete-progress"][data-index="0"]');await action('project-handover');
    assert.ok(await run("records('handover')[0][0].includes(records('projects')[0][0])"));
    await nav('collab','meetings');await action('meeting-note');await form({title:'QA Meeting minutes',content:'Decision and next action'});
    assert.equal(await run("records('docs')[0][0]"),'QA Meeting minutes');
    await click('#create');await form({f0:'Duplicate meeting',f1:'2026-11-02T09:00',f2:'Phòng họp B'});
    assert.ok(await run("document.querySelector('#form-error').textContent.length>0"),'meeting conflict blocked');
    await click('#close');
    console.log('PASS Workspace/Collaboration: request routing, rejection sync, notification, project handover, minutes, meeting collision');

    await nav('open','api');await run("document.querySelector('#endpoint').value='hrm:employees'");await click('[data-action="api-request"]');
    assert.equal(await run("JSON.parse(document.querySelector('#response').textContent).status"),403);
    await nav('open','scopes');await click('[data-action="toggle"][data-index="1"]');
    await nav('open','api');await run("document.querySelector('#endpoint').value='hrm:employees'");await click('[data-action="api-request"]');
    assert.equal(await run("JSON.parse(document.querySelector('#response').textContent).status"),200);
    assert.ok(await run("document.querySelector('#response').textContent.includes('QA Employee')"));
    assert.equal(await run("records('logs')[0][3]"),'200');
    await nav('open','webhooks');await click('[data-action="test-webhook"][data-index="0"]');
    assert.equal(await run("records('deliveries')[0][0]"),'customer.created');
    await nav('open','deliveries');
    const retryIndex=await run("records('deliveries').findIndex(r=>r[3]==='Chờ thử lại')");
    const attempts=await run(`Number(records('deliveries')[${retryIndex}][2])`);await action('retry-delivery',retryIndex);
    assert.equal(await run(`Number(records('deliveries')[${retryIndex}][2])`),attempts+1);
    assert.equal(await run(`records('deliveries')[${retryIndex}][3]`),'Thành công');
    console.log('PASS Open: scope denial, scope enable, real local data response, request log, webhook delivery, retry');

    await nav('enterprise','procurement');
    const budgetBefore=await run("money(records('budgets')[0][2])");
    await action('approve');await form({amount:'999999999999',reason:'Over budget QA'});
    assert.ok(await run("document.querySelector('#form-error').textContent.includes('vượt ngân sách')"));
    assert.equal(await run("money(records('budgets')[0][2])"),budgetBefore);
    await form({amount:'85000000',reason:'Approved within available budget'});
    assert.equal(await run("money(records('budgets')[0][2])"),budgetBefore+85000000);
    assert.equal(await run("records('procurement')[0][2]"),'Đã duyệt');
    await click('[data-action="detail"][data-index="0"]');
    assert.equal(await run("!!document.querySelector('[data-action=approve]')"),false,'decision cannot apply twice');
    await nav('enterprise','budgets');await screenshot('enterprise-budget-control');
    console.log('PASS Enterprise: overspend blocked, approved amount updates budget exactly once');

    await nav('core','identity');await action('identity-toggle');assert.equal(await run("records('identity')[0][3]"),'Tạm khóa');
    await nav('core','domains');await action('verify-domain',1);assert.equal(await run("records('domains')[1][3]"),'Đã xác minh');
    await nav('core','rbac');await click('[data-role="Member"][data-permission="1"]');
    assert.equal(await run("data.roles.Member[1]"),true);
    await nav('core','audit');assert.ok(await run("document.querySelector('#content').textContent.includes('Cập nhật quyền Member')"));
    assert.ok(await run("data._history.some(h=>h.system==='enterprise')"));
    await nav('enterprise');await screenshot('enterprise-business-dashboard');
    await call('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:true});
    await nav('crm','leads');await click('[data-action="detail"][data-index="0"]');await screenshot('business-detail-mobile');
    assert.equal(await run("document.querySelector('#detail-drawer').scrollWidth>innerWidth"),false,'drawer mobile overflow');
    assert.deepEqual(errors,[],'no browser runtime errors');
    console.log('PASS Core: account lifecycle, domain simulation, role changes, cross-system audit; mobile drawer; no runtime errors');
  } finally {await call('Browser.close');ws.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});
