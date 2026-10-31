/* Business vocabulary and screen contracts for a multi-industry group. */
const COMPANIES = [
  {id:'viettech',name:'VietTech Technology',short:'Công nghệ',sector:'Giải pháp số & dịch vụ B2B'},
  {id:'sunrise',name:'Sunrise Retail',short:'Bán lẻ',sector:'Chuỗi bán lẻ & phân phối'},
  {id:'nova',name:'Nova Logistics',short:'Logistics',sector:'Kho vận & chuỗi cung ứng'}
];
const BUSINESS = {
  crm:{code:'CRM',role:'Giám đốc kinh doanh',headline:'Từ cơ hội đến giá trị khách hàng.',description:'Điều phối hoạt động kinh doanh của các đơn vị, quản lý xuyên suốt vòng đời khách hàng.',flow:['leads','customers','pipeline','quotes','contracts','support'],chart:'Cơ cấu cơ hội bán hàng',queue:['leads','quotes','contracts'],groups:['Điều hành','Phát triển thị trường','Quản trị bán hàng','Khách hàng'],screens:[
    ['dashboard','Điều hành','Theo dõi cơ hội, giá trị hợp đồng và các hồ sơ cần xử lý trên toàn tập đoàn.','Ban kinh doanh','Ra quyết định theo dữ liệu'],
    ['leads','Phát triển thị trường','Tiếp nhận nhu cầu từ các kênh, phân công tư vấn và chuyển lead đủ điều kiện thành khách hàng.','Chuyên viên kinh doanh','Khách hàng và cơ hội mới'],
    ['campaigns','Phát triển thị trường','Theo dõi tiến độ chiến dịch theo từng đơn vị và chuyển hoạt động tiếp thị thành nguồn khách hàng.','Marketing','Tiến độ chiến dịch'],
    ['customers','Khách hàng','Hồ sơ khách hàng 360°: thông tin, đơn vị phụ trách, cơ hội và các hồ sơ được tạo từ khách hàng.','Account Manager','Lịch sử quan hệ khách hàng'],
    ['pipeline','Quản trị bán hàng','Theo dõi cơ hội qua các giai đoạn; tạo báo giá với giá trị và khách hàng cụ thể.','Sales Manager','Cơ hội và dự báo giá trị'],
    ['quotes','Quản trị bán hàng','Soạn, gửi và ghi nhận khách hàng chấp nhận báo giá trước khi lập hợp đồng.','Chuyên viên kinh doanh','Báo giá được chấp nhận'],
    ['contracts','Quản trị bán hàng','Quản lý giá trị, trạng thái ký và tạo đầu việc chăm sóc sau khi hợp đồng có hiệu lực.','Kinh doanh & pháp chế','Hợp đồng và bàn giao dịch vụ'],
    ['products','Quản trị bán hàng','Danh mục sản phẩm, dịch vụ và đơn giá tham chiếu cho các ngành kinh doanh.','Quản lý sản phẩm','Danh mục chào bán'],
    ['support','Khách hàng','Theo dõi các đầu việc chăm sóc, hướng dẫn sử dụng và bàn giao sau bán hàng.','Customer Success','Đầu việc chăm sóc hoàn tất'],
    ['reports','Điều hành','Tổng hợp giá trị báo giá và hợp đồng từ dữ liệu hiện có; phân biệt doanh số hợp đồng với tiền đã thu.','Giám đốc kinh doanh','Báo cáo doanh số hợp đồng']
  ]},
  hrm:{code:'HRM',role:'Giám đốc nhân sự',headline:'Một vòng đời nhân sự. Mọi đơn vị.',description:'Chuẩn hóa tuyển dụng, tiếp nhận, thời gian làm việc và phát triển nhân sự trong tập đoàn.',flow:['recruitment','employees','onboarding','attendance','payroll','reviews'],chart:'Cơ cấu hồ sơ nhân sự',queue:['recruitment','leave','benefits'],groups:['Điều hành','Thu hút & tiếp nhận','Vận hành nhân sự','Phát triển đội ngũ'],screens:[
    ['dashboard','Điều hành','Nắm tình hình nhân sự, nhu cầu tuyển dụng và đề xuất chờ xử lý theo đơn vị.','Ban nhân sự','Ưu tiên nhân sự trong kỳ'],
    ['recruitment','Thu hút & tiếp nhận','Theo dõi yêu cầu tuyển dụng; khi tuyển được ứng viên, tạo hồ sơ và checklist hội nhập.','Tuyển dụng','Nhân sự mới được tiếp nhận'],
    ['employees','Vận hành nhân sự','Quản lý hồ sơ, phòng ban, chức danh và tình trạng làm việc của nhân sự.','HR Operations','Hồ sơ nhân sự thống nhất'],
    ['onboarding','Thu hút & tiếp nhận','Điều phối các bước chuẩn bị tài khoản, giới thiệu và đánh giá thử việc.','HR & quản lý trực tiếp','Hoàn tất hội nhập'],
    ['attendance','Vận hành nhân sự','Ghi nhận chấm công theo ngày; tiếp nhận ngày nghỉ đã được duyệt từ quy trình nghỉ phép.','Chấm công','Dữ liệu thời gian làm việc'],
    ['leave','Vận hành nhân sự','Gửi yêu cầu, xem thông tin và phê duyệt hoặc từ chối kèm lý do; kết quả cập nhật bảng công.','Quản lý trực tiếp','Quyết định nghỉ phép'],
    ['payroll','Vận hành nhân sự','Xem lương cơ bản, phụ cấp và tổng thu nhập trước khấu trừ; theo dõi trạng thái phê duyệt bảng lương.','C&B','Bảng lương minh họa'],
    ['training','Phát triển đội ngũ','Theo dõi chương trình đào tạo và mức hoàn thành của các đơn vị.','Learning & Development','Kết quả đào tạo'],
    ['reviews','Phát triển đội ngũ','Quản lý chu kỳ tự đánh giá, quản lý đánh giá và chốt kết quả theo mục tiêu.','Quản lý trực tiếp','Đánh giá hiệu suất'],
    ['benefits','Vận hành nhân sự','Tiếp nhận, xét duyệt và lưu lịch sử đề xuất phúc lợi cho nhân viên.','C&B','Phúc lợi được phê duyệt']
  ]},
  core:{code:'CORE',role:'Quản trị nền tảng',headline:'Quản trị thống nhất. Phân quyền rõ ràng.',description:'Quản lý các đơn vị, danh tính và chính sách nền tảng dùng chung cho toàn tập đoàn.',flow:['tenants','organization','identity','rbac','registry','audit'],chart:'Trạng thái đơn vị trên nền tảng',queue:['domains','identity','maintenance'],groups:['Điều hành','Tổ chức & danh tính','Quản trị truy cập','Vận hành nền tảng'],screens:[
    ['dashboard','Điều hành','Theo dõi đơn vị, tài khoản và cấu hình cần hoàn thiện trước khi đưa vào vận hành.','Platform Admin','Tình trạng quản trị chung'],
    ['tenants','Tổ chức & danh tính','Quản lý không gian dữ liệu và gói sử dụng của từng doanh nghiệp thành viên.','Platform Admin','Danh mục tenant'],
    ['organization','Tổ chức & danh tính','Chuẩn hóa đơn vị, mã phòng ban và người quản lý để giao trách nhiệm xử lý.','Quản trị tổ chức','Cơ cấu tổ chức'],
    ['identity','Tổ chức & danh tính','Quản lý tài khoản, phương thức đăng nhập và trạng thái cấp quyền sử dụng.','Identity Admin','Vòng đời tài khoản'],
    ['rbac','Quản trị truy cập','Cấu hình ma trận quyền theo vai trò. Bản demo lưu cấu hình; chưa thực thi kiểm soát truy cập thật.','Security Admin','Ma trận quyền mẫu'],
    ['security','Quản trị truy cập','Cấu hình mẫu xác thực hai bước, cảnh báo và giới hạn phiên; ghi nhận mọi thay đổi vào nhật ký.','Security Admin','Bộ chính sách mẫu'],
    ['registry','Vận hành nền tảng','Quản lý danh mục ứng dụng được phép hiển thị trong cổng truy cập của tập đoàn.','Platform Admin','Danh mục ứng dụng'],
    ['domains','Vận hành nền tảng','Quản lý tên miền theo tenant và chạy bước kiểm tra cấu hình mô phỏng.','Hạ tầng','Trạng thái định danh tên miền'],
    ['audit','Vận hành nền tảng','Tra cứu thao tác người dùng thực hiện trong bản demo và các bản ghi khởi tạo.','Kiểm soát nội bộ','Dấu vết thay đổi'],
    ['maintenance','Vận hành nền tảng','Theo dõi checklist vận hành, rà soát tài khoản và kiểm tra quyền ứng dụng.','Vận hành IT','Checklist bảo trì']
  ]},
  workspace:{code:'WORK',role:'Không gian nhân viên',headline:'Biết việc cần làm. Theo sát kết quả.',description:'Một điểm làm việc cho nhân viên của mọi đơn vị: công việc, lịch, mục tiêu và yêu cầu.',flow:['notifications','tasks','schedule','daily','goals'],chart:'Phân bổ công việc cá nhân',queue:['tasks','requests','notifications'],groups:['Ngày làm việc','Công việc & kết quả','Cá nhân'],screens:[
    ['dashboard','Ngày làm việc','Tổng hợp công việc, lịch và các yêu cầu cần theo dõi của cá nhân.','Nhân viên','Kế hoạch làm việc'],
    ['apps','Ngày làm việc','Truy cập các phân hệ của tập đoàn và chuyển nhanh đến nơi xử lý công việc.','Nhân viên','Điểm truy cập ứng dụng'],
    ['notifications','Ngày làm việc','Đọc thông báo và kết quả phát sinh từ các quy trình liên hệ thống.','Nhân viên','Hộp thư thông báo'],
    ['tasks','Công việc & kết quả','Tổ chức đầu việc theo cần làm, đang làm và hoàn thành; thêm người phụ trách và hạn xử lý.','Nhân viên','Công việc hoàn tất'],
    ['schedule','Ngày làm việc','Quản lý lịch cá nhân theo tháng, xem từng ngày và thêm cuộc hẹn.','Nhân viên','Lịch trình cá nhân'],
    ['daily','Công việc & kết quả','Theo dõi checklist hằng ngày và đánh dấu các đầu việc đã xử lý.','Nhân viên','Kết quả trong ngày'],
    ['goals','Công việc & kết quả','Theo dõi mức hoàn thành mục tiêu và liên kết mục tiêu với công việc cụ thể.','Nhân viên & quản lý','Tiến độ mục tiêu'],
    ['requests','Cá nhân','Gửi yêu cầu nội bộ và theo dõi quá trình xử lý tại trung tâm phê duyệt Collaboration.','Người đề nghị','Kết quả xử lý yêu cầu'],
    ['notes','Cá nhân','Ghi lại nội dung làm việc, chỉnh sửa và lưu các ghi chú của cá nhân.','Nhân viên','Ghi chú có thể tra cứu'],
    ['profile','Cá nhân','Cập nhật thông tin cá nhân và tên hiển thị trong nhật ký thao tác.','Nhân viên','Hồ sơ cá nhân']
  ]},
  collab:{code:'TEAM',role:'Điều phối cộng tác',headline:'Phối hợp xuyên phòng ban, xuyên đơn vị.',description:'Kết nối dự án, trao đổi, phê duyệt và tri thức chung trong một không gian phối hợp.',flow:['projects','meetings','docs','approval','handover'],chart:'Tiến độ các dự án đang triển khai',queue:['approval','projects','handover'],groups:['Điều phối','Trao đổi & lịch','Tri thức & bàn giao'],screens:[
    ['dashboard','Điều phối','Theo dõi tiến độ dự án, phê duyệt và công việc bàn giao giữa các đơn vị.','PMO','Tình hình phối hợp'],
    ['projects','Điều phối','Quản lý tiến độ, người phụ trách và tạo checklist bàn giao khi dự án hoàn thành.','Project Manager','Kết quả dự án'],
    ['approval','Điều phối','Trung tâm xử lý đề xuất, bao gồm yêu cầu gửi từ Workspace; lưu quyết định và lý do.','Người phê duyệt','Quyết định có lịch sử'],
    ['messenger','Trao đổi & lịch','Trao đổi theo kênh của đơn vị và lưu lịch sử hội thoại trên trình duyệt.','Thành viên nhóm','Thông tin trao đổi'],
    ['calendar','Trao đổi & lịch','Xem lịch làm việc của đơn vị, lọc ngày và theo dõi các cuộc hẹn.','Điều phối viên','Lịch làm việc chung'],
    ['meetings','Trao đổi & lịch','Đặt lịch phòng họp, kiểm tra trùng giờ và tạo biên bản cuộc họp.','Người tổ chức','Lịch họp và biên bản'],
    ['docs','Tri thức & bàn giao','Tạo và chỉnh sửa tài liệu; theo dõi nội dung, người soạn và lịch sử thay đổi.','Thành viên nhóm','Tài liệu làm việc'],
    ['knowledge','Tri thức & bàn giao','Lưu quy trình và kinh nghiệm được chuẩn hóa để dùng chung trong tập đoàn.','Knowledge Owner','Kho tri thức chung'],
    ['announcements','Trao đổi & lịch','Đọc thông báo nội bộ theo đơn vị và xác nhận đã đọc.','Truyền thông nội bộ','Thông tin được tiếp nhận'],
    ['handover','Tri thức & bàn giao','Theo dõi đầu việc bàn giao phát sinh từ dự án và xác nhận từng hạng mục.','PMO & bên nhận','Checklist nghiệm thu']
  ]},
  open:{code:'API',role:'Cổng nhà phát triển',headline:'Kết nối dữ liệu. Mở rộng hệ sinh thái.',description:'Chuẩn hóa tích hợp giữa các ứng dụng và đơn vị bằng API, quyền truy cập và sự kiện.',flow:['clients','scopes','api','webhooks','deliveries','release'],chart:'Kết quả các lần gọi API',queue:['clients','deliveries','release'],groups:['Phát triển','Kết nối & sự kiện','Vận hành'],screens:[
    ['dashboard','Vận hành','Theo dõi ứng dụng, kết quả API và sự kiện cần thử lại trong sandbox.','Integration Lead','Sức khỏe tích hợp mẫu'],
    ['clients','Phát triển','Đăng ký ứng dụng tích hợp, định danh client và theo dõi môi trường phát triển.','Developer','Hồ sơ ứng dụng'],
    ['scopes','Phát triển','Bật hoặc tắt quyền mẫu; API Explorer kiểm tra quyền này trước khi trả dữ liệu.','Integration Admin','Phạm vi truy cập sandbox'],
    ['api','Phát triển','Thực hiện yêu cầu cục bộ với dữ liệu CRM, HRM và Core; phản hồi và request log được lưu.','Developer','Phản hồi API có thể kiểm tra'],
    ['guides','Phát triển','Tra cứu trình tự tích hợp, schema mẫu và yêu cầu xử lý sự kiện.','Developer Relations','Hướng dẫn triển khai'],
    ['webhooks','Kết nối & sự kiện','Cấu hình điểm nhận, bật kết nối và gửi sự kiện thử để tạo lịch sử phân phối.','Developer','Cấu hình và sự kiện thử'],
    ['integrations','Kết nối & sự kiện','Quản lý danh mục kết nối, bật hoặc tắt trạng thái tích hợp mô phỏng.','Integration Admin','Danh mục tích hợp'],
    ['deliveries','Vận hành','Theo dõi trạng thái phân phối sự kiện, xem chi tiết và thử lại sự kiện lỗi.','Vận hành tích hợp','Lịch sử phân phối'],
    ['logs','Vận hành','Tra cứu request ID, endpoint, thời gian và mã phản hồi của các lượt thử API.','Developer & vận hành','Nhật ký API'],
    ['release','Vận hành','Rà soát checklist trước khi phát hành tích hợp; theo dõi hạng mục chưa hoàn tất.','QA & Developer','Checklist sẵn sàng phát hành']
  ]},
  enterprise:{code:'GROUP',role:'Ban điều hành tập đoàn',headline:'Một góc nhìn cho toàn tập đoàn.',description:'Điều hành danh mục công ty, nguồn lực, ngân sách và rủi ro trên nhiều ngành kinh doanh.',flow:['companies','strategy','budgets','procurement','assets','risks'],chart:'Mức sử dụng ngân sách theo đơn vị',queue:['procurement','risks','budgets'],groups:['Điều hành tập đoàn','Tài chính & nguồn lực','Quản trị & nền tảng'],screens:[
    ['dashboard','Điều hành tập đoàn','So sánh đơn vị, theo dõi ngân sách và đưa các rủi ro cần xử lý vào ưu tiên điều hành.','Ban điều hành','Tổng quan tập đoàn'],
    ['companies','Điều hành tập đoàn','Quản lý các công ty công nghệ, bán lẻ và logistics cùng thông tin quy mô, tình trạng hoạt động.','Văn phòng tập đoàn','Danh mục doanh nghiệp'],
    ['strategy','Điều hành tập đoàn','Theo dõi mức hoàn thành các mục tiêu chiến lược và phân công trách nhiệm theo đơn vị.','Ban chiến lược','Tiến độ mục tiêu'],
    ['budgets','Tài chính & nguồn lực','So sánh ngân sách với số đã sử dụng; các đề xuất mua sắm được duyệt sẽ cập nhật số sử dụng mô phỏng.','Tài chính tập đoàn','Kiểm soát hạn mức'],
    ['procurement','Tài chính & nguồn lực','Gửi đề xuất mua sắm với số tiền và đơn vị; kiểm tra hạn mức trước khi phê duyệt.','Tài chính & người duyệt','Đề xuất và phân bổ ngân sách'],
    ['assets','Tài chính & nguồn lực','Quản lý tài sản, đơn vị sử dụng, người phụ trách và trạng thái vận hành.','Quản lý tài sản','Sổ tài sản'],
    ['risks','Quản trị & nền tảng','Theo dõi mức độ rủi ro, người chịu trách nhiệm và quá trình xử lý.','Kiểm soát nội bộ','Danh mục rủi ro'],
    ['subscriptions','Quản trị & nền tảng','So sánh gói dịch vụ, chọn cấu hình dùng thử cho tập đoàn và lưu lựa chọn.','Quản trị hợp đồng dịch vụ','Gói sử dụng mẫu'],
    ['monitoring','Quản trị & nền tảng','Đối chiếu trạng thái dịch vụ minh họa và hoạt động gần nhất của các hệ thống.','Vận hành IT','Tình trạng dịch vụ mẫu'],
    ['architecture','Quản trị & nền tảng','Xem vai trò từng lớp ứng dụng, luồng dữ liệu và liên kết tới hệ thống phụ trách.','Kiến trúc doanh nghiệp','Bản đồ hệ sinh thái']
  ]}
};
const STATUS_OPTIONS = {
  'crm:leads':['Cần liên hệ','Đã tư vấn','Đủ điều kiện','Đã chuyển đổi','Không phù hợp'],
  'crm:customers':['Tiềm năng','Đang hợp tác','Tạm ngừng'],
  'crm:quotes':['Đang soạn','Đã gửi','Đã chấp nhận','Từ chối','Đã lập hợp đồng'],
  'crm:contracts':['Chờ ký','Hiệu lực','Hoàn tất','Đã hủy'],
  'crm:products':['Đang bán','Ngừng bán'],
  'hrm:recruitment':['Nhận hồ sơ','Phỏng vấn','Đề nghị nhận việc','Đã tuyển','Tạm dừng'],
  'hrm:employees':['Đang làm việc','Nghỉ phép','Đã nghỉ việc'],
  'hrm:payroll':['Đã tính','Chờ duyệt','Đã duyệt','Đã chi trả'],
  'hrm:reviews':['Tự đánh giá','Quản lý đánh giá','Hoàn tất'],
  'core:tenants':['Dùng thử','Hoạt động','Tạm ngừng'],
  'core:identity':['Hoạt động','Tạm khóa'],
  'core:organization':['Hoạt động','Tạm ngừng'],
  'core:domains':['Chờ xác minh','Đã xác minh'],
  'open:clients':['Đang phát triển','Hoạt động','Tạm ngừng'],
  'open:deliveries':['Chờ thử lại','Thành công','Thất bại'],
  'enterprise:companies':['Hoạt động','Tái cấu trúc','Tạm ngừng'],
  'enterprise:assets':['Đang sử dụng','Bảo trì','Thanh lý'],
  'enterprise:risks':['Theo dõi','Đang xử lý','Đã xử lý'],
  'enterprise:budgets':['Trong hạn mức','Cần rà soát']
};
for (const [key, config] of Object.entries(BUSINESS)) {
  config.meta = Object.fromEntries(config.screens.map(([id,group,description,owner,outcome])=>[id,{group,description,owner,outcome}]));
  SYSTEMS[key].desc = config.description;
}
// Seed values only: existing user records remain intact in localStorage.
SYSTEMS.enterprise.screens.find(s=>s[0]==='companies')[4] = COMPANIES.map((c,i)=>[c.name,c.sector,['156','320','210'][i],'Hoạt động']);
SYSTEMS.enterprise.screens.find(s=>s[0]==='budgets')[4] = COMPANIES.map((c,i)=>[c.name,['1,2 tỷ ₫','600 triệu ₫','350 triệu ₫'][i],['780 triệu ₫','420 triệu ₫','310 triệu ₫'][i],i===2?'Cần rà soát':'Trong hạn mức']);
SYSTEMS.core.screens.find(s=>s[0]==='tenants')[4] = COMPANIES.map(c=>[c.name,c.id,'Enterprise','Hoạt động']);
SYSTEMS.crm.screens.find(s=>s[0]==='products')[4].push(['Phân phối hàng tiêu dùng','RTL-01','12.000.000 ₫ / lô','Đang bán'],['Dịch vụ kho vận','LOG-01','8.000.000 ₫ / tháng','Đang bán']);
SYSTEMS.open.screens.find(s=>s[0]==='scopes')[4].push(['tenants:read','Cho phép đọc danh mục đơn vị trong sandbox','Bật']);

