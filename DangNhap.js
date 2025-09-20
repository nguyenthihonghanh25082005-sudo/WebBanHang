// Gắn sự kiện click cho nút "Đăng nhập"
document.querySelector(".btn-DangNhap").addEventListener("click", function (event) {
    event.preventDefault();  // Ngăn chặn sự kiện mặc định của nút đăng nhập
    checkLogin();
});

//-------HÀM KIỂM TRA ĐĂNG NHẬP------------
function checkLogin() {
    // Lấy thông tin từ các trường đăng nhập
    const username = document.getElementById('NguoiDung_Phone').value.trim();
    const password = document.getElementById('NguoiDung_PassWord').value.trim();

    // Kiểm tra đăng nhập với vai trò Quản Trị Viên
    if (username === 'honghanh' && password === 'hanh123') {
        // Hiển thị thông báo đăng nhập thành công với vai trò Quản Trị Viên
        alert('Chúc mừng bạn đã đăng nhập thành công với vai trò Quản Trị Viên!!!');

        // Chuyển hướng đến trang DangNhap.html
        window.location.href = 'TrangChuAdmin.html';
        return;

    }

    // Kiểm tra đăng nhập từ danhSachTK (VAI TRÒ USER)
    if (kiemTraDangNhapDanhSachTK(username, password)) {
        // Đăng nhập thành công, chuyển hướng đến trang sau
        window.location.href = ' TrangChu.html';
    } else {
        // Kiểm tra đăng nhập từ Local Storage
        if (kiemTraDangNhapLocalStorage(username, password)) {
            // Đăng nhập thành công, chuyển hướng đến trang sau
            window.location.href = 'TrangChu.html';
        } else {
            // Hiển thị thông báo lỗi
            alert('Tên đăng nhập hoặc mật khẩu không đúng. Vui lòng thử lại.');
        }
    }
}

// Hàm kiểm tra đăng nhập từ danhSachTK
function kiemTraDangNhapDanhSachTK(username, password) {
    // Lấy danh sách tài khoản từ phần tử có id 'danhSachTK'
    const danhSachTKElement = document.getElementById('danhSachTK');

    // Kiểm tra xem phần tử có tồn tại không
    if (danhSachTKElement) {
        const rows = danhSachTKElement.getElementsByTagName('tbody')[0].rows;
        
        // Lặp qua danh sách tài khoản từ bảng danhSachTK
        for (let i = 0; i < rows.length; i++) {
            const storedUsername = getCellValue(rows[i], 0);
            const storedPassword = getCellValue(rows[i], 1);

            // Kiểm tra đăng nhập
            if (username === storedUsername && password === storedPassword) {
                return true; // Đăng nhập thành công
            }
        }
    }
    return false; // Không tìm thấy thông tin đăng nhập trong bảng
}

// Hàm kiểm tra đăng nhập từ Local Storage
function kiemTraDangNhapLocalStorage(username, password) {
    // Lấy danh sách tài khoản từ Local Storage
    const storedAccounts = JSON.parse(localStorage.getItem('TaiKhoan')) || [];

    // Kiểm tra đăng nhập trong danh sách từ Local Storage
    return storedAccounts.some(account => account.username === username && account.password === password);
}