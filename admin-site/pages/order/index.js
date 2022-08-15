import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import LoggedInLayout from "../../src/components/Layout/loggedInLayout/loggedInLayout";
import AddItemButton from "../../src/components/common/Button/AddItemButton/AddItemButton";
import Alert from "../../src/components/common/Message/Alert/Alert";
import {
    deleteOrder,
    getAllOrders,
} from "../../src/store/reducers/orderReducer";
import Loading from "../../src/components/common/Loading/Loading";
import OrderTable from "../../src/components/Table/Order/OrderTable/OrderTable";
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
        setShowLoading(true);
        setShowError("");
        const getOrders = async () => {
            return dispatch(getAllOrders());
        };
        getOrders().then((r) => {
            if (r.status === "success") {
                setShowLoading(false);
                setShowTable(true);
            } else {
                setShowLoading(false);
                setShowError(r.message);
                setShowTable(false);
            }
        });
    }, []);

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

    const onChangeStatus = async () => {
        setShowSuccess(false);
        setShowFailed(false);
        setShowUploading(true);
    };

    return (
        <LoggedInLayout title={pageTitle} pageData={pageData}>
            <div className="w-10/12 mx-auto">
                <h1 className="text-2xl font-bold text-left w-10/12 mb-3">
                    Order
                </h1>
                <div className="flex justify-between items-center mb-3">
                    <AddItemButton hrefLink="/order/add" text="Add Order" />
                </div>
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
