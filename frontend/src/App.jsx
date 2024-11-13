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
  return (
    <UserAccount.Provider value={"Noce"}>
      
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
          </Route>

        </Routes>
      </BrowserRouter>
    </UserAccount.Provider>
  );
}

export default App;
export { UserAccount };
