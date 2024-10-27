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
