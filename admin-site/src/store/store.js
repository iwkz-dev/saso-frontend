import navReducer from './reducers/navigation';
import loginReducer from './reducers/login';
import { configureStore } from '@reduxjs/toolkit'
// Add reducers here!
export default configureStore({
    reducer: {
        nav: navReducer,
        login: loginReducer
    },
});
