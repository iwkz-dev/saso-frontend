import { useEffect, useState } from "react";
import LoggedIn from "../src/components/Layout/LoggedIn/LoggedIn";
import DashboardCard from "../src/components/Card/DashboardCard/DashboardCard";
import Content from "../src/components/Layout/Content/Content";
import { useDispatch } from "react-redux";
import { getAllEvents } from "../src/store/reducers/eventReducer";
import { getAllOrders } from "../src/store/reducers/orderReducer";
import { message, Spin } from "antd";
import { isAuth } from "../src/helpers/authHelper";

const index = () => {
    const dispatch = useDispatch();
    const pageTitle = "Saso App | Dashboard";
    const [showLoading, setShowLoading] = useState(false);
    const [showCard, setShowCard] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setShowLoading(true);
            setShowCard(false);

            const [eventsResponse, ordersResponse] = await Promise.all([
                dispatch(getAllEvents()),
                dispatch(getAllOrders()),
            ]);

            const failedResponse = [eventsResponse, ordersResponse].find(
                (response) => response?.status === "failed",
            );

            if (!failedResponse) {
                setShowCard(true);
            } else {
                handleFailedRequest(failedResponse);
            }

            setShowLoading(false);
        } catch (error) {
            handleFetchError(error);
        }
    };

    const handleFailedRequest = (response) => {
        setShowCard(false);
        setShowLoading(false);
        message.error(response.message);
        isAuth(response);
    };

    const handleFetchError = (error) => {
        // TODO: handle error here
        setShowLoading(false);
        message.error(error.message);
    };

    return (
        <LoggedIn title={pageTitle}>
            <Content>
                <Spin spinning={showLoading} tip="Loading...">
                    {showCard ? <DashboardCard /> : ""}
                </Spin>
            </Content>
        </LoggedIn>
    );
};

export default index;
