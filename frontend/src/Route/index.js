export const GetUserInfo = "http://localhost:3030/nguoidung";
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
