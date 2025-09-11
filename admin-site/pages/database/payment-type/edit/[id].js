import React, { useEffect, useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import LoggedIn from "../../../../src/components/Layout/LoggedIn/LoggedIn";
import Content from "../../../../src/components/Layout/Content/Content";
import { Spin, Typography, message } from "antd";
import { isAuth } from "../../../../src/helpers/authHelper";
import { getDetailPaymentType } from "../../../../src/store/reducers/paymentTypeReducer";
import EditPaymentTypeForm from "../../../../src/components/Form/PaymentType/EditPaymentTypeForm/EditPaymentTypeForm";

const PaymentTypeEditPage = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { id } = router.query;

    const pageTitle = "Saso App | Payment Type";
    const [showForm, setShowForm] = useState(false);
    const [showLoading, setShowLoading] = useState(false);

    const fetchDetail = useCallback(async () => {
        if (!router.isReady || !id) return;

        setShowLoading(true);
        try {
            const res = await dispatch(getDetailPaymentType(id)); // wrapper returns payload
            if (res?.status === "success") {
                setShowForm(true);
            } else {
                message.error(res?.message || "Failed to load payment type");
                isAuth(res);
                setShowForm(false);
            }
        } catch (err) {
            message.error(err?.message || "Failed to load payment type");
            isAuth(err);
            setShowForm(false);
        } finally {
            setShowLoading(false);
        }
    }, [dispatch, id, router.isReady]);

    useEffect(() => {
        fetchDetail();
    }, [fetchDetail]);

    return (
        <LoggedIn title={pageTitle}>
            <Content>
                <Typography.Title level={3}>Edit payment type</Typography.Title>
                <Spin spinning={showLoading} tip="Loading...">
                    {showForm ? <EditPaymentTypeForm id={id} /> : null}
                </Spin>
            </Content>
        </LoggedIn>
    );
};

export default PaymentTypeEditPage;
