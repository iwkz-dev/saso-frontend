import loginReducer from './reducers/login';
import { configureStore } from '@reduxjs/toolkit';
// Add reducers here!
export default configureStore({
  reducer: {
    login: loginReducer,
  },
});
