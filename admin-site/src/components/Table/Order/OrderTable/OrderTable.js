import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Table from "../../Table";
import { Typography } from "antd";
import dayjs from "dayjs";

function OrderTable({ onDelete, onChangeStatus, isLoading, showTable }) {
    const orders = useSelector((state) => state.order.orders);
    const events = useSelector((state) => state.event.events);
    const paymentTypes = useSelector((state) => state.paymentType.paymentTypes);
    const [tableHead, setTableHead] = useState([]);

    useEffect(() => {
        setTableHead([
            {
                key: "invoiceNumber",
                dataIndex: "invoiceNumber",
                title: "Invoice Number",
                icon: (record) => {
                    if (
                        record.status === 0 &&
                        dayjs().diff(dayjs(record.created_at), "d") >= 2
                    ) {
                        return true;
                    }

                    return false;
                },
                filterSearch: true,
                filters: orders.map((order) => {
                    return {
                        text: order.invoiceNumber,
                        value: order.invoiceNumber,
                    };
                }),
                onFilter: (value, record) => {
                    return record.invoiceNumber.includes(value);
                },
            },
            {
                key: "event",
                dataIndex: "event",
                title: "Event",
                filterSearch: true,
                filters: events.map((event) => {
                    return {
                        text: event.name,
                        value: event._id,
                    };
                }),
                onFilter: (value, record) => {
                    return record.event.includes(value);
                },
                defaultFilteredValue: events
                    .filter((filter) => filter.status === 1)
                    .map((event) => event._id),
            },
            {
                key: "status",
                dataIndex: "status",
                title: "Status",
                editable: true,
                type: "select",
                onChange: onChangeStatus,
                filterSearch: true,
                onFilter: (value, record) => {
                    return record.status === value;
                },
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
            {
                key: "customerFullname",
                dataIndex: "customerFullname",
                title: "Customer Fullname",
            },
            {
                key: "customerPhone",
                dataIndex: "customerPhone",
                title: "Customer Phone Number",
            },
            {
                key: "customerEmail",
                dataIndex: "customerEmail",
                title: "Customer Email",
            },
            {
                key: "totalPrice",
                dataIndex: "totalPrice",
                title: "Total Price",
            },
            {
                key: "paymentType",
                dataIndex: "paymentType",
                title: "Payment Type",
            },
            {
                key: "arrived_at",
                dataIndex: "arrived_at",
                title: "Arrived At",
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
    }, [events, orders, paymentTypes]);

    const expandOrderedMenu = (record) => (
        <div>
            <Typography.Text style={{ margin: 0, whiteSpace: "pre-line" }}>
                Ordered Menu:
            </Typography.Text>
            <ol>{listItemElement(record.menus)}</ol>
        </div>
    );

    const listItemElement = (items) => {
        return items.map((item) => {
            return (
                <li key={item.key}>
                    {item.name} ({item.totalPortion})
                    {item.note ? ", note: " + item.note : ""}
                </li>
            );
        });
    };

    return (
        <Table
            onDelete={onDelete}
            data={showTable ? orders : []}
            events={events}
            dataHead={tableHead}
            emptyMessage="Order is empty"
            linkToView="/database/order/view/"
            paymentTypes={paymentTypes}
            isLoading={isLoading}
            deleteOff={true}
            expandable={expandOrderedMenu}
        />
    );
}

export default OrderTable;
