<<<<<<< HEAD
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage/HomePage";
import Login from "./Login/Login";
import Register from "./Login/Register";
import LayoutHeader from "./Layout/LayoutHeader";
import UserInfor from "./Information/UserInfor";
import History from "./Information/HistoryComment/History";
import ChangeAccount from "./Information/InfoSelection/ChangeAccount";
import ListRes from "./RestaurantPage/ListRes";
import NoPage from "./NoPage";
import TypeRes from "./RestaurantPage/TypeRes";
import SpecificRes from "./RestaurantPage/ResDetails/SpecificRes";
import Favourite from "./Information/Favourite";
import Address from "./Information/Address/Address";
import ActivityOrder from "./Information/Activity/ActivityOrder";
import Complete from "./Information/Activity/Complete";
import OnGoing from "./Information/Activity/OnGoing";
import Canceled from "./Information/Activity/Canceled";
import OrderStatusDetails from "./Information/Activity/OrderStatusDetails";
import SuccessPayment from "./SuccessPayment";
import { createContext } from "react";
import { Toaster } from "react-hot-toast";
import ChangePassword from "./Information/ChangePassword";
import LayoutResetPass from "./Login/ResetPass/LayoutResetPass";
import Reset from "./Login/ResetPass/Reset";
import CreateNewPass from "./Login/ResetPass/CreateNewPass";
import PasswordSuccess from "./Login/ResetPass/PasswordSuccess";
import ConfirmCode from "./Login/ResetPass/ConfirmCode";
import PrivateRoute from "./Layout/PrivateRoute";
import RegisterRes from "./Login/RegisterRes";
const UserAccount = createContext();
function App() {
  return (
    <UserAccount.Provider value={"Noce"}>
      <Toaster
        position="top-right"
        toastOptions={{
          success: {
            style: {
              border: "2px solid gray",
              background: "green",
              color: "white",
              fontWeight: "bold",
            },
          },
          error: {
            style: {
              border: "2px solid gray",
              background: "red",
              color: "white",
              fontWeight: "bold",
            },
          },
          loading: {
            style: {
              border: "2px solid gray",
              background: "#D1006B",
              color: "white",
              fontWeight: "bold",
            },
          },
        }}
      />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="register_restaurant" element={<RegisterRes />} />
          <Route path="forgot-password" element={<LayoutResetPass />}>
            <Route index element={<Reset />} />
            <Route path="create-new" element={<CreateNewPass />} />
            <Route path="confirmCode" element={<ConfirmCode />} />
            <Route path="password-success" element={<PasswordSuccess />} />
          </Route>
          <Route path="*" element={<NoPage />} />

          <Route element={<PrivateRoute />}>
            <Route path="home" element={<LayoutHeader />}>
              <Route index element={<HomePage />} />
              <Route path="information" element={<UserInfor />}>
                <Route index element={<ChangeAccount />} />
                <Route path="history" element={<History />} />
                <Route path="favourite" element={<Favourite />} />
                <Route path="address" element={<Address />} />
                <Route path="change-password" element={<ChangePassword />} />
              </Route>
              <Route path="activity" element={<ActivityOrder />}>
                <Route index element={<Complete />} />
                <Route path="ongoing" element={<OnGoing />} />
                <Route path="canceled" element={<Canceled />} />
                <Route path=":orderID" element={<OrderStatusDetails />} />
              </Route>
              <Route path="success" element={<SuccessPayment />} />
              <Route path="all" element={<ListRes />} />
              <Route path="typeRes/:type" element={<TypeRes />} />
              <Route path="restaurant/:resname" element={<SpecificRes />} />
            </Route>
=======
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./Home/Homepage";
import Signin from "./Login/Signin";
import OrdersList from "./Order/OrdersList/OrdersList";
import OrderDetails from "./Order/OrderDetails/OrderDetails";
import Dish from "./Dish/Dish";
import AddDish from "./Dish/AddDish";
import EditDish from "./Dish/EditDish";
import DishDetails from "./Dish/DishDetails";
import Profile from "./Profile/Profile";
import Login from "./Login/Login";
import Signup from "./Login/Signup";
import { createContext, useEffect, useState } from "react";
import Voucher from "./Voucher/Voucher";
import VoucherAdd from "./Voucher/AddVoucher";
import VoucherEdit from "./Voucher/EditVoucher";
import PrivateRoute from "./Components/PrivateRoute";
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
  });
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
  return (
    <UserAccount.Provider value={{ userData }}>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/"
            element={<Signin assignAccount={(value) => setAccount(value)} />}
          />
          <Route element={<PrivateRoute />}>
            <Route path="/home" element={<Homepage />} />
            <Route path="/orders_list" element={<OrdersList />} />
            <Route path="/order_details" element={<OrderDetails />} />
            <Route path="/dish" element={<Dish />} />
            <Route path="/add_dish" element={<AddDish />} />
            <Route path="/edit_dish" element={<EditDish />} />
            <Route path="/dish_details" element={<DishDetails />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/voucher" element={<Voucher />} />
            <Route path="/add_voucher" element={<VoucherAdd />} />
            <Route path="/edit_voucher" element={<VoucherEdit />} />
>>>>>>> a90f350cbe50f4d97cf18c5fa0c99a23919612e4
          </Route>
        </Routes>
      </BrowserRouter>
    </UserAccount.Provider>
  );
}

export default App;
export { UserAccount };
