import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, message, Spin, Table, Tag, Typography, Row, Col } from "antd";
import Link from "next/link";

import LoggedIn from "../src/components/Layout/LoggedIn/LoggedIn";
import Content from "../src/components/Layout/Content/Content";
import { getAllEvents } from "../src/store/reducers/eventReducer";
import { getAllOrders } from "../src/store/reducers/orderReducer";
import { isAuth } from "../src/helpers/authHelper";
import SummaryCard from "../src/components/Card/SummaryCard/SummaryCard";

const PAGE_TITLE = "Saso App | Dashboard";

const EVENT_STATUS_MAP = {
    0: { label: "Draft", color: "gray" },
    1: { label: "Approved", color: "blue" },
    2: { label: "done", color: "green" },
};

const wrapperStyle = {
    minHeight: "calc(100vh - 120px)",
    padding: 24,
    display: "flex",
    flexDirection: "column",
    gap: 24,
};

const cardStyle = {
    borderRadius: 16,
    background: "#fff",
    boxShadow:
        "0 1px 2px rgba(0,0,0,0.04), 0 8px 24px -12px rgba(31, 76, 135, 0.18)",
};

const IndexPage = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const events = useSelector((s) => s.event.events ?? []);
    const orders = useSelector((s) => s.order.orders ?? []);

    const handleFailedRequest = useCallback((payload) => {
        const msg = payload?.message || "Server Error";
        message.error(msg);
        isAuth({ status: "failed", message: msg });
    }, []);

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            await Promise.all([
                dispatch(getAllEvents()),
                dispatch(getAllOrders()),
            ]);
        } catch (err) {
            handleFailedRequest(err);
        } finally {
            setLoading(false);
        }
    }, [dispatch, handleFailedRequest]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const ordersByEvent = useMemo(() => {
        return orders.reduce((acc, order) => {
            const key = order.event;
            if (!acc[key]) acc[key] = [];
            acc[key].push(order);
            return acc;
        }, {});
    }, [orders]);

    const eventTableData = useMemo(() => {
        return events.map((event) => {
            const eventOrders = ordersByEvent[event._id] ?? [];

            const totalOrders = eventOrders.length;

            const revenue = eventOrders.reduce((sum, o) => {
                if (o.status === 1 || o.status === 3) {
                    return sum + (o.totalPrice || 0);
                }
                return sum;
            }, 0);

            const potentialRevenue = eventOrders.reduce((sum, o) => {
                if (o.status !== 2) {
                    return sum + (o.totalPrice || 0);
                }
                return sum;
            }, 0);

            const delivered = eventOrders.filter((o) => o.status === 3).length;

            return {
                key: event._id,
                eventId: event._id,
                name: event.name,
                status: event.status,
                totalOrders,
                revenue,
                potentialRevenue,
                deliveredRate: totalOrders
                    ? (delivered / totalOrders) * 100
                    : 0,
                startDate: event.startDate,
                endDate: event.endDate,
            };
        });
    }, [events, ordersByEvent]);

    const nf = useMemo(
        () =>
            new Intl.NumberFormat(undefined, {
                style: "currency",
                currency: "EUR",
                minimumFractionDigits: 2,
            }),
        [],
    );

    const summary = useMemo(() => {
        const activeEvents = events.filter((e) => [1, 2].includes(e.status));
        const activeEventIds = new Set(activeEvents.map((e) => e._id));

        const relevantOrders = orders.filter((o) =>
            activeEventIds.has(o.event),
        );

        const totalOrders = relevantOrders.length;

        const revenue = relevantOrders.reduce((sum, o) => {
            if (o.status === 1 || o.status === 3) {
                return sum + (o.totalPrice || 0);
            }
            return sum;
        }, 0);

        const potentialRevenue = relevantOrders.reduce((sum, o) => {
            if (o.status !== 2) {
                return sum + (o.totalPrice || 0);
            }
            return sum;
        }, 0);

        const delivered = relevantOrders.filter((o) => o.status === 3).length;

        return {
            activeEvents: activeEventIds.size,
            totalOrders,
            revenue,
            potentialRevenue,
            deliveredRate: totalOrders ? (delivered / totalOrders) * 100 : 0,
        };
    }, [events, orders]);

    const columns = useMemo(
        () => [
            {
                title: "Event Name",
                dataIndex: "name",
                render: (_, record) => (
                    <Link href={`database/event/view/${record.eventId}`}>
                        <Button type="link" size="small">
                            {record.name}
                        </Button>
                    </Link>
                ),
            },
            {
                title: "Status",
                dataIndex: "status",
                render: (status) => {
                    const s = EVENT_STATUS_MAP[status] ?? {
                        label: "Unknown",
                        color: "default",
                    };
                    return <Tag color={s.color}>{s.label}</Tag>;
                },
            },
            {
                title: "Orders",
                dataIndex: "totalOrders",
                align: "right",
            },
            {
                title: "Revenue",
                dataIndex: "revenue",
                align: "right",
                render: (v) => nf.format(v),
            },
            {
                title: "Potential Revenue",
                dataIndex: "potentialRevenue",
                align: "right",
                render: (v) => (
                    <span style={{ color: "#7A8AA0" }}>{nf.format(v)}</span>
                ),
            },
            {
                title: "Delivered",
                dataIndex: "deliveredRate",
                align: "right",
                render: (v) => `${v.toFixed(1)}%`,
            },
        ],
        [nf],
    );

    return (
        <LoggedIn title={PAGE_TITLE}>
            <Content>
                <div style={wrapperStyle}>
                    <div style={{ ...cardStyle, padding: "16px 20px" }}>
                        <Typography.Title level={3} style={{ margin: 0 }}>
                            Dashboard
                        </Typography.Title>
                        <Typography.Text type="secondary">
                            SASO App — quick snapshot
                        </Typography.Text>
                        <Row gutter={[12, 12]}>
                            <Col xs={24} sm={12} lg={6}>
                                <SummaryCard
                                    title="Active Events"
                                    value={summary.activeEvents}
                                />
                            </Col>

                            <Col xs={24} sm={12} lg={6}>
                                <SummaryCard
                                    title="Total Orders"
                                    value={summary.totalOrders}
                                />
                            </Col>

                            <Col xs={24} sm={12} lg={6}>
                                <SummaryCard
                                    title="Revenue"
                                    value={nf.format(summary.revenue)}
                                    suffix={
                                        <span
                                            style={{
                                                color: "#7A8AA0",
                                                fontSize: 12,
                                            }}>
                                            /{" "}
                                            {nf.format(
                                                summary.potentialRevenue,
                                            )}
                                        </span>
                                    }
                                    valueStyle={{ color: "#3f8600" }}
                                    tooltip="Actual revenue / potential revenue"
                                />
                            </Col>

                            <Col xs={24} sm={12} lg={6}>
                                <SummaryCard
                                    title="Delivered Rate"
                                    value={summary.deliveredRate.toFixed(1)}
                                    suffix="%"
                                />
                            </Col>
                        </Row>
                    </div>

                    <Spin spinning={loading}>
                        <div style={{ ...cardStyle, padding: 16 }}>
                            <Table
                                columns={columns}
                                dataSource={eventTableData}
                                pagination={{ pageSize: 10 }}
                                scroll={{ x: "max-content" }}
                                locale={{ emptyText: "No events to display." }}
                            />
                        </div>
                    </Spin>
                </div>
            </Content>
        </LoggedIn>
    );
};

export default IndexPage;
