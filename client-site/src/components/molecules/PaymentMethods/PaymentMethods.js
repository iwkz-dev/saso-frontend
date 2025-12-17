import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SmileOutlined } from "@ant-design/icons";
import Router from "next/router";
import {
    Space,
    Button,
    notification,
    message,
    Typography,
    Spin,
    Modal,
} from "antd";

import { isAuth } from "../../../helpers/authHelper";
import { submitOrder } from "../../../stores/reducers/order";
import { resetCart } from "../../../stores/reducers/cart";
import style from "./PaymentMethods.module.scss";

const PaymentMethods = ({ cart, userData }) => {
    const dispatch = useDispatch();
    const event = useSelector((state) => state.event.data);
    const [isSpinning, setIsSpinning] = useState(false);
    const { confirm } = Modal;

    const eventId = event?._id || null;

    const createOrderData = (paymentType) => {
        const menus = cart.items.map((item) => ({
            _id: item.menu._id,
            totalPortion: item.amount,
        }));

        const orderData = {
            event: eventId,
            note: "",
            arrivedAt: "",
            paymentType,
            menus,
        };

        if (!isAuth()) {
            orderData.userData = userData;
        }
        return orderData;
    };

    const openNotification = (name, currOrder, isTransfer = false) => {
        const key = `open${Date.now()}`;
        const btn =
            isAuth() && currOrder?._id ? (
                <Button
                    type="primary"
                    size="small"
                    onClick={() => {
                        notification.destroy(key);
                        Router.push(
                            `${event.slug}/my-order/detail/${currOrder._id}`,
                        );
                    }}>
                    See order
                </Button>
            ) : null;

        notification.open({
            message: "Purchasing completed",
            description: `Thank you ${name} for ${
                isTransfer ? "booking" : "purchasing"
            }. Your invoice number is: ${currOrder?.invoiceNumber ?? "-"}.`,
            btn,
            duration: 10,
            key,
            icon: <SmileOutlined style={{ color: "#108ee9" }} />,
        });
    };

    const submitTransferForm = async () => {
        if (!eventId) {
            message.error(
                "Event is not ready yet. Please try again in a moment.",
            );
            return;
        }
        if (!cart?.items?.length) {
            message.warning("Your cart is empty.");
            return;
        }

        confirm({
            title: "Confirm Payment Later",
            content:
                "Please confirm if you plan to pay later. Ensure payment is made within 2x24 hours and send the proof to the designated contact person.",
            okText: "Confirm",
            cancelText: "Cancel",
            async onOk() {
                setIsSpinning(true);
                try {
                    const orderData = createOrderData("transfer");

                    const payload = await dispatch(
                        submitOrder({
                            data: orderData,
                            isAuthRequired: isAuth(),
                        }),
                    ).unwrap();

                    const order = payload?.order || null;

                    const customerName =
                        order?.customerFullname ||
                        userData?.fullname ||
                        userData?.name ||
                        "there";

                    openNotification(customerName, order, true);

                    dispatch(resetCart(event._id));
                    Router.push(`/${event.slug}`);
                } catch (err) {
                    const msg =
                        typeof err === "string"
                            ? err
                            : err?.message || "Order submission failed";
                    console.error(err);
                    message.error(msg);
                } finally {
                    setIsSpinning(false);
                }
            },
            onCancel() {
                // just close, do nothing (same as returning if false in window.confirm)
            },
        });
    };

    return (
        <Spin spinning={isSpinning}>
            <Space
                direction="vertical"
                align="center"
                className={style.bookOrPayButton}
                style={{ width: "100%" }}>
                <Button
                    onClick={submitTransferForm}
                    style={{
                        width: "100%",
                        borderRadius: 999,
                        fontWeight: 700,
                    }}
                    type="primary"
                    size="large">
                    Pay Later
                </Button>
                <Typography.Text
                    type="secondary"
                    italic
                    style={{ textAlign: "center" }}>
                    Choose “Pay Later” to complete payment within 2×24 hours and
                    send proof to the contact person.
                </Typography.Text>
            </Space>
        </Spin>
    );
};

export default PaymentMethods;
