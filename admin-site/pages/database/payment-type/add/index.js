import React from "react";
import Content from "../../../../src/components/Layout/Content/Content";
import Protected from "../../../../src/components/Layout/Protected/Protected";
import { Typography } from "antd";
import AddPaymentTypeForm from "../../../../src/components/Form/PaymentType/AddPaymentTypeForm/AddPaymentTypeForm";

const index = () => {
    const pageTitle = "Saso App | Payment Type";

    return (
        <Protected title={pageTitle}>
            <Content>
                <Typography.Title level={3}>Add payment type</Typography.Title>
                <AddPaymentTypeForm />
            </Content>
        </Protected>
    );
};

export default index;
