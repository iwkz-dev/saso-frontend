import React from "react";
import { useSelector } from "react-redux";
import Table from "../../Table";

function OrderTable({ onDelete, onChangeStatus }) {
    const orders = useSelector((state) => state.order.orders);
    const events = useSelector((state) => state.event.events);
    const tableHead = {
        invoiceNumber: "Invoice Number",
        event: "Event",
        status: {
            name: "Status",
            editable: 1,
            type: "select",
            onChange: onChangeStatus,
            options: [
                {
                    title: "Wait For Confirmation",
                    value: "wait",
                    code: 0,
                },
                {
                    title: "Paid",
                    value: "paid",
                    code: 1,
                },
                {
                    title: "Cancel / Refund",
                    value: "cancel",
                    code: 2,
                },
                {
                    title: "Done",
                    value: "done",
                    code: 3,
                },
            ],
        },
        customerFullname: "Customer Fullname",
        customerEmail: "Customer Email",
        totalPrice: "Total Price",
        arrived_at: "Arrived At",
        created_at: "Created At",
        updated_at: "Updated At",
    };

    /*
    const tableHead = {
        invoiceNumber: {
            name: "Invoice Number",
            sortable: "asc",
        },
        status: {
            name: "Status",
            sortable: "asc",
            editable: 1,
            type: "select",
            onChange: onChangeStatus,
            options: [
                {
                    title: "Wait For Confirmation",
                    value: "wait",
                    code: 0,
                },
                {
                    title: "Paid",
                    value: "paid",
                    code: 1,
                },
                {
                    title: "Cancel / Refund",
                    value: "cancel",
                    code: 2,
                },
                {
                    title: "Done",
                    value: "done",
                    code: 3,
                },
            ],
        },
        event: {
            name: "Event",
            sortable: "asc",
        },
        customerFullname: {
            name: "Customer Fullname",
            sortable: "asc",
        },
        customerEmail: {
            name: "Customer Email",
            sortable: "asc",
        },
        customerPhone: {
            name: "Customer Phone Number",
            sortable: "asc",
        },
        totalPrice: {
            name: "Total Price",
            sortable: "asc",
        },
        arrived_at: {
            name: "Arrived At",
            sortable: "asc",
        },
        note: {
            name: "Note",
            sortable: "asc",
        },
        created_at: {
            name: "Created At",
            sortable: "asc",
        },
        updated_at: {
            name: "Updated At",
            sortable: "asc",
        },
    };
    */

    return (
        <Table
            onDelete={onDelete}
            data={orders}
            events={events}
            dataHead={tableHead}
            emptyMessage="Order is empty"
            actionsOff={true}
        />
    );
}

export default OrderTable;
