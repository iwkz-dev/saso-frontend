import React from "react";
import { useRouter } from "next/router";
import LoggedIn from "../../../src/components/Layout/LoggedIn/LoggedIn";
import Content from "../../../src/components/Layout/Content/Content";
import { Typography } from "antd";

const id = () => {
    const router = useRouter();
    const { id } = router.query;
    const pageData = {
        name: "Order",
        href: `/order/edit/${id}`,
        current: true,
    };
    const pageTitle = "Saso App | Order";

    // TODO edit form
    return (
        <LoggedIn title={pageTitle} pageData={pageData}>
            <Content>
                <Typography.Title level={3}>Edit Order</Typography.Title>
            </Content>
        </LoggedIn>
    );
};

export default id;
