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

function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path = "/home" element = {<Homepage />} />
        <Route path = "/" element = {<Signin />} />
        <Route path = "/orders_list" element = {<OrdersList />} />
        <Route path = "/order_details" element = {<OrderDetails />} />
        <Route path = "/dish" element = {<Dish />} />
        <Route path = "/add_dish" element = {<AddDish />} />
        <Route path = "/edit_dish" element = {<EditDish />} />
        <Route path = "/dish_details" element = {<DishDetails />} />
        <Route path = "/profile" element = {<Profile />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
