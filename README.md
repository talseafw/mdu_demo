# MDU — Bộ demo 7 hệ thống

HTML/CSS/JavaScript thuần, không cần cài thư viện hoặc build. Mở `index.html` để vào cổng ứng dụng, hoặc phục vụ toàn bộ thư mục bằng `python3 -m http.server 8080`.

Mỗi hệ thống có URL và 5 màn hình riêng, menu riêng; liên kết “Cổng ứng dụng” để đổi hệ thống. Có thể mở trực tiếp từng `systems/<tên>/index.html`. URL hash `#screen=<màn hình>` hỗ trợ tải lại và nút Back/Forward.

| Hệ thống | Đường dẫn | 5 màn hình |
| --- | --- | --- |
| CRM | systems/crm/index.html | Tổng quan, khách hàng, cơ hội bán hàng, hợp đồng, báo cáo |
| HRM | systems/hrm/index.html | Tổng quan, hồ sơ nhân sự, chấm công, nghỉ phép, bảng lương |
| Platform Core | systems/core/index.html | Tổng quan, tenant, danh tính, phân quyền, App Registry |
| Workspace | systems/workspace/index.html | Không gian cá nhân, ứng dụng, công việc, thông báo, hồ sơ |
| Collaboration | systems/collab/index.html | Tổng quan, Messenger, phê duyệt, lịch, tài liệu |
| Open Platform | systems/open/index.html | Tổng quan, API Explorer, webhook, tích hợp, nhật ký API |
| Enterprise | systems/enterprise/index.html | Tổng quan, doanh nghiệp thành viên, gói dịch vụ, giám sát, kiến trúc |

## Thao tác

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
