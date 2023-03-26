import LoggedIn from "../../../src/components/Layout/LoggedIn/LoggedIn";
import React from "react";
import Content from "../../../src/components/Layout/Content/Content";
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
        <LoggedIn title={pageTitle} pageData={pageData}>
            <Content>
                <Typography.Title level={2}>Add Order</Typography.Title>
            </Content>
        </LoggedIn>
    );
};

export default index;
