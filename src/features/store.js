import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./user/userSlice";
import uiSlice from "./common/uiSlice";
import lectureSlice from "./lecture/lectureSlice";
import cartSlice from "./cart/cartSlice";
import orderSlice from "./order/orderSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    lecture: lectureSlice,
    cart: cartSlice,
    ui: uiSlice,
    order: orderSlice,
  },
});
export default store;
