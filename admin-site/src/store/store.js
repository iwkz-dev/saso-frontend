import loginReducer from "./reducers/loginReducer";
import menuReducer from "./reducers/menuReducer";
import eventReducer from "./reducers/eventReducer";
import categoryReducer from "./reducers/categoryReducer";
import userReducer from "./reducers/userReducer";
import orderReducer from "./reducers/orderReducer";
import { configureStore } from "@reduxjs/toolkit";
// Add reducers here!
export default configureStore({
    reducer: {
        login: loginReducer,
        menu: menuReducer,
        event: eventReducer,
        order: orderReducer,
        category: categoryReducer,
        user: userReducer,
    },
});
