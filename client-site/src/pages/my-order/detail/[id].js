import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrderDetail, resetOrderData } from "../../../stores/reducers/order";
import { useRouter } from "next/router";
import MainLayout from "../../../components/organismus/MainLayout/MainLayout";
import MyOrderDetailContent from "../../../components/organismus/MyOrderDetailContent/MyOrderDetailContent";
import { isAuth } from "../../../helpers/authHelper";

const index = () => {
    const dispatch = useDispatch();
    const detailOrder = useSelector((state) => state.order.data.detailOrder);
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        if (id && isAuth()) {
            dispatch(getOrderDetail(id));
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
                <MyOrderDetailContent detailOrder={detailOrder} />
            ) : null}
        </MainLayout>
    );
};

export default index;
