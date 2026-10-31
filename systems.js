const SYSTEMS={
crm:{name:'MDU CRM',icon:'♧',desc:'Quản lý toàn bộ hành trình khách hàng và bán hàng.',screens:[
['dashboard','Tổng quan kinh doanh','dashboard',['Doanh thu|1,28 tỷ','Khách hàng|1.248','Cơ hội mở|32','Tỷ lệ chuyển đổi|24%']],
['customers','Khách hàng','table',['Khách hàng','Người liên hệ','Lĩnh vực','Trạng thái'],[['Sunrise Corp','Minh Anh','Công nghệ','Đang hợp tác'],['Greenfield','Hoàng Nam','Bất động sản','Tiềm năng'],['Nova Digital','Thanh Hà','Marketing','Đang hợp tác']]],
['pipeline','Cơ hội bán hàng','board',null,[['Website Sunrise','120 triệu ₫','Tiếp cận'],['CRM Greenfield','350 triệu ₫','Đàm phán'],['Gói Enterprise Nova','96 triệu ₫','Đã thắng']]],
['contracts','Hợp đồng','table',['Hợp đồng','Khách hàng','Giá trị','Trạng thái'],[['HĐ-2026-001','Sunrise Corp','320 triệu ₫','Hiệu lực'],['HĐ-2026-002','Nova Digital','96 triệu ₫','Chờ ký']]],
['reports','Báo cáo bán hàng','report',['Tháng 6|180','Tháng 7|220','Tháng 8|190','Tháng 9|310','Tháng 10|380']]]},
hrm:{name:'MDU HRM',icon:'♙',desc:'Quản lý nhân sự, thời gian làm việc và phát triển đội ngũ.',screens:[
['dashboard','Tổng quan nhân sự','dashboard',['Nhân sự|156','Phòng ban|8','Đang tuyển|6','Tỷ lệ chuyên cần|97%']],
['employees','Hồ sơ nhân sự','table',['Họ tên','Phòng ban','Chức danh','Trạng thái'],[['Nguyễn Minh Anh','Kinh doanh','Trưởng phòng','Đang làm việc'],['Trần Hoàng Nam','Công nghệ','Developer','Đang làm việc'],['Lê Thanh Hà','Nhân sự','HR Specialist','Nghỉ phép']]],
['attendance','Chấm công','attendance',['Nhân sự','Ngày làm việc','Giờ vào / ra','Trạng thái'],[['Minh Anh','31/10/2026','08:00 – 17:30','Đủ công'],['Hoàng Nam','31/10/2026','08:15 – 17:30','Đi muộn']]],
['leave','Nghỉ phép','approval',null,[['Nghỉ phép năm · Minh Anh','02–03/11/2026 · 2 ngày','Chờ duyệt'],['Nghỉ việc riêng · Thanh Hà','05/11/2026 · 1 ngày','Chờ duyệt']]],
['payroll','Bảng lương','table',['Nhân sự','Lương cơ bản','Phụ cấp','Trạng thái'],[['Minh Anh','25.000.000 ₫','2.000.000 ₫','Đã tính'],['Hoàng Nam','22.000.000 ₫','1.500.000 ₫','Đã tính']]]]},
core:{name:'MDU Platform Core',icon:'◇',desc:'Nền tảng quản trị tenant, danh tính, phân quyền và ứng dụng.',screens:[
['dashboard','Tổng quan nền tảng','dashboard',['Tenant|3','Tài khoản|248','Vai trò|6','Ứng dụng|12']],
['tenants','Quản lý tenant','table',['Doanh nghiệp','Mã tenant','Gói sử dụng','Trạng thái'],[['VietTech Group','viettech','Enterprise','Hoạt động'],['Sunrise Corp','sunrise','Business','Hoạt động'],['Nova Digital','nova','Starter','Dùng thử']]],
['identity','Danh tính & tài khoản','table',['Người dùng','Email','Phương thức','Trạng thái'],[['An Nguyễn','an@viettech.example','SSO','Hoạt động'],['Minh Anh','anh@viettech.example','Email + MFA','Hoạt động']]],
['rbac','Vai trò & phân quyền','permissions'],
['registry','App Registry','apps',null,[['CRM','Quản lý quan hệ khách hàng','Bật'],['HRM','Quản lý nhân sự','Bật'],['Collaboration','Cộng tác nội bộ','Bật']]]]},
workspace:{name:'MDU Workspace',icon:'◫',desc:'Một điểm truy cập cho ứng dụng, công việc và dữ liệu của bạn.',screens:[
['dashboard','Không gian cá nhân','dashboard',['Việc hôm nay|8','Ứng dụng|7','Thông báo mới|4','Lịch hẹn|3']],
['apps','Ứng dụng của tôi','launcher'],
['tasks','Công việc của tôi','board',null,[['Gọi khách hàng Sunrise','Hạn 02/11 · CRM','Tiếp cận'],['Hoàn thiện hồ sơ nhân sự','Hạn 03/11 · HRM','Đàm phán'],['Gửi báo cáo tuần','Hạn 31/10 · Workspace','Đã thắng']]],
['notifications','Trung tâm thông báo','notifications',null,[['Hợp đồng mới chờ ký','CRM · 5 phút trước','Chưa đọc'],['Đề xuất nghỉ phép','HRM · 20 phút trước','Chưa đọc'],['Lịch họp tuần','Calendar · 1 giờ trước','Chưa đọc']]],
['profile','Hồ sơ & tùy chọn','profile']]},
collab:{name:'MDU Collaboration',icon:'☷',desc:'Kết nối trao đổi, phê duyệt, lịch làm việc và tài liệu.',screens:[
['dashboard','Tổng quan cộng tác','dashboard',['Hội thoại|12','Chờ duyệt|3','Lịch tuần này|8','Tài liệu|24']],
['messenger','Messenger','chat'],
['approval','Phê duyệt','approval',null,[['Đề xuất công tác · Minh Anh','Kinh doanh · 3.500.000 ₫','Chờ duyệt'],['Mua thiết bị · Hoàng Nam','Công nghệ · 12.000.000 ₫','Chờ duyệt'],['Ngân sách marketing','Marketing · 8.000.000 ₫','Chờ duyệt']]],
['calendar','Lịch làm việc','calendar',null,[['Họp kế hoạch tuần','2026-11-02T09:00','Phòng họp A'],['Demo khách hàng Sunrise','2026-11-02T14:00','Trực tuyến'],['Review sản phẩm','2026-11-03T16:30','Phòng họp B']]],
['docs','Tài liệu','docs',null,[['Kế hoạch kinh doanh Q4','Minh Anh','Mục tiêu quý 4: phát triển khách hàng doanh nghiệp và nâng cao chất lượng chăm sóc.'],['Quy trình onboarding','Thanh Hà','Bước 1: chuẩn bị tài khoản. Bước 2: giới thiệu đội ngũ. Bước 3: đào tạo và đánh giá.']]]]},
open:{name:'MDU Open Platform',icon:'⌘',desc:'Mở rộng hệ sinh thái thông qua API, webhook và tích hợp.',screens:[
['dashboard','Tổng quan kết nối','dashboard',['Lượt gọi API|24.580','Tích hợp|8','Webhook|4','Tỷ lệ thành công|99,9%']],
['api','API Explorer','api'],
['webhooks','Webhooks','webhooks',null,[['Thông báo khách hàng mới','https://example.com/hooks/customer','Bật'],['Đồng bộ nhân sự','https://example.com/hooks/employee','Tắt']]],
['integrations','Kho tích hợp','apps',null,[['Slack','Thông báo & trao đổi nhóm','Bật'],['Google Calendar','Đồng bộ lịch làm việc','Bật'],['Microsoft Teams','Họp và cộng tác','Tắt']]],
['logs','Nhật ký API','logs',['Request ID','Endpoint','Thời gian','HTTP'],[['req_001','GET /v1/customers','42 ms','200'],['req_002','POST /v1/events','65 ms','201'],['req_003','GET /v1/employees','18 ms','401']]]]},
enterprise:{name:'MDU Enterprise',icon:'▦',desc:'Điều phối hệ sinh thái nhiều doanh nghiệp và ứng dụng.',screens:[
['dashboard','Tổng quan tập đoàn','dashboard',['Doanh nghiệp|3','Người dùng|248','Doanh thu|3,8 tỷ','Uptime|99,98%']],
['companies','Doanh nghiệp thành viên','table',['Doanh nghiệp','Lĩnh vực','Nhân sự','Trạng thái'],[['VietTech Group','Công nghệ','156','Hoạt động'],['Sunrise Corp','Thương mại','64','Hoạt động'],['Nova Digital','Marketing','28','Hoạt động']]],
['subscriptions','Gói dịch vụ','plans'],
['monitoring','Giám sát hệ thống','monitor'],
['architecture','Kiến trúc nền tảng','architecture']]}
};

