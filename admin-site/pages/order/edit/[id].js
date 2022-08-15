import { useRouter } from "next/router";
import LoggedInLayout from "../../../src/components/Layout/loggedInLayout/loggedInLayout";
import React from "react";

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
        <LoggedInLayout title={pageTitle} pageData={pageData}>
            <div className="w-10/12">
                <h1 className="text-2xl font-bold text-left mb-3">Edit Order</h1>
            </div>
        </LoggedInLayout>
    );
};

export default id;
