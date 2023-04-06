import React from "react";
import AddCategoryForm from "../../../src/components/Form/Category/AddCategoryForm/AddCategoryForm";
import Content from "../../../src/components/Layout/Content/Content";
import LoggedIn from "../../../src/components/Layout/LoggedIn/LoggedIn";
import { Typography } from "antd";

const index = () => {
    const pageTitle = "Saso App | Category";

    return (
        <LoggedIn title={pageTitle}>
            <Content>
                <Typography.Title level={2}>Add category</Typography.Title>
                <AddCategoryForm />
            </Content>
        </LoggedIn>
    );
};

export default index;
