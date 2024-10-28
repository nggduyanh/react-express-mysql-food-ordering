import { BrowserRouter, Route, Routes } from "react-router-dom"
import Homepage from "./Home/Homepage"
import Signin from "./Login/Signin"
import OrdersList from "./Order/OrdersList/OrdersList"
import OrderDetails from "./Order/OrderDetails/OrderDetails"
import Dish from "./Dish/Dish"
import AddDish from "./Dish/AddDish"
import EditDish from "./Dish/EditDish"
import DishDetails from "./Dish/DishDetails"
import Profile from "./Profile/Profile"
import Login from "./Login/Login"
import Signup from "./Login/Signup"
import { createContext, useEffect, useState } from "react"
import Voucher from "./Voucher/Voucher"
import VoucherAdd from "./Voucher/AddVoucher"
import VoucherEdit from "./Voucher/EditVoucher"
const UserAccount = createContext();
function App() {
  const [account, setAccount] = useState(() => {
    const storedAccount = localStorage.getItem("user");
    if (storedAccount) {
      const parsedAccount = JSON.parse(storedAccount);
      const now = new Date().getTime();
      if (parsedAccount.expire > now) {
        return parsedAccount.value; // Khởi tạo account từ localStorage nếu còn hạn
      } else {
        localStorage.removeItem("user"); // Xóa nếu đã hết hạn
        return null;
      }
    }
    return null; // Giá trị mặc định nếu không có gì trong localStorage
  })
  const [userData, setUserData] = useState({});
  const OneDaysMilliseconds = 86400000;
  useEffect(() => {
    const setLocalStorage = async (key, timeExpire) => {
      const now = new Date();
      const expireDate = {
        value: account,
        expire: now.getTime() + timeExpire,
      };
      localStorage.setItem(key, JSON.stringify(expireDate));
    };
    const checklocalStorage = async (key, timeExpire) => {
      setLocalStorage(key, timeExpire);
      const getJsonData = localStorage.getItem(key);
      const data = JSON.parse(getJsonData);
      const now = new Date().getTime();
      if (now > data.expire) {
        localStorage.removeItem(key);
        return null;
      }
      setUserData(data.value);
    };
    checklocalStorage("user", OneDaysMilliseconds);
  }, [account]);
  return(
    <UserAccount.Provider value = {{userData}}>
    <BrowserRouter>
      <Routes>
        <Route path = "/"  element = {<Signin assignAccount = {(value) => setAccount(value)} />} />
        <Route path = "/home" element = {<Homepage />} />
        <Route path = "/orders_list" element = {<OrdersList />} />
        <Route path = "/order_details" element = {<OrderDetails />} />
        <Route path = "/dish" element = {<Dish />} />
        <Route path = "/add_dish" element = {<AddDish />} />
        <Route path = "/edit_dish" element = {<EditDish />} />
        <Route path = "/dish_details" element = {<DishDetails />} />
        <Route path = "/profile" element = {<Profile />} />
        <Route path = "/voucher" element = {<Voucher />} />
        <Route path = "/add_voucher" element = {<VoucherAdd />} />
        <Route path = "/edit_voucher" element = {<VoucherEdit />} />
        <Route path = "/login" element = {<Login />} />
        <Route path = "/signup" element = {<Signup />} />
      </Routes>
    </BrowserRouter>
    </UserAccount.Provider>
  )
}

export default App
export {UserAccount}