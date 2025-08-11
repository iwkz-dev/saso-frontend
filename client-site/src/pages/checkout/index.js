import { useEffect } from "react";
import { useDispatch } from "react-redux";
import MainLayout from "../../components/organismus/MainLayout/MainLayout";
import CheckoutContent from "../../components/organismus/CheckoutContent/CheckoutContent";
import { fetchEvents } from "../../stores/reducers/event";

export default function CheckoutPage() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchEvents("approved"));
    }, [dispatch]);

    return (
        <MainLayout>
            <CheckoutContent />
        </MainLayout>
    );
}
