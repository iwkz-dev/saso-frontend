import { Card, Col, Row, Spin, Statistic, Typography, message } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders } from "../../../../store/reducers/orderReducer";
import { isAuth } from "../../../../helpers/authHelper";

const EventSummary = ({ event }) => {
    const dispatch = useDispatch();
    const orders = useSelector((state) => state.order.orders);
    const [showLoading, setShowLoading] = useState(false);

    useEffect(() => {
        setShowLoading(true);
        const getData = async () => {
            const r = await dispatch(getAllOrders(`?event=${event._id}`));
            setShowLoading(false);
            if (r.status !== "success") {
                message.error(r.message);
                isAuth(r);
            }
        };
        getData();
    }, [dispatch, event._id]);

    const getAllInfo = (event) => {
        const eventOrders = orders.filter((order) => order.event === event._id);

        const deliveredOrders = eventOrders.filter((o) => o.status === 3);
        const canceledOrders = eventOrders.filter((o) => o.status === 2);
        const paidOrders = eventOrders.filter((o) => o.status === 1);

        const actualIncome = [...paidOrders, ...deliveredOrders].reduce(
            (acc, curr) => acc + (curr.totalPrice || 0),
            0,
        );

        const potentialIncome = eventOrders
            .filter((o) => o.status !== 2) // exclude canceled
            .reduce((acc, curr) => acc + (curr.totalPrice || 0), 0);

        return {
            totalOrders: eventOrders.length,
            totalCanceledOrders: canceledOrders.length,
            deliveredOrdersNumber: deliveredOrders.length,
            paidOrders: paidOrders.length,
            actualIncome,
            potentialIncome,
        };
    };

    const info = getAllInfo(event);

    const cardStyle = { height: "100%" }; // ensures all cards stretch to full height

    return (
        <Spin spinning={showLoading}>
            <Typography.Title level={5}>
                Orders for &quot;{event.name}&quot;
            </Typography.Title>

            <Row gutter={[16, 16]} align="stretch">
                <Col xs={24} sm={12} md={8} lg={4}>
                    <Card style={cardStyle}>
                        <Statistic
                            title="Total Orders"
                            value={info.totalOrders}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={8} lg={5}>
                    <Card style={cardStyle}>
                        <Statistic
                            title="Canceled Orders"
                            value={info.totalCanceledOrders}
                            valueStyle={{ color: "#cf1322" }}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={8} lg={5}>
                    <Card style={cardStyle}>
                        <Statistic
                            title="Paid Orders"
                            value={info.paidOrders}
                            valueStyle={{ color: "#FFAA1D" }}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={8} lg={5}>
                    <Card style={cardStyle}>
                        <Statistic
                            title="Delivered Orders"
                            value={info.deliveredOrdersNumber}
                            valueStyle={{ color: "#4169E1" }}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={8} lg={5}>
                    <Card style={{ height: "100%" }}>
                        <Statistic
                            title="Income"
                            value={`${info.actualIncome.toFixed(2)}€`}
                            precision={2}
                            valueStyle={{
                                color: "#3f8600",
                                fontWeight: "bold",
                            }}
                            suffix={
                                <span>
                                    <Typography.Text
                                        type="secondary"
                                        style={{
                                            fontSize: "0.5em",
                                            marginLeft: 4,
                                        }}>
                                        / {info.potentialIncome.toFixed(2)}€
                                    </Typography.Text>
                                </span>
                            }
                        />
                    </Card>
                </Col>
            </Row>
        </Spin>
    );
};

export default EventSummary;
