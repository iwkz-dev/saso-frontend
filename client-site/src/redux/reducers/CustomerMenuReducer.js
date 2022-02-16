import {
    ALL_CUSTOMER_MENU_SUCCESS, ALL_CUSTOMER_MENU_FAIL, CLEAR_ERRORS, ADD_ITEM_TO_CART, REMOVE_ITEM, CLEAR_ITEM_FROM_CART
} from "../constants/CustomerMenuConstant";
import {addItemToCart, removeItemFromCart} from "../menuUtils";

const initialState = {
    menu : [],
    cartItems: []
}

export const allCustomerMenuReducer = (state = initialState, action) => {
    console.log(action.type, action.payload)
    switch (action.type) {
        case ALL_CUSTOMER_MENU_SUCCESS:
            return {
                ...state,
                menu: action.payload
            }
        case ADD_ITEM_TO_CART:
            return {
                ...state,
                cartItems: addItemToCart(state.cartItems, action.payload)
            };
        case REMOVE_ITEM:
            return {
                ...state,
                cartItems: removeItemFromCart(state.cartItems, action.payload)
            };
        case CLEAR_ITEM_FROM_CART:
            return {
                ...state,
                cartItems: state.cartItems.filter(
                    cartItem => cartItem._id !== action.payload._id
                )
            };
        default:
            return state
    }
}