import React, { useEffect } from "react";
import MainLayout from "../../components/organismus/MainLayout/MainLayout";
import MyOrderContent from "../../components/organismus/MyOrderContent/MyOrderContent";
import { getOrderList } from "../../stores/reducers/order";
import { useDispatch } from "react-redux";

const index = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getOrderList());
    }, []);

    return (
        <MainLayout>
            <MyOrderContent />
        </MainLayout>
    );
};

export default index;
