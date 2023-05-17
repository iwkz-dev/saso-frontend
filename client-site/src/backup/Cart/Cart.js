import React from "react";
import styles from "./cart.module.scss";
import { Card, CardContent, Divider } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Typography from "@mui/material/Typography";
import CartItem from "../../atoms/CartItem/CartItem";
import CartDetail from "../../atoms/CartDetail/CartDetail";
import { addOrder, removeOrder } from "../../../stores/reducers/cart";
import { AiOutlineShoppingCart, AiOutlineClose } from "react-icons/ai";

const Cart = ({ setMobileActive, isBreakpoint, openOrder, setOpenOrder }) => {
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart.data);

    const add = (menu) => {
        dispatch(addOrder(menu));
    };

    const remove = (menu) => {
        dispatch(removeOrder(menu));
    };

    return (
        <Card
            className={`${styles.cartContainer} ${
                isBreakpoint ? (setMobileActive ? styles.openCart : "") : ""
            }`}
        >
            <CardContent className={styles.cartContent}>
                <div className={styles.cartTitle}>
                    <div className={styles.title}>
                        <AiOutlineShoppingCart />
                        <Typography variant="h6">Cart</Typography>
                    </div>
                    {isBreakpoint ? (
                        setMobileActive ? (
                            <AiOutlineClose
                                className={styles.closeButton}
                                onClick={() => setMobileActive(false)}
                            />
                        ) : (
                            ""
                        )
                    ) : (
                        ""
                    )}
                </div>
                {cart.items.length ? (
                    <>
                        <div className={styles.orderedList}>
                            {cart.items.map((cartItem) => (
                                <div key={cartItem.menu._id}>
                                    <CartItem
                                        cartItem={cartItem}
                                        add={add}
                                        remove={remove}
                                    />
                                    <Divider />
                                </div>
                            ))}
                        </div>
                        <div className={styles.bottomCart}>
                            <Divider />
                            <CartDetail
                                cart={cart}
                                setOpenOrder={setOpenOrder}
                                openOrder={openOrder}
                                setMobileActive={setMobileActive}
                            />
                        </div>
                    </>
                ) : (
                    <Typography variant="body2" color="text.secondary">
                        Cart is empty
                    </Typography>
                )}
            </CardContent>
        </Card>
    );
};

export default Cart;
