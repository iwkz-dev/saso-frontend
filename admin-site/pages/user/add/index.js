import React from "react";
import LoggedInLayout from "../../../src/components/Layout/loggedInLayout/loggedInLayout";

const index = () => {
    const pageData = {
        name: "User",
        href: `/user/add/`,
        current: true,
    };
    const pageTitle = "Saso App | User";

    return (
        <LoggedInLayout title={pageTitle} pageData={pageData}>
            <p>add user is here</p>
        </LoggedInLayout>
    );
};

export default index;
