import React from "react";
import { Route, Routes } from "react-router-dom";
import "./new.css";
import "./responsive.css";
import Login from "./Screens/Login";
import Menu from "./Screens/Menu";
import PrivateRoute from "./Components/PrivateRoute";
import CreateProduct from "./Components/CreateProduct";
import SignUp from "./Components/SignUp";
import CustomerList from "./Components/CustomerList";
import AdminProductList from "./Components/AdminProductList";
import ForgetPassword from "./Components/ChangePassword/ForgetPassword";
import AdminSidebar from "./Components/admin-sidebar/AdminSidebar";
import PrivateAdminRoute from "./Components/PrivateAdminRoute";
import AddressPage from "./Components/address/AddressPage";
import CheckOut from "./Components/CheckOut";
import Profile from "./Components/Profile";
import OrderHistory from "./Components/OrderHistory";
import ChangeProducts from "./Components/ChangeProducts";
import MyOrders from "./Components/MyOrders";
import LastOrder from "./Components/LastOrder";
import CourierDashboard from "./Components/dashboard/courierDashboard/CourierDashboard";
import PrivateCourierRoute from "./Components/privateRoutes/PrivateCourierRoute";

function App() {
  const privateRoute = (Component) => (
    <PrivateRoute>
      <Component />
    </PrivateRoute>
  );
  const privateAdminRoute = (Component) => (
    <PrivateAdminRoute>
      <Component />
    </PrivateAdminRoute>
  );

  const privateCourierRoute = (Component) => (
    <PrivateCourierRoute>
      <Component />
    </PrivateCourierRoute>
  );

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/orders" element={<OrderHistory />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/:lang" element={privateRoute(Menu)} />
        <Route path="/changeproducts" element={<ChangeProducts />} />
        <Route path="/" element={privateRoute(Menu)} />
        <Route path="/address" element={privateRoute(AddressPage)} />
        <Route path="/my-orders" element={privateRoute(MyOrders)} />
        <Route path="/last-order" element={privateRoute(LastOrder)} />
        <Route path="/customers" element={privateRoute(CustomerList)} />
        <Route path={`/admin/*`} element={privateAdminRoute(AdminSidebar)} />
        <Route path="/checkout" element={privateAdminRoute(CheckOut)} />
        <Route
          path="/couriers"
          element={privateCourierRoute(CourierDashboard)}
        />
        <Route
          path="/admin/add-product"
          element={privateRoute(CreateProduct)}
        />
        {/* <Route
          path="/admin/products"
          element={privateRoute(AdminProductList)}
        /> */}
        <Route path="/test" element={<CreateProduct />} />
      </Routes>
    </>
  );
}
export default App;
