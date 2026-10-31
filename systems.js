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
