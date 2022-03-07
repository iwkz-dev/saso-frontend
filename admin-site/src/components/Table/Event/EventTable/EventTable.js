import React from "react";
import { useSelector } from "react-redux";
import Table from "../../Table";

function EventTable({ onDelete }) {
    const events = useSelector((state) => state.event.events);

    const tableHead = {
        name: "Name",
        description: "Description",
        started_at: "Started at",
        startYear: "Start Year",
        images: "Image",
        created_at: "Created At",
        updated_at: "Updated At",
    };

    return (
        <Table
            onDelete={onDelete}
            items={events}
            tableHead={tableHead}
            emptyMessage="Event is empty"
            linkToEdit="event/edit/"
            linkToView="event/view/"
        />
    );
}

export default EventTable;
