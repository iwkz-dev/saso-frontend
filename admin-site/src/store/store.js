import loginReducer from "./reducers/loginReducer";
import menuReducer from "./reducers/menuReducer";
import eventReducer from "./reducers/eventReducer";
import categoryReducer from "./reducers/categoryReducer";
import contactPersonReducer from "./reducers/contactPersonReducer";
import userReducer from "./reducers/userReducer";
import orderReducer from "./reducers/orderReducer";
import paymentTypeReducer from "./reducers/paymentTypeReducer";
import { configureStore } from "@reduxjs/toolkit";
// Add reducers here!
export default configureStore({
    reducer: {
        login: loginReducer,
        menu: menuReducer,
        event: eventReducer,
        order: orderReducer,
        category: categoryReducer,
        contactPerson: contactPersonReducer,
        paymentType: paymentTypeReducer,
        user: userReducer,
    },
});
