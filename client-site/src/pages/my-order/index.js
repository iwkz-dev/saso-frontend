import React, { useEffect } from "react";
import MainLayout from "../../components/organismus/MainLayout/MainLayout";
import MyOrderContent from "../../components/organismus/MyOrderContent/MyOrderContent";
import { getOrderList } from "../../stores/reducers/order";
import { useDispatch } from "react-redux";
import { isAuth } from "../../helpers/authHelper";

const index = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        if (isAuth()) {
            dispatch(getOrderList());
        }
    }, []);

    return (
        <MainLayout isAuthRequired={true}>
            <MyOrderContent />
        </MainLayout>
    );
};

export default index;
