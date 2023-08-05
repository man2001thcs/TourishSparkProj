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
  ]);

export const SUCCESS_MESSAGE_CODE_EN: Map<string, string> = new Map([
    ["I000", "Login success"],
    ["I001", "Token has been renewed"],

    ["I201", "Category add ok"],
    ["I202", "Category update ok"],
    ["I203", "Category delete ok"],

    ["I301", "Voucher add ok"],
    ["I302", "Voucher update ok"],
    ["I303", "Voucher delete ok"],
  ]);

  export const SUCCESS_MESSAGE_CODE_VI: Map<string, string> = new Map([
    ["I000", "Đăng nhập thành công"],
    ["I001", "Token đã được làm mới"],

    ["I201", "Category thêm thành công"],
    ["I202", "Category update thành công"],
    ["I203", "Category xóa thành công"],
    
    ["I301", "Voucher thêm thành công"],
    ["I302", "Voucher update thành công"],
    ["I303", "Voucher xóa thành công"],
  ]);
