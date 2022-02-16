import {combineReducers} from "redux";
import {allCustomerMenuReducer} from "./CustomerMenuReducer";

const reducer = combineReducers({
    allCustomerMenu: allCustomerMenuReducer
});

export default reducer