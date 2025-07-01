import React from "react";
import Content from "../../../../src/components/Layout/Content/Content";
import LoggedIn from "../../../../src/components/Layout/LoggedIn/LoggedIn";
import { Typography } from "antd";
import AddVendorForm from "../../../../src/components/Form/Vendor/AddVendorForm/AddVendorForm";

const index = () => {
    const pageTitle = "Saso App | Category";

    return (
        <LoggedIn title={pageTitle}>
            <Content>
                <Typography.Title level={3}>Add vendor</Typography.Title>
                <AddVendorForm />
            </Content>
        </LoggedIn>
    );
};

export default index;
