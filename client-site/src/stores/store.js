import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

import loginReducer from "./reducers/login";
import menuReducer from "./reducers/menu";
import eventReducer from "./reducers/event";
import cartReducer from "./reducers/cart";
import registerReducer from "./reducers/register";
import categoryReducer from "./reducers/category";
import orderReducer from "./reducers/order";

const rootReducer = combineReducers({
    login: loginReducer,
    register: registerReducer,
    menu: menuReducer,
    cart: cartReducer,
    event: eventReducer,
    category: categoryReducer,
    order: orderReducer,
});

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["cart"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== "production",
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export const persistor = persistStore(store);
