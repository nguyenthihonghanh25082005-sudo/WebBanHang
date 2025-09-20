// Kiểm tra Local Storage có thông tin tài khoản hay không
let storedAccounts = JSON.parse(localStorage.getItem('TaiKhoan')) || [];

// Thêm kiểm tra trước khi gọi addEventListener để đảm bảo phần tử tồn tại
const dangKyButton = document.querySelector(".btn-DangKy");
if (dangKyButton) {
    dangKyButton.addEventListener("click", function (event) {
        event.preventDefault();  // Ngăn chặn sự kiện mặc định của nút đăng ký
        dangKyThanhCong();
    });
}

// Khi người dùng đăng ký thành công
function dangKyThanhCong() {
    // Lấy thông tin từ các trường đăng ký
    const newUsername = getInputValue('Username');
    const newPassword = getInputValue('Password');
    const confirmPassword = getInputValue('Confirm_Password');
    const newPhoneNumber = getInputValue('Phone_Number');

    // Kiểm tra xem các trường có bị bỏ trống không
    if (!newUsername || !newPassword || !confirmPassword || !newPhoneNumber) {
        // Hiển thị thông báo lỗi bằng cửa sổ alert
        alert('Vui lòng điền đầy đủ thông tin!');
        return; // Dừng lại nếu có lỗi
    }

    // Kiểm tra xem mật khẩu và xác nhận mật khẩu có khớp nhau không
    if (newPassword !== confirmPassword) {
        // Hiển thị thông báo lỗi bằng cửa sổ alert
        alert('Password và Confirm Password không trùng khớp!');
        return; // Dừng lại nếu có lỗi
    }

    // Kiểm tra số điện thoại có đúng định dạng không (bắt đầu từ 1 đến 9)
    if (!isValidPhoneNumber(newPhoneNumber)) {
        alert('Số điện thoại không hợp lệ!');
        return;
    }

    // Kiểm tra xem tên tài khoản đã tồn tại trong danhSachTK hay chưa
    if (kiemTraTonTai(newUsername)) {
        // Hiển thị thông báo lỗi bằng cửa sổ alert
        alert('Tên tài khoản đã tồn tại!');
        return; // Dừng lại nếu có lỗi
    }

    // Lưu thông tin tài khoản mới vào mảng storedAccounts
    const newAccount = {
        username: newUsername,
        password: newPassword,
        phoneNumber: newPhoneNumber,
        loaiTK: 'Khách hàng' // Có thể thay đổi theo yêu cầu của bạn
    };

    // Cập nhật dữ liệu trong Local Storage
    storedAccounts.push(newAccount);
    updateLocalStorage();

    // Hiển thị thông báo đăng ký thành công
    alert('Đăng ký thành công!');
    window.location.href = ' DangNhap.html';
}

// Hàm kiểm tra xem tên tài khoản đã tồn tại hay chưa
function kiemTraTonTai(username) {
    return storedAccounts.some(account => account.username === username);
}

// Hàm kiểm tra số điện thoại có đúng định dạng không (bắt đầu từ 1 đến 9)
function isValidPhoneNumber(phoneNumber) {
    const phoneRegex = /^[0-9]\d*$/;
    return phoneRegex.test(phoneNumber);
}

// Hàm cập nhật Local Storage
function updateLocalStorage() {
    localStorage.setItem('TaiKhoan', JSON.stringify(storedAccounts));
}

// Hàm lấy giá trị của một trường input theo ID
function getInputValue(id) {
    return document.getElementById(id).value.trim();
}