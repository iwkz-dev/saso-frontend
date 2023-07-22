import { Button, Card, Typography } from "antd";
import React from "react";
import styles from "./CartSummary.module.scss";
import Router from "next/router";

const CartSummary = ({ cart }) => {
    return (
        <div className={styles.cartSummary}>
            <Card title="Order Summary">
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        flexDirection: "column",
                        width: "100%",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginBottom: "2rem",
                        }}
                    >
                        <Typography.Text
                            type="secondary"
                            style={{ fontSize: "1.25rem" }}
                        >
                            Total:
                        </Typography.Text>
                        <Typography.Text
                            type="danger"
                            style={{ fontSize: "1.25rem" }}
                        >
                            {cart.totalPrice} €
                        </Typography.Text>
                    </div>
                    <Button
                        size="large"
                        danger
                        onClick={() => Router.push("/checkout")}
                    >
                        Checkout
                    </Button>
                </div>
            </Card>
        </div>
    );
};

export default CartSummary;
