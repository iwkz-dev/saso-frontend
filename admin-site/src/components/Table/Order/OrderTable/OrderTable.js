import React from "react";
import { useSelector } from "react-redux";
import Table from "../../Table";
import { Typography } from "antd";

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

    const expandOrderedMenu = (record) => (
        <Typography.Text style={{ margin: 0, whiteSpace: "pre-line" }}>
            {record.menus
                .map((menu, i) => {
                    return `${i + 1}. ${menu.name} (${menu.totalPortion})${
                        menu.note ? ", note: " + menu.note : ""
                    }`;
                })
                .join(`\n`)}
        </Typography.Text>
    );

    return (
        <Table
            onDelete={onDelete}
            data={showTable ? orders : []}
            events={events}
            dataHead={tableHead}
            emptyMessage="Order is empty"
            linkToView="/order/view/"
            paymentTypes={paymentTypes}
            isLoading={isLoading}
            deleteOff={true}
            expandable={expandOrderedMenu}
        />
    );
}

export default OrderTable;
