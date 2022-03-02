import React from "react";
import LoggedInLayout from "../../src/components/Layout/loggedInLayout/loggedInLayout";

const index = () => {
    const pageData = { name: "Order", href: "/order", current: true };
    const pageTitle = "Saso App | Order";

    return (
        <LoggedInLayout title={pageTitle} pageData={pageData}>
            <h1 className="text-2xl font-bold text-left w-10/12 mb-3">Order</h1>
        </LoggedInLayout>
    );
};

export default index;
