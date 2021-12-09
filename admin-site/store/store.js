import navReducer from './reducers/navigation';
import { configureStore } from '@reduxjs/toolkit'
// Add reducers here!
export default configureStore({
    reducer: {
        nav: navReducer,
    },
});