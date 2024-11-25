import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createContext, lazy, Suspense, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import ScaleLoader from "react-spinners/ScaleLoader";
// import HomePage from "./HomePage/HomePage";
// import Login from "./Login/Login";
// import Register from "./Login/Register";
// import LayoutHeader from "./Layout/LayoutHeader";
// import UserInfor from "./Information/UserInfor";
// import History from "./Information/HistoryComment/History";
// import ChangeAccount from "./Information/InfoSelection/ChangeAccount";
// import ListRes from "./RestaurantPage/ListRes";
// import NoPage from "./NoPage";
// import TypeRes from "./RestaurantPage/TypeRes";
// import SpecificRes from "./RestaurantPage/ResDetails/SpecificRes";
// import Favourite from "./Information/Favourite";
// import Address from "./Information/Address/Address";
// import ActivityOrder from "./Information/Activity/ActivityOrder";
// import Complete from "./Information/Activity/Complete";
// import OnGoing from "./Information/Activity/OnGoing";
// import Canceled from "./Information/Activity/Canceled";
// import OrderStatusDetails from "./Information/Activity/OrderStatusDetails";
// import SuccessPayment from "./SuccessPayment";
// import ChangePassword from "./Information/ChangePassword";
// import LayoutResetPass from "./Login/ResetPass/LayoutResetPass";
// import Reset from "./Login/ResetPass/Reset";
// import CreateNewPass from "./Login/ResetPass/CreateNewPass";
// import PasswordSuccess from "./Login/ResetPass/PasswordSuccess";
// import ConfirmCode from "./Login/ResetPass/ConfirmCode";
// import PrivateRoute from "./Layout/PrivateRoute";
// import RegisterRes from "./Login/Restaurant/RegisterRes";
// import RestaurantSeller from "./Login/Restaurant/RestaurantSeller";
const HomePage = lazy(() => import("./HomePage/HomePage"));
const Login = lazy(() => import("./Login/Login"));
const Register = lazy(() => import("./Login/Register"));
const LayoutHeader = lazy(() => import("./Layout/LayoutHeader"));
const UserInfor = lazy(() => import("./Information/UserInfor"));
const History = lazy(() => import("./Information/HistoryComment/History"));
const ChangeAccount = lazy(() =>
  import("./Information/InfoSelection/ChangeAccount")
);
const ListRes = lazy(() => import("./RestaurantPage/ListRes"));
const NoPage = lazy(() => import("./NoPage"));
const TypeRes = lazy(() => import("./RestaurantPage/TypeRes"));
const SpecificRes = lazy(() =>
  import("./RestaurantPage/ResDetails/SpecificRes")
);
const Favourite = lazy(() => import("./Information/Favourite"));
const Address = lazy(() => import("./Information/Address/Address"));
const ActivityOrder = lazy(() =>
  import("./Information/Activity/ActivityOrder")
);
const Complete = lazy(() => import("./Information/Activity/Complete"));
const OnGoing = lazy(() => import("./Information/Activity/OnGoing"));
const Canceled = lazy(() => import("./Information/Activity/Canceled"));
const OrderStatusDetails = lazy(() =>
  import("./Information/Activity/OrderStatusDetails")
);
const SuccessPayment = lazy(() => import("./SuccessPayment"));
const ChangePassword = lazy(() => import("./Information/ChangePassword"));
const LayoutResetPass = lazy(() => import("./Login/ResetPass/LayoutResetPass"));
const Reset = lazy(() => import("./Login/ResetPass/Reset"));
const CreateNewPass = lazy(() => import("./Login/ResetPass/CreateNewPass"));
const PasswordSuccess = lazy(() => import("./Login/ResetPass/PasswordSuccess"));
const ConfirmCode = lazy(() => import("./Login/ResetPass/ConfirmCode"));
const RegisterRes = lazy(() => import("./Login/Restaurant/RegisterRes"));
const RestaurantSeller = lazy(() =>
  import("./Login/Restaurant/RestaurantSeller")
);
const PrivateRoute = lazy(() => import("./Layout/PrivateRoute"));
import Homepage from "./Nam/Home/Homepage";
import Signin from "./Nam/Login/Signin";
import OrdersList from "./Nam/Order/OrdersList/OrdersList";
import OrderDetails from "./Nam/Order/OrderDetails/OrderDetails";
import Dish from "./Nam/Dish/Dish";
import AddDish from "./Nam/Dish/AddDish";
import EditDish from "./Nam/Dish/EditDish";
import DishDetails from "./Nam/Dish/DishDetails";
import Profile from "./Nam/Profile/Profile";
import Voucher from "./Nam/Voucher/Voucher";
import VoucherAdd from "./Nam/Voucher/AddVoucher";
import VoucherEdit from "./Nam/Voucher/EditVoucher";
import FoodType from "./Nam/FoodType/FoodType";
import SellerType from "./Nam/SellerType/SellerType";
import SocketLayout from "./Nam/Components/SocketLayout";
import LoginAdmin from "./Luong/Admin/LoginPage/LoginAdmin";
import SideNav from "./Luong/Admin/Layout/SideNav";
import AdminHome from "./Luong/Admin/HomeAdminPage/AdminHome";
import RestaurantType from "./Luong/Admin/components/Restaurant_Type";
import UserHome from "./Luong/Admin/components/User_Management/UserHome";
import CustomerList from "./Luong/Admin/components/User_Management/CustomerList";
import SellerList from "./Luong/Admin/components/User_Management/SellerList";
import ShipperList from "./Luong/Admin/components/User_Management/ShipperList";
import Security from "./Luong/Admin/components/Security/Security";
import PrivateRouteAdmin from "./Luong/Admin/Function/PrivateRouteAdmin";
const UserAccount = createContext();
function App() {
  return (
    <UserAccount.Provider value="">
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
        <Suspense
          fallback={
            <div style={styles.loaderContainer}>
              <ScaleLoader size={100} color="pink" />
            </div>
          }
        >
          <Routes>
            <Route
              path="/loginSeller"
              element={<Signin assignAccount={""} />}
            />
            <Route path="/" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="register_restaurant" element={<RegisterRes />}>
              <Route path="create_restaurant" element={<RestaurantSeller />} />
            </Route>
            <Route path="forgot-password" element={<LayoutResetPass />}>
              <Route index element={<Reset />} />
              <Route path="create-new" element={<CreateNewPass />} />
              <Route path="confirmCode" element={<ConfirmCode />} />
              <Route path="password-success" element={<PasswordSuccess />} />
            </Route>
            <Route path="*" element={<NoPage />} />
            <Route path="/admin_login" element={<LoginAdmin />} />
            <Route element={<PrivateRouteAdmin />}>
              <Route element={<SideNav />}>
                <Route path="/admin_home" element={<AdminHome />} />
                <Route path="/restaurant_type" element={<RestaurantType />} />
                <Route path="user_manage" element={<UserHome />}>
                  <Route index element={<CustomerList />} />
                  <Route path="seller_manage" element={<SellerList />} />
                  <Route path="shipper_manage" element={<ShipperList />} />
                  <Route path="user_manage/:info" element={<ShipperList />} />
                  <Route path="seller_manage/:info" element={<ShipperList />} />
                  <Route
                    path="shipper_manage/:info"
                    element={<ShipperList />}
                  />
                </Route>
                <Route path="/security" element={<Security />} />
              </Route>
            </Route>
            <Route element={<PrivateRoute />}>
              {/* Luong Routes */}
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
              {/* ! Nam route */}
              <Route element={<PrivateRoute />}>
                <Route element={<SocketLayout />}>
                  <Route path="/home/seller" element={<Homepage />} />
                  <Route path="/orders_list" element={<OrdersList />} />
                  <Route path="/order_details" element={<OrderDetails />} />
                  <Route path="/dish" element={<Dish />} />
                  <Route path="/foodtype" element={<FoodType />} />
                  <Route path="/sellerType" element={<SellerType />} />
                  <Route path="/add_dish" element={<AddDish />} />
                  <Route path="/edit_dish" element={<EditDish />} />
                  <Route path="/dish_details" element={<DishDetails />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/voucher" element={<Voucher />} />
                  <Route path="/add_voucher" element={<VoucherAdd />} />
                  <Route path="/edit_voucher" element={<VoucherEdit />} />
                </Route>
              </Route>
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </UserAccount.Provider>
  );
}
const styles = {
  loaderContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh", // Chiều cao toàn màn hình để spinner nằm chính giữa
  },
};

export default App;
