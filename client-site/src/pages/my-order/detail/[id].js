import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    getOrderDetail,
    resetOrderState,
} from "../../../stores/reducers/order";
import { useRouter } from "next/router";
import MainLayout from "../../../components/organismus/MainLayout/MainLayout";
import MyOrderDetailContent from "../../../components/organismus/MyOrderDetailContent/MyOrderDetailContent";
import { isAuth } from "../../../helpers/authHelper";
import { fetchEvents } from "../../../stores/reducers/event";
import { Empty, Spin } from "antd";

const MyOrderDetailPage = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { id } = router.query;

    const detailOrder = useSelector((state) => state.order.detail);
    const events = useSelector((state) => state.event.data);
    const detailStatus = useSelector((state) => state.order.detailStatus);

    useEffect(() => {
        if (!router.isReady) return;
        if (!isAuth()) return;

        const orderId = Array.isArray(id) ? id[0] : id;
        if (orderId) {
            dispatch(getOrderDetail(orderId));
            dispatch(fetchEvents("approved"));
        }
    }, [router.isReady, id, dispatch]);

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
                <MyOrderDetailContent
                    detailOrder={detailOrder}
                    events={events}
                />
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
