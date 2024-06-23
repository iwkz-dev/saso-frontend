import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders } from "../../../../src/store/reducers/orderReducer";
import { useRouter } from "next/router";
import LoggedIn from "../../../../src/components/Layout/LoggedIn/LoggedIn";
import OrderDataDisplay from "../../../../src/components/DataDisplay/OrderDataDisplay/OrderDataDisplay";
import RelatedMenuOrder from "../../../../src/components/Table/Order/RelatedMenuOrderList/RelatedMenuOrder";
import Content from "../../../../src/components/Layout/Content/Content";
import { Space, Spin, Typography, message } from "antd";
import { isAuth } from "../../../../src/helpers/authHelper";

const id = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { id } = router.query;
    const [showDataDisplay, setShowDataDisplay] = useState(false);
    const [showLoading, setShowLoading] = useState(false);
    const pageTitle = "Saso App | Order";
    const orders = useSelector((state) => state.order.orders);
    const [orderDetail, setOrderDetail] = useState({});

    //TODO view order
    useEffect(() => {
        const fetchData = async () => {
            setShowLoading(true);
            try {
                if (orders.length === 0) {
                    const response = await dispatch(getAllOrders());
                    if (response.status === "success") {
                        setShowLoading(false);
                    } else {
                        throw new Error(response.message);
                    }
                } else if (id) {
                    const order = orders.find((o) => o["_id"] === id);
                    if (order) {
                        setOrderDetail(order);
                        setShowDataDisplay(true);
                    } else {
                        throw new Error("Order detail not found");
                    }
                    setShowLoading(false);
                }
            } catch (error) {
                setShowLoading(false);
                message.error(error.message);
                isAuth(error);
            }
        };

        fetchData();
    }, [id, orders]);

    return (
        <LoggedIn title={pageTitle}>
            <Content>
                <Spin spinning={showLoading} tip="Loading...">
                    <Typography.Title level={3}>View Order</Typography.Title>
                    {showDataDisplay ? (
                        <Space direction="vertical" style={{ display: "flex" }}>
                            <OrderDataDisplay order={orderDetail} />
                            <Typography.Title level={4}>
                                Ordered Menu
                            </Typography.Title>
                            <RelatedMenuOrder menus={orderDetail.menus} />
                        </Space>
                    ) : (
                        ""
                    )}
                </Spin>
            </Content>
        </LoggedIn>
    );
};

export default id;
