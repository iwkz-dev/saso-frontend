import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrderDetail, resetOrderData } from "../../../stores/reducers/order";
import { useRouter } from "next/router";
import MainLayout from "../../../components/organismus/MainLayout/MainLayout";
import MyOrderDetailContent from "../../../components/organismus/MyOrderDetailContent/MyOrderDetailContent";
import { isAuth } from "../../../helpers/authHelper";
import { getEvent } from "../../../stores/reducers/event";

const index = () => {
    const dispatch = useDispatch();
    const detailOrder = useSelector((state) => state.order.data.detailOrder);
    const events = useSelector((state) => state.event.data);
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        if (id && isAuth()) {
            dispatch(getOrderDetail(id));
            dispatch(getEvent("approved"));
        }
    }, [id]);

    useEffect(() => {
        return () => {
            dispatch(resetOrderData());
        };
    }, []);

    return (
        <MainLayout isAuthRequired={true}>
            {detailOrder ? (
                <MyOrderDetailContent
                    detailOrder={detailOrder}
                    events={events}
                />
            ) : null}
        </MainLayout>
    );
};

export default index;
