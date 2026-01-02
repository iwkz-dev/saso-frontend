import { useEffect, useCallback, useState } from "react";
import { message, Spin, Typography } from "antd";
import { useDispatch } from "react-redux";

import Content from "../../../../src/components/Layout/Content/Content";
import Protected from "../../../../src/components/Layout/Protected/Protected";
import AddPaymentTypeForm from "../../../../src/components/Form/PaymentType/AddPaymentTypeForm/AddPaymentTypeForm";
import { getAllEvents } from "../../../../src/store/reducers/eventReducer";
import { isAuth } from "../../../../src/helpers/authHelper";

const Index = () => {
    const pageTitle = "Saso App | Payment Type";
    const dispatch = useDispatch();

    const [showLoading, setShowLoading] = useState(false);
    const [showForm, setShowForm] = useState(false);

    const fetchEvents = useCallback(async () => {
        setShowLoading(true);

        try {
            const result = await dispatch(getAllEvents());

            if (result?.status === "success") {
                setShowForm(true);
            } else {
                message.error(result?.message || "Failed to load data");
                isAuth(result);
                setShowForm(false);
            }
        } catch (err) {
            message.error(err?.message || "Failed to load data");
            isAuth(err);
            setShowForm(false);
        } finally {
            setShowLoading(false);
        }
    }, [dispatch]);

    useEffect(() => {
        fetchEvents();
    }, [fetchEvents]);

    return (
        <Protected title={pageTitle}>
            <Content>
                <Typography.Title level={3}>Add payment type</Typography.Title>

                <Spin spinning={showLoading} tip="Loading...">
                    {showForm && <AddPaymentTypeForm />}
                </Spin>
            </Content>
        </Protected>
    );
};

export default Index;
