import React from "react";
import AddCategoryForm from "../../../../src/components/Form/Category/AddCategoryForm/AddCategoryForm";
import Content from "../../../../src/components/Layout/Content/Content";
import Protected from "../../../../src/components/Layout/Protected/Protected";
import { Typography } from "antd";

const index = () => {
    const pageTitle = "Saso App | Category";

    return (
        <Protected title={pageTitle}>
            <Content>
                <Typography.Title level={3}>Add category</Typography.Title>
                <AddCategoryForm />
            </Content>
        </Protected>
    );
};

export default index;
