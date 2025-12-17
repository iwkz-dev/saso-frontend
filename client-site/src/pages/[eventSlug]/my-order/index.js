import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { isAuth } from "../../../helpers/authHelper";
import { getOrderList } from "../../../stores/reducers/order";
import MainLayout from "../../../components/organismus/MainLayout/MainLayout";
import MyOrderContent from "../../../components/organismus/MyOrderContent/MyOrderContent";

const index = () => {
    const dispatch = useDispatch();
    const event = useSelector((state) => state.event.data);

    useEffect(() => {
        if (!isAuth() || !event) return;

        const eventId = Array.isArray(event) ? event[0]?._id : event._id;

        if (!eventId) return;

        dispatch(getOrderList(eventId));
    }, [dispatch, event]);

    return (
        <MainLayout isAuthRequired={true}>
            <MyOrderContent />
        </MainLayout>
    );
};

export default index;
