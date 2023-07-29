import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SmileOutlined } from "@ant-design/icons";
import {
    Divider,
    Space,
    Typography,
    Button,
    notification,
    message,
} from "antd";
import ImagesPreview from "../../atoms/ImagesPreview/ImagesPreview";
import { PayPalButtons } from "@paypal/react-paypal-js";
import {
    approveOrder,
    deleteOrder,
    submitOrder,
} from "../../../stores/reducers/order";
import { resetCart } from "../../../stores/reducers/cart";
import Router from "next/router";
import style from "./CheckoutSummary.module.scss";

const CheckoutSummary = () => {
    const dispatch = useDispatch();
    const [currOrder, setCurrOrder] = useState({});
    const [isCanceled, setIsCanceled] = useState(false);
    const [isApprove, setIsApprove] = useState(false);
    const [payerName, setPayerName] = useState("");
    const cart = useSelector((state) => state.cart.data);
    const events = useSelector((state) => state.event.data);

    useEffect(() => {
        if (isCanceled && currOrder?._id) {
            dispatch(deleteOrder(currOrder._id));
            message.error("Transaction process is aborted");
        }
    }, [currOrder, isCanceled]);

    useEffect(() => {
        if (isApprove && currOrder?._id && payerName) {
            dispatch(resetCart());
            dispatch(approveOrder(currOrder._id));
            openNotification(payerName, currOrder);
            Router.push("/");
        }
    }, [currOrder, isApprove, payerName]);

    const submitForm = () => {
        const event = events[0]._id;
        setIsCanceled(false);
        const menus = [];
        cart.items.forEach((item) => {
            menus.push({
                _id: item.menu._id,
                totalPortion: item.amount,
            });
        });
        const orderData = {
            event: event,
            note: "",
            arrivedAt: "",
            menus: menus,
        };

        return dispatch(submitOrder(orderData)).then(async (response) => {
            if (response.status == "success") {
                setCurrOrder(response.data.createOrder);
                return response.data.paypalResponse.id;
            }
        });
    };

    const openNotification = (name, currOrder) => {
        const key = `open${Date.now()}`;
        const btn = (
            <Button
                type="primary"
                size="small"
                onClick={() => {
                    notification.destroy(key);
                    Router.push(`my-order/detail/${currOrder._id}`);
                }}>
                See order
            </Button>
        );
        notification.open({
            message: "Purchasing completed",
            description: `Thank you for purchanig. Your invoice number is: ${currOrder.invoiceNumber}`,
            btn,
            key,
            icon: <SmileOutlined style={{ color: "#108ee9" }} />,
        });
    };

    const onApprove = (name) => {
        setIsApprove(true);
        setPayerName(name);
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

    const cartItemComponentsMobile = () => {
        return cart.items.map((cartItem, i) => (
            <div key={i} className={style.cartItemMobile}>
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
                        className={`${style.itemAmountWrapper} ${style.flexLayout}`}>
                        <Typography.Text className={style.itemAmount}>
                            {cartItem.amount}x
                        </Typography.Text>
                    </div>
                    <div
                        className={`${style.itemSumPriceWrapper} ${style.flexLayout}`}>
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
                            className={`${style.subPrice} ${style.flexLayout}`}>
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
                        type="danger">
                        {cart.totalPrice}€
                    </Typography.Title>
                </div>
                <div className={style.payPalButtons}>
                    <PayPalButtons
                        fundingSource="paypal"
                        createOrder={(data, actions) => {
                            return submitForm(actions);
                        }}
                        onCancel={() => {
                            setIsCanceled(true);
                        }}
                        onError={() => {
                            setIsCanceled(true);
                        }}
                        onApprove={(data, actions) => {
                            return actions.order.capture().then((details) => {
                                const name = details.payer.name.given_name;
                                onApprove(name);
                            });
                        }}
                    />
                </div>
            </Space>
        </div>
    );
};

export default CheckoutSummary;
