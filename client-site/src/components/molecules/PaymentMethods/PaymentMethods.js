import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SmileOutlined } from "@ant-design/icons";
import { Space, Button, notification, message, Typography, Spin } from "antd";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { isAuth } from "../../../helpers/authHelper";
import { approveOrder, submitOrder } from "../../../stores/reducers/order";
import { resetCart } from "../../../stores/reducers/cart";
import Router from "next/router";
import style from "./PaymentMethods.module.scss";

const PaymentMethods = ({ userData }) => {
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart.data);
    const events = useSelector((state) => state.event.data);
    const [currOrder, setCurrOrder] = useState({});
    const [isCanceled, setIsCanceled] = useState(false);
    const [isSpinning, setIsSpinning] = useState(false);

    useEffect(() => {
        if (isCanceled && currOrder?._id) {
            message.error("Transaction process is aborted");
            dispatch(resetCart());
            setIsSpinning(false);
        }
    }, [currOrder, isCanceled]);

    const submitPaypalForm = () => {
        setIsSpinning(true);
        setIsCanceled(false);
        const orderData = createOrderData("paypal");

        return dispatch(submitOrder(orderData, isAuth())).then(
            async (response) => {
                if (response.status == "success") {
                    setCurrOrder(response.data.createOrder);
                    return response.data.paymentResponse.id;
                }
            },
        );
    };

    const submitTransferForm = () => {
        setIsSpinning(true);
        const isConfirm = confirm(
            "Please confirm if you plan to pay later. Ensure payment is made within 2x24 hours and send the proof to the designated contact person.",
        );
        if (isConfirm) {
            setIsCanceled(false);
            const orderData = createOrderData("transfer", true);

            dispatch(submitOrder(orderData, isAuth())).then(
                async (response) => {
                    if (response.status == "success") {
                        setCurrOrder(response.data.createOrder);
                        openNotification(
                            response.data.createOrder.customerFullname,
                            response.data.createOrder,
                            true,
                        );
                        dispatch(resetCart());
                        Router.push("/");
                    }
                },
            );
        } else {
            setIsSpinning(false);
        }
    };

    const openNotification = (name, currOrder, isTransfer = false) => {
        const key = `open${Date.now()}`;
        let btn = "";
        if (isAuth()) {
            btn = (
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
        }
        notification.open({
            message: "Purchasing completed",
            description: `Thank you ${name} for ${
                isTransfer ? "booking" : "purchasing"
            }. Your invoice number is: ${currOrder?.invoiceNumber}`,
            btn,
            duration: 10,
            key,
            icon: <SmileOutlined style={{ color: "#108ee9" }} />,
        });
    };

    const onApprove = (data, details) => {
        dispatch(approveOrder(data, isAuth())).then((response) => {
            const order = response.data;
            const payerName = details.payer.name.given_name;
            openNotification(payerName, order);
            dispatch(resetCart());
            setIsSpinning(false);
            Router.push("/");
        });
    };

    const onCancel = () => {
        setIsSpinning(false);
        setIsCanceled(true);
    };

    const onError = () => {
        setIsSpinning(false);
        setIsCanceled(true);
    };

    const createOrderData = (paymentType) => {
        const menus = [];
        cart.items.forEach((item) => {
            menus.push({
                _id: item.menu._id,
                totalPortion: item.amount,
            });
        });
        const orderData = {
            event: events[0]._id,
            note: "",
            arrivedAt: "",
            paymentType,
            menus: menus,
        };

        if (!isAuth()) {
            orderData.userData = userData;
        }
        return orderData;
    };

    return (
        <Spin spinning={isSpinning}>
            <Space
                direction="vertical"
                align="center"
                className={style.bookOrPayButton}>
                <PayPalButtons
                    fundingSource="paypal"
                    style={{
                        disableMaxWidth: true,
                        label: "paypal",
                    }}
                    createOrder={() => {
                        return submitPaypalForm();
                    }}
                    onCancel={() => {
                        onCancel();
                    }}
                    onError={() => {
                        onError();
                    }}
                    onApprove={(data, actions) => {
                        return actions.order.capture().then((details) => {
                            onApprove(data, details);
                        });
                    }}
                />
                <Typography.Text type="secondary" italic>
                    Payment with PayPal may incur a slight price adjustment to
                    cover transaction fees.
                </Typography.Text>
                <p style={{ textAlign: "center", width: "100%" }}>or</p>
                <Button
                    onClick={() => {
                        submitTransferForm("transfer");
                    }}
                    style={{ width: "100%" }}
                    type="primary"
                    size="large">
                    Pay Later
                </Button>
                <Typography.Text type="secondary" italic>
                    Choose 'Pay Later' to complete payment within 2x24 hours and
                    send proof to the contact person.
                </Typography.Text>
            </Space>
        </Spin>
    );
};

export default PaymentMethods;
