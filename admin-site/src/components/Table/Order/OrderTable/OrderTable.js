import React from "react";
import { useSelector } from "react-redux";
import Table from "../../Table";

function OrderTable({ onDelete, onChangeStatus, isLoading, showTable }) {
    const orders = useSelector((state) => state.order.orders);
    const events = useSelector((state) => state.event.events);
    const paymentTypes = useSelector((state) => state.paymentType.paymentTypes);
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
        paymentType: "Payment Type",
        arrived_at: "Arrived At",
        created_at: "Created At",
        updated_at: "Updated At",
    };

    return (
        <Table
            onDelete={onDelete}
            data={showTable ? orders : []}
            events={events}
            dataHead={tableHead}
            emptyMessage="Order is empty"
            actionsOff={true}
            paymentTypes={paymentTypes}
            isLoading={isLoading}
        />
    );
}

export default OrderTable;
