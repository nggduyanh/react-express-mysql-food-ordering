const API_BASE_URL = import.meta.env.API_URL || "http://localhost:3000" +"/";
export const Url = import.meta.env.API_URL || "http://localhost:3000";
export const GetUserInfo = `${API_BASE_URL}nguoidung/current`;
export const GetAllUser = `${API_BASE_URL}nguoidung`;
export const getRoles = `${API_BASE_URL}vaitro`;
export const getUserRole = `${API_BASE_URL}vaitro/nguoidung/`;
export const GetSellerInfo = `${API_BASE_URL}nguoiban/current`; 
export const AddUserInfo = `${API_BASE_URL}nguoidung/add`;
export const GetRestaurant = `${API_BASE_URL}nguoiban`;
export const GetTypeRes = `${API_BASE_URL}loaimonan`;
export const getTypeRestaurant = `${API_BASE_URL}loainguoiban`;
export const UpdateUser = `${API_BASE_URL}nguoidung/update`;
export const upgradeAdmin = `${API_BASE_URL}auth/upgradeAdmin`;
export const GetFoodRestaurant = `${API_BASE_URL}monan`;
export const localStaticFile = `${API_BASE_URL}`;
export const Order = `${API_BASE_URL}donhang`;
export const OrderStatus = `${API_BASE_URL}trangthaidonhang`;
export const getSellerType = `${API_BASE_URL}loainguoiban`;
export const AddSellerType = `${API_BASE_URL}loainguoiban/add`;
export const GetSellerTypeId = `${API_BASE_URL}loainguoiban/`;
export const UpdateSellerType = `${API_BASE_URL}loainguoiban/update`;
export const DeleteSellerType = `${API_BASE_URL}loainguoiban/delete`;
export const GetRole = `${API_BASE_URL}vaitro`;
export const GetPromotion = `${API_BASE_URL}khuyenmai`;
export const getRoleUserSpecific = `${API_BASE_URL}vaitro/nguoidung/`;
export const verifyOTP = `${API_BASE_URL}auth/verifyOTP`;
export const loginAuth = `${API_BASE_URL}auth/login`;
export const SignUpAuth = `${API_BASE_URL}auth/signup`;
export const addSeller = `${API_BASE_URL}nguoiban/add`;
export const DeleteFood = `${API_BASE_URL}monan/delete`;
export const SellerComment = `${API_BASE_URL}nguoiban/nhanxet/`;
export const recoverpassword = `${API_BASE_URL}auth/recoverpassword/mail`;
export const addLoveRestaurant = `${API_BASE_URL}nguoimua/nguoibanyeuthich/add`;
export const getLoveRestaurant = `${API_BASE_URL}nguoiban/nguoibanyeuthich/`;
export const getCommentForSpecificFood = `${API_BASE_URL}nguoimua/nhanxet/`;
export const setCommendForSpecificFood = `${API_BASE_URL}nguoimua/nhanxet/add`;
export const updateCommendForSpecificFood = `${API_BASE_URL}nguoimua/nhanxet/update`;
export const FoodsType = `${API_BASE_URL}loaimonan`;
export const FoodsTypeAdd = `${API_BASE_URL}loaimonan/add`;
export const SellerTypes = `${API_BASE_URL}loainguoiban/nguoiban/`;
export const SellerTypesAdd = `${API_BASE_URL}nguoiban/loainguoiban/add`;
export const SellerTypesDelele = `${API_BASE_URL}nguoiban/loainguoiban/delete`;
export const DeleteSeller = `${API_BASE_URL}nguoiban/delete`;
export const FoodsTypeDelete = `${API_BASE_URL}loaimonan/delete`;
export const FoodsTypeUpdate = `${API_BASE_URL}loaimonan/update`;
export const OrderSeller = `${API_BASE_URL}donhang/nguoiban/`;
export const deleteLove = `${API_BASE_URL}nguoimua/nguoibanyeuthich/delete`;
export const updateSellerComment = `${API_BASE_URL}nguoiban/nhanxet/update`;
export const formatCurrency = (value) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(value);
};
export const refreshPage = () => {
  window.location.reload();
};

export const PaymentMethod = `${API_BASE_URL}phuongthucgiaodich`;
export const OrderAdd = `${API_BASE_URL}donhang/add`;
export const OrderDetailAdd = `${API_BASE_URL}donhang/chitietdonhang/add`;
export const getDetailsOrder = `${API_BASE_URL}monan/donhang/`;
export const updateOrder = `${API_BASE_URL}donhang/update`;
export const formatDate = (ISO_date) => {
  const date = new Date(ISO_date);

  // Lấy các giá trị ngày tháng
  const day = date.getUTCDate();
  const month = date.getUTCMonth() + 1; // getMonth() trả về giá trị từ 0-11
  const year = date.getUTCFullYear();

  // Lấy giờ và phút và định dạng 12 giờ
  let hours = date.getUTCHours() + 7;
  const minutes = date.getUTCMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12; // Chuyển sang 12 giờ, 0 giờ đổi thành 12

  // Ghép lại thành chuỗi định dạng mong muốn
  const formattedDate = `${day}/${month}/${year}, ${hours}:${minutes} ${ampm}`;
  return formattedDate;
};

export const deleteUserRoute = `${API_BASE_URL}nguoidung/delete`;
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
export const urlPayment = `${API_BASE_URL}payment/create`;
export const searchUrl = `${API_BASE_URL}nguoidung/search/`;
export const getAllComments = `${API_BASE_URL}nguoimua/allnhanxet/`;
export const customBadWords = [
  "chửi",
  "ngu",
  "đồ ngốc",
  "thằng",
  "con",
  "địt",
  "cặc",
  "vô dụng",
  "khốn nạn",
  "mẹ",
  "chó",
  "bẩn",
  "hâm",
  "ngu dốt",
  "khùng",
  "xạo",
  "lừa",
  "lozz",
];