function migrateBusinessSeeds(store) {
  if(store._businessVersion)return;
  const legacy={
    'enterprise:companies':[
      ['VietTech Group','Công nghệ','156','Hoạt động'],['Sunrise Corp','Thương mại','64','Hoạt động'],['Nova Digital','Marketing','28','Hoạt động']
    ],
    'enterprise:budgets':[
      ['VietTech Group','1,2 tỷ ₫','780 triệu ₫','Trong hạn mức'],['Sunrise Corp','600 triệu ₫','420 triệu ₫','Trong hạn mức'],['Nova Digital','350 triệu ₫','310 triệu ₫','Cần rà soát']
    ],
    'core:tenants':[
      ['VietTech Group','viettech','Enterprise','Hoạt động'],['Sunrise Corp','sunrise','Business','Hoạt động'],['Nova Digital','nova','Starter','Dùng thử']
    ]
  };
  // Only replace untouched known seed rows; user edits and added records survive.
  for(const [key,oldRows] of Object.entries(legacy)) {
    const [systemKey,screen]=key.split(':'),newRows=SYSTEMS[systemKey].screens.find(s=>s[0]===screen)[4];
    if(Array.isArray(store[key]))store[key]=store[key].map(row=>{const i=oldRows.findIndex(old=>JSON.stringify(old)===JSON.stringify(row));return i===-1?row:structuredClone(newRows[i]);});
  }
  if(Array.isArray(store['open:scopes'])&&!store['open:scopes'].some(row=>row[0]==='tenants:read'))store['open:scopes'].push(['tenants:read','Cho phép đọc danh mục đơn vị trong sandbox','Bật']);
  store._businessVersion=1;
}
