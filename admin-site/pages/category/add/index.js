import React from "react";
import AddCategoryForm from "../../../src/components/Form/Category/AddCategoryForm/AddCategoryForm";
import Content from "../../../src/components/Layout/Content/Content";
import LoggedIn from "../../../src/components/Layout/LoggedIn/LoggedIn";

const index = () => {
    const pageTitle = "Saso App | Category";

    return (
        <LoggedIn title={pageTitle}>
            <Content>
                <h1 className="text-2xl font-bold text-left mb-3">
                    Add category
                </h1>
                <AddCategoryForm />
            </Content>
        </LoggedIn>
    );
};

export default index;
