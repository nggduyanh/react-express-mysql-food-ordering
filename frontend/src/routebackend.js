const API_BASE_URL = import.meta.env.API_URL || "http://localhost:3000" +"/";
export const GetUserInfo = `${API_BASE_URL}nguoidung/current`;
export const GetSellerInfo = `${API_BASE_URL}nguoiban`;
export const AddUserInfo = `${API_BASE_URL}nguoiban/add`;
export const GetTypeRes = `${API_BASE_URL}loaimonan`;
export const UpdateUser = `${API_BASE_URL}nguoiban/update`;
export const UpdateUserDung = `${API_BASE_URL}nguoidung/update`;
export const GetFoodRestaurant = `${API_BASE_URL}monan`;
export const localStaticFile = `${API_BASE_URL}`;
export const Order = `${API_BASE_URL}donhang`;
export const OrderStatus = `${API_BASE_URL}trangthaidonhang`;
export const GetFoodTypeRestaurant = `${API_BASE_URL}loaiMonAn`;
export const AddFoodRestaurant = `${API_BASE_URL}monan/add`;
export const DeleteFoodRestaurant = `${API_BASE_URL}monan/delete`;
export const UpdateFoodRestaurant = `${API_BASE_URL}monan/update`;
export const GetUserRole = `${API_BASE_URL}vaitro`;
export const GetVoucher = `${API_BASE_URL}khuyenmai`;
export const AddVoucher = `${API_BASE_URL}khuyenmai/add`;
export const EditVoucher = `${API_BASE_URL}khuyenmai/update`;
export const DeleteVoucher = `${API_BASE_URL}khuyenmai/delete`;
export const OrderAdd = `${API_BASE_URL}donhang/add`;
export const OrderDetailAdd = `${API_BASE_URL}donhang/chitietdonhang/add`;
export const GetDetailsOrder = `${API_BASE_URL}monan/donhang/`;
export const GetOrder = `${API_BASE_URL}donhang`;
export const GetOrderStatus = `${API_BASE_URL}trangthaidonhang`;
export const GetOrderRestaurant = `${API_BASE_URL}donhang/nguoiban/:idNguoiBan`;
export const GetPaymentMethods = `${API_BASE_URL}phuongthucgiaodich`;
export const RepComment = `${API_BASE_URL}nguoiban/nhanxet/update`;
export const UpdateOrder = `${API_BASE_URL}donhang/update/`;
export const handleRefreshPage = () => {
  window.location.reload();
};
export const formatCurrency = (value) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(value);
};
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString("vi-VN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};
export const formatTime = (time) => {
  return new Date(time).toLocaleTimeString("vi-VN", {
    timeZone: "Asia/Bangkok", // GMT +7
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
};
export const formatPercent = (value) => {
  const percentageValue = value / 100;
  return new Intl.NumberFormat("vi-VN", {
    style: "percent",
    minimumFractionDigits: 0, // Adjust as needed
    maximumFractionDigits: 0, // Adjust as needed
  }).format(percentageValue);
};

export const getFormattedDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};
// export const foodApi = {
//     add: "http://localhost:3030/monan/add",
//     delete: "http://localhost:3030/monan/delete",
//     get: "http://localhost:3030/monan/"
// }
