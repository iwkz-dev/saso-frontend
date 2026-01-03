import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Space, Typography, message } from "antd";

import {
    deletePaymentType,
    getAllPaymentTypes,
} from "../../../src/store/reducers/paymentTypeReducer";
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
    const [showLoading, setShowLoading] = useState(false);

    const fetchPaymentTypes = useCallback(async () => {
        setShowLoading(true);

        let cancelled = false;
        try {
            const result = await dispatch(getAllPaymentTypes());

            if (result?.status !== "success") {
                if (!cancelled) {
                    message.error(
                        result?.message || "Failed to load prerequisites",
                    );
                    isAuth(result);
                }
                return;
            }

            if (!cancelled) setShowTable(true);
        } catch (err) {
            if (!cancelled) {
                message.error(err?.message || "Failed to load prerequisites");
                isAuth(err);
            }
        } finally {
            if (!cancelled) setShowLoading(false);
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

        setShowLoading(true);
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
            setShowLoading(false);
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
                        isLoading={showLoading}
                        showTable={showTable && (paymentTypes?.length ?? 0) > 0}
                        onDelete={onDelete}
                    />
                </Space>
            </Content>
        </Protected>
    );
};

export default Index;
