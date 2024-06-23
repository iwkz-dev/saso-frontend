import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import LoggedIn from "../../../../src/components/Layout/LoggedIn/LoggedIn";
import Content from "../../../../src/components/Layout/Content/Content";
import { Spin, Typography, message } from "antd";
import { isAuth } from "../../../../src/helpers/authHelper";
import { getDetailPaymentType } from "../../../../src/store/reducers/paymentTypeReducer";
import EditPaymentTypeForm from "../../../../src/components/Form/PaymentType/EditPaymentTypeForm/EditPaymentTypeForm";

const id = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { id } = router.query;
    const pageTitle = "Saso App | Payment Type";
    const [showForm, setShowForm] = useState(false);
    const [showLoading, setShowLoading] = useState(false);

    useEffect(() => {
        setShowLoading(true);
        if (id) {
            const getCategory = async () => {
                return dispatch(getDetailPaymentType(id));
            };
            getCategory().then((r) => {
                if (r.status === "success") {
                    setShowForm(true);
                    setShowLoading(false);
                } else {
                    setShowLoading(false);
                    message.error(r.message);
                    isAuth(r);
                }
            });
        }
    }, [id]);

    return (
        <LoggedIn title={pageTitle}>
            <Content>
                <Spin spinning={showLoading} tip="Loading...">
                    <Typography.Title level={3}>
                        Edit payment type
                    </Typography.Title>
                    {showForm ? <EditPaymentTypeForm id={id} /> : ""}
                </Spin>
            </Content>
        </LoggedIn>
    );
};

export default id;
