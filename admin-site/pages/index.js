import LoggedInLayout from "../src/components/Layout/loggedInLayout/loggedInLayout";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Loading from "../src/components/common/Loading/Loading";
import { getAllEvents } from "../src/store/reducers/eventReducer";
import { getAllOrders } from "../src/store/reducers/orderReducer";
import Alert from "../src/components/common/Message/Alert/Alert";
import DashboardCard from "../src/components/Card/DashboardCard/DashboardCard";

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
        <LoggedInLayout title={pageTitle} pageData={pageData}>
            <div className="w-10/12 mx-auto">
                <h1 className="text-2xl font-bold text-left w-10/12 mb-3">
                    Dashboard
                </h1>
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
            </div>
        </LoggedInLayout>
    );
};

export default index;
