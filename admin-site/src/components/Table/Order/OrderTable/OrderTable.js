import { useMemo } from "react";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import { Typography, Tag, Divider } from "antd";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";

import Table from "../../Table";

function OrderTable({ onDelete, onChangeStatus, isLoading, showTable }) {
    const orders = useSelector((s) => s?.order?.orders) ?? [];
    const events = useSelector((s) => s?.event?.events) ?? [];
    const paymentTypes = useSelector((s) => s?.paymentType?.paymentTypes) ?? [];

    const refMap = useMemo(
        () =>
            new Map([
                ["events", events],
                ["paymentTypes", paymentTypes],
            ]),
        [events, paymentTypes],
    );

    const { Text } = Typography;

    const tableHead = useMemo(
        () => [
            {
                key: "invoiceNumber",
                dataIndex: "invoiceNumber",
                title: "Invoice Number",
                coloredText: (record) => {
                    if (
                        Number(record?.status) === 0 &&
                        dayjs().diff(dayjs(record?.created_at), "d") >= 2
                    ) {
                        return "danger";
                    }
                    return "";
                },
                filterSearch: true,
                filters: orders.map((o) => ({
                    text: o?.invoiceNumber,
                    value: o?.invoiceNumber,
                })),
                onFilter: (value, record) =>
                    String(record?.invoiceNumber ?? "").includes(String(value)),
            },
            {
                key: "status",
                dataIndex: "status",
                title: "Status",
                editable: true,
                type: "select",
                onChange: onChangeStatus,
                filterSearch: true,
                onFilter: (value, record) =>
                    String(record?.status) === String(value),
                disabled: (record, evs) => {
                    const eventId = record?.event?._id ?? record?.event;
                    const e = evs.find((event) => event?._id === eventId);
                    return e ? e.status !== 1 : true;
                },
                options: [
                    { title: "Wait For Confirmation", value: "wait", code: 0 },
                    { title: "Paid", value: "paid", code: 1 },
                    { title: "Cancel / Refund", value: "cancel", code: 2 },
                    { title: "Done", value: "done", code: 3 },
                ],
            },
            {
                key: "event",
                dataIndex: "event",
                title: "Event",
                filterSearch: true,
                filters: events.map((e) => ({ text: e.name, value: e._id })),
                onFilter: (value, record) =>
                    String(record?.event?._id ?? record?.event ?? "").includes(
                        String(value),
                    ),
                defaultFilteredValue: events
                    .filter((f) => f?.status === 1)
                    .map((e) => e?._id),
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
            { key: "arrived_at", dataIndex: "arrived_at", title: "Arrived At" },
            { key: "created_at", dataIndex: "created_at", title: "Created At" },
            { key: "updated_at", dataIndex: "updated_at", title: "Updated At" },
        ],
        [orders, events, onChangeStatus],
    );

    const listItemElement = (items = []) =>
        items.map((item) => {
            const isConfirmed = Number(item?.status) === 1;
            return (
                <li
                    key={item?.key ?? `${item?.name}-${item?.totalPortion}`}
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
                                style={{ fontSize: 18, color: "#52c41a" }}
                            />
                        ) : (
                            <CloseCircleOutlined
                                style={{ fontSize: 18, color: "#bfbfbf" }}
                            />
                        )}
                    </div>
                    <div>
                        <Text strong>
                            {item?.name} ({item?.totalPortion})
                        </Text>
                        {item?.note && (
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

    const expandOrderedMenu = (record) => (
        <div style={{ padding: "8px 0" }}>
            <Text
                strong
                style={{
                    display: "block",
                    fontSize: 16,
                    whiteSpace: "pre-line",
                }}>
                {record?.customerFullname}
            </Text>
            <Divider style={{ margin: "8px 0" }} />
            <Text style={{ fontWeight: 500 }}>Ordered Menu:</Text>
            <ol style={{ paddingLeft: 20, marginTop: 4 }}>
                {listItemElement(record?.menus)}
            </ol>
        </div>
    );

    return (
        <Table
            onDelete={onDelete}
            data={showTable ? orders : []}
            refMap={refMap}
            dataHead={tableHead}
            emptyMessage="Order is empty"
            linkToView="/database/order/view/"
            isLoading={isLoading}
            deleteOff={true}
            expandable={expandOrderedMenu}
        />
    );
}

export default OrderTable;
