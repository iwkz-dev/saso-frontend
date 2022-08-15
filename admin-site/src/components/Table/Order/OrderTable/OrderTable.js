import React from "react";
import { useSelector } from "react-redux";
import Table from "../../Table";

function OrderTable({ onDelete }) {
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
