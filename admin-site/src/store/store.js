import navReducer from "./reducers/navigationReducer";
import loginReducer from "./reducers/loginReducer";
import productReducer from "./reducers/productReducer";
import { configureStore } from "@reduxjs/toolkit";
// Add reducers here!
export default configureStore({
  reducer: {
    nav: navReducer,
    login: loginReducer,
    product: productReducer,
  },
});
