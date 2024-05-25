import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SmileOutlined } from "@ant-design/icons";
import { Space, Button, notification, message, Typography, Spin } from "antd";
import { isAuth } from "../../../helpers/authHelper";
import { submitOrder } from "../../../stores/reducers/order";
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

    const submitTransferForm = async () => {
        setIsSpinning(true);

        const isConfirm = window.confirm(
            "Please confirm if you plan to pay later. Ensure payment is made within 2x24 hours and send the proof to the designated contact person.",
        );

        if (!isConfirm) {
            setIsSpinning(false);
            return;
        }

        try {
            setIsCanceled(false);

            const orderData = createOrderData("transfer", true);
            const response = await dispatch(submitOrder(orderData, isAuth()));

            if (response.status === "success") {
                const newCurrOrder = response.data.createOrder;

                setCurrOrder(newCurrOrder);
                openNotification(
                    newCurrOrder.customerFullname,
                    newCurrOrder,
                    true,
                );

                dispatch(resetCart());
                Router.push("/");
            } else {
                throw new Error("Order submission failed");
            }
        } catch (error) {
            console.error(error);
            message.error(error.message);
        } finally {
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
