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
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
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
  );
}

export default App;
