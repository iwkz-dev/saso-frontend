import React, { useEffect, useState } from "react";
import Table from "../../Table";

function EventTable({
    events,
    onDelete,
    onChangeStatus,
    isLoading,
    showTable,
}) {
    const [tableHead, setTableHead] = useState([]);

    useEffect(() => {
        setTableHead([
            {
                key: "name",
                dataIndex: "name",
                title: "Name",
            },
            {
                key: "description",
                dataIndex: "description",
                title: "Description",
            },
            {
                key: "status",
                dataIndex: "status",
                title: "Status",
                type: "select",
                editable: true,
                onChange: onChangeStatus,
                options: [
                    {
                        title: "Draft",
                        value: "draft",
                        code: 0,
                    },
                    {
                        title: "Approved",
                        value: "approved",
                        code: 1,
                    },
                    {
                        title: "Done",
                        value: "done",
                        code: 2,
                    },
                ],
            },
            {
                key: "started_at",
                dataIndex: "started_at",
                title: "Started At",
            },
            {
                key: "created_at",
                dataIndex: "created_at",
                title: "Created At",
            },
            {
                key: "updated_at",
                dataIndex: "updated_at",
                title: "Updated At",
            },
        ]);
        console.log(events);
    }, [events]);

    return (
        <Table
            onDelete={onDelete}
            data={events}
            dataHead={tableHead}
            emptyMessage="Event is empty"
            linkToEdit="/database/event/edit/"
            linkToView="/database/event/view/"
            isLoading={isLoading}
        />
    );
}

export default EventTable;
