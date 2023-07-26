import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrderDetail } from "../../../stores/reducers/order";
import { useRouter } from "next/router";
import MainLayout from "../../../components/organismus/MainLayout/MainLayout";
import MyOrderDetailContent from "../../../components/organismus/MyOrderDetailContent/MyOrderDetailContent";

const index = () => {
    const dispatch = useDispatch();
    const detailOrder = useSelector((state) => state.order.data.detailOrder);
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        if (id) {
            dispatch(getOrderDetail(id));
        }
    }, [id]);

    return (
        <MainLayout>
            {detailOrder ? (
                <MyOrderDetailContent detailOrder={detailOrder} />
            ) : null}
        </MainLayout>
    );
};

export default index;
