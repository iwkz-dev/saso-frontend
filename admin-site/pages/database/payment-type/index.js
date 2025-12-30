import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    deletePaymentType,
    getAllPaymentTypes,
} from "../../../src/store/reducers/paymentTypeReducer";
import { Space, Typography, message } from "antd";
import { isAuth } from "../../../src/helpers/authHelper";
import Protected from "../../../src/components/Layout/Protected/Protected";
import PaymentTypeTable from "../../../src/components/Table/PaymentType/PaymentTypeTable/PaymentTypeTable";
import Content from "../../../src/components/Layout/Content/Content";
import AddItemButton from "../../../src/components/common/Button/AddItemButton/AddItemButton";

const Index = () => {
    const dispatch = useDispatch();
    const pageTitle = "Saso App | Payment Type";

    const paymentTypes = useSelector((s) => s.paymentType.paymentTypes);

    const [showTable, setShowTable] = useState(false);
    const [showLoadingData, setShowLoadingData] = useState(false);

    const fetchPaymentTypes = useCallback(async () => {
        setShowLoadingData(true);
        try {
            const res = await dispatch(getAllPaymentTypes());
            if (res?.status === "success") {
                setShowTable(true);
            } else {
                setShowTable(false);
                message.error(res?.message || "Failed to load payment types");
                isAuth(res);
            }
        } catch (err) {
            // unexpected throw
            setShowTable(false);
            message.error(err?.message || "Failed to load payment types");
            isAuth(err);
        } finally {
            setShowLoadingData(false);
        }
    }, [dispatch]);

    useEffect(() => {
        fetchPaymentTypes();
    }, [fetchPaymentTypes]);

    const onDelete = async (item) => {
        const ok = window.confirm(
            `Please confirm this if you want to delete "${item.name}"`,
        );
        if (!ok) return;

        setShowLoadingData(true);
        try {
            const res = await dispatch(deletePaymentType(item["_id"]));
            if (res?.status !== "failed") {
                message.success(res?.message || "Deleted");
                await fetchPaymentTypes();
            } else {
                message.error(res?.message || "Delete failed");
                isAuth(res);
            }
        } catch (e) {
            message.error(e?.message || "Delete failed");
            isAuth(e);
        } finally {
            setShowLoadingData(false);
        }
    };

    return (
        <Protected title={pageTitle}>
            <Content>
                <Typography.Title level={3}>Payment Type</Typography.Title>
                <Space direction="vertical" style={{ display: "flex" }}>
                    <AddItemButton
                        hrefLink="/database/payment-type/add"
                        text="Add Payment Type"
                    />
                    <PaymentTypeTable
                        isLoading={showLoadingData}
                        showTable={showTable && (paymentTypes?.length ?? 0) > 0}
                        onDelete={onDelete}
                    />
                </Space>
            </Content>
        </Protected>
    );
};

export default Index;
