import { Typography } from "antd";

import Content from "../../../../src/components/Layout/Content/Content";
import Protected from "../../../../src/components/Layout/Protected/Protected";
import AddPaymentTypeForm from "../../../../src/components/Form/PaymentType/AddPaymentTypeForm/AddPaymentTypeForm";

const Index = () => {
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

export default Index;
