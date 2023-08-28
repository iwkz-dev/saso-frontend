import React from "react";
import Content from "../../../src/components/Layout/Content/Content";
import LoggedIn from "../../../src/components/Layout/LoggedIn/LoggedIn";
import { Typography } from "antd";
import AddPaymentTypeForm from "../../../src/components/Form/PaymentType/AddPaymentTypeForm/AddPaymentTypeForm";

const index = () => {
    const pageTitle = "Saso App | Payment Type";

    return (
        <LoggedIn title={pageTitle}>
            <Content>
                <Typography.Title level={3}>Add payment type</Typography.Title>
                <AddPaymentTypeForm />
            </Content>
        </LoggedIn>
    );
};

export default index;
