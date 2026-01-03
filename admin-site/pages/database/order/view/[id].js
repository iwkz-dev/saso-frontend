import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { Space, Spin, Typography, message } from "antd";

import Protected from "../../../../src/components/Layout/Protected/Protected";
import OrderDataDisplay from "../../../../src/components/DataDisplay/OrderDataDisplay/OrderDataDisplay";
import RelatedMenuOrder from "../../../../src/components/Table/Order/RelatedMenuOrderList/RelatedMenuOrder";
import Content from "../../../../src/components/Layout/Content/Content";
import { isAuth } from "../../../../src/helpers/authHelper";
import { getOrderById } from "../../../../src/store/reducers/orderReducer";

const id = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { id } = router.query;
    const [showDataDisplay, setShowDataDisplay] = useState(false);
    const [showLoading, setShowLoading] = useState(false);
    const pageTitle = "Saso App | Order";
    const order = useSelector((state) => state.order.detailOrder);

    useEffect(() => {
        if (!router.isReady || !id) return;

        const fetchData = async () => {
            setShowLoading(true);
            try {
                const response = await dispatch(getOrderById(id));
                if (response.status === "success") {
                    setShowDataDisplay(true);
                } else {
                    throw new Error(response.message);
                }
            } catch (error) {
                message.error(error.message);
                isAuth(error);
            } finally {
                setShowLoading(false);
            }
        };

        fetchData();
    }, [router.isReady, id, dispatch]);

    return (
        <Protected title={pageTitle}>
            <Content>
                <Spin spinning={showLoading} tip="Loading...">
                    <Typography.Title level={3}>View Order</Typography.Title>
                    {showDataDisplay ? (
                        <Space direction="vertical" style={{ display: "flex" }}>
                            <OrderDataDisplay order={order} />
                            <Typography.Title level={4}>
                                Ordered Menu
                            </Typography.Title>
                            <RelatedMenuOrder menus={order.menus} />
                        </Space>
                    ) : (
                        ""
                    )}
                </Spin>
            </Content>
        </Protected>
    );
};

export default id;
