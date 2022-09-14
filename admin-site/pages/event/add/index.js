import React from "react";
import LoggedInLayout from "../../../src/components/Layout/loggedInLayout/loggedInLayout";
import AddEventForm from "../../../src/components/Form/Event/AddEventForm/AddEventForm";

const index = () => {
    const pageData = {
        name: "Event",
        href: `/event/add/`,
        current: true,
    };
    const pageTitle = "Saso App | Event";

    return (
        <LoggedInLayout title={pageTitle} pageData={pageData}>
            <div className="w-10/12 mx-auto">
                <h1 className="text-2xl font-bold text-left mb-3">Add event</h1>
                <AddEventForm />
            </div>
        </LoggedInLayout>
    );
};

export default index;
