import React from "react";
import { useRouter } from "next/router";
import Protected from "../../../../src/components/Layout/Protected/Protected";
import Content from "../../../../src/components/Layout/Content/Content";
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
        <Protected title={pageTitle} pageData={pageData}>
            <Content>
                <Typography.Title level={3}>Edit Order</Typography.Title>
            </Content>
        </Protected>
    );
};

export default id;
