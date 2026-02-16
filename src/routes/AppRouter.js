import React from "react";
import { Route, Routes } from "react-router";
import AdminOrderPage from "../page/admin/AdminOrderPage/AdminOrderPage";
import AdminProduct from "../page/admin/AdminProductPage/AdminProductPage";
import SellerLecture from "../page/seller/SellerLecturePage/SellerLecturePage";
import SellerOrderPage from "../page/seller/SellerOrderPage/SellerOrderPage";
import CartPage from "../page/customer/CartPage/CartPage";
import Login from "../page/common/LoginPage/LoginPage";
import MyPage from "../page/customer/MyPage/MyPage";
import OrderCompletePage from "../page/customer/OrderCompletePage/OrderCompletePage";
import PaymentPage from "../page/customer/PaymentPage/PaymentPage";
import ProductAll from "../page/common/LandingPage/LandingPage";
import LectureDetail from "../page/customer/LectureDetailPage/LectureDetailPage";
import RegisterPage from "../page/common/RegisterPage/RegisterPage";
import PrivateRoute from "./PrivateRoute";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<ProductAll />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/lecture/:id" element={<LectureDetail />} />
      <Route element={<PrivateRoute permissionLevel="customer" />}>
        <Route path="/cart" element={<CartPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/payment/success" element={<OrderCompletePage />} />
        <Route path="/account/purchase" element={<MyPage />} />
      </Route>
      <Route element={<PrivateRoute permissionLevel="admin" />}>
        <Route path="/admin/product" element={<AdminProduct />} />
        <Route path="/admin/order" element={<AdminOrderPage />} />
      </Route>
      <Route element={<PrivateRoute permissionLevel="seller" />}>
        <Route path="/seller/product" element={<SellerLecture />} />
        <Route path="/seller/order" element={<SellerOrderPage />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
