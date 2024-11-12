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
          </Route>
        </Routes>
      </BrowserRouter>
    </UserAccount.Provider>
  );
}

export default App;
export { UserAccount };
