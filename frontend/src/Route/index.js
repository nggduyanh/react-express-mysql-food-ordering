export const GetUserInfo = "http://localhost:3030/nguoidung/current";
export const AddUserInfo = "http://localhost:3030/nguoidung/add";
export const GetRestaurant = "http://localhost:3030/nguoiban";
export const GetTypeRes = "http://localhost:3030/loaimonan";
export const UpdateUser = "http://localhost:3030/nguoidung/update";
export const GetFoodRestaurant = "http://localhost:3030/monan";
export const localStaticFile = "http://localhost:3030/";
export const Order = "http://localhost:3030/donhang";
export const OrderStatus = "http://localhost:3030/trangthaidonhang";
export const GetRole = "http://localhost:3030/vaitro";
export const GetPromotion = "http://localhost:3030/khuyenmai";
export const addLoveRestaurant =
  "http://localhost:3030/nguoimua/nguoibanyeuthich/add";
export const getLoveRestaurant =
  "http://localhost:3030/nguoiban/nguoibanyeuthich/";
export const getCommentForSpecificFood =
  "http://localhost:3030/nguoimua/nhanxet/";
export const setCommendForSpecificFood =
  "http://localhost:3030/nguoimua/nhanxet/add";
export const updateCommendForSpecificFood =
  "http://localhost:3030/nguoimua/nhanxet/update";
export const formatCurrency = (value) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(value);
};
export const refreshPage = () => {
  window.location.reload();
};

export const PaymentMethod = "http://localhost:3030/phuongthucgiaodich";
export const OrderAdd = "http://localhost:3030/donhang/add";
export const OrderDetailAdd =
  "http://localhost:3030/donhang/chitietdonhang/add";
export const getDetailsOrder = "http://localhost:3030/monan/donhang/";
export const formatDate = (ISO_date) => {
  const date = new Date(ISO_date);

  // Lấy các giá trị ngày tháng
  const day = date.getUTCDate();
  const month = date.getUTCMonth() + 1; // getMonth() trả về giá trị từ 0-11
  const year = date.getUTCFullYear();

  // Lấy giờ và phút và định dạng 12 giờ
  let hours = date.getUTCHours();
  const minutes = date.getUTCMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12; // Chuyển sang 12 giờ, 0 giờ đổi thành 12

  // Ghép lại thành chuỗi định dạng mong muốn
  const formattedDate = `${day}/${month}/${year}, ${hours}:${minutes} ${ampm}`;
  return formattedDate;
};

export const deleteUserRoute = "http://localhost:3030/nguoidung/delete";
export const City = [
  "TP.Hà Nội",
  "TP.Hồ Chí Minh",
  "TP.Hải Phòng",
  "TP.Đà Nẵng",
  "TP.Quy Nhơn",
];
export const Ward = {
  "TP.Hà Nội": [
    "Phường Ngọc Khánh",
    "Phường Ngọc Hà",
    "Phường Trúc Bạch",
    "Phường Cống Vị",
    "Phường Liễu Giai",
    "Phường Hàng Bạc",
    "Phường Hàng Bông",
    "Phường Kim Liên",
    "Phường Khương Đình",
    "Phường Thanh Xuân Bắc",
    "Phường Mai Dịch",
    "Phường Nghĩa Đô",
  ],
  "TP.Hồ Chí Minh": [
    "Phường Bến Nghé",
    "Phường Bến Thành",
    "Phường Cầu Kho",
    "Phường Nguyễn Thái Bình",
    "Phường Thảo Điền",
    "Phường Tân Định",
    "Phường 1",
    "Phường 2",
    "Phường 3",
    "Phường 5",
  ],
  "TP.Hải Phòng": ["Phường Hạ Lý", "Phường Sở Dầu", "Phường Minh Khai"],
  "TP.Đà Nẵng": ["Phường Thuận Phước", "Phường Phước Ninh", "Phường Bình Hiên"],
  "TP.Quy Nhơn": ["Phường Trần Hưng Đạo", "Phường Quang Trung"],
};
export const District = {
  "TP.Hà Nội": [
    "Quận Ba Đình",
    "Quận Hoàn Kiếm",
    "Quận Đống Đa",
    "Quận Hai Bà Trưng",
    "Quận Hoàng Mai",
    "Quận Thanh Xuân",
    "Quận Cầu Giấy",
    "Quận Nam Từ Liêm",
    "Quận Bắc Từ Liêm",
    "Quận Tây Hồ",
  ],
  "TP.Hồ Chí Minh": [
    "Quận 1",
    "Quận 2",
    "Quận 3",
    "Quận 4",
    "Quận 5",
    "Quận 6",
    "Quận 7",
    "Quận 8",
    "Quận 9",
    "Quận 10",
    "Quận 11",
    "Quận 12",
    "Quận Bình Tân",
    "Quận Bình Thạnh",
    "Quận Gò Vấp",
    "Quận Phú Nhuận",
    "Quận Tân Bình",
    "Quận Tân Phú",
    "Quận Thủ Đức",
  ],
  "TP.Hải Phòng": [
    "Quận Hồng Bàng",
    "Quận Ngô Quyền",
    "Quận Lê Chân",
    "Quận Hải An",
    "Quận Kiến An",
    "Quận Đồ Sơn",
    "Huyện An Dương",
    "Huyện An Lão",
    "Huyện Tiên Lãng",
    "Huyện Vĩnh Bảo",
  ],
  "TP.Đà Nẵng": [
    "Quận Hải Châu",
    "Quận Thanh Khê",
    "Quận Sơn Trà",
    "Quận Ngũ Hành Sơn",
    "Quận Liên Chiểu",
    "Huyện Hòa Vang",
    "Huyện Hoàng Sa",
  ],
  "TP.Quy Nhơn": [
    "Thành phố Quy Nhơn",
    "Huyện Hoài Nhơn",
    "Huyện Phù Mỹ",
    "Huyện Tuy Phước",
  ],
};
