import React, { useEffect, useMemo, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from "../../Table";
import { Typography, message, Tag } from "antd";
import { getAllEvents } from "../../../../store/reducers/eventReducer";
import {
    changeOrderStatus,
    getAllOrders,
} from "../../../../store/reducers/orderReducer";
import { getAllPaymentTypes } from "../../../../store/reducers/paymentTypeReducer";
import dayjs from "dayjs";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";

const RelatedOrdersTable = ({
    filterName,
    itemFilter,
    onDelete,
    filterValues = [],
}) => {
    const dispatch = useDispatch();

    const orders = useSelector((s) => s.order.orders) || [];
    const events = useSelector((s) => s.event.events) || [];
    const paymentTypes = useSelector((s) => s.paymentType.paymentTypes) || [];

    const [showTable, setShowTable] = useState(false);
    const [showLoadingData, setShowLoadingData] = useState(false);

    // --- helpers
    const filtersQueryBuilder = useCallback((vals) => {
        if (!Array.isArray(vals) || vals.length === 0) return "";
        return vals
            .map(
                (f) =>
                    `${encodeURIComponent(f.name)}=${encodeURIComponent(f.id)}`,
            )
            .join("&");
    }, []);

    const fetchAll = useCallback(async () => {
        if (!filterName || !itemFilter?._id) {
            setShowTable(false);
            setShowLoadingData(false);
            return;
        }

        setShowLoadingData(true);
        try {
            const filterQuery = filtersQueryBuilder(filterValues);
            const qsCore = `${encodeURIComponent(
                filterName,
            )}=${encodeURIComponent(itemFilter._id)}`;
            const qs = filterQuery ? `?${filterQuery}&${qsCore}` : `?${qsCore}`;

            const responses = await Promise.all([
                dispatch(getAllEvents()),
                dispatch(getAllOrders(qs)),
                dispatch(getAllPaymentTypes()),
            ]);

            const failed = responses.find((r) => r?.status === "failed");
            if (failed) {
                setShowTable(false);
                message.error(failed?.message || "Failed to load orders");
            } else {
                setShowTable(true);
            }
        } catch (err) {
            setShowTable(false);
            message.error(err?.message || "Failed to load data");
        } finally {
            setShowLoadingData(false);
        }
    }, [
        dispatch,
        filterName,
        itemFilter?._id,
        filterValues,
        filtersQueryBuilder,
    ]);

    useEffect(() => {
        fetchAll();
    }, [fetchAll]);

    const onChangeStatus = async (value) => {
        let parsed;
        try {
            parsed = JSON.parse(value);
        } catch {
            message.error("Invalid status payload");
            return;
        }

        const ok = window.confirm(
            `Please confirm if you want to change status to "${parsed.value}".`,
        );
        if (!ok) return;

        setShowLoadingData(true);
        try {
            const res = await dispatch(
                changeOrderStatus(parsed.id, parsed.value),
            );
            if (res?.status !== "failed") {
                message.success(res?.message || "Order status updated");
                await fetchAll();
            } else {
                message.error(res?.message || "Failed to update status");
            }
        } catch (err) {
            message.error(err?.message || "Failed to update status");
        } finally {
            setShowLoadingData(false);
        }
    };

    const tableHead = useMemo(
        () => [
            {
                key: "invoiceNumber",
                dataIndex: "invoiceNumber",
                title: "Invoice Number",
                filterSearch: true,
                filters: orders.map((o) => ({
                    text: o.invoiceNumber,
                    value: o.invoiceNumber,
                })),
                onFilter: (value, record) =>
                    record.invoiceNumber?.includes?.(value),
                coloredText: (record) => {
                    if (
                        record.status === 0 &&
                        dayjs().diff(dayjs(record.created_at), "d") >= 2
                    ) {
                        return "danger";
                    }
                    return "";
                },
            },
            {
                key: "event",
                dataIndex: "event",
                title: "Event",
                filterSearch: true,
                filters: events.map((e) => ({ text: e.name, value: e._id })),
                onFilter: (value, record) => {
                    const v = record.event;
                    return Array.isArray(v)
                        ? v.includes(value)
                        : String(v) === String(value);
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
                onFilter: (value, record) => record.status === value,
                disabled: (record, eventsList) => {
                    const ev = eventsList.find((e) => e._id === record.event);
                    return !ev || ev.status !== 1; // only editable if event is Approved (status=1)
                },
                options: [
                    { title: "Wait For Confirmation", value: "wait", code: 0 },
                    { title: "Paid", value: "paid", code: 1 },
                    { title: "Cancel / Refund", value: "cancel", code: 2 },
                    { title: "Done", value: "done", code: 3 },
                ],
            },
            {
                key: "customerFullname",
                dataIndex: "customerFullname",
                title: "Customer Fullname",
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
        [events, orders],
    );

    const listItemElement = (items = []) =>
        items.map((item, idx) => {
            const isConfirmed = item.status === 1;
            const key = item._id || item.key || `${item.name}-${idx}`;

            return (
                <li
                    key={key}
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
                        <Typography.Text strong>
                            {item.name} ({item.totalPortion})
                        </Typography.Text>
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

    const expandOrderedMenu = (record) => (
        <div>
            <Typography.Text style={{ margin: 0, whiteSpace: "pre-line" }}>
                Ordered Menu:
            </Typography.Text>
            <ol style={{ marginTop: 8 }}>
                {listItemElement(record.menus || [])}
            </ol>
        </div>
    );

    return (
        <Table
            onDelete={onDelete}
            data={showTable ? orders : []}
            events={events}
            dataHead={tableHead}
            emptyMessage="Order is empty"
            linkToView="/database/order/view/"
            paymentTypes={paymentTypes}
            isLoading={showLoadingData}
            deleteOff={true}
            expandable={expandOrderedMenu}
        />
    );
};

export default RelatedOrdersTable;
