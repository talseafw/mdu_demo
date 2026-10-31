# MDU — Bộ demo 7 hệ thống

**Bản nâng cấp tập đoàn đa ngành:** 70 màn hình theo vai trò, bộ lọc đơn vị, dashboard theo dữ liệu, hồ sơ chi tiết và các luồng nghiệp vụ liên kết. Xem [hướng dẫn nghiệp vụ và kịch bản trình diễn](NGHIEP_VU.md).

HTML/CSS/JavaScript thuần, không cần cài thư viện hoặc build. Mở `index.html` để vào cổng ứng dụng, hoặc phục vụ toàn bộ thư mục bằng `python3 -m http.server 8080`.

Sau khi clone, mở thư mục repository và chạy `node scripts/serve.cjs` hoặc `npm.cmd run dev`, rồi truy cập http://localhost:8080. Node.js 22 trở lên; không cần `npm install`. VS Code hỗ trợ **F5 → MDU Demo: Chrome** để tự khởi động server khi cổng 8080 còn trống.

Mỗi hệ thống có URL và 10 màn hình riêng, menu riêng; liên kết “Cổng ứng dụng” để đổi hệ thống. Có thể mở trực tiếp từng `systems/<tên>/index.html`. URL hash `#screen=<màn hình>` hỗ trợ tải lại và nút Back/Forward.

| Hệ thống | Đường dẫn | 5 màn hình ban đầu |
| --- | --- | --- |
| CRM | systems/crm/index.html | Tổng quan, khách hàng, cơ hội bán hàng, hợp đồng, báo cáo |
| HRM | systems/hrm/index.html | Tổng quan, hồ sơ nhân sự, chấm công, nghỉ phép, bảng lương |
| Platform Core | systems/core/index.html | Tổng quan, tenant, danh tính, phân quyền, App Registry |
| Workspace | systems/workspace/index.html | Không gian cá nhân, ứng dụng, công việc, thông báo, hồ sơ |
| Collaboration | systems/collab/index.html | Tổng quan, Messenger, phê duyệt, lịch, tài liệu |
| Open Platform | systems/open/index.html | Tổng quan, API Explorer, webhook, tích hợp, nhật ký API |
| Enterprise | systems/enterprise/index.html | Tổng quan, doanh nghiệp thành viên, gói dịch vụ, giám sát, kiến trúc |

## Thao tác

### 35 màn hình bổ sung

| Hệ thống | 5 màn hình mới |
| --- | --- |
| CRM | Khách hàng tiềm năng, chiến dịch marketing, báo giá, chăm sóc khách hàng, sản phẩm & dịch vụ |
| HRM | Tuyển dụng, hội nhập nhân sự, đào tạo & phát triển, đánh giá hiệu suất, phúc lợi & đề xuất |
| Platform Core | Cơ cấu tổ chức, chính sách bảo mật, nhật ký quản trị, tên miền & định danh, bảo trì nền tảng |
| Workspace | Mục tiêu cá nhân, ghi chú cá nhân, lịch cá nhân, checklist hằng ngày, yêu cầu của tôi |
| Collaboration | Dự án đội nhóm, lịch họp & phòng họp, kho tri thức, bảng tin nội bộ, bàn giao công việc |
| Open Platform | Ứng dụng developer, quyền tích hợp, lịch sử webhook, hướng dẫn tích hợp, checklist phát hành |
| Enterprise | Mục tiêu chiến lược, ngân sách đơn vị, tài sản doanh nghiệp, rủi ro & tuân thủ, phê duyệt mua sắm |

Thanh tiến độ và checklist hỗ trợ thêm mục mới, cập nhật và lưu tự động trong localStorage. Các màn danh sách hỗ trợ thêm, tìm kiếm và lọc; màn tài liệu, lịch, thông báo và phê duyệt sử dụng các thao tác tương ứng bên dưới.

Giao diện cam có hiệu ứng xuất hiện, hover, hộp thoại, biểu đồ và thanh tiến độ. Tự tắt animation khi thiết bị bật `prefers-reduced-motion`. Menu cuộn dọc trên desktop, cuộn ngang trên điện thoại.

- Thêm và tìm kiếm bản ghi trong danh sách; lọc theo trạng thái.
- Chuyển trạng thái cơ hội/công việc trên bảng Kanban.
- Chấm công, duyệt/từ chối đề xuất nghỉ phép hoặc công tác.
- Gửi tin nhắn, thêm lịch hẹn, tạo và đọc tài liệu.
- Bật/tắt ứng dụng, tích hợp, webhook; gửi thử sự kiện mô phỏng.
- Thay đổi ma trận quyền, lưu hồ sơ và đánh dấu thông báo đã đọc.
- Gọi API mô phỏng đọc dữ liệu khách hàng, nhân sự, tenant đã lưu.
- Xuất CSV báo cáo doanh thu và nhật ký API, chọn gói demo.

Dữ liệu được lưu trên trình duyệt bằng khóa localStorage `mdu-systems-v2`. Xóa khóa này để khôi phục dữ liệu mẫu. Các ứng dụng cùng origin chia sẻ dữ liệu cho API Explorer. Khi mở bằng file trực tiếp, hành vi localStorage tùy trình duyệt; nên dùng HTTP để chia sẻ dữ liệu nhất quán.

Đây là demo frontend: không có backend, xác thực, kiểm soát quyền thực tế, thanh toán hoặc kết nối tích hợp thật. KPI, biểu đồ, bảng lương và giám sát là dữ liệu minh họa. Font Google là tùy chọn, có font hệ thống dự phòng.

## Đã kiểm tra

Chromium: điều hướng 35 màn hình, bố cục điện thoại, thêm/tìm kiếm/lưu khách hàng sau tải lại, lưu quyền, phê duyệt, chat, API dùng dữ liệu chung và chuyển trạng thái Kanban. Không có lỗi JavaScript trong các luồng đã kiểm tra.

Bản mở rộng: kiểm tra Chrome headless đủ 70 màn hình ở 1440px và 390px, không tràn ngang toàn trang; kiểm tra cập nhật tiến độ, hoàn thành mục tiêu, checklist, thêm mục, lưu sau tải lại và chế độ giảm chuyển động. Không ghi nhận lỗi JavaScript trong các luồng này. Script kiểm tra nằm tại `scripts/verify-demo.cjs`, dùng phiên Chrome kiểm thử riêng ở cổng 9223; không chạy với hồ sơ trình duyệt cá nhân.
