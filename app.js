const $ = selector => document.querySelector(selector);
const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const sys = document.body.dataset.system;
const system = SYSTEMS[sys];
const root = sys ? '../../' : '';
let data = {};
try { const stored=JSON.parse(localStorage.getItem('mdu-systems-v2')); if(stored && typeof stored==='object' && !Array.isArray(stored)) data=stored; } catch {}
data._meta ||= {};
data._history ||= [];
data._links ||= [];
migrateBusinessSeeds(data);
const ui = {company:sessionStorage.getItem('mdu-company') || 'all',query:'',filter:'',month:'2026-11',day:'',channel:'general',form:null,detail:null};
if(ui.company!=='all'&&!COMPANIES.some(c=>c.id===ui.company))ui.company='all';
let screenId = new URLSearchParams(location.hash.slice(1)).get('screen') || 'dashboard';
const uuid = () => crypto.randomUUID();
const companyName = id => COMPANIES.find(c=>c.id===id)?.name || 'Toàn tập đoàn';
const actor = () => data.profile?.name || 'An Nguyễn';
const keyOf = (screen, systemKey=sys) => `${systemKey}:${typeof screen==='string'?screen:screen[0]}`;
function spec(id, systemKey=sys) { return SYSTEMS[systemKey].screens.find(s=>s[0]===id); }
function current() { return spec(screenId) || system.screens[0]; }
function records(screen, systemKey=sys) {
  const s=typeof screen==='string'?spec(screen,systemKey):screen;
  const key=keyOf(s,systemKey);
  if(!Array.isArray(data[key])) data[key]=structuredClone(s[4]||[]);
  data._meta[key] ||= [];
  data[key].forEach((row,i)=>{
    if(!data._meta[key][i]) data._meta[key][i]={id:uuid(),company:COMPANIES[i%3].id,owner:BUSINESS[systemKey].meta[s[0]]?.owner || actor(),due:'',created:'2026-10-31T09:00:00+07:00',notes:''};
  });
  return data[key];
}
function entries(screen, systemKey=sys, scoped=true) {
  return records(screen,systemKey).map((row,index)=>({row,index,meta:data._meta[keyOf(screen,systemKey)][index]})).filter(e=>!scoped||ui.company==='all'||e.meta.company===ui.company);
}
function metadata(screen,index,systemKey=sys) { records(screen,systemKey); return data._meta[keyOf(screen,systemKey)][index]; }
function findEntry(ref) { return entries(ref.screen,ref.system,false).find(e=>e.meta.id===ref.id); }
function reference(screen,index,systemKey=sys) { return {system:systemKey,screen:typeof screen==='string'?screen:screen[0],id:metadata(screen,index,systemKey).id}; }
function addRow(screen,row,systemKey=sys,meta={}) {
  records(screen,systemKey);
  const key=keyOf(screen,systemKey);
  data[key].unshift(row);
  data._meta[key].unshift({id:uuid(),company:ui.company==='all'?'viettech':ui.company,owner:actor(),due:'',notes:'',created:new Date().toISOString(),...meta});
  return reference(screen,0,systemKey);
}
function linkRecords(source,target,label) { data._links.push({source,target,label}); }
function linked(source,targetScreen,targetSystem=sys) { return data._links.find(l=>l.source.id===source.id&&l.target.screen===targetScreen&&l.target.system===targetSystem); }
function save() {
  try { localStorage.setItem('mdu-systems-v2',JSON.stringify(data)); return true; }
  catch { toast('Bộ nhớ trình duyệt đã đầy. Thay đổi chưa được lưu sau khi đóng trang.'); return false; }
}
function audit(action,screen=current()?.[0],index=null,systemKey=sys) {
  const meta=index===null?null:metadata(screen,index,systemKey);
  data._history.unshift({id:uuid(),system:systemKey,screen,recordId:meta?.id,company:meta?.company || (ui.company==='all'?'viettech':ui.company),action,actor:actor(),at:new Date().toISOString()});
  data._history=data._history.slice(0,500);
}
function commit(message,screen=current()[0],index=null) { audit(message,screen,index); save(); render(); toast(message); }
function notify(title,detail,company) { addRow('notifications',[title,detail,'Chưa đọc'],'workspace',{company}); }
function toast(message) { $('#toast').textContent=message; $('#toast').classList.add('show'); clearTimeout(window.toastTimer); window.toastTimer=setTimeout(()=>$('#toast').classList.remove('show'),3200); }
function money(value) {
  const text=String(value).toLowerCase();
  const multiplier=text.includes('tỷ')?1e9:text.includes('triệu')?1e6:1;
  const token=text.match(/[\d][\d.,]*/)?.[0] || '0';
  const number=multiplier===1?Number(token.replace(/[.,]/g,'')):Number(token.replaceAll('.','').replace(',','.'));
  return Number.isFinite(number)?number*multiplier*(/^\s*-/.test(text)?-1:1):0;
}
const currency = value => Math.round(value).toLocaleString('vi-VN')+' ₫';
const compactMoney = value => value>=1e9?(value/1e9).toLocaleString('vi-VN',{maximumFractionDigits:2})+' tỷ':value>=1e6?(value/1e6).toLocaleString('vi-VN',{maximumFractionDigits:1})+' tr':currency(value);
const formatTime = value => new Date(value).toLocaleString('vi-VN',{timeZone:'Asia/Bangkok',dateStyle:'short',timeStyle:'short'});
const businessMeta = s => BUSINESS[sys].meta[s[0]];
const canCreate = s => !['audit','logs','attendance','deliveries'].includes(s[0]) && ['table','board','approval','calendar','docs','webhooks','progress','checklist'].includes(s[2]);
const canEdit = s => !['audit','logs','attendance','deliveries'].includes(s[0]) && s[2]!=='approval';
function statusBadge(value) {
  const tone=/Từ chối|Thất bại|Đã hủy|Cao|401|403|500|Tạm khóa/.test(value)?'danger':/Hoàn|Hiệu lực|Thành công|Đã duyệt|Đang hợp tác|Hoạt động|Đã xác minh|Đã thắng|^Bật$|^20\d$/.test(value)?'success':'waiting';
  return `<span class="status ${tone}">${esc(value)}</span>`;
}
function viewStatus(s,row) {
  if(s[2]==='docs')return 'Tài liệu';
  if(s[2]==='calendar')return 'Đã lên lịch';
  if(s[2]==='board'&&sys==='workspace') return ({'Tiếp cận':'Cần làm','Đàm phán':'Đang làm','Đã thắng':'Hoàn thành'})[row[2]] || row[2];
  if(s[2]==='progress') return `${row[2]}%`;
  if(s[2]==='checklist') return row[2]?'Hoàn tất':'Cần làm';
  return row.at(-1);
}
function go(screen) { if(screenId===screen) render(); else location.hash='screen='+screen; }
function navCount(id) {
  if(id==='audit'&&sys==='core')return data._history.filter(h=>ui.company==='all'||h.company===ui.company).length;
  return ['dashboard','report','profile','plans','monitor','architecture','api','permissions','chat','launcher'].includes(spec(id)[2])?null:entries(id).length;
}
function recordLink(ref,label) { return `<a class="text-btn" href="${root}systems/${ref.system}/index.html#screen=${ref.screen}&record=${ref.id}">${esc(label)} ↗</a>`; }
function render() {
  if(!system) return renderPortal();
  const s=current(), meta=businessMeta(s), config=BUSINESS[sys];
  screenId=s[0];
  document.title=`${s[1]} · ${system.name}`;
  $('#crumb').textContent=system.name+' / '+s[1];
  $('#title').textContent=s[1];
  $('#subtitle').textContent=meta.description;
  $('.eyebrow').textContent=config.code+' / '+meta.group.toUpperCase();
  $('.company strong').textContent=system.name;
  $('.company small').textContent=config.role;
  $('.company i').textContent=config.code.slice(0,2);
  $('.nav-label').textContent='KHÔNG GIAN NGHIỆP VỤ';
  const scroll=$('#nav').scrollTop;
  $('#nav').innerHTML=config.groups.map(group=>`<div class="nav-group-label">${esc(group)}</div>${config.screens.filter(a=>a[1]===group).map(([id])=>`<button data-screen="${id}" class="${id===s[0]?'active':''}" ${id===s[0]?'aria-current="page"':''}><span>${id==='dashboard'?'◫':config.flow.includes(id)?'◇':'▤'}</span>${esc(spec(id)[1])}${navCount(id)===null?'':`<small>${navCount(id)}</small>`}</button>`).join('')}`).join('')+`<a class="portal-nav" href="${root}index.html">← Hệ sinh thái tập đoàn</a>`;
  $('#nav').scrollTop=scroll;
  if(matchMedia('(max-width:650px)').matches) { const active=$('#nav .active');$('#nav').scrollLeft=active.offsetLeft-$('#nav').offsetLeft-12; }
  $('.live').textContent='● Môi trường trình diễn';
  $('.profile strong').textContent=actor();
  $('.profile small').textContent=config.role;
  $('#create').hidden=!canCreate(s);
  $('#create').textContent=s[2]==='approval'?'＋ Tạo đề xuất':s[2]==='docs'?'＋ Soạn tài liệu':'＋ Thêm mới';
  $('#company-switch').value=ui.company;
  $('#content').innerHTML=(s[0]==='dashboard'?'':screenContext(s))+view(s);
  if($('#search')) $('#search').oninput=e=>{ui.query=e.target.value;updateTable(s);};
  if($('#filter')) $('#filter').onchange=e=>{ui.filter=e.target.value;updateTable(s);};
  if($('#chat-form')) $('#chat-form').onsubmit=sendMessage;
  if($('#profile-form')) $('#profile-form').onsubmit=e=>{e.preventDefault();data.profile={name:$('#profile-name').value.trim(),email:$('#profile-email').value.trim(),language:'Tiếng Việt'};commit('Cập nhật hồ sơ cá nhân');};
}
function screenContext(s) {
  const m=businessMeta(s), flow=BUSINESS[sys].flow;
  return `<div class="screen-context"><span><i class="context-dot"></i>${esc(companyName(ui.company))}</span><span>Phụ trách: <b>${esc(m.owner)}</b></span><span>Kết quả: <b>${esc(m.outcome)}</b></span></div>${flow.includes(s[0])?`<div class="workflow-rail" aria-label="Luồng nghiệp vụ">${flow.map((id,i)=>`<button data-screen="${id}" class="${id===s[0]?'selected':''}"><small>0${i+1}</small>${esc(spec(id)[1])}<span>→</span></button>`).join('')}</div>`:''}`;
}
function renderPortal() {
  document.body.classList.add('portal');
  document.title='MDU Group · Hệ sinh thái quản trị tập đoàn';
  $('#title').textContent='Điều hành đa ngành. Kết nối toàn tập đoàn.';
  $('#subtitle').textContent='Công nghệ · Bán lẻ · Logistics — bảy hệ thống cùng phối hợp trên một hành trình vận hành.';
  $('#crumb').textContent='Hệ sinh thái tập đoàn';
  $('#create').hidden=true;
  $('#nav').innerHTML='<a class="portal-nav active" href="index.html">◫ Tổng quan hệ sinh thái</a>';
  $('.live').textContent='● Môi trường trình diễn';
  $('#content').innerHTML=`<section class="group-hero"><div><span class="overline">MDU GROUP / OPERATING PLATFORM</span><h2>Từ chiến lược tập đoàn<br>đến từng công việc hằng ngày.</h2><p>Quản trị tập trung, vận hành theo đơn vị. Khám phá các luồng nghiệp vụ và chuyển tiếp hồ sơ giữa các hệ thống.</p><div class="hero-chips"><span>03 ngành kinh doanh</span><span>07 hệ thống</span><span>70 màn hình</span></div></div><div class="group-entities">${COMPANIES.map((c,i)=>`<div><b>0${i+1}</b><span><strong>${c.name}</strong><small>${c.sector}</small></span><i>↗</i></div>`).join('')}</div></section><div class="section-head"><h2>Không gian điều hành & vận hành</h2><span class="muted">Chọn vai trò, bắt đầu công việc</span></div><div class="system-grid">${Object.entries(SYSTEMS).map(([key,s])=>`<a class="app-card system-card" href="systems/${key}/index.html"><div class="card-kicker"><span class="app-icon">${s.icon}</span><small>${BUSINESS[key].code}</small><span class="arrow">↗</span></div><h3>${s.name}</h3><p>${s.desc}</p><div class="role-label">${BUSINESS[key].role}</div><div class="screen-tags">${BUSINESS[key].flow.slice(0,4).map(id=>`<span>${esc(SYSTEMS[key].screens.find(s=>s[0]===id)[1])}</span>`).join('')}</div><div class="app-foot"><span>Vào không gian làm việc →</span><span>10 phân hệ</span></div></a>`).join('')}</div><section class="panel integration-map"><h2>Những nghiệp vụ đã kết nối</h2><div class="integration-links"><span>CRM · Hợp đồng → Chăm sóc khách hàng</span><span>HRM · Tuyển dụng → Hồ sơ → Hội nhập</span><span>Workspace · Yêu cầu → Collaboration · Phê duyệt</span><span>Open Platform · API → Dữ liệu CRM / HRM / Core</span><span>Enterprise · Mua sắm → Ngân sách đơn vị</span></div><p class="muted">Bản trình diễn nghiệp vụ: dữ liệu lưu tại trình duyệt, không gửi giao dịch hoặc kết nối dịch vụ thực tế.</p></section>`;
}
document.addEventListener('DOMContentLoaded',()=>{
  if(system) {
    const toolbar=document.createElement('div');toolbar.className='workspace-toolbar';
    toolbar.innerHTML=`<label class="company-filter">Phạm vi dữ liệu<select id="company-switch" aria-label="Đơn vị kinh doanh"><option value="all">Toàn tập đoàn</option>${COMPANIES.map(c=>`<option value="${c.id}">${c.name}</option>`).join('')}</select></label><div class="environment-tag"><span></span>Dữ liệu trình diễn · Lưu trên trình duyệt</div><button class="secondary" id="business-guide">Bản đồ nghiệp vụ ↗</button>`;
    document.querySelector('main').insertBefore(toolbar,$('.page-heading'));
    $('#company-switch').onchange=e=>{ui.company=e.target.value;sessionStorage.setItem('mdu-company',ui.company);ui.query='';ui.filter='';ui.day='';render();};
  }
  const detail=document.createElement('dialog');detail.id='detail-drawer';detail.className='detail-drawer';detail.setAttribute('aria-label','Chi tiết hồ sơ');document.body.append(detail);
  $('#modal').setAttribute('aria-labelledby','modal-title');
  render();
  save();
  openHashRecord();
});
function openHashRecord() { const id=new URLSearchParams(location.hash.slice(1)).get('record');if(system&&id){const e=entries(current(),sys,false).find(e=>e.meta.id===id);if(e)openDetail(e.index);} }
window.onhashchange=()=>{screenId=new URLSearchParams(location.hash.slice(1)).get('screen')||'dashboard';ui.query='';ui.filter='';ui.day='';$('#detail-drawer')?.close();render();openHashRecord();};
window.addEventListener('storage',event=>{if(event.key==='mdu-systems-v2'&&event.newValue){try{data=JSON.parse(event.newValue);if(!$('#modal').open&&!$('#detail-drawer').open)render();}catch{}}});
