import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MainLayout from "../../components/organismus/MainLayout/MainLayout";
import ProductDetailContent from "../../components/organismus/ProductDetailContent/ProductDetailContent";
import { getMenuWithId } from "../../stores/reducers/menu";
import { useRouter } from "next/router";
import { getEvent } from "../../stores/reducers/event";

const productDetail = () => {
    const dispatch = useDispatch();
    const detailMenu = useSelector((state) => state.menu.menuDetail);
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        const status = "approved";
        dispatch(getEvent(status));
    }, []);

    useEffect(() => {
        if (id) {
            dispatch(getMenuWithId(id));
        }
    }, [id]);

    return (
        <MainLayout>
            <ProductDetailContent detailMenu={detailMenu} />
        </MainLayout>
    );
};

export default productDetail;
