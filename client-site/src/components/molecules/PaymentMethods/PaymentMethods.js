import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    SmileOutlined,
    BankOutlined,
    MoneyCollectOutlined,
} from "@ant-design/icons";
import Router from "next/router";
import {
    Space,
    Button,
    notification,
    message,
    Spin,
    Modal,
    Collapse,
} from "antd";

import { submitOrder } from "../../../stores/reducers/order";
import { resetCart } from "../../../stores/reducers/cart";
import style from "./PaymentMethods.module.scss";

const PaymentMethods = ({ cart, userData }) => {
    const dispatch = useDispatch();
    const event = useSelector((state) => state.event.data);
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    const [isSpinning, setIsSpinning] = useState(false);
    const { confirm } = Modal;

    const eventId = event?._id || null;
    const paymentTypes = event?.paymentTypes || [];

    const groupedPaymentTypes = paymentTypes.reduce((acc, paymentType) => {
        const type = paymentType.type;
        if (!acc[type]) acc[type] = [];
        acc[type].push(paymentType);
        return acc;
    }, {});

    const getPaymentIcon = (type) => {
        switch (type) {
            case "transfer":
                return <BankOutlined />;
            case "cash":
                return <MoneyCollectOutlined />;
            default:
                return null;
        }
    };

    const createOrderData = (paymentTypeId) => {
        const menus = cart.items.map((item) => ({
            _id: item.menu._id,
            totalPortion: item.amount,
        }));

        const orderData = {
            event: eventId,
            note: "",
            arrivedAt: "",
            paymentTypeId,
            menus,
        };

        // guest checkout
        if (!isAuthenticated) {
            orderData.userData = userData;
        }

        return orderData;
    };

    const openNotification = (name, currOrder, isTransfer = false) => {
        const key = `open${Date.now()}`;

        const btn =
            isAuthenticated && currOrder?._id ? (
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

    const submitOrderForm = async (paymentType) => {
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

        const isTransfer = paymentType.type === "transfer";

        confirm({
            title: isTransfer ? "Confirm Payment Later" : "Confirm Payment",
            content: paymentType.note,
            okText: "Confirm",
            cancelText: "Cancel",
            async onOk() {
                setIsSpinning(true);
                try {
                    const orderData = createOrderData(paymentType._id);

                    const payload = await dispatch(
                        submitOrder({
                            data: orderData,
                            isAuthRequired: isAuthenticated,
                        }),
                    ).unwrap();

                    const order = payload?.order || null;

                    const customerName =
                        order?.customerFullname ||
                        userData?.fullname ||
                        userData?.name ||
                        "there";

                    openNotification(customerName, order, isTransfer);

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
        });
    };

    return (
        <Spin spinning={isSpinning}>
            <Collapse accordion size="large" bordered={false}>
                {Object.entries(groupedPaymentTypes).map(([type, types]) => (
                    <Collapse.Panel
                        key={type}
                        header={type.charAt(0).toUpperCase() + type.slice(1)}>
                        {types.map((paymentType) => (
                            <Space
                                key={paymentType._id}
                                direction="vertical"
                                align="center"
                                className={style.bookOrPayButton}
                                style={{ width: "100%", marginBottom: 16 }}>
                                <Button
                                    onClick={() => submitOrderForm(paymentType)}
                                    style={{
                                        width: "100%",
                                        borderRadius: 999,
                                        fontWeight: 700,
                                    }}
                                    type="primary"
                                    size="large"
                                    icon={getPaymentIcon(paymentType.type)}>
                                    {paymentType.name}
                                </Button>
                            </Space>
                        ))}
                    </Collapse.Panel>
                ))}
            </Collapse>
        </Spin>
    );
};

export default PaymentMethods;
