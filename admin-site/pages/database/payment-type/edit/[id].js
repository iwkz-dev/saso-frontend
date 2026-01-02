import React, { useEffect, useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { Spin, Typography, message } from "antd";

import Protected from "../../../../src/components/Layout/Protected/Protected";
import Content from "../../../../src/components/Layout/Content/Content";
import { isAuth } from "../../../../src/helpers/authHelper";
import { getDetailPaymentType } from "../../../../src/store/reducers/paymentTypeReducer";
import EditPaymentTypeForm from "../../../../src/components/Form/PaymentType/EditPaymentTypeForm/EditPaymentTypeForm";
import { getAllEvents } from "../../../../src/store/reducers/eventReducer";

const PaymentTypeEditPage = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { id } = router.query;

    const pageTitle = "Saso App | Payment Type";
    const [showForm, setShowForm] = useState(false);
    const [showLoading, setShowLoading] = useState(false);

    const fetchDetail = useCallback(async () => {
        if (!id) return; // safeguard

        setShowLoading(true);

        try {
            const results = await Promise.all([
                dispatch(getAllEvents()),
                dispatch(getDetailPaymentType(id)),
            ]);

            const failed = results.find((r) => r?.status !== "success");
            if (failed) {
                message.error(failed?.message || "Failed to load data");
                isAuth(failed);
                setShowForm(false);
                return;
            }

            setShowForm(true);
        } catch (err) {
            message.error(err?.message || "Failed to load data");
            isAuth(err);
            setShowForm(false);
        } finally {
            setShowLoading(false);
        }
    }, [dispatch, id]);

    useEffect(() => {
        if (!router.isReady || !id) return;
        fetchDetail();
    }, [fetchDetail, id, router.isReady]);

    return (
        <Protected title={pageTitle}>
            <Content>
                <Typography.Title level={3}>Edit payment type</Typography.Title>
                <Spin spinning={showLoading} tip="Loading...">
                    {showForm ? <EditPaymentTypeForm id={id} /> : null}
                </Spin>
            </Content>
        </Protected>
    );
};

export default PaymentTypeEditPage;
