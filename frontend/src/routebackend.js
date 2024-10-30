export const GetUserInfo = "http://localhost:3030/nguoidung";
export const GetSellerInfo = "http://localhost:3030/nguoiban";
export const AddUserInfo = "http://localhost:3030/nguoiban/add";
export const GetTypeRes = "http://localhost:3030/loaimonan";
export const UpdateUser = "http://localhost:3030/nguoiban/update";
export const UpdateUserDung = "http://localhost:3030/nguoidung/update";
export const GetFoodRestaurant = "http://localhost:3030/monan";
export const localStaticFile = "http://localhost:3030/";
export const Order = "http://localhost:3030/donhang";
export const OrderStatus = "http://localhost:3030/trangthaidonhang";
export const GetFoodTypeRestaurant = "http://localhost:3030/loaiMonAn";
export const AddFoodRestaurant = "http://localhost:3030/monan/add";
export const DeleteFoodRestaurant = "http://localhost:3030/monan/delete";
export const UpdateFoodRestaurant = "http://localhost:3030/monan/update";
export const GetUserRole = "http://localhost:3030/vaitro";
export const GetVoucher = "http://localhost:3030/khuyenmai";
export const AddVoucher = "http://localhost:3030/khuyenmai/add";
export const EditVoucher = "http://localhost:3030/khuyenmai/update";
export const DeleteVoucher = "http://localhost:3030/khuyenmai/delete";
export const OrderAdd = "http://localhost:3030/donhang/add";
export const OrderDetailAdd ="http://localhost:3030/donhang/chitietdonhang/add";
export const GetDetailsOrder = "http://localhost:3030/monan/donhang/";
export const GetOrder = "http://localhost:3030/donhang";
export const GetOrderStatus = "http://localhost:3030/trangthaidonhang";
export const GetOrderRestaurant = "http://localhost:3030/donhang/nguoiban/:idNguoiBan";

export const handleRefreshPage = () => {
    window.location.reload();
  }
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
      timeZone: 'Asia/Bangkok', // GMT +7
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false 
    });
  }
  export const formatPercent = (value) => {
    const percentageValue = value / 100;
    return new Intl.NumberFormat("vi-VN", {
      style: "percent",
      minimumFractionDigits: 0, // Adjust as needed
        maximumFractionDigits: 0,  // Adjust as needed
    }).format(percentageValue );
  }
  
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