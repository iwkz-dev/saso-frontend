import React from "react";
import { useSelector } from "react-redux";
import Table from "../../Table";

function OrderTable({ onDelete }) {
    const orders = useSelector((state) => state.order.orders);

    const tableHead = {
        invoiceNumber: "Invoice Number",
        order: "Order",
        started_at: "Started at",
        startYear: "Start Year",
        created_at: "Created At",
        updated_at: "Updated At",
    };

    return (
        <Table
            onDelete={onDelete}
            items={orders}
            tableHead={tableHead}
            emptyMessage="Order is empty"
            linkToEdit="/order/edit/"
            linkToView="/order/view/"
        />
    );
}

export default OrderTable;
