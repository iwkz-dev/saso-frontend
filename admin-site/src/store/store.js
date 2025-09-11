import { configureStore } from "@reduxjs/toolkit";

import loginReducer from "./reducers/loginReducer";
import menuReducer from "./reducers/menuReducer";
import eventReducer from "./reducers/eventReducer";
import categoryReducer from "./reducers/categoryReducer";
import contactPersonReducer from "./reducers/contactPersonReducer";
import userReducer from "./reducers/userReducer";
import orderReducer from "./reducers/orderReducer";
import paymentTypeReducer from "./reducers/paymentTypeReducer";
import vendorReducer from "./reducers/vendorReducer";

const store = configureStore({
    reducer: {
        login: loginReducer,
        menu: menuReducer,
        event: eventReducer,
        order: orderReducer,
        category: categoryReducer,
        vendor: vendorReducer,
        contactPerson: contactPersonReducer,
        paymentType: paymentTypeReducer,
        user: userReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            // Relax serializable checks for common RTK/axios patterns
            serializableCheck: {
                // Thunks often pass args via meta.arg; APIs may stuff raw data into payload.data
                ignoredActionPaths: ["meta.arg", "payload.data"],
                // Detail slices can sometimes hold class instances / Dates / Files, etc.
                ignoredPaths: [
                    "event.detailEvent",
                    "category.detailCategory",
                    "order.detailOrder",
                    "user.detailUser",
                    "vendor.detailVendor",
                    "contactPerson.detailContactPerson",
                ],
            },
        }),
    devTools: process.env.NODE_ENV !== "production",
});

export default store;
