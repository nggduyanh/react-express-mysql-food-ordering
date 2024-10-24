import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage/HomePage";
import Login from "./Login/Login";
import Register from "./Login/Register";
import LayoutHeader from "./Layout/LayoutHeader";
import UserInfor from "./Information/UserInfor";
import PaymentCards from "./Information/InfoSelection/PaymentCards";
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
import { createContext, useEffect, useState } from "react";
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
          <Route
            path="/"
            element={<Login assignAccount={(value) => setAccount(value)} />}
          />
          <Route path="home" element={<LayoutHeader />}>
            <Route index element={<HomePage />} />
            <Route path="information" element={<UserInfor />}>
              <Route index element={<ChangeAccount />} />
              <Route path="payment" element={<PaymentCards />} />
              <Route path="favourite" element={<Favourite />} />
              <Route path="address" element={<Address />} />
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
          <Route path="register" element={<Register />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </UserAccount.Provider>
  );
}

export default App;
export { UserAccount };
