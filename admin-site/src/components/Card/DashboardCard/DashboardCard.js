import { Space, Statistic, Typography, Card, Divider } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { formatDate } from "../../../helpers/dateHelper";
import styles from "./DashboardCard.module.scss";

const DashboardCard = () => {
    const events = useSelector((state) => state.event.events);
    const orders = useSelector((state) => state.order.orders);

    const getAllInfo = (event) => {
        const eventOrders = orders.filter((order) => order.event === event._id);

        const deliveredOrders = eventOrders?.filter(
            (eventOrder) => eventOrder.status === 3,
        );

        const canceledOrders = eventOrders?.filter(
            (eventOrder) => eventOrder.status === 2,
        );

        const paidOrders = eventOrders?.filter(
            (eventOrder) => eventOrder.status === 1,
        );

        let sum = 0;
        paidOrders?.map((deliveredOrder) => {
            sum += deliveredOrder.totalPrice;
        });

        const info = {
            totalOrders: eventOrders.length,
            totalCanceledOrders: canceledOrders.length,
            deliveredOrdersNumber: deliveredOrders.length,
            paidOrders: paidOrders.length,
            sumTotalPrice: sum,
        };
        return info;
    };

    const gridStyle = {
        width: "300px",
        textAlign: "center",
        backgroundColor: "#ffffff",
    };

    const eventCardComponent = events.map((event, i) => {
        if (event.status === 2 || event.status === 1) {
            return (
                <Card.Grid
                    className={styles.cardGrid}
                    style={gridStyle}
                    key={i}>
                    <Space direction="vertical">
                        <Typography.Title level={4}>
                            {event.name}
                        </Typography.Title>
                        <Divider />
                        <Statistic
                            title="Total Orders"
                            value={getAllInfo(event).totalOrders}
                        />
                        <Statistic
                            title="Orders Canceled"
                            valueStyle={{
                                color: "#cf1322",
                            }}
                            value={getAllInfo(event).totalCanceledOrders}
                        />
                        <Statistic
                            title="Orders Paid"
                            valueStyle={{
                                color: "#FFAA1D",
                            }}
                            value={getAllInfo(event).paidOrders}
                        />
                        <Statistic
                            title="Orders Delivered"
                            valueStyle={{
                                color: "#4169E1",
                            }}
                            value={getAllInfo(event).deliveredOrdersNumber}
                        />
                        <Statistic
                            title="Total Price"
                            valueStyle={{
                                color: "#3f8600",
                            }}
                            precision={2}
                            value={getAllInfo(event).sumTotalPrice}
                            suffix="€"
                        />
                        <Divider />
                        <Typography.Paragraph>
                            {formatDate(event.started_at, false, true)}
                        </Typography.Paragraph>
                    </Space>
                </Card.Grid>
            );
        } else {
            return "";
        }
    });

    return (
        <div className={styles.dashboardCard}>
            <Card className={styles.cardsWrapper} bordered={false}>
                {eventCardComponent}
            </Card>
        </div>
    );
};

export default DashboardCard;
