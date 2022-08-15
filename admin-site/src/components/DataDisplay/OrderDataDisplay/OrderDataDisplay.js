import React from "react";
import DataDisplay from "../DataDisplay";

const OrderDataDisplay = ({ order }) => {
    const dataForm = {
        _id: "ID",
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

    return <DataDisplay item={order} dataForm={dataForm} />;
};

export default OrderDataDisplay;
