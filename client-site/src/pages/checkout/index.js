import MainLayout from "../../components/organismus/MainLayout/MainLayout";
import CheckoutContent from "../../components/organismus/CheckoutContent/CheckoutContent";
import { useEffect } from "react";
import { getEvent } from "../../stores/reducers/event";
import { useDispatch } from "react-redux";

const index = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const status = "approved";
        dispatch(getEvent(status));
    }, []);

    return (
        <MainLayout>
            <CheckoutContent />
        </MainLayout>
    );
};

export default index;
