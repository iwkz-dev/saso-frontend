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
            return await dispatch(getAllOrders("?event=" + event._id));
        };
        getData().then((r) => {
            if (r.status === "success") {
                setShowLoading(false);
            } else {
                setShowLoading(false);
                message.error(r.message);
                isAuth(r);
            }
        });
    }, []);

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

    const eventCardComponent = (event) => {
        console.log("event", event);
        return (
            <Row gutter={[16, 16]}>
                <Col span={4}>
                    <Card>
                        <Statistic
                            title="Total"
                            value={getAllInfo(event).totalOrders}
                        />
                    </Card>
                </Col>
                <Col span={5}>
                    <Card>
                        <Statistic
                            title="Canceled"
                            valueStyle={{
                                color: "#cf1322",
                            }}
                            value={getAllInfo(event).totalCanceledOrders}
                        />
                    </Card>
                </Col>
                <Col span={5}>
                    <Card>
                        <Statistic
                            title="Paid"
                            valueStyle={{
                                color: "#FFAA1D",
                            }}
                            value={getAllInfo(event).paidOrders}
                        />
                    </Card>
                </Col>
                <Col span={5}>
                    <Card>
                        <Statistic
                            title="Delivered"
                            valueStyle={{
                                color: "#4169E1",
                            }}
                            value={getAllInfo(event).deliveredOrdersNumber}
                        />
                    </Card>
                </Col>
                <Col span={5}>
                    <Card>
                        <Statistic
                            title="Income"
                            valueStyle={{
                                color: "#3f8600",
                            }}
                            precision={2}
                            value={getAllInfo(event).sumTotalPrice}
                            suffix="€"
                        />
                    </Card>
                </Col>
            </Row>
        );
    };

    return (
        <Spin spinning={showLoading}>
            <Typography.Title level={5}>
                Orders for &quot;{event.name}&quot;
            </Typography.Title>
            {eventCardComponent(event)}
        </Spin>
    );
};

export default EventSummary;
