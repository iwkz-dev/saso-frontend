import loginReducer from './reducers/login';
import menuReducer from './reducers/menu';
import eventReducer from './reducers/event';
import cartReducer from './reducers/cart';
import registerReducer from './reducers/register';
import { configureStore } from '@reduxjs/toolkit';
// Add reducers here!
export default configureStore({
  reducer: {
    login: loginReducer,
    register: registerReducer,
    menu: menuReducer,
    cart: cartReducer,
    event: eventReducer,
  },
});
