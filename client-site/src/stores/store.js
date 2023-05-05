import loginReducer from './reducers/login';
import menuReducer from './reducers/menu';
import eventReducer from './reducers/event';
import cartReducer from './reducers/cart';
import registerReducer from './reducers/register';
import categoryReducer from './reducers/category';
import orderReducer from './reducers/order';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import { combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { configureStore } from '@reduxjs/toolkit';

const reducers = combineReducers({
  login: loginReducer,
  register: registerReducer,
  menu: menuReducer,
  cart: cartReducer,
  event: eventReducer,
  category: categoryReducer,
  order: orderReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['login', 'menu', 'event', 'register', 'order', 'category'],
};

const persistedReducer = persistReducer(persistConfig, reducers);

// Add reducers here!
export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk],
});
export const persistor = persistStore(store);
