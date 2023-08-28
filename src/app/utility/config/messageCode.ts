export const ERR_MESSAGE_CODE_EN: Map<string, string> = new Map([
  ["C001", "Wrong password"],
  ["C002", "Wrong token's alg"],
  ["C003", "Token hasn't expired"],
  ["C004", "Login expired"],
  ["C005", "Refresh token does not exist"],
  ["C006", "Refresh token has been used"],
  ["C007", "Refresh token has been revoked"],
  ["C008", "Token doesn't match"],
  ["C009", "Unexpected error"],

  ["C100", "Book not found"],
  ["C101", "Book add error"],
  ["C102", "Book update error"],
  ["C103", "Book delete error"],
  ["C104", "Book SQL error"],

  ["C200", "Category not found"],
  ["C201", "Category add error"],
  ["C202", "Category update error"],
  ["C203", "Category delete error"],
  ["C204", "Category SQL error"],

  ["C300", "Voucher not found"],
  ["C301", "Voucher add error"],
  ["C302", "Voucher update error"],
  ["C303", "Voucher delete error"],
  ["C304", "Voucher SQL error"],

  ["C400", "Author not found"],
  ["C401", "Author add error"],
  ["C402", "Author update error"],
  ["C403", "Author delete error"],
  ["C404", "Author SQL error"],

  ["C500", "Publisher not found"],
  ["C501", "Publisher add error"],
  ["C502", "Publisher update error"],
  ["C503", "Publisher delete error"],
  ["C504", "Publisher SQL error"],
]);

export const ERR_MESSAGE_CODE_VI: Map<string, string> = new Map([
    ["C001", "Sai mật khẩu"],
    ["C002", "Token sai định dạng"],
    ["C003", "Token chưa hết hạn"],
    ["C004", "Quá hạn lượt đăng nhập, vui lòng đăng nhập lại"],
    ["C005", "Refresh Token không tồn tại"],
    ["C006", "Refresh token đã được sử dụng"],
    ["C007", "Refresh token đã bị thu hồi"],
    ["C008", "Token không khớp"],
    ["C009", "Lỗi không xác định"],

    ["C100", "Sách không tồn tại"],
    ["C101", "Sách thêm vào bị lỗi"],
    ["C102", "Sách lỗi cập nhật"],
    ["C103", "Sách xóa thất bại"],
    ["C104", "Sách lỗi cơ sở dữ liệu"],
  
    ["C200", "Category không tồn tại"],
    ["C201", "Category thêm vào bị lỗi"],
    ["C202", "Category lỗi cập nhật"],
    ["C203", "Category xóa thất bại"],
    ["C204", "Category lỗi cơ sở dữ liệu"],

    ["C300", "Voucher không tồn tại"],
    ["C301", "Voucher thêm vào bị lỗi"],
    ["C302", "Voucher lỗi cập nhật"],
    ["C303", "Voucher xóa thất bại"],
    ["C304", "Voucher lỗi cơ sở dữ liệu"],

    ["C400", "Author không tồn tại"],
    ["C401", "Author thêm vào bị lỗi"],
    ["C402", "Author lỗi cập nhật"],
    ["C403", "Author xóa thất bại"],
    ["C404", "Author lỗi cơ sở dữ liệu"],

    ["C500", "Publisher không tồn tại"],
    ["C501", "Publisher thêm vào bị lỗi"],
    ["C502", "Publisher lỗi cập nhật"],
    ["C503", "Publisher xóa thất bại"],
    ["C504", "Publisher lỗi cơ sở dữ liệu"],
  ]);

export const SUCCESS_MESSAGE_CODE_EN: Map<string, string> = new Map([
    ["I000", "Login success"],
    ["I001", "Token has been renewed"],

    ["I101", "Book add ok"],
    ["I102", "Book update ok"],
    ["I103", "Book delete ok"],

    ["I201", "Category add ok"],
    ["I202", "Category update ok"],
    ["I203", "Category delete ok"],

    ["I301", "Voucher add ok"],
    ["I302", "Voucher update ok"],
    ["I303", "Voucher delete ok"],

    ["I401", "Author add ok"],
    ["I402", "Author update ok"],
    ["I403", "Author delete ok"],

    ["I501", "Publisher add ok"],
    ["I502", "Publisher update ok"],
    ["I503", "Publisher delete ok"],
  ]);

  export const SUCCESS_MESSAGE_CODE_VI: Map<string, string> = new Map([
    ["I000", "Đăng nhập thành công"],
    ["I001", "Token đã được làm mới"],

    ["I101", "Sách thêm thành công"],
    ["I102", "Sách update thành công"],
    ["I103", "Sách xóa thành công"],

    ["I201", "Category thêm thành công"],
    ["I202", "Category update thành công"],
    ["I203", "Category xóa thành công"],
    
    ["I301", "Voucher thêm thành công"],
    ["I302", "Voucher update thành công"],
    ["I303", "Voucher xóa thành công"],

    ["I401", "Author thêm thành công"],
    ["I402", "Author update thành công"],
    ["I403", "Author xóa thành công"],

    ["I501", "Publisher thêm thành công"],
    ["I502", "Publisher update thành công"],
    ["I503", "Publisher xóa thành công"],
  ]);
