import { useEffect, useMemo, useState, useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Typography, message, Tag } from "antd";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

import Table from "../../Table";
import { getAllEvents } from "../../../../store/reducers/eventReducer";
import {
    changeOrderStatus,
    getAllOrders,
} from "../../../../store/reducers/orderReducer";
import { getAllPaymentTypes } from "../../../../store/reducers/paymentTypeReducer";
import filtersQueryBuilder from "../../../../helpers/filterQueryBuilders";

const DEBOUNCE_MS = 500;

const RelatedOrdersTable = ({
    filterName,
    itemFilter,
    onDelete,
    filterValues = [],
}) => {
    const dispatch = useDispatch();
    const isFirstRender = useRef(true);
    const orders = useSelector((s) => s.order.orders) || [];
    const events = useSelector((s) => s.event.events) || [];
    const paymentTypes = useSelector((s) => s.paymentType.paymentTypes) || [];

    const refMap = useMemo(
        () =>
            new Map([
                ["events", events],
                ["paymentTypes", paymentTypes],
            ]),
        [events, paymentTypes],
    );

    const [loading, setLoading] = useState(false);

    const queryString = useMemo(() => {
        if (!filterName || !itemFilter?._id) return null;

        const filterQuery = filtersQueryBuilder(filterValues);
        const coreQuery = `${encodeURIComponent(
            filterName,
        )}=${encodeURIComponent(itemFilter._id)}`;

        return filterQuery ? `?${filterQuery}&${coreQuery}` : `?${coreQuery}`;
    }, [filterName, itemFilter?._id, filterValues]);

    const fetchAll = useCallback(
        async (query) => {
            if (!query) return;
            setLoading(true);
            try {
                await Promise.all([
                    dispatch(getAllEvents()),
                    dispatch(getAllPaymentTypes()),
                    dispatch(getAllOrders(query)),
                ]);
            } catch (err) {
                message.error(err?.message || "Failed to load data");
            } finally {
                setLoading(false);
            }
        },
        [dispatch],
    );

    useEffect(() => {
        if (!queryString) return;

        if (isFirstRender.current) {
            isFirstRender.current = false;
            fetchAll(queryString);
            return;
        }

        const handler = setTimeout(() => fetchAll(queryString), DEBOUNCE_MS);
        return () => clearTimeout(handler);
    }, [queryString, fetchAll]);

    const handleStatusChange = async (value) => {
        const { id, value: statusValue } = JSON.parse(value);

        if (!window.confirm(`Confirm status change to "${statusValue}"?`))
            return;

        setLoading(true);
        try {
            const res = await dispatch(changeOrderStatus(id, statusValue));
            if (res?.status !== "failed") {
                message.success("Order status updated");
                fetchAll(queryString);
            } else {
                message.error(res?.message || "Failed to update status");
            }
        } catch (err) {
            message.error("An error occurred during update");
        } finally {
            setLoading(false);
        }
    };

    const MenuListItem = ({ item }) => {
        const isConfirmed = item.status === 1;
        return (
            <li
                style={{
                    display: "flex",
                    gap: "12px",
                    padding: "8px 0",
                    borderBottom: "1px solid #f0f0f0",
                }}>
                {isConfirmed ? (
                    <CheckCircleOutlined style={{ color: "#52c41a" }} />
                ) : (
                    <CloseCircleOutlined style={{ color: "#bfbfbf" }} />
                )}
                <div>
                    <Typography.Text strong>
                        {item.name} ({item.totalPortion})
                    </Typography.Text>
                    {item.note && (
                        <div style={{ fontSize: "12px", color: "#8c8c8c" }}>
                            Note: {item.note}
                        </div>
                    )}
                    <Tag
                        color={isConfirmed ? "green" : "default"}
                        style={{ marginTop: 4 }}>
                        {isConfirmed ? "Confirmed" : "Not Confirmed"}
                    </Tag>
                </div>
            </li>
        );
    };

    const expandOrderedMenu = (record) => (
        <div>
            <Typography.Text strong>Ordered Menu:</Typography.Text>
            <ul style={{ listStyle: "none", padding: 0, marginTop: 8 }}>
                {(record.menus || []).map((item, idx) => (
                    <MenuListItem key={item._id || idx} item={item} />
                ))}
            </ul>
        </div>
    );

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
                    record.invoiceNumber?.includes(value),
                coloredText: (record) =>
                    record.status === 0 &&
                    dayjs().diff(dayjs(record.created_at), "d") >= 2
                        ? "danger"
                        : "",
            },
            {
                key: "event",
                dataIndex: "event",
                title: "Event",
                filterSearch: true,
                filters: events.map((e) => ({ text: e.name, value: e._id })),
                onFilter: (value, record) =>
                    String(record.event) === String(value),
            },
            {
                key: "status",
                dataIndex: "status",
                title: "Status",
                editable: true,
                type: "select",
                onChange: handleStatusChange,
                onFilter: (value, record) => record.status === value,
                disabled: (record, eventsList) => {
                    const ev = eventsList.find((e) => e._id === record.event);
                    return !ev || ev.status !== 1;
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
                title: "Customer",
            },
            {
                key: "totalPrice",
                dataIndex: "totalPrice",
                title: "Total Price",
            },
            { key: "paymentType", dataIndex: "paymentType", title: "Payment" },
            { key: "created_at", dataIndex: "created_at", title: "Created At" },
        ],
        [events, orders, queryString],
    );

    return (
        <Table
            onDelete={onDelete}
            data={orders}
            refMap={refMap}
            dataHead={tableHead}
            emptyMessage="Order is empty"
            linkToView="/database/order/view/"
            isLoading={loading}
            deleteOff
            expandable={expandOrderedMenu}
        />
    );
};

export default RelatedOrdersTable;
