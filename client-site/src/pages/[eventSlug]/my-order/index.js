import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getOrderList } from "../../../stores/reducers/order";
import MainLayout from "../../../components/organismus/MainLayout/MainLayout";
import MyOrderContent from "../../../components/organismus/MyOrderContent/MyOrderContent";

const Index = () => {
    const dispatch = useDispatch();
    const event = useSelector((state) => state.event.data);
    const { isAuthenticated } = useSelector((state) => state.auth);

    useEffect(() => {
        if (!isAuthenticated || !event) return;

        const eventId = Array.isArray(event) ? event[0]?._id : event._id;

        if (!eventId) return;

        dispatch(getOrderList(eventId));
    }, [dispatch, event, isAuthenticated]);

    return (
        <MainLayout isAuthRequired={true}>
            <MyOrderContent />
        </MainLayout>
    );
};

export default Index;
