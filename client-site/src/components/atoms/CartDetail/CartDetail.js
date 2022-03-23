import React from 'react';
import styles from "./cartdetail.module.scss";
import Button from "@mui/material/Button";

const CartDetail = ({cart}) => {
    return (
        <div className={styles.detail}>
            <div className={styles.amountDetail}>
                <span>Total amount:</span>
                <span>{cart.totalAmount}</span>
            </div>
            <div className={styles.priceDetail}>
                <b>Total price:</b>
                <b>{cart.totalPrice} €</b>
            </div>
            <Button size="small" variant="contained">
                Order
            </Button>
        </div>
    );
};

export default CartDetail;