import React from "react";
import { useSelector } from "react-redux";
import Table from "../../Table";

function OrderTable({ onDelete, onChangeStatus }) {
    const orders = useSelector((state) => state.order.orders);
    const events = useSelector((state) => state.event.events);

    const tableHead = {
        invoiceNumber: "Invoice Number",
        event: "Event",
        customerFullname: "Customer Fullname",
        customerEmail: "Customer Email",
        customerPhone: "Customer Phone Number",
        totalPrice: "totalPrice",
        note: "Note",
        arrived_at: "Arrived At",
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
        created_at: "Created At",
        updated_at: "Updated At",
    };

    return (
        <Table
            onDelete={onDelete}
            items={orders}
            events={events}
            tableHead={tableHead}
            emptyMessage="Order is empty"
            linkToEdit="/order/edit/"
            linkToView="/order/view/"
        />
    );
}

export default OrderTable;
