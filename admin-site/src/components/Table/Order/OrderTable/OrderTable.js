import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Table from "../../Table";
import { Typography, Tag, Divider } from "antd";
import dayjs from "dayjs";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";

function OrderTable({ onDelete, onChangeStatus, isLoading, showTable }) {
    const orders = useSelector((state) => state.order.orders);
    const events = useSelector((state) => state.event.events);
    const paymentTypes = useSelector((state) => state.paymentType.paymentTypes);
    const [tableHead, setTableHead] = useState([]);
    const { Text } = Typography;

    useEffect(() => {
        setTableHead([
            {
                key: "invoiceNumber",
                dataIndex: "invoiceNumber",
                title: "Invoice Number",
                coloredText: (record) => {
                    if (
                        record.status === 0 &&
                        dayjs().diff(dayjs(record.created_at), "d") >= 2
                    ) {
                        return "danger";
                    }

                    return "";
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
                disabled: (record, events) => {
                    const getEvent = events.find(
                        (event) => event._id === record.event,
                    );

                    if (getEvent && getEvent.status !== 1) {
                        return true;
                    }

                    return false;
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
        <div style={{ padding: "8px 0" }}>
            <Text
                strong
                style={{
                    display: "block",
                    fontSize: 16,
                    whiteSpace: "pre-line",
                }}>
                {record.customerFullname}
            </Text>

            <Divider style={{ margin: "8px 0" }} />

            <Text style={{ fontWeight: 500 }}>Ordered Menu:</Text>
            <ol style={{ paddingLeft: "20px", marginTop: "4px" }}>
                {listItemElement(record.menus)}
            </ol>
        </div>
    );

    const listItemElement = (items) => {
        return items.map((item) => {
            const isConfirmed = item.status === 1;

            return (
                <li
                    key={item.key}
                    style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "8px",
                        padding: "8px 0",
                        borderBottom: "1px solid #f0f0f0",
                    }}>
                    <div style={{ paddingTop: 4 }}>
                        {isConfirmed ? (
                            <CheckCircleOutlined
                                style={{ color: "#52c41a", fontSize: 18 }}
                            />
                        ) : (
                            <CloseCircleOutlined
                                style={{ color: "#bfbfbf", fontSize: 18 }}
                            />
                        )}
                    </div>
                    <div>
                        <Text strong>
                            {item.name} ({item.totalPortion})
                        </Text>
                        {item.note && (
                            <div style={{ fontSize: "12px", color: "#8c8c8c" }}>
                                Note: {item.note}
                            </div>
                        )}
                        <div style={{ marginTop: 4 }}>
                            <Tag color={isConfirmed ? "green" : "default"}>
                                {isConfirmed ? "Confirmed" : "Not Confirmed"}
                            </Tag>
                        </div>
                    </div>
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
