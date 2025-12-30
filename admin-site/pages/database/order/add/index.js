import Protected from "../../../../src/components/Layout/Protected/Protected";
import React from "react";
import Content from "../../../../src/components/Layout/Content/Content";
import { Typography } from "antd";

const index = () => {
    const pageData = {
        name: "Order",
        href: `/order/add/`,
        current: true,
    };
    const pageTitle = "Saso App | Order";

    //TODO add form
    return (
        <Protected title={pageTitle} pageData={pageData}>
            <Content>
                <Typography.Title level={3}>Add Order</Typography.Title>
            </Content>
        </Protected>
    );
};

export default index;
