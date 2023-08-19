import React from "react";
import { useSelector } from "react-redux";
import { Divider, Space, Typography } from "antd";
import ImagesPreview from "../../atoms/ImagesPreview/ImagesPreview";
import Router from "next/router";
import style from "./CheckoutSummary.module.scss";
import { isAuth } from "../../../helpers/authHelper";
import CheckoutGuestForm from "../CheckoutGuestForm/CheckoutGuestForm";
import PaymentMethods from "../PaymentMethods/PaymentMethods";

const CheckoutSummary = () => {
    const cart = useSelector((state) => state.cart.data);

    const hasUndefinedValue = (obj) => {
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                const value = obj[key];

                if (
                    value === undefined ||
                    (typeof value === "string" && value.trim() === "")
                ) {
                    return true;
                }

                if (typeof value === "object" && !Array.isArray(value)) {
                    if (hasUndefinedValue(value)) {
                        return true;
                    }
                }
            }
        }

        return false;
    };

    const cartItemComponents = () => {
        return cart.items.map((cartItem, i) => (
            <div key={i} className={style.cartItem}>
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
                <div className={style.amountAndPrice}>
                    <div
                        className={`${style.itemAmountWrapperMobile} ${style.flexLayout}`}>
                        <Typography.Text className={style.itemAmount}>
                            {cartItem.amount}x
                        </Typography.Text>
                    </div>
                    <div
                        className={`${style.itemSumPriceWrapperMobile} ${style.flexLayout}`}>
                        <Typography.Text className={style.itemSumPrice}>
                            {cartItem.sumPrice}€
                        </Typography.Text>
                    </div>
                </div>
                <div
                    className={`${style.itemAmountWrapper} ${style.flexLayout}`}>
                    <Typography.Text className={style.itemAmount}>
                        {cartItem.amount}
                    </Typography.Text>
                </div>
                <div
                    className={`${style.itemSumPriceWrapper} ${style.flexLayout}`}>
                    <Typography.Text className={style.itemSumPrice}>
                        {cartItem.sumPrice}€
                    </Typography.Text>
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
                            className={`${style.subPrice} ${style.flexLayout}`}>
                            <Typography.Text className={style.text}>
                                Sub Price
                            </Typography.Text>
                        </div>
                    </div>
                    {cartItemComponents()}
                </div>
                <Divider />
                <div className={style.totalPriceWrapper}>
                    <Typography.Title className={style.totalText} level={5}>
                        Total:
                    </Typography.Title>
                    <Typography.Title
                        className={style.totalPrice}
                        level={3}
                        type="danger">
                        {cart.totalPrice}€
                    </Typography.Title>
                </div>
                {!isAuth() ? <CheckoutGuestForm /> : ""}
                {isAuth() ? <PaymentMethods /> : ""}
            </Space>
        </div>
    );
};

export default CheckoutSummary;
