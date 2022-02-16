import axios from  "axios";
import {BASE_URL_HOST_CUSTOMER_MENU} from "../../config/config";

import {
    ALL_CUSTOMER_MENU_SUCCESS,
    ALL_CUSTOMER_MENU_FAIL,
    CLEAR_ERRORS,
    ADD_ITEM_TO_CART,
    REMOVE_ITEM,
    CLEAR_ITEM_FROM_CART
} from "../constants/CustomerMenuConstant";

export const getAllMenu = (req) => async (dispatch) => {
    try {
        const { data } = await axios
            .get(BASE_URL_HOST_CUSTOMER_MENU)

        dispatch({
            type: ALL_CUSTOMER_MENU_SUCCESS,
            payload: data.data.data
        })
    }
    catch (error) {
        dispatch({
            type: ALL_CUSTOMER_MENU_FAIL,
            payload: null
        })
    }
}
export const addItemToCart = item => ({
    type: ADD_ITEM_TO_CART,
    payload: item
});

export const removeItem = item => ({
    type: REMOVE_ITEM,
    payload: item
});

export const clearItemFromCart = item => ({
    type: CLEAR_ITEM_FROM_CART,
    payload: item
});