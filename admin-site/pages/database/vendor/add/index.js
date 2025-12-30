import React from "react";
import Content from "../../../../src/components/Layout/Content/Content";
import Protected from "../../../../src/components/Layout/Protected/Protected";
import { Typography } from "antd";
import AddVendorForm from "../../../../src/components/Form/Vendor/AddVendorForm/AddVendorForm";

const index = () => {
    const pageTitle = "Saso App | Category";

    return (
        <Protected title={pageTitle}>
            <Content>
                <Typography.Title level={3}>Add vendor</Typography.Title>
                <AddVendorForm />
            </Content>
        </Protected>
    );
};

export default index;
