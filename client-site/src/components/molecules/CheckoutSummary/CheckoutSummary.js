import { Divider, Space, Typography } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import style from "./CheckoutSummary.module.scss";
import ImagesPreview from "../../atoms/ImagesPreview/ImagesPreview";

const CheckoutSummary = () => {
    const cart = useSelector((state) => state.cart.data);

    const cartItemComponents = () => {
        return cart.items.map((cartItem) => (
            <div className={style.cartItem}>
                <div className={`${style.itemOverview} ${style.flexLayout}`}>
                    <div className={style.imageWrapper}>
                        <ImagesPreview
                            productName={cartItem.menu.name}
                            productImages={cartItem.menu.images}
                        />
                    </div>
                    <Space direction="vertical">
                        <Typography.Text className={style.itemTitle}>
                            {cartItem.menu.name}
                        </Typography.Text>
                        <Typography.Text>
                            {cartItem.menu.price} €
                        </Typography.Text>
                    </Space>
                </div>
                <div
                    className={`${style.itemAmountWrapper} ${style.flexLayout}`}
                >
                    <Typography.Text className={style.itemAmount}>
                        {cartItem.amount}
                    </Typography.Text>
                </div>
                <div
                    className={`${style.itemSumPriceWrapper} ${style.flexLayout}`}
                >
                    <Typography.Text className={style.itemSumPrice}>
                        {cartItem.sumPrice}€
                    </Typography.Text>
                </div>
            </div>
        ));
    };

    const cartItemComponentsMobile = () => {
        return cart.items.map((cartItem) => (
            <div className={style.cartItemMobile}>
                <div className={style.itemOverview}>
                    <div className={style.imageWrapper}>
                        <ImagesPreview
                            productName={cartItem.menu.name}
                            productImages={cartItem.menu.images}
                        />
                    </div>
                    <Space direction="vertical">
                        <Typography.Text className={style.itemTitle}>
                            {cartItem.menu.name}
                        </Typography.Text>
                        <Typography.Text type="danger">
                            {cartItem.menu.price} €
                        </Typography.Text>
                    </Space>
                </div>
                <div className={style.amountAndPrice}>
                    <div
                        className={`${style.itemAmountWrapper} ${style.flexLayout}`}
                    >
                        <Typography.Text className={style.itemAmount}>
                            {cartItem.amount}x
                        </Typography.Text>
                    </div>
                    <div
                        className={`${style.itemSumPriceWrapper} ${style.flexLayout}`}
                    >
                        <Typography.Text className={style.itemSumPrice}>
                            {cartItem.sumPrice}€
                        </Typography.Text>
                    </div>
                </div>
            </div>
        ));
    };

    return (
        <div className={style.checkoutSummary}>
            <Space size="large" direction="vertical" style={{ width: "100%" }}>
                <Typography.Title level={3} style={{ textAlign: "center" }}>
                    Checkout summary
                </Typography.Title>
                <div className={style.cartItems}>
                    <div className={style.titleText}>
                        <div className={style.flexLayout}>
                            <Typography.Text className={style.text}>
                                Menu Ordered
                            </Typography.Text>
                        </div>
                        <div className={`${style.amount} ${style.flexLayout}`}>
                            <Typography.Text className={style.text}>
                                Amount
                            </Typography.Text>
                        </div>
                        <div
                            className={`${style.subPrice} ${style.flexLayout}`}
                        >
                            <Typography.Text className={style.text}>
                                Sub Price
                            </Typography.Text>
                        </div>
                    </div>
                    {cartItemComponents()}
                    {cartItemComponentsMobile()}
                </div>
                <Divider />
                <div className={style.totalPriceWrapper}>
                    <Typography.Title className={style.totalText} level={5}>
                        Total:
                    </Typography.Title>
                    <Typography.Title
                        className={style.totalPrice}
                        level={3}
                        type="danger"
                    >
                        {cart.totalPrice}€
                    </Typography.Title>
                </div>
            </Space>
        </div>
    );
};

export default CheckoutSummary;
