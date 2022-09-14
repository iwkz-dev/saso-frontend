import React from "react";
import AddCategoryForm from "../../../src/components/Form/Category/AddCategoryForm/AddCategoryForm";
import LoggedInLayout from "../../../src/components/Layout/loggedInLayout/loggedInLayout";

const index = () => {
    const pageData = {
        name: "Category",
        href: `/category/add/`,
        current: true,
    };
    const pageTitle = "Saso App | Category";

    return (
        <LoggedInLayout title={pageTitle} pageData={pageData}>
            <div className="w-10/12 mx-auto">
                <h1 className="text-2xl font-bold text-left mb-3">
                    Add category
                </h1>
                <AddCategoryForm />
            </div>
        </LoggedInLayout>
    );
};

export default index;
