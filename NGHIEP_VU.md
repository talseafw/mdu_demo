# MDU Group — bản trình diễn nghiệp vụ tập đoàn đa ngành

Phạm vi: 7 hệ thống, 70 màn hình; ba đơn vị mẫu gồm VietTech Technology, Sunrise Retail và Nova Logistics.

## Cách sử dụng

1. Mở cổng ứng dụng tại `http://localhost:8080` và chọn hệ thống theo vai trò.
2. Chọn **Toàn tập đoàn** hoặc một đơn vị trong **Phạm vi dữ liệu**.
3. Dashboard phản ánh hồ sơ trong phạm vi đang chọn. Chọn KPI, mục ưu tiên hoặc bước trong vòng đời nghiệp vụ để đi tới màn làm việc.
4. Trong danh sách hoặc thẻ công việc, chọn **Chi tiết** để xem thông tin, người phụ trách, hạn xử lý, hồ sơ liên quan và lịch sử.
5. Dùng **Bản đồ nghiệp vụ** để xem đầy đủ chức năng, người phụ trách và kết quả đầu ra của 10 màn hình trong hệ thống.

## Kịch bản trình diễn theo hệ thống

| Hệ thống | Luồng có thể thao tác | Kết quả |
| --- | --- | --- |
| CRM | Lead → chuyển đổi khách hàng và cơ hội → lập báo giá → ghi nhận đã gửi → khách hàng chấp nhận → lập hợp đồng → ghi nhận đã ký → bàn giao chăm sóc | Các hồ sơ liên kết qua ID, giữ đơn vị phụ trách; báo cáo hợp đồng và KPI cập nhật theo dữ liệu |
| HRM | Vị trí ở trạng thái đề nghị nhận việc → tiếp nhận ứng viên → hồ sơ nhân viên và checklist hội nhập; đề xuất nghỉ phép → phê duyệt kèm ngày nghỉ → bảng công | Lưu email/ngày bắt đầu của nhân sự; quyết định và ngày nghỉ được liên kết. Đào tạo, hiệu suất, phúc lợi và bảng lương có không gian làm việc riêng |
| Core | Đơn vị/tenant → tổ chức → tài khoản → ma trận quyền và chính sách → ứng dụng, tên miền, bảo trì → nhật ký | Thay đổi trạng thái tài khoản, cấu hình quyền mẫu và xem dấu vết thao tác của mọi hệ thống |
| Workspace | Công việc và lịch cá nhân → checklist hằng ngày → mục tiêu; tạo yêu cầu → trung tâm phê duyệt Collaboration → nhận kết quả/thông báo | Công việc dùng đúng ba trạng thái cá nhân; mục tiêu có thể tạo công việc; yêu cầu có liên kết và kết quả đồng bộ |
| Collaboration | Dự án → giao việc sang Workspace → cập nhật tiến độ → checklist bàn giao; lịch họp → biên bản; đề xuất → phê duyệt/từ chối có lý do | Lưu trách nhiệm, thời hạn và biên bản; chặn phòng họp trùng đúng thời điểm; đồng bộ quyết định cho yêu cầu Workspace |
| Open Platform | Ứng dụng → quyền sandbox → API Explorer → request log; webhook đang bật → gửi thử → lịch sử phân phối → thử lại | API đọc dữ liệu đã lưu của CRM/HRM/Core, trả 403 khi quyền tương ứng bị tắt; webhook tạo lịch sử thử cục bộ |
| Enterprise | Công ty thành viên → mục tiêu → ngân sách → đề xuất mua sắm → kiểm tra hạn mức → duyệt và cập nhật sử dụng ngân sách; theo dõi tài sản và rủi ro | Chặn vượt ngân sách, không duyệt lặp đề xuất đã xử lý; dashboard tổng hợp ngân sách và các rủi ro chưa đóng |

## Những thao tác dùng chung

