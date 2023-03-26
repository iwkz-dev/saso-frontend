import React from "react";
import LoggedIn from "../../../src/components/Layout/LoggedIn/LoggedIn";
import AddEventForm from "../../../src/components/Form/Event/AddEventForm/AddEventForm";
import Content from "../../../src/components/Layout/Content/Content";
import { Typography } from "antd";

const index = () => {
    const pageData = {
        name: "Event",
        href: `/event/add/`,
        current: true,
    };
    const pageTitle = "Saso App | Event";

    return (
        <LoggedIn title={pageTitle} pageData={pageData}>
            <Content>
                <Typography.Title level={2}>Add event</Typography.Title>
                <AddEventForm />
            </Content>
        </LoggedIn>
    );
};

export default index;
