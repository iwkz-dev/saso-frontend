import React from "react";
import Table from "../../Table";
import { useSelector } from "react-redux";

const ContactPersonTable = ({ onDelete, isLoading, showTable }) => {
    const contactPerson = useSelector(
        (state) => state.contactPerson.contactPerson,
    );
    const events = useSelector((state) => state.event.events);

    const tableHead = {
        name: "Name",
        phoneNumber: "Phone Number",
        event: "Event",
        created_at: "Created At",
        updated_at: "Updated At",
    };

    return (
        <Table
            onDelete={onDelete}
            data={showTable ? contactPerson : []}
            dataHead={tableHead}
            events={events}
            emptyMessage="Contact Person is empty"
            linkToEdit="/contact-person/edit/"
            isLoading={isLoading}
        />
    );
};

export default ContactPersonTable;
