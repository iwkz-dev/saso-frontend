import React from "react";
import { useSelector } from "react-redux";
import Table from "../../Table";

function EventTable({ onDelete, onChangeStatus, isLoading, showTable }) {
    const events = useSelector((state) => state.event.events);
    const tableHead = {
        name: "Name",
        description: "Description",
        status: {
            name: "Status",
            type: "select",
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
        started_at: "Started at",
        startYear: "Start Year",
        created_at: "Created At",
        updated_at: "Updated At",
    };
    /*
    const tableHead = {
        name: "Name",
        description: "Description",
        status: {
            name: "Status",
            editable: 1,
            type: "select",
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
        bankName: "Bank Name",
        iban: "IBAN",
        bic: "BIC",
        usageNote: "VZW",
        paypal: "Paypal",
        started_at: "Started at",
        startYear: "Start Year",
        images: "Image",
        created_at: "Created At",
        updated_at: "Updated At",
    };
    */

    return (
        <Table
            onDelete={onDelete}
            data={showTable ? events : []}
            dataHead={tableHead}
            emptyMessage="Event is empty"
            linkToEdit="/event/edit/"
            linkToView="/event/view/"
            isLoading={isLoading}
        />
    );
}

export default EventTable;
