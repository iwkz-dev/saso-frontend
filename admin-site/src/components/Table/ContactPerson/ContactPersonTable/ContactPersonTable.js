import React, { useMemo } from "react";
import Table from "../../Table";
import { useSelector } from "react-redux";

const ContactPersonTable = ({ onDelete, isLoading, showTable }) => {
    const contactPerson =
        useSelector((state) => state?.contactPerson?.contactPerson) ?? [];
    const events = useSelector((state) => state?.event?.events) ?? [];

    const tableHead = useMemo(
        () => [
            { key: "name", dataIndex: "name", title: "Name" },
            {
                key: "phoneNumber",
                dataIndex: "phoneNumber",
                title: "Phone Number",
            },
            {
                key: "event",
                dataIndex: "event",
                title: "Event",
                filterMode: "menu",
                filterSearch: true,
                filters: events.map((event) => ({
                    text: event.name,
                    value: event._id,
                })),
                onFilter: (value, record) => {
                    const ev = record?.event;
                    // Keep original intent (includes), but be defensive about types
                    if (Array.isArray(ev))
                        return ev.map(String).includes(String(value));
                    return String(ev ?? "").includes(String(value));
                },
            },
            { key: "created_at", dataIndex: "created_at", title: "Created At" },
            { key: "updated_at", dataIndex: "updated_at", title: "Updated At" },
        ],
        [events],
    );

    return (
        <Table
            onDelete={onDelete}
            data={showTable ? contactPerson : []}
            dataHead={tableHead}
            events={events}
            emptyMessage="Contact Person is empty"
            linkToEdit="/database/contact-person/edit/"
            isLoading={isLoading}
        />
    );
};

export default ContactPersonTable;
