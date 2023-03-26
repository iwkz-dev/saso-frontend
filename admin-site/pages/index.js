import LoggedIn from "../src/components/Layout/LoggedIn/LoggedIn";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Loading from "../src/components/common/Loading/Loading";
import { getAllEvents } from "../src/store/reducers/eventReducer";
import { getAllOrders } from "../src/store/reducers/orderReducer";
import Alert from "../src/components/common/Message/Alert/Alert";
import DashboardCard from "../src/components/Card/DashboardCard/DashboardCard";
import Content from "../src/components/Layout/Content/Content";
import { Typography } from "antd";

const index = () => {
    const dispatch = useDispatch();
    const pageData = { name: "Dashboard", href: "/", current: true };
    const pageTitle = "Saso App | Dashboard";
    const [showLoading, setShowLoading] = useState(false);
    const [showError, setShowError] = useState("");
    const [showSuccess, setShowSuccess] = useState(false);
    const [showFailed, setShowFailed] = useState(false);
    const [showCard, setShowCard] = useState(false);

    useEffect(() => {
        getAllData();
    }, []);

    const getAllData = () => {
        setShowLoading(true);
        setShowError("");
        Promise.all([dispatch(getAllEvents()), dispatch(getAllOrders())]).then(
            (responses) => {
                const failed = responses.find((r) => r?.status === "failed");
                if (!failed) {
                    setShowCard(true);
                    setShowLoading(false);
                } else {
                    setShowCard(false);
                    setShowLoading(false);
                    setShowError(failed.message);
                }
            },
        );
    };

    return (
        <LoggedIn title={pageTitle} pageData={pageData}>
            <Content>
                <Typography.Title level={2}>Dashboard</Typography.Title>
                <Alert
                    showFailed={showFailed}
                    showSuccess={showSuccess}
                    setShowFailed={setShowFailed}
                    setShowSuccess={setShowSuccess}
                    successMessage={showSuccess}
                    failedMessage={showFailed}
                />
                {showError || ""}
                {showLoading ? <Loading /> : showCard ? <DashboardCard /> : ""}
            </Content>
        </LoggedIn>
    );
};

export default index;
