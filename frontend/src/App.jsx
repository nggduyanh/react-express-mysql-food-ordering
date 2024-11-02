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
import { Toaster } from "react-hot-toast";
import ChangePassword from "./Information/ChangePassword";
import LayoutResetPass from "./Login/ResetPass/LayoutResetPass";
import Reset from "./Login/ResetPass/Reset";
import CreateNewPass from "./Login/ResetPass/CreateNewPass";
import PasswordSuccess from "./Login/ResetPass/PasswordSuccess";
import ConfirmCode from "./Login/ResetPass/ConfirmCode";
import PrivateRoute from "./Layout/PrivateRoute";
const UserAccount = createContext();
function App() {
  const [accessToken, setAccessToken] = useState({});
  const OneHourMiliseconds = 3600000;
  ("1 hour");
  // const [tokenSave, setTokenSave] = useState({});
  // useEffect(() => {
  //   const setLocalStorage = async (key, timeExpire) => {
  //     const now = new Date();
  //     const expireDate = {
  //       token: accessToken.accessToken,
  //       expire: now.getTime() + timeExpire,
  //     };
  //     localStorage.setItem(key, JSON.stringify(expireDate));
  //   };
  //   const checkToken = async (key, timeExpire) => {
  //     setLocalStorage(key, timeExpire);
  //     const getToken = localStorage.getItem(key);
  //     const JsonToken = JSON.parse(getToken);
  //     const nowDate = new Date().getTime();
  //     if (nowDate > JsonToken.expire) {
  //       localStorage.removeItem(key);
  //       return null;
  //     }
  //     setTokenSave(JsonToken.accessToken);
  //   };
  //   checkToken("token", OneHourMiliseconds);
  // }, [accessToken.accessToken]);
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
          <Route
            path="/"
            element={<Login assignAccount={(value) => setAccessToken(value)} />}
          />
          <Route
            path="register"
            element={
              <Register assignAccount={(value) => setAccessToken(value)} />
            }
          />
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
                <Route path="payment" element={<PaymentCards />} />
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
          </Route>
        </Routes>
      </BrowserRouter>
    </UserAccount.Provider>
  );
}

export default App;
export { UserAccount };
