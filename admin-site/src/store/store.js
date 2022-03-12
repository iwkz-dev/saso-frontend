import navReducer from "./reducers/navigationReducer";
import loginReducer from "./reducers/loginReducer";
import menuReducer from "./reducers/menuReducer";
import { configureStore } from "@reduxjs/toolkit";
import eventReducer from "./reducers/eventReducer";
import categoryReducer from "./reducers/categoryReducer";
import userReducer from "./reducers/userReducer";
// Add reducers here!
export default configureStore({
    reducer: {
        nav: navReducer,
        login: loginReducer,
        menu: menuReducer,
        event: eventReducer,
        category: categoryReducer,
        user: userReducer,
    },
});
