import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import LoggedInLayout from "../../src/components/Layout/loggedInLayout/loggedInLayout";
import Alert from "../../src/components/common/Message/Alert/Alert";
import {
    changeOrderStatus,
    deleteOrder,
    getAllOrders,
} from "../../src/store/reducers/orderReducer";
import Loading from "../../src/components/common/Loading/Loading";
import OrderTable from "../../src/components/Table/Order/OrderTable/OrderTable";
import { getAllEvents } from "../../src/store/reducers/eventReducer";
const index = () => {
    const dispatch = useDispatch();
    const pageData = { name: "Order", href: "/order", current: true };
    const pageTitle = "Saso App | Order";
    const [showTable, setShowTable] = useState(false);
    const [showLoading, setShowLoading] = useState(false);
    const [showError, setShowError] = useState("");
    const [showSuccess, setShowSuccess] = useState(false);
    const [showFailed, setShowFailed] = useState(false);
    const [showUploading, setShowUploading] = useState(false);

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
                    setShowTable(true);
                    setShowLoading(false);
                } else {
                    setShowTable(false);
                    setShowLoading(false);
                    setShowError(failed.message);
                }
            },
        );
    };

    const onChangeStatus = async (e, id) => {
        setShowSuccess(false);
        setShowFailed(false);
        setShowUploading(true);
        try {
            const onChangeStatus = await dispatch(
                changeOrderStatus(id, e.target.value),
            );
            setShowSuccess(onChangeStatus.message);
            if (onChangeStatus.status !== "failed") {
                setShowUploading(false);
                setShowSuccess(onChangeStatus.message);
                try {
                    setShowUploading(true);
                    const getOrders = await dispatch(getAllOrders());
                    if (getOrders.status !== "failed") {
                        setShowUploading(false);
                    } else {
                        setShowUploading(false);
                        setShowFailed(getOrders.message);
                    }
                } catch (e) {
                    //TODO: handle error here
                    setShowUploading(false);
                    setShowFailed(e);
                }
            } else {
                setShowUploading(false);
                setShowFailed(onChangeStatus.message);
            }
        } catch (error) {
            setShowUploading(false);
            setShowFailed(true);
        }
    };

    const onDelete = async (item) => {
        const isConfirm = confirm(
            `Please confirm this if you want to delete "${item.invoiceNumber}"`,
        );
        if (isConfirm) {
            setShowFailed(false);
            setShowSuccess(false);
            setShowUploading(true);
        }
        if (isConfirm) {
            setShowFailed(false);
            setShowSuccess(false);
            setShowUploading(true);
            try {
                const onDelete = await dispatch(deleteOrder(item["_id"]));
                if (onDelete.status !== "failed") {
                    setShowUploading(false);
                    setShowSuccess(onDelete.message);
                    try {
                        setShowUploading(true);
                        const getOrders = await dispatch(getAllOrders());
                        if (getOrders.status !== "failed") {
                            setShowUploading(false);
                        } else {
                            setShowUploading(false);
                            setShowFailed(getOrders.message);
                        }
                    } catch (e) {
                        //TODO: handle error here
                        setShowUploading(false);
                        setShowFailed(e);
                    }
                } else {
                    setShowUploading(false);
                    setShowFailed(onDelete.message);
                }
            } catch (e) {
                //TODO: handle error here
                setShowUploading(false);
                setShowFailed(e);
            }
        }
    };

    return (
        <LoggedInLayout title={pageTitle} pageData={pageData}>
            <div className="w-10/12 mx-auto">
                <h1 className="text-2xl font-bold text-left w-10/12 mb-3">
                    Order
                </h1>
                <Alert
                    showFailed={showFailed}
                    showSuccess={showSuccess}
                    setShowFailed={setShowFailed}
                    setShowSuccess={setShowSuccess}
                    successMessage={showSuccess}
                    failedMessage={showFailed}
                    showUploading={showUploading}
                />
                {showError || ""}
                {showLoading ? (
                    <Loading />
                ) : showTable ? (
                    <OrderTable
                        onDelete={onDelete}
                        onChangeStatus={onChangeStatus}
                        showFailed={showFailed}
                        showSuccess={showSuccess}
                        setShowFailed={setShowFailed}
                        setShowSuccess={setShowSuccess}
                        showUploading={showUploading}
                        setShowUploading={setShowUploading}
                    />
                ) : (
                    ""
                )}
            </div>
        </LoggedInLayout>
    );
};

export default index;
