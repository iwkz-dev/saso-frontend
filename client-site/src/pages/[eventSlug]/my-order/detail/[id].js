import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Empty, Spin } from "antd";
import { useRouter } from "next/router";

import {
    getOrderDetail,
    resetOrderState,
} from "../../../../stores/reducers/order";
import MainLayout from "../../../../components/organismus/MainLayout/MainLayout";
import MyOrderDetailContent from "../../../../components/organismus/MyOrderDetailContent/MyOrderDetailContent";

const MyOrderDetailPage = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { id } = router.query;

    const detailOrder = useSelector((state) => state.order.detail);
    const event = useSelector((state) => state.event.data);
    const detailStatus = useSelector((state) => state.order.detailStatus);

    // ✅ auth state from Redux
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    useEffect(() => {
        if (!router.isReady) return;
        if (!isAuthenticated) return;

        const orderId = Array.isArray(id) ? id[0] : id;
        if (orderId) {
            dispatch(getOrderDetail(orderId));
        }
    }, [router.isReady, id, isAuthenticated, dispatch]);

    useEffect(() => {
        return () => {
            dispatch(resetOrderState());
        };
    }, [dispatch]);

    return (
        <MainLayout isAuthRequired={true}>
            {detailStatus === "loading" && (
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        padding: 24,
                    }}>
                    <Spin />
                </div>
            )}

            {detailStatus === "succeeded" && detailOrder && (
                <MyOrderDetailContent detailOrder={detailOrder} event={event} />
            )}

            {detailStatus === "failed" && (
                <div style={{ padding: 24 }}>
                    <Empty description="Failed to load order detail" />
                </div>
            )}
        </MainLayout>
    );
};

export default MyOrderDetailPage;
