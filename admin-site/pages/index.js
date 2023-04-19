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
        getAllData();
    }, []);

    const getAllData = () => {
        setShowLoading(true);
        setShowCard(false);
        Promise.all([dispatch(getAllEvents()), dispatch(getAllOrders())]).then(
            (responses) => {
                const failed = responses.find((r) => r?.status === "failed");
                if (!failed) {
                    setShowCard(true);
                    setShowLoading(false);
                } else {
                    setShowCard(false);
                    setShowLoading(false);
                    message.error(failed.message);
                    isAuth(failed);
                }
            },
        );
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
