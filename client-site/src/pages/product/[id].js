// pages/product/[id].jsx (example path)
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { Spin, Alert } from "antd";

import MainLayout from "../../components/organismus/MainLayout/MainLayout";
import ProductDetailContent from "../../components/organismus/ProductDetailContent/ProductDetailContent";

import {
    fetchMenuById,
    selectMenuDetail,
    selectMenuDetailStatus,
    selectMenuError,
} from "../../stores/reducers/menu";

import { fetchEvents } from "../../stores/reducers/event";

function ProductDetail() {
    const dispatch = useDispatch();
    const router = useRouter();
    const { id } = router.query;

    const detailMenu = useSelector(selectMenuDetail);
    const detailStatus = useSelector(selectMenuDetailStatus);
    const error = useSelector(selectMenuError);

    // Fetch event (if your layout depends on it)
    useEffect(() => {
        dispatch(fetchEvents("approved"));
    }, [dispatch]);

    // Fetch product detail when the router is ready and id exists
    useEffect(() => {
        if (!router.isReady) return;
        if (id) dispatch(fetchMenuById(id));
    }, [dispatch, router.isReady, id]);

    return (
        <MainLayout>
            {detailStatus === "loading" && (
                <div style={{ display: "flex", justifyContent: "center", padding: 24 }}>
                    <Spin />
                </div>
            )}

            {detailStatus === "failed" && (
                <Alert type="error" message="Failed to load product" description={error} />
            )}

            {detailStatus === "succeeded" && (
                <ProductDetailContent detailMenu={detailMenu} />
            )}
        </MainLayout>
    );
}

export default ProductDetail;