// Five additional workflows per system. Records share the existing local storage model.
const EXTRA_SCREENS = {
crm: [
  ['leads','Khách hàng tiềm năng','table',['Khách hàng','Nguồn','Phụ trách','Trạng thái'],[['Lumi Retail','Website','Minh Anh','Cần liên hệ'],['An Phát Logistics','Giới thiệu','Hoàng Nam','Đã tư vấn'],['Mộc Studio','Sự kiện','Thanh Hà','Cần liên hệ']]],
  ['campaigns','Chiến dịch marketing','progress',null,[['Chào tháng 11','Tiếp cận 500 khách hàng mới',65],['Enterprise Growth','20 lịch demo sản phẩm',40],['Khách hàng thân thiết','100 lượt gia hạn',80]]],
  ['quotes','Báo giá','table',['Báo giá','Khách hàng','Giá trị','Trạng thái'],[['BG-041','Lumi Retail','85 triệu ₫','Đang soạn'],['BG-042','An Phát Logistics','240 triệu ₫','Đã gửi'],['BG-043','Mộc Studio','36 triệu ₫','Đã chấp nhận']]],
  ['support','Chăm sóc khách hàng','checklist',null,[['Gọi lại Sunrise','Minh Anh · Xác nhận yêu cầu triển khai',false],['Hướng dẫn Nova sử dụng CRM','Thanh Hà · Buổi đào tạo đầu tiên',true],['Khảo sát mức độ hài lòng','Hoàng Nam · Nhóm khách hàng tháng 10',false]]],
  ['products','Sản phẩm & dịch vụ','table',['Sản phẩm','Mã dịch vụ','Đơn giá','Trạng thái'],[['CRM Business','CRM-BIZ','990.000 ₫ / tháng','Đang bán'],['Triển khai Enterprise','ENT-SETUP','25.000.000 ₫','Đang bán'],['Đào tạo đội ngũ','TRAIN-01','5.000.000 ₫','Đang bán']]]
],
hrm: [
  ['recruitment','Tuyển dụng','table',['Vị trí','Phòng ban','Ứng viên','Trạng thái'],[['Frontend Developer','Công nghệ','12 ứng viên','Phỏng vấn'],['Account Executive','Kinh doanh','8 ứng viên','Nhận hồ sơ'],['HR Manager','Nhân sự','4 ứng viên','Đề nghị nhận việc']]],
  ['onboarding','Hội nhập nhân sự','checklist',null,[['Chuẩn bị tài khoản nhân viên','IT · Email, Workspace và quyền truy cập',true],['Giới thiệu văn hóa công ty','HR · Buổi chào đón nhân viên mới',false],['Đánh giá sau thử việc','Quản lý · Mốc 60 ngày',false]]],
  ['training','Đào tạo & phát triển','progress',null,[['Kỹ năng quản lý dự án','Đội công nghệ · 6 chuyên đề',50],['Bán hàng tư vấn','Đội kinh doanh · 4 chuyên đề',75],['An toàn thông tin','Toàn công ty · Khóa bắt buộc',90]]],
  ['reviews','Đánh giá hiệu suất','table',['Nhân sự','Kỳ đánh giá','Mục tiêu','Trạng thái'],[['Minh Anh','Q4 / 2026','Doanh số 1,5 tỷ','Tự đánh giá'],['Hoàng Nam','Q4 / 2026','Ra mắt 3 tính năng','Quản lý đánh giá'],['Thanh Hà','Q4 / 2026','Tuyển đủ 6 vị trí','Hoàn tất']]],
  ['benefits','Phúc lợi & đề xuất','approval',null,[['Gói sức khỏe · Minh Anh','Khám sức khỏe định kỳ · 2.000.000 ₫','Chờ duyệt'],['Hỗ trợ học tập · Hoàng Nam','Chứng chỉ chuyên môn · 3.000.000 ₫','Chờ duyệt']]]
],
core: [
  ['organization','Cơ cấu tổ chức','table',['Đơn vị','Mã đơn vị','Quản lý','Trạng thái'],[['Công nghệ','TECH','Hoàng Nam','Hoạt động'],['Kinh doanh','SALES','Minh Anh','Hoạt động'],['Nhân sự','PEOPLE','Thanh Hà','Hoạt động']]],
  ['security','Chính sách bảo mật','apps',null,[['Xác thực hai bước','Yêu cầu bước xác minh bổ sung khi đăng nhập (mô phỏng)','Bật'],['Cảnh báo đăng nhập','Thông báo khi có phiên đăng nhập mới (mô phỏng)','Bật'],['Giới hạn phiên','Tự động kết thúc phiên sau 8 giờ (mô phỏng)','Tắt']]],
  ['audit','Nhật ký quản trị','table',['Thao tác','Người thực hiện','Thời gian','Trạng thái'],[['Cập nhật vai trò Manager','An Nguyễn','31/10/2026 09:15','Thành công'],['Tạo tenant Sunrise','An Nguyễn','30/10/2026 14:20','Thành công'],['Đồng bộ tài khoản','System','30/10/2026 08:00','Hoàn tất']]],
  ['domains','Tên miền & định danh','table',['Tên miền','Tenant','Loại','Trạng thái'],[['viettech.example','VietTech','Chính','Đã xác minh'],['sunrise.example','Sunrise','Tùy chỉnh','Chờ xác minh'],['nova.example','Nova','Tùy chỉnh','Đã xác minh']]],
  ['maintenance','Bảo trì nền tảng','checklist',null,[['Kiểm tra bản sao lưu','Hạ tầng · Xác nhận dữ liệu mẫu',true],['Rà soát tài khoản không hoạt động','Bảo mật · Chu kỳ hàng tháng',false],['Kiểm tra quyền ứng dụng','Quản trị · Đối chiếu App Registry',false]]]
],
workspace: [
  ['goals','Mục tiêu cá nhân','progress',null,[['Hoàn thành kế hoạch tháng','8 / 10 đầu việc quan trọng',80],['Học kỹ năng mới','Khóa phân tích dữ liệu',35],['Phát triển khách hàng','Mục tiêu 10 cuộc hẹn',60]]],
  ['notes','Ghi chú cá nhân','docs',null,[['Ý tưởng tuần mới','An Nguyễn','Chuẩn hóa quy trình bàn giao giữa kinh doanh và triển khai.'],['Ghi chú buổi họp','An Nguyễn','Ưu tiên hoàn thiện báo cáo và chuẩn bị nội dung demo khách hàng.']]],
  ['schedule','Lịch cá nhân','calendar',null,[['Lập kế hoạch ngày','2026-11-02T08:30','Bàn làm việc'],['Trao đổi cùng quản lý','2026-11-03T10:00','Phòng họp A']]],
  ['daily','Checklist hằng ngày','checklist',null,[['Kiểm tra công việc ưu tiên','Buổi sáng · Chọn 3 việc quan trọng',true],['Xử lý thông báo đang chờ','Buổi chiều · Phản hồi các đề xuất',false],['Tổng kết cuối ngày','Ghi nhận kết quả và kế hoạch ngày mai',false]]],
  ['requests','Yêu cầu của tôi','approval',null,[['Cấp màn hình phụ','Thiết bị làm việc · Phòng Công nghệ','Chờ duyệt'],['Đăng ký khóa học','Phân tích dữ liệu · 1.500.000 ₫','Chờ duyệt']]]
],
collab: [
  ['projects','Dự án đội nhóm','progress',null,[['Ra mắt website mới','Đội Marketing · Hạn 15/11',70],['Chuẩn hóa onboarding','Đội Nhân sự · Hạn 20/11',45],['Triển khai CRM Sunrise','Đội Giải pháp · Hạn 30/11',30]]],
  ['meetings','Lịch họp & phòng họp','calendar',null,[['Sprint planning','2026-11-02T09:00','Phòng họp B'],['Workshop nội bộ','2026-11-03T14:00','Phòng đào tạo']]],
  ['knowledge','Kho tri thức','docs',null,[['Hướng dẫn làm việc từ xa','Đội Nhân sự','Cập nhật trạng thái công việc, tham gia họp đầu ngày và lưu tài liệu vào thư mục chung.'],['Quy tắc phối hợp dự án','PMO','Chỉ định người phụ trách, thống nhất hạn hoàn thành và cập nhật tiến độ mỗi tuần.']]],
  ['announcements','Bảng tin nội bộ','notifications',null,[['Chào đón thành viên mới','Nhân sự · 3 đồng nghiệp gia nhập tuần này','Chưa đọc'],['Lịch workshop tháng 11','Đào tạo · Đăng ký với phòng Nhân sự','Chưa đọc'],['Tổng kết quý 3','Ban điều hành · Thành tựu của đội ngũ','Chưa đọc']]],
  ['handover','Bàn giao công việc','checklist',null,[['Bàn giao tài liệu dự án','Minh Anh → Hoàng Nam · Sunrise CRM',true],['Xác nhận quyền truy cập','IT → Đội triển khai · Môi trường demo',false],['Chốt biên bản nghiệm thu','PMO → Khách hàng · Bản nháp',false]]]
],
open: [
  ['clients','Ứng dụng developer','table',['Ứng dụng','Client ID mẫu','Môi trường','Trạng thái'],[['Đồng bộ CRM','demo_crm_01','Sandbox','Hoạt động'],['Cổng nhân viên','demo_hrm_02','Sandbox','Đang phát triển'],['Báo cáo BI','demo_bi_03','Sandbox','Hoạt động']]],
  ['scopes','Quyền tích hợp','apps',null,[['customers:read','Cho phép đọc dữ liệu khách hàng trong demo','Bật'],['employees:read','Cho phép đọc hồ sơ nhân sự trong demo','Tắt'],['events:write','Cho phép ghi sự kiện mẫu','Tắt']]],
  ['deliveries','Lịch sử webhook','table',['Sự kiện','Đích đến','Số lần gửi','Trạng thái'],[['customer.created','CRM Sandbox','1','Thành công'],['employee.updated','HRM Sandbox','3','Chờ thử lại'],['contract.signed','BI Sandbox','1','Thành công']]],
  ['guides','Hướng dẫn tích hợp','docs',null,[['Bắt đầu với sandbox','Developer Relations','1. Tạo ứng dụng mẫu. 2. Chọn quyền truy cập. 3. Mở API Explorer để kiểm tra phản hồi cục bộ.'],['Xử lý webhook','Developer Relations','Kiểm tra loại sự kiện, chống xử lý trùng và lưu lịch sử nhận sự kiện. Demo không gửi yêu cầu mạng.']]],
  ['release','Checklist phát hành','checklist',null,[['Kiểm tra schema phản hồi','API · Đối chiếu hợp đồng dữ liệu',true],['Thử các trường hợp lỗi','QA · Thiếu quyền, dữ liệu không hợp lệ',false],['Rà soát cấu hình webhook','Developer · Xác nhận môi trường đích',false]]]
],
enterprise: [
  ['strategy','Mục tiêu chiến lược','progress',null,[['Mở rộng hệ sinh thái','Đưa 3 doanh nghiệp lên nền tảng',67],['Nâng cao hiệu quả vận hành','Giảm 20% thời gian xử lý',55],['Chuyển đổi số toàn diện','Chuẩn hóa 10 quy trình',80]]],
  ['budgets','Ngân sách đơn vị','table',['Đơn vị','Ngân sách Q4','Đã sử dụng','Trạng thái'],[['VietTech Group','1,2 tỷ ₫','780 triệu ₫','Trong hạn mức'],['Sunrise Corp','600 triệu ₫','420 triệu ₫','Trong hạn mức'],['Nova Digital','350 triệu ₫','310 triệu ₫','Cần rà soát']]],
  ['assets','Tài sản doanh nghiệp','table',['Tài sản','Đơn vị','Người quản lý','Trạng thái'],[['Máy chủ nội bộ','VietTech','Hoàng Nam','Đang sử dụng'],['Phòng đào tạo','Sunrise','Thanh Hà','Đang sử dụng'],['Thiết bị sự kiện','Nova','Minh Anh','Bảo trì']]],
  ['risks','Rủi ro & tuân thủ','table',['Rủi ro','Mức độ','Phụ trách','Trạng thái'],[['Chậm tiến độ triển khai','Trung bình','PMO','Đang xử lý'],['Vượt ngân sách marketing','Cao','Tài chính','Theo dõi'],['Thiếu tài liệu bàn giao','Thấp','Vận hành','Đã xử lý']]],
  ['procurement','Phê duyệt mua sắm','approval',null,[['Nâng cấp hạ tầng','VietTech · 85.000.000 ₫','Chờ duyệt'],['Thiết bị văn phòng','Sunrise · 24.000.000 ₫','Chờ duyệt'],['Phần mềm thiết kế','Nova · 12.000.000 ₫','Chờ duyệt']]]
]
};
for (const [key, screens] of Object.entries(EXTRA_SCREENS)) SYSTEMS[key].screens.push(...screens);
