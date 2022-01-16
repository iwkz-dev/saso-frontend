import loginReducer from './reducers/login';
import registerReducer from './reducers/register';
import { configureStore } from '@reduxjs/toolkit';
// Add reducers here!
export default configureStore({
  reducer: {
    login: loginReducer,
    register: registerReducer,
  },
});
