import React, { useEffect } from "react";
import MainLayout from "../../components/organismus/MainLayout/MainLayout";
import MyOrderContent from "../../components/organismus/MyOrderContent/MyOrderContent";
import { getOrderList } from "../../stores/reducers/order";
import { useDispatch } from "react-redux";
import { isAuth } from "../../helpers/authHelper";
import { getEvent } from "../../stores/reducers/event";

const index = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        if (isAuth()) {
            dispatch(getOrderList());
            dispatch(getEvent("approved"));
        }
    }, []);

    return (
        <MainLayout isAuthRequired={true}>
            <MyOrderContent />
        </MainLayout>
    );
};

export default index;
