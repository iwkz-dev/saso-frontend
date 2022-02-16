import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {addItemToCart, removeItem, clearItemFromCart} from "../../redux/actions/CustomerMenuAction";

import styles from "./CartItems.module.scss";
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import IconButton from "@mui/material/IconButton";
const CartItems = ({cartItem}) => {
    const dispatch = useDispatch();
    const addItem = (item) => {
        dispatch(addItemToCart(item));
    }
    const reduceItem = (item) => {
        dispatch(removeItem(item))
    }
    const clearAllItemFromCart = (item) => {
        dispatch(clearItemFromCart(item))
    }
    // const getTotalMenuPrice = `${cartItem.reduce((acc, cartItem) => acc + cartItem.price * cartItem.quantity, 0).toFixed(2)}€`
    return (
            <div key={cartItem._id} className={styles.itemWrapper}>
                <div className={styles.firstWrapper}>
                    <span>{`${cartItem.quantity}x`}</span>
                    <span>{cartItem.name}</span>
                </div>
                <div className={styles.secondWrapper}>
                    <IconButton color="primary" onClick={() => reduceItem(cartItem)}>
                        <RemoveCircleOutlineOutlinedIcon style={{ color: "#000000" }}/>
                    </IconButton>
                    <IconButton color="primary" onClick={() => addItem(cartItem)}>
                        <AddCircleOutlineOutlinedIcon style={{ color: "#000000" }}/>
                    </IconButton>
                </div>
                <div className={styles.thirdWrapper}>
                    <span style={{minWidth: "40px"}}>{`${cartItem.price * cartItem.quantity}€`}</span>
                    <IconButton color="primary" onClick={() => clearAllItemFromCart(cartItem)}>
                        <DeleteOutlinedIcon style={{ color: "#000000" }}/>
                    </IconButton>
                </div>
            </div>
    );
};

export default CartItems;