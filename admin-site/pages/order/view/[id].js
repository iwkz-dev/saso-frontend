import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders } from "../../../src/store/reducers/orderReducer";
import Loading from "../../../src/components/common/Loading/Loading";
import { useRouter } from "next/router";
import LoggedIn from "../../../src/components/Layout/LoggedIn/LoggedIn";
import OrderDataDisplay from "../../../src/components/DataDisplay/OrderDataDisplay/OrderDataDisplay";
import RelatedMenuOrder from "../../../src/components/Table/Order/RelatedMenuOrderList/RelatedMenuOrder";
import Content from "../../../src/components/Layout/Content/Content";
import { Space, Spin, Typography, message } from "antd";

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
        setShowLoading(true);
        const getOrders = async () => {
            return dispatch(getAllOrders());
        };
        if (orders.length === 0) {
            getOrders().then((r) => {
                if (r.status === "success") {
                    setShowLoading(false);
                } else {
                    setShowLoading(false);
                    message.error(r.message);
                }
            });
        } else {
            if (id) {
                const order = orders.find((o) => {
                    return o["_id"] === id;
                });
                if (order) {
                    setOrderDetail(order);
                    setShowDataDisplay(true);
                    setShowLoading(false);
                } else {
                    setShowLoading(false);
                    message.error(
                        "Unfortunately, your searched order detail is not found",
                    );
                }
            }
        }
    }, [id, orders]);
    return (
        <LoggedIn title={pageTitle}>
            <Content>
                <Loading />
                <Spin spinning={showLoading} tip="Loading...">
                    <Typography.Title level={2}>View Order</Typography.Title>
                    {showDataDisplay ? (
                        <Space direction="vertical" style={{ display: "flex" }}>
                            <OrderDataDisplay order={orderDetail} />
                            <Typography.Title level={2}>
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
