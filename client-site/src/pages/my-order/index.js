import { useEffect } from "react";
import MainLayout from "../../components/organismus/MainLayout/MainLayout";
import MyOrderContent from "../../components/organismus/MyOrderContent/MyOrderContent";
import { getOrderList } from "../../stores/reducers/order";
import { useDispatch } from "react-redux";
import { isAuth } from "../../helpers/authHelper";
import { fetchEvents } from "../../stores/reducers/event";

const index = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        if (isAuth()) {
            dispatch(getOrderList());
            dispatch(fetchEvents("approved"));
        }
    }, []);

    return (
        <MainLayout isAuthRequired={true}>
            <MyOrderContent />
        </MainLayout>
    );
};

export default index;