- Danh sách: tìm kiếm, lọc trạng thái, xem chi tiết, tạo/sửa hồ sơ phù hợp và xuất CSV theo bộ lọc.
- Hồ sơ: đơn vị, người phụ trách, hạn xử lý, ghi chú, tài liệu liên quan và lịch sử thao tác.
- Tiến độ/checklist: cập nhật, hoàn thành và lưu sau tải lại trang.
- Tài liệu: đọc, tạo và chỉnh sửa nội dung; có lịch sử cập nhật.
- Lịch: chuyển tháng, chọn ngày, thêm lịch và xem hồ sơ cuộc hẹn.
- Thông báo: đánh dấu đã đọc; nhận kết quả từ các quyết định phê duyệt.
- Dữ liệu cũ: giữ bản ghi đã chỉnh sửa và bổ sung; chỉ thay các dòng mẫu công ty/ngân sách/tenant khớp hoàn toàn với mẫu cũ.

## Phạm vi mô phỏng

Đây là frontend chạy local, dữ liệu lưu tại trình duyệt với khóa `mdu-systems-v2`. Bộ lọc đơn vị phục vụ trình diễn, không phải cơ chế cách ly dữ liệu hoặc phân quyền bảo mật. Danh tính, RBAC, tên miền, trạng thái dịch vụ, webhook và quyền API đều là mô phỏng; chưa có máy chủ xác thực hay kết nối bên ngoài.

- CRM ghi nhận người dùng đã gửi báo giá/ký hợp đồng; không tự gửi email hoặc ký điện tử. Báo cáo giá trị hợp đồng không đại diện doanh thu kế toán hoặc tiền đã thu.
- HRM minh họa lương cơ bản + phụ cấp trước khấu trừ; chưa tính công chuẩn, bảo hiểm, thuế hay chuyển tiền. Đơn nghỉ được lưu thành dòng khoảng ngày trong bảng công.
- Mua sắm cập nhật số sử dụng ngân sách trong demo; không tạo giao dịch ngân hàng, bút toán hoặc đơn đặt hàng thực tế.
- Lịch họp chặn trùng phòng và thời điểm bắt đầu; chưa quản lý thời lượng và các khoảng thời gian giao nhau.
- Chat, thông báo và cộng tác lưu trong trình duyệt, chưa đồng bộ nhiều người dùng trên máy chủ.

## Kiểm thử

- `scripts/verify-demo.cjs`: duyệt 70 màn hình trên Chrome ở desktop/mobile, kiểm tra không tràn ngang toàn trang, thao tác tiến độ/checklist, lưu sau tải lại và giảm chuyển động.
- `scripts/verify-business.cjs`: các kịch bản xuyên hệ thống ở bảng trên, bao gồm trường hợp thiếu quyền API, vượt ngân sách, phê duyệt lặp, trùng lịch và lọc theo đơn vị.

Hai script sử dụng Chrome với **hồ sơ kiểm thử riêng** và `--remote-debugging-port=9223`. Script nghiệp vụ đặt lại dữ liệu trong hồ sơ thử; không chạy với hồ sơ trình duyệt cá nhân. Không cần thư viện npm bổ sung.

## Cấu trúc mã nguồn

- `systems.js`: danh mục màn hình và dữ liệu mẫu.
- `business.js`: vai trò, mô tả nghiệp vụ, nhóm menu, trạng thái và chuyển đổi dữ liệu mẫu cũ.
- `app.js`: lưu trữ, phạm vi đơn vị, liên kết hồ sơ, định dạng và điều hướng.
- `views.js`: dashboard, bảng, biểu đồ, Kanban, lịch, tài liệu và các màn chuyên biệt.
- `actions.js`: biểu mẫu, chi tiết, quy trình chuyển hồ sơ, phê duyệt, API/webhook mẫu và CSV.
- `business.css`: giao diện quản trị và bố cục responsive, kế thừa tông cam từ `style.css`.
