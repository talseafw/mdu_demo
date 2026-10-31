function inputField(name,label,value='',type='text',options=null,required=true) {
  return `<label>${esc(label)}${options?`<select name="${name}" ${required?'required':''}>${options.map(v=>{const [id,text]=Array.isArray(v)?v:[v,v];return `<option value="${esc(id)}" ${String(value)===String(id)?'selected':''}>${esc(text)}</option>`;}).join('')}</select>`:type==='textarea'?`<textarea name="${name}" maxlength="10000" ${required?'required':''}>${esc(value)}</textarea>`:`<input name="${name}" type="${type}" value="${esc(value)}" ${required?'required':''} ${type==='number'?'min="0" step="1"':'maxlength="300"'}>`}</label>`;
}
function showForm(title,body,context,submit='Lưu hồ sơ') {
  ui.form=context;
  $('#modal-title').textContent=title;
  $('#fields').innerHTML=body+'<p id="form-error" class="form-error" role="alert"></p>';
  $('#submit').hidden=false;$('#submit').textContent=submit;
  $('#detail-drawer').close();
  if(!$('#modal').open)$('#modal').showModal();
}
function formError(message) { $('#form-error').textContent=message; }
function openForm(index=null) {
  const s=current(),row=index===null?null:records(s)[index],meta=index===null?{}:metadata(s,index);
  let fields='';
  if(s[2]==='table') {
    fields=s[3].map((label,i)=>{
      let states=i===s[3].length-1?STATUS_OPTIONS[keyOf(s)]:null;
      const controlled={'crm:leads':['Đã chuyển đổi'],'crm:quotes':['Đã lập hợp đồng'],'hrm:recruitment':['Đã tuyển'],'core:domains':['Đã xác minh']}[keyOf(s)]||[];
      if(states)states=states.filter(state=>!controlled.includes(state));
      if(states) states=[...new Set([...(row?[row[i]]:[]),...states])];
      return inputField('f'+i,label,row?.[i]||states?.[0]||'', 'text',states);
    }).join('');
  } else if(s[2]==='board') {
    fields=inputField('f0',sys==='crm'?'Tên cơ hội':'Tên công việc',row?.[0])+inputField('f1',sys==='crm'?'Giá trị dự kiến (ví dụ: 120 triệu ₫)':'Mô tả công việc',row?.[1])+inputField('f2','Giai đoạn',row?.[2]||'Tiếp cận','text',sys==='workspace'?[['Tiếp cận','Cần làm'],['Đàm phán','Đang làm'],['Đã thắng','Hoàn thành']]:['Tiếp cận','Đàm phán','Đã thắng']);
  } else if(s[2]==='calendar') fields=inputField('f0','Tên cuộc hẹn',row?.[0])+inputField('f1','Ngày và giờ',row?.[1]||'2026-11-02T09:00','datetime-local')+inputField('f2','Địa điểm / phòng họp',row?.[2]);
  else if(s[2]==='docs') fields=inputField('f0','Tiêu đề tài liệu',row?.[0])+inputField('f1','Người soạn',row?.[1]||actor())+inputField('f2','Nội dung',row?.[2],'textarea');
  else if(s[2]==='webhooks') fields=inputField('f0','Tên kết nối',row?.[0])+inputField('f1','Địa chỉ nhận sự kiện HTTPS',row?.[1],'url')+inputField('f2','Trạng thái',row?.[2]||'Tắt','text',['Tắt','Bật']);
  else if(['progress','checklist'].includes(s[2])) fields=inputField('f0','Tên hạng mục',row?.[0])+inputField('f1','Mục tiêu / nội dung thực hiện',row?.[1],'textarea');
  else if(s[2]==='approval') {
    fields=inputField('f0','Tên đề xuất')+inputField('f1','Nội dung và lý do','','textarea');
    if(s[0]==='procurement') fields+=inputField('amount','Giá trị đề nghị (VNĐ)','','number');
    if(s[0]==='leave') fields+=inputField('employee','Nhân sự đề nghị',actor())+inputField('from','Từ ngày','','date')+inputField('to','Đến ngày','','date');
  }
  fields+=`<div class="form-section-label">Thông tin phân công</div><div class="form-grid">${inputField('company','Đơn vị phụ trách',meta.company||(ui.company==='all'?'viettech':ui.company),'text',COMPANIES.map(c=>[c.id,c.name]))}${inputField('owner','Người phụ trách',meta.owner||actor())}${inputField('due','Hạn xử lý',meta.due||'','date',null,false)}</div>${inputField('notes','Ghi chú nội bộ',meta.notes||'','textarea',null,false)}`;
  showForm((index===null?'Thêm mới · ':'Chỉnh sửa · ')+s[1],fields,{mode:'record',index,screen:s[0]});
}
function showAction(action,index) {
  const s=current(),r=records(s)[index],meta=metadata(s,index);
  let title='',fields='',submit='Xác nhận';
  if(action==='convert-lead') {title='Chuyển đổi khách hàng tiềm năng';fields=inputField('customer','Tên khách hàng',r[0])+inputField('contact','Người liên hệ')+inputField('sector','Lĩnh vực kinh doanh')+inputField('opportunity','Tên cơ hội',`Cơ hội ${r[0]}`)+inputField('amount','Giá trị dự kiến (VNĐ)','','number');submit='Tạo khách hàng & cơ hội';}
  if(action==='new-opportunity'){title='Tạo cơ hội từ khách hàng';fields=inputField('opportunity','Tên cơ hội',`Cơ hội ${r[0]}`)+inputField('amount','Giá trị dự kiến (VNĐ)','','number');submit='Tạo cơ hội';}
  if(action==='new-quote'){title='Lập báo giá từ cơ hội';fields=inputField('customer','Khách hàng',meta.customer||'')+inputField('amount','Giá trị báo giá (VNĐ)',money(r[1])||'','number');submit='Tạo báo giá';}
  if(action==='hire'){title='Tiếp nhận ứng viên trúng tuyển';fields=inputField('employee','Họ và tên ứng viên')+inputField('email','Email nhân viên','','email')+inputField('start','Ngày bắt đầu','','date');submit='Tạo hồ sơ & hội nhập';}
  if(action==='approve'||action==='reject') {
    title=action==='approve'?'Phê duyệt đề xuất':'Từ chối đề xuất';
    fields=`<div class="form-summary"><strong>${esc(r[0])}</strong><p>${esc(r[1])}</p><small>${esc(companyName(meta.company))}</small></div>`;
    if(action==='approve'&&s[0]==='procurement') fields+=inputField('amount','Số tiền đề nghị (VNĐ)',meta.amount||money(r[1]),'number');
    if(action==='approve'&&s[0]==='leave') fields+=inputField('employee','Nhân sự nghỉ phép',meta.employee||r[0].split('·')[1]?.trim()||'')+inputField('from','Từ ngày',meta.from||'','date')+inputField('to','Đến ngày',meta.to||'','date');
    fields+=inputField('reason',action==='reject'?'Lý do từ chối':'Ý kiến phê duyệt','','textarea');submit=action==='approve'?'Xác nhận phê duyệt':'Xác nhận từ chối';
  }
  if(action==='meeting-note'){title='Lập biên bản cuộc họp';fields=inputField('title','Tiêu đề',`Biên bản · ${r[0]}`)+inputField('content','Nội dung, quyết định và đầu việc tiếp theo','','textarea');submit='Lưu vào kho tài liệu';}
  if(action==='project-task'||action==='goal-task'){title='Giao công việc';fields=inputField('title','Tên công việc',r[0])+inputField('description','Nội dung thực hiện',r[1],'textarea')+inputField('owner','Người phụ trách',meta.owner)+inputField('due','Hạn hoàn thành','','date');submit='Tạo công việc tại Workspace';}
  showForm(title,fields,{mode:'action',action,index,screen:s[0]},submit);
}
function actionButton(action,index,label,primary=false) { return `<button class="${primary?'primary':'secondary'}" data-action="${action}" data-index="${index}">${label}</button>`; }
function recordActions(s,e) {
  const r=e.row,i=e.index,ref=reference(s,i),key=keyOf(s);let actions=[];
  if(canEdit(s)&&['table','board','progress','checklist','calendar','docs','webhooks'].includes(s[2]))actions.push(actionButton('edit',i,'Chỉnh sửa hồ sơ'));
  if(key==='crm:leads'&&r[3]!=='Đã chuyển đổi'&&!linked(ref,'customers'))actions.push(actionButton('convert-lead',i,'Chuyển thành khách hàng',true));
  if(key==='crm:customers')actions.push(actionButton('new-opportunity',i,'Tạo cơ hội bán hàng',true));
  if(key==='crm:pipeline'&&!linked(ref,'quotes'))actions.push(actionButton('new-quote',i,'Lập báo giá',true));
  if(key==='crm:quotes') {
    if(r[3]==='Đang soạn')actions.push(actionButton('send-quote',i,'Ghi nhận đã gửi báo giá',true));
    if(r[3]==='Đã gửi')actions.push(actionButton('accept-quote',i,'Khách hàng chấp nhận',true));
    if(r[3]==='Đã chấp nhận'&&!linked(ref,'contracts'))actions.push(actionButton('new-contract',i,'Lập hợp đồng',true));
  }
  if(key==='crm:contracts') {
    if(r[3]==='Chờ ký')actions.push(actionButton('activate-contract',i,'Ghi nhận đã ký',true));
    if(['Hiệu lực','Hoàn tất'].includes(r[3])&&!linked(ref,'support'))actions.push(actionButton('after-sales',i,'Bàn giao chăm sóc',true));
  }
  if(key==='hrm:recruitment'&&r[3]==='Đề nghị nhận việc'&&!linked(ref,'employees'))actions.push(actionButton('hire',i,'Tiếp nhận ứng viên',true));
  if(s[2]==='approval'&&r[2]==='Chờ duyệt') {
    if(sys==='workspace') {
      if(!linked(ref,'approval','collab'))actions.push(actionButton('submit-request',i,'Chuyển đến trung tâm phê duyệt',true));
    } else actions.push(actionButton('approve',i,'Phê duyệt',true),actionButton('reject',i,'Từ chối'));
  }
  if(key==='core:domains'&&r[3]==='Chờ xác minh')actions.push(actionButton('verify-domain',i,'Kiểm tra tên miền (mô phỏng)',true));
  if(key==='core:identity')actions.push(actionButton('identity-toggle',i,r[3]==='Hoạt động'?'Tạm khóa tài khoản mẫu':'Kích hoạt tài khoản mẫu',true));
  if(key==='open:deliveries'&&r[3]!=='Thành công')actions.push(actionButton('retry-delivery',i,'Thử lại trong sandbox',true));
  if(key==='collab:meetings'&&!linked(ref,'docs'))actions.push(actionButton('meeting-note',i,'Lập biên bản',true));
  if(key==='collab:projects') {
    actions.push(actionButton('project-task',i,'Giao công việc',true));
    if(Number(r[2])===100&&!linked(ref,'handover'))actions.push(actionButton('project-handover',i,'Tạo checklist bàn giao',true));
  }
  if(key==='workspace:goals')actions.push(actionButton('goal-task',i,'Tạo công việc thực hiện',true));
  return actions.join('');
}
function detailLabels(s) {
  if(s[3]&&['table','attendance','logs'].includes(s[2]))return s[3];
  return {board:['Tên hồ sơ','Nội dung / giá trị','Giai đoạn'],approval:['Đề xuất','Nội dung','Trạng thái'],calendar:['Cuộc hẹn','Ngày và giờ','Địa điểm'],docs:['Tiêu đề','Người soạn','Nội dung'],progress:['Hạng mục','Mục tiêu','Tiến độ'],checklist:['Đầu việc','Nội dung','Hoàn thành'],apps:['Tên cấu hình','Mô tả','Trạng thái'],webhooks:['Tên kết nối','Địa chỉ HTTPS','Trạng thái']}[s[2]]||['Tiêu đề','Nội dung','Trạng thái'];
}
function extraDetailFields(meta) {
  return [['customer','Khách hàng'],['email','Email nhân viên'],['start','Ngày bắt đầu'],['employee','Nhân sự đề nghị'],['from','Nghỉ từ ngày'],['to','Nghỉ đến ngày'],['amount','Giá trị đề nghị']].filter(([key])=>meta[key]).map(([key,label])=>`<div><dt>${label}</dt><dd>${esc(key==='amount'?currency(meta[key]):meta[key])}</dd></div>`).join('');
}
function openDetail(index) {
  const s=current(),row=records(s)[index];if(!row)return;
  const meta=metadata(s,index),ref=reference(s,index),labels=detailLabels(s);
  ui.detail=index;
  const related=data._links.filter(l=>l.source.id===ref.id||l.target.id===ref.id);
  const history=data._history.filter(h=>h.recordId===ref.id);
  $('#detail-drawer').innerHTML=`<div class="drawer-header"><div><span class="overline">${BUSINESS[sys].code} / ${esc(s[1])}</span><h2>${esc(row[0])}</h2><small>${BUSINESS[sys].code}-${meta.id.slice(0,6).toUpperCase()}</small></div><button class="close-drawer" data-action="close-detail" aria-label="Đóng chi tiết">×</button></div><div class="drawer-body"><div class="detail-status">${statusBadge(viewStatus(s,row))}<span>${esc(companyName(meta.company))}</span></div><h3>Thông tin hồ sơ</h3><dl class="detail-fields">${row.map((value,i)=>`<div class="${s[2]==='docs'&&i===2?'full-field':''}"><dt>${esc(labels[i]||'Thông tin')}</dt><dd>${s[2]==='checklist'&&i===2?(value?'Đã hoàn tất':'Chưa hoàn tất'):esc(value)}</dd></div>`).join('')}<div><dt>Người phụ trách</dt><dd>${esc(meta.owner)}</dd></div><div><dt>Hạn xử lý</dt><dd>${esc(meta.due||'Chưa đặt hạn')}</dd></div>${extraDetailFields(meta)}</dl>${meta.notes?`<div class="detail-note"><strong>Ghi chú nội bộ</strong><p>${esc(meta.notes)}</p></div>`:''}${meta.decision?`<div class="decision-note"><strong>Kết quả xử lý</strong><p>${esc(meta.decision)}</p></div>`:''}${s[0]==='payroll'?`<div class="detail-note">Thu nhập trước khấu trừ: <strong>${currency(money(row[1])+money(row[2]))}</strong></div>`:''}<h3>Bước xử lý tiếp theo</h3><div class="detail-actions">${recordActions(s,{row,index,meta})||'<p class="muted">Hồ sơ này không có thao tác chuyển tiếp tại trạng thái hiện tại.</p>'}</div><h3>Hồ sơ liên quan</h3><div class="related-records">${related.map(l=>{const other=l.source.id===ref.id?l.target:l.source,e=findEntry(other);return `<div><span>${esc(l.label)}</span>${recordLink(other,e?.row[0]||'Mở hồ sơ liên quan')}</div>`;}).join('')||'<p class="muted">Hồ sơ được tạo qua các bước nghiệp vụ sẽ tự động liên kết tại đây.</p>'}</div><h3>Lịch sử xử lý</h3>${historyView(history)}<div class="detail-footnote">Tạo lúc ${esc(formatTime(meta.created))} · ${esc(businessMeta(s).owner)}</div></div>`;
  if(!$('#detail-drawer').open)$('#detail-drawer').showModal();
}
function workflowGuide() {
  $('#detail-drawer').innerHTML=`<div class="drawer-header"><div><span class="overline">BẢN ĐỒ NGHIỆP VỤ</span><h2>${system.name}</h2></div><button data-action="close-detail" class="close-drawer" aria-label="Đóng">×</button></div><div class="drawer-body"><p>${BUSINESS[sys].description}</p>${BUSINESS[sys].screens.map(([id])=>{const m=BUSINESS[sys].meta[id];return `<section class="guide-step"><button class="record-name" data-screen="${id}">${esc(spec(id)[1])} ↗</button><p>${esc(m.description)}</p><small>Phụ trách: ${esc(m.owner)}<br>Kết quả: ${esc(m.outcome)}</small></section>`;}).join('')}</div>`;$('#detail-drawer').showModal();
}
function submitRecord(form) {
  const s=spec(ui.form.screen),index=ui.form.index;
  let row=[...form.entries()].filter(([k])=>/^f\d+$/.test(k)).sort(([a],[b])=>Number(a.slice(1))-Number(b.slice(1))).map(([,v])=>v.trim());
  if(row.some(v=>!v))return formError('Vui lòng điền đủ nội dung hồ sơ.');
  if(!COMPANIES.some(c=>c.id===form.get('company')))return formError('Vui lòng chọn đơn vị hợp lệ.');
  if(s[2]==='webhooks') {try{if(new URL(row[1]).protocol!=='https:')throw Error();}catch{return formError('Địa chỉ webhook phải là URL HTTPS hợp lệ.');}}
  if(s[2]==='calendar') {
    if(!Number.isFinite(Date.parse(row[1])))return formError('Ngày giờ chưa hợp lệ.');
    if(sys==='collab'&&s[0]==='meetings'&&entries(s,sys,false).some(e=>e.index!==index&&e.row[1]===row[1]&&e.row[2].trim().toLowerCase()===row[2].trim().toLowerCase()))return formError('Phòng họp này đã có lịch tại cùng thời điểm. Vui lòng chọn giờ hoặc phòng khác.');
  }
  const amountColumns={'crm:quotes':[2],'crm:contracts':[2],'crm:products':[2],'hrm:payroll':[1,2],'enterprise:budgets':[1,2],'crm:pipeline':[1]};
  if((amountColumns[keyOf(s)]||[]).some(col=>!/[0-9]/.test(row[col])||money(row[col])<0))return formError('Giá trị tiền chưa hợp lệ. Ví dụ: 120 triệu ₫ hoặc 120.000.000 ₫.');
  const meta={company:form.get('company'),owner:form.get('owner').trim(),due:form.get('due'),notes:form.get('notes').trim()};
  if(!meta.owner)return formError('Vui lòng nhập người phụ trách.');
  if(s[2]==='progress')row.push(index===null?0:records(s)[index][2]);
  if(s[2]==='checklist')row.push(index===null?false:records(s)[index][2]);
  if(s[2]==='approval')row.push('Chờ duyệt');
  if(s[0]==='procurement') {meta.amount=Number(form.get('amount'));if(!(meta.amount>0))return formError('Số tiền đề nghị phải lớn hơn 0.');row[1]+=' · '+currency(meta.amount);}
  if(s[0]==='leave') {meta.employee=form.get('employee').trim();meta.from=form.get('from');meta.to=form.get('to');if(!meta.from||meta.to<meta.from)return formError('Ngày kết thúc phải bằng hoặc sau ngày bắt đầu.');row[1]+=` · ${meta.employee} · ${meta.from} → ${meta.to}`;}
  let ref;
  if(index===null)ref=addRow(s,row,sys,meta);
  else {records(s)[index]=row;Object.assign(metadata(s,index),meta);ref=reference(s,index);}
  if(sys==='workspace'&&s[0]==='requests'&&index===null) {
    const target=addRow('approval',[row[0],row[1],'Chờ duyệt'],'collab',meta);linkRecords(ref,target,'Yêu cầu cần phê duyệt');
  }
  $('#modal').close();ui.query='';ui.filter='';commit(index===null?'Tạo hồ sơ: '+row[0]:'Cập nhật hồ sơ: '+row[0],s[0],index===null?0:index);
}
function validateAmount(value) { const number=Number(value);return Number.isFinite(number)&&number>0?number:null; }
function completeAction(form) {
  const {action,index,screen}=ui.form,s=spec(screen),r=records(s)[index],meta=metadata(s,index),ref=reference(s,index),inherited={company:meta.company,owner:meta.owner};
  const get=name=>String(form.get(name)||'').trim();
  let message='Đã cập nhật hồ sơ';
  if(action==='convert-lead') {
    if(linked(ref,'customers'))return formError('Hồ sơ này đã được chuyển đổi.');
    const amount=validateAmount(get('amount'));if(!amount)return formError('Giá trị cơ hội phải lớn hơn 0.');
    const customer=addRow('customers',[get('customer'),get('contact'),get('sector'),'Tiềm năng'],sys,inherited);
    const opportunity=addRow('pipeline',[get('opportunity'),currency(amount),'Tiếp cận'],sys,{...inherited,customer:get('customer')});
    linkRecords(ref,customer,'Chuyển đổi khách hàng');linkRecords(ref,opportunity,'Cơ hội từ lead');linkRecords(customer,opportunity,'Cơ hội bán hàng');r[3]='Đã chuyển đổi';message='Đã tạo khách hàng và cơ hội từ lead';
  }
  if(action==='new-opportunity') {
    const amount=validateAmount(get('amount'));if(!amount)return formError('Giá trị cơ hội phải lớn hơn 0.');
    const target=addRow('pipeline',[get('opportunity'),currency(amount),'Tiếp cận'],sys,{...inherited,customer:r[0]});linkRecords(ref,target,'Cơ hội bán hàng');message='Đã tạo cơ hội từ khách hàng';
  }
  if(action==='new-quote') {
    if(linked(ref,'quotes'))return formError('Cơ hội đã có báo giá liên kết.');
    const amount=validateAmount(get('amount'));if(!amount)return formError('Giá trị báo giá phải lớn hơn 0.');
    const target=addRow('quotes',['BG-'+Date.now().toString().slice(-7),get('customer'),currency(amount),'Đang soạn'],sys,inherited);linkRecords(ref,target,'Báo giá từ cơ hội');message='Đã lập báo giá';
  }
  if(action==='hire') {
    if(r[3]!=='Đề nghị nhận việc'||linked(ref,'employees'))return formError('Chỉ tiếp nhận vị trí đang ở bước đề nghị nhận việc và chưa tạo hồ sơ.');
    const employee=addRow('employees',[get('employee'),r[1],r[0],'Đang làm việc'],sys,{...inherited,email:get('email'),start:get('start')});
    const onboarding=addRow('onboarding',[`Tiếp nhận ${get('employee')}`,`Chuẩn bị tài khoản và hội nhập · Bắt đầu ${get('start')}`,false],sys,inherited);
    linkRecords(ref,employee,'Ứng viên trúng tuyển');linkRecords(employee,onboarding,'Checklist tiếp nhận');r[3]='Đã tuyển';message='Đã tạo hồ sơ nhân sự và checklist hội nhập';
  }
  if(action==='approve'||action==='reject') {
    if(r[2]!=='Chờ duyệt')return formError('Đề xuất đã được xử lý.');
    if(!get('reason'))return formError('Vui lòng ghi ý kiến để lưu lịch sử quyết định.');
    if(action==='approve'&&screen==='procurement') {
      const amount=validateAmount(get('amount'));if(!amount)return formError('Số tiền phải lớn hơn 0.');
      const budget=entries('budgets',sys,false).find(e=>e.meta.company===meta.company);
      if(!budget)return formError('Đơn vị chưa có ngân sách. Hãy tạo ngân sách trước.');
      const used=money(budget.row[2]),limit=money(budget.row[1]);
      if(used+amount>limit)return formError('Đề xuất vượt ngân sách còn lại ('+currency(limit-used)+'). Cần điều chỉnh hạn mức hoặc đề xuất.');
      budget.row[2]=currency(used+amount);budget.row[3]=(used+amount)/limit>=.85?'Cần rà soát':'Trong hạn mức';meta.amount=amount;
      linkRecords(ref,reference('budgets',budget.index),'Ghi nhận sử dụng ngân sách');audit('Cập nhật sử dụng ngân sách: '+currency(amount),'budgets',budget.index);
    }
    if(action==='approve'&&screen==='leave') {
      const from=get('from'),to=get('to'),employee=get('employee');
      if(!from||!to||to<from||!employee)return formError('Kiểm tra nhân sự và khoảng ngày nghỉ.');
      Object.assign(meta,{from,to,employee});
      const target=addRow('attendance',[employee,from===to?from:`${from} → ${to}`,'Nghỉ phép','Nghỉ được duyệt'],sys,inherited);linkRecords(ref,target,'Ngày nghỉ được duyệt');
    }
    r[2]=action==='approve'?'Đã duyệt':'Từ chối';meta.decision=`${r[2]} bởi ${actor()} · ${get('reason')}`;
    if(sys==='collab') {
      const origin=data._links.find(l=>l.target.id===ref.id&&l.source.system==='workspace'&&l.source.screen==='requests');
      if(origin){const source=findEntry(origin.source);if(source){source.row[2]=r[2];source.meta.decision=meta.decision;}}
    }
    message=r[2]+': '+r[0];notify(message,get('reason'),meta.company);
  }
  if(action==='meeting-note') {
    if(linked(ref,'docs'))return formError('Cuộc họp đã có biên bản liên kết.');
    const target=addRow('docs',[get('title'),actor(),get('content')],sys,inherited);linkRecords(ref,target,'Biên bản cuộc họp');message='Đã lưu biên bản vào Tài liệu';
  }
  if(action==='project-task'||action==='goal-task') {
    const target=addRow('tasks',[get('title'),get('description'),'Tiếp cận'],'workspace',{...inherited,owner:get('owner'),due:get('due')});linkRecords(ref,target,'Công việc triển khai');message='Đã giao công việc tại Workspace';
  }
  $('#modal').close();commit(message,screen,index);
}
function mutateAction(action,index) {
  const s=current(),r=records(s)[index],meta=metadata(s,index),ref=reference(s,index),inherit={company:meta.company,owner:meta.owner};
  let message='Đã cập nhật hồ sơ';
  if(action==='send-quote'&&r[3]==='Đang soạn'){r[3]='Đã gửi';message='Đã ghi nhận gửi báo giá';}
  else if(action==='accept-quote'&&r[3]==='Đã gửi'){r[3]='Đã chấp nhận';message='Đã ghi nhận khách hàng chấp nhận báo giá';}
  else if(action==='new-contract'&&r[3]==='Đã chấp nhận'&&!linked(ref,'contracts')){const target=addRow('contracts',['HĐ-'+Date.now().toString().slice(-7),r[1],r[2],'Chờ ký'],sys,inherit);linkRecords(ref,target,'Hợp đồng từ báo giá');r[3]='Đã lập hợp đồng';message='Đã tạo hợp đồng chờ ký';}
  else if(action==='activate-contract'&&r[3]==='Chờ ký'){r[3]='Hiệu lực';message='Đã ghi nhận hợp đồng có hiệu lực';}
  else if(action==='after-sales'&&['Hiệu lực','Hoàn tất'].includes(r[3])&&!linked(ref,'support')){const target=addRow('support',[`Chăm sóc ${r[1]}`,`Bàn giao dịch vụ theo ${r[0]}`,false],sys,inherit);linkRecords(ref,target,'Chăm sóc sau bán hàng');message='Đã tạo đầu việc chăm sóc khách hàng';}
  else if(action==='submit-request'&&!linked(ref,'approval','collab')){const target=addRow('approval',[...r],'collab',inherit);linkRecords(ref,target,'Yêu cầu cần phê duyệt');message='Đã chuyển yêu cầu đến Collaboration';}
  else if(action==='verify-domain'){r[3]='Đã xác minh';meta.notes='Kết quả kiểm tra mô phỏng; chưa thực hiện xác minh DNS thực tế.';message='Đã hoàn tất kiểm tra tên miền mẫu';}
  else if(action==='identity-toggle'){r[3]=r[3]==='Hoạt động'?'Tạm khóa':'Hoạt động';message='Đã cập nhật trạng thái tài khoản mẫu';}
  else if(action==='retry-delivery'&&r[3]!=='Thành công'){r[2]=String(Number(r[2])+1);r[3]='Thành công';meta.notes='Lần thử lại mô phỏng thành công; không gửi yêu cầu mạng.';message='Đã thử lại sự kiện trong sandbox';}
  else if(action==='project-handover'&&Number(r[2])===100&&!linked(ref,'handover')){const target=addRow('handover',[`Bàn giao ${r[0]}`,'Kiểm tra tài liệu, xác nhận kết quả và người tiếp nhận',false],sys,inherit);linkRecords(ref,target,'Checklist bàn giao dự án');message='Đã tạo checklist bàn giao';}
  else if(action==='complete-progress'){r[2]=100;message='Hoàn thành mục tiêu: '+r[0];}
  else if(action==='toggle'){r[2]=r[2]==='Bật'?'Tắt':'Bật';message=`${r[2]} cấu hình: ${r[0]}`;}
  else if(action==='seen'){r[2]='Đã đọc';message='Đã đánh dấu thông báo';}
  else return;
  audit(message,s[0],index);save();$('#detail-drawer').close();render();toast(message);
}
function apiRequest() {
  const [systemKey,screen]=$('#endpoint').value.split(':'),scope={customers:'customers:read',employees:'employees:read',tenants:'tenants:read'}[screen];
  const permission=records('scopes','open').find(r=>r[0]===scope);
  const allowed=permission?.[2]==='Bật';
  const requestId='req_'+uuid().slice(0,8),status=allowed?200:403;
  const result={request_id:requestId,status,mode:'local-sandbox',scope,company:companyName(ui.company),...(allowed?{data:entries(screen,systemKey).map(e=>Object.fromEntries(spec(screen,systemKey)[3].map((h,i)=>[h,e.row[i]])))}:{error:'insufficient_scope',message:'Bật quyền '+scope+' tại màn Quyền tích hợp.'})};
  addRow('logs',[requestId,'GET /v1/'+screen,'< 1 ms (cục bộ)',String(status)],'open');audit('Gọi API /v1/'+screen+' → '+status);save();
  $('#response').textContent=JSON.stringify(result,null,2);$('#response-status').textContent=String(status)+' '+(allowed?'OK':'Forbidden');
}
function testWebhook(index) {
  const r=records(current())[index],meta=metadata(current(),index);if(r[2]!=='Bật')return toast('Bật webhook trước khi gửi thử.');
  const target=addRow('deliveries',['customer.created',r[1],'1','Thành công'],'open',{company:meta.company,owner:meta.owner,notes:'Sự kiện mô phỏng, không gửi yêu cầu mạng.'});
  linkRecords(reference(current(),index),target,'Lần gửi sự kiện');audit('Gửi thử webhook: '+r[0],current()[0],index);save();
  $('#webhook-result').textContent=JSON.stringify({event:'customer.created',destination:r[1],status:200,mode:'simulation',delivery_id:target.id},null,2);toast('Đã tạo lịch sử gửi webhook mẫu');
}
function exportCSV(headers,rows,filename) {
  const csvCell=v=>{let text=String(v??'');if(/^[=+@\-\t\r]/.test(text))text="'"+text;return '"'+text.replaceAll('"','""')+'"';};
  const body='\ufeff'+[headers,...rows].map(row=>row.map(csvCell).join(',')).join('\r\n');
  const url=URL.createObjectURL(new Blob([body],{type:'text/csv;charset=utf-8'})),a=document.createElement('a');a.href=url;a.download=filename+'.csv';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
}
function sendMessage(e) {e.preventDefault();const message=$('#message').value.trim();if(!message)return;const channel=ui.company==='all'?'group':ui.company;data['_chat:'+channel]||=channel==='group'?(data.messages||[]):[];data['_chat:'+channel].push([actor(),message]);audit('Gửi tin nhắn trong kênh '+companyName(ui.company));save();render();$('#message').focus();}
document.addEventListener('submit',e=>{
  if(e.target.id!=='form')return;e.preventDefault();const form=new FormData(e.target);if(ui.form?.mode==='record')submitRecord(form);else if(ui.form?.mode==='action')completeAction(form);
});
document.addEventListener('click',e=>{
  const b=e.target.closest('button');if(!b)return;
  if(b.dataset.screen){$('#detail-drawer').close();if(b.dataset.record){location.hash='screen='+b.dataset.screen+'&record='+b.dataset.record;openHashRecord();return;}return go(b.dataset.screen);}
  if(b.id==='create')return openForm();
  if(b.id==='close')return $('#modal').close();
  if(b.id==='architecture')return location.href=root+'index.html';
  if(b.id==='business-guide')return workflowGuide();
  if(b.id==='notification')return location.href=root+'systems/workspace/index.html#screen=notifications';
  if(!system)return;
  if(b.dataset.day){ui.day=b.dataset.day;return render();}
  if(b.dataset.plan){data.plan=b.dataset.plan;commit('Chọn gói sử dụng mẫu: '+data.plan);return;}
  const action=b.dataset.action,index=Number(b.dataset.index);
  if(action==='close-detail')return $('#detail-drawer').close();
  if(action==='detail')return openDetail(index);
  if(action==='edit')return openForm(index);
  if(['convert-lead','new-opportunity','new-quote','hire','approve','reject','meeting-note','project-task','goal-task'].includes(action))return showAction(action,index);
  if(action==='all-days'){ui.day='';return render();}
  if(action==='api-request')return apiRequest();
  if(action==='test-webhook')return testWebhook(index);
  if(action==='export')return exportCSV([...current()[3],'Đơn vị','Người phụ trách'],tableEntries(current()).map(e=>[...e.row,companyName(e.meta.company),e.meta.owner]),sys+'-'+screenId);
  if(action==='export-report')return exportCSV(['Đơn vị','Giá trị hợp đồng'],COMPANIES.filter(c=>ui.company==='all'||c.id===ui.company).map(c=>[c.name,entries('contracts').filter(e=>e.meta.company===c.id).reduce((n,e)=>n+money(e.row[2]),0)]),'bao-cao-hop-dong');
  if(action==='refresh-monitor'){$('#updated').textContent='Đã tải lại trạng thái minh họa lúc '+formatTime(new Date());return;}
  if(action==='checkin') {
    const today=new Date().toLocaleDateString('vi-VN',{timeZone:'Asia/Bangkok'}),company=ui.company==='all'?'viettech':ui.company;
    if(entries('attendance',sys,false).some(e=>e.row[0]===actor()&&e.row[1]===today&&e.meta.company===company))return toast('Bạn đã chấm công hôm nay tại đơn vị này.');
    addRow('attendance',[actor(),today,new Date().toLocaleTimeString('vi-VN',{timeZone:'Asia/Bangkok'}),'Đã chấm công'],sys,{company});return commit('Ghi nhận chấm công','attendance',0);
  }
  if(action&&b.dataset.index!==undefined)mutateAction(action,index);
});
document.addEventListener('change',e=>{
  const t=e.target;if(!system)return;
  if(t.id==='calendar-month'){if(!/^\d{4}-\d{2}$/.test(t.value))return;ui.month=t.value;ui.day='';return render();}
  if(t.dataset.progress!==undefined){const i=Number(t.dataset.progress);records(current())[i][2]=Math.max(0,Math.min(100,Number(t.value)));commit('Cập nhật tiến độ: '+records(current())[i][0],screenId,i);$(`[data-progress="${i}"]`)?.focus();}
  if(t.dataset.check!==undefined){const i=Number(t.dataset.check);records(current())[i][2]=t.checked;commit((t.checked?'Hoàn tất: ':'Mở lại: ')+records(current())[i][0],screenId,i);$(`[data-check="${i}"]`)?.focus();}
  if(t.dataset.move!==undefined){const i=Number(t.dataset.move);records(current())[i][2]=t.value;commit('Chuyển giai đoạn: '+records(current())[i][0],screenId,i);}
  if(t.dataset.role){data.roles||={Admin:[true,true,true,true],Manager:[true,true,false,false],Member:[true,false,false,false]};data.roles[t.dataset.role][Number(t.dataset.permission)]=t.checked;audit('Cập nhật quyền '+t.dataset.role);save();toast('Đã lưu ma trận quyền mẫu');}
});
