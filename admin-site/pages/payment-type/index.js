import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllPaymentTypes } from "../../src/store/reducers/paymentTypeReducer";
import { Space, Typography, message } from "antd";
import { isAuth } from "../../src/helpers/authHelper";
import LoggedIn from "../../src/components/Layout/LoggedIn/LoggedIn";
import PaymentTypeTable from "../../src/components/Table/PaymentType/PaymentTypeTable/PaymentTypeTable";
import Content from "../../src/components/Layout/Content/Content";

const index = () => {
    const dispatch = useDispatch();
    const pageTitle = "Saso App | Payment Type";
    const [showTable, setShowTable] = useState(false);
    const [showLoadingData, setShowLoadingData] = useState(false);

    useEffect(() => {
        getPaymentTypes();
    }, []);

    const getPaymentTypes = () => {
        setShowLoadingData(true);
        const getEvents = async () => {
            return dispatch(getAllPaymentTypes());
        };
        getEvents().then((r) => {
            if (r.status === "success") {
                setShowLoadingData(false);
                setShowTable(true);
            } else {
                setShowLoadingData(false);
                message.error(r.message);
                setShowTable(false);
                isAuth(r);
            }
        });
    };

    return (
        <LoggedIn title={pageTitle}>
            <Content>
                <Typography.Title level={3}>Payment Type</Typography.Title>
                <Space direction="vertical" style={{ display: "flex" }}>
                    <PaymentTypeTable
                        isLoading={showLoadingData}
                        showTable={showTable}
                    />
                </Space>
            </Content>
        </LoggedIn>
    );
};

export default index;
