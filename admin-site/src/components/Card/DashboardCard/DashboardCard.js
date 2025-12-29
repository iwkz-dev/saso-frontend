import { useMemo } from "react";
import {
    Card,
    Divider,
    Space,
    Statistic,
    Typography,
    Tag,
    Progress,
    Tooltip,
} from "antd";
import { useSelector } from "react-redux";
import { formatDate } from "../../../helpers/dateHelper";
import { useRouter } from "next/router";

const STATUS_META = {
    0: { title: "Draft", tag: "default" },
    1: { title: "Approved", tag: "blue" },
    2: { title: "Done", tag: "green" },
};

const DashboardCard = () => {
    const events = useSelector((s) => s.event.events) || [];
    const orders = useSelector((s) => s.order.orders) || [];
    const router = useRouter();

    const nf = useMemo(
        () =>
            new Intl.NumberFormat(undefined, {
                style: "currency",
                currency: "EUR",
                minimumFractionDigits: 2,
            }),
        [],
    );

    const filteredEvents = useMemo(
        () => events.filter((e) => [0, 1, 2].includes(e?.status)),
        [events],
    );

    const statsByEvent = useMemo(() => {
        const map = new Map();
        for (const o of orders) {
            const id = o?.event;
            if (!id) continue;
            const entry = map.get(id) || {
                total: 0,
                canceled: 0,
                delivered: 0,
                paid: 0,
                revenue: 0,
                potentialRevenue: 0,
            };
            entry.total += 1;
            if (o.status === 2) entry.canceled += 1;
            if (o.status === 3) entry.delivered += 1;
            if (o.status === 1) entry.paid += 1;
            if (o.status === 1 || o.status === 3)
                entry.revenue += Number(o.totalPrice || 0);
            if (o.status !== 2)
                entry.potentialRevenue += Number(o.totalPrice || 0);
            map.set(id, entry);
        }
        return map;
    }, [orders]);

    const displayEvents = useMemo(() => {
        const phaseOrder = { 1: 0, 0: 1, 2: 2 };
        return [...filteredEvents].sort((a, b) => {
            const pa = phaseOrder[a?.status ?? 3] ?? 3;
            const pb = phaseOrder[b?.status ?? 3] ?? 3;
            if (pa !== pb) return pa - pb;
            return String(b?.started_at || "").localeCompare(
                String(a?.started_at || ""),
            );
        });
    }, [filteredEvents]);

    const containerStyle = {
        display: "flex",
        flexWrap: "wrap",
        gap: 16,
        width: "100%",
    };

    const cardStyle = {
        flex: "1 1 280px",
        maxWidth: 380,
        borderRadius: 16,
        overflow: "hidden",
        boxShadow:
            "0 1px 2px rgba(0,0,0,0.04), 0 10px 28px -14px rgba(31,76,135,0.22)",
        transition: "transform 140ms ease, box-shadow 140ms ease",
    };

    const titleRowStyle = {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 8,
    };

    const badgesRow = { display: "flex", gap: 8, flexWrap: "wrap" };

    const mutedPill = (text, color = "#7A8AA0", bg = "#F4F6F9") => (
        <span
            style={{
                fontSize: 12,
                padding: "4px 8px",
                borderRadius: 999,
                color,
                background: bg,
                border: `1px solid ${
                    bg === "#F4F6F9" ? "#E6ECF2" : "transparent"
                }`,
                fontWeight: 600,
                letterSpacing: 0.2,
                textTransform: "uppercase",
            }}>
            {text}
        </span>
    );

    const statusTag = (status) => {
        const meta = STATUS_META[status] || {
            title: "Unknown",
            tag: "default",
        };
        return <Tag color={meta.tag}>{meta.title}</Tag>;
    };

    const handleClick = (eventId) => {
        router.push(`/database/event/view/${eventId}`);
    };

    if (!displayEvents.length) {
        return (
            <div
                style={{
                    width: "100%",
                    textAlign: "center",
                    padding: "24px 0",
                    color: "#7A8AA0",
                    background: "#fff",
                    borderRadius: 12,
                    border: "1px dashed #CFD8E3",
                }}>
                No events to display.
            </div>
        );
    }

    return (
        <div style={containerStyle}>
            {displayEvents.map((event) => {
                const s = statsByEvent.get(event._id) || {
                    total: 0,
                    canceled: 0,
                    delivered: 0,
                    paid: 0,
                    revenue: 0,
                    potentialRevenue: 0,
                };
                const pending = Math.max(
                    0,
                    s.total - (s.paid + s.delivered + s.canceled),
                );
                const deliveredRate = s.total
                    ? (s.delivered / s.total) * 100
                    : 0;

                return (
                    <Card
                        key={event._id}
                        hoverable
                        style={cardStyle}
                        onClick={() => handleClick(event._id)}>
                        <Space
                            direction="vertical"
                            style={{ width: "100%" }}
                            size={8}>
                            <div style={titleRowStyle}>
                                <Typography.Title
                                    level={4}
                                    style={{ margin: 0, lineHeight: 1.2 }}>
                                    {event?.name || "Untitled Event"}
                                </Typography.Title>
                                {statusTag(event?.status)}
                            </div>

                            <div style={badgesRow}>
                                {mutedPill(
                                    formatDate(event?.started_at, false, true),
                                    "#3C6EE1",
                                    "#EAF1FF",
                                )}
                                {event?.location &&
                                    mutedPill(
                                        event.location,
                                        "#5A6B7B",
                                        "#F2F6FA",
                                    )}
                            </div>

                            <Divider style={{ margin: "12px 0" }} />

                            <div style={{ display: "grid", gap: 6 }}>
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                    }}>
                                    <Typography.Text strong>
                                        Delivered
                                    </Typography.Text>
                                    <Typography.Text>
                                        {s.delivered}/{s.total} (
                                        {deliveredRate.toFixed(1)}%)
                                    </Typography.Text>
                                </div>
                                <Tooltip title="Delivered orders as a percentage of all orders">
                                    <Progress
                                        percent={Number(
                                            deliveredRate.toFixed(1),
                                        )}
                                        size="small"
                                        status={
                                            event?.status === 2
                                                ? "success"
                                                : "active"
                                        }
                                        showInfo={false}
                                    />
                                </Tooltip>
                            </div>

                            <Divider style={{ margin: "12px 0" }} />

                            <Space
                                direction="vertical"
                                size={6}
                                style={{ width: "100%" }}>
                                <Statistic
                                    title="Total Orders"
                                    value={s.total}
                                />
                                <Statistic title="Pending" value={pending} />
                                <Statistic
                                    title="Orders Canceled"
                                    value={s.canceled}
                                    valueStyle={{ color: "#cf1322" }}
                                />
                                <Statistic
                                    title="Orders Paid"
                                    value={s.paid}
                                    valueStyle={{ color: "#D18A00" }}
                                />
                                <Statistic
                                    title="Orders Delivered"
                                    value={s.delivered}
                                    valueStyle={{ color: "#4169E1" }}
                                />

                                <Statistic
                                    title="Revenue"
                                    precision={2}
                                    value={s.revenue}
                                    valueStyle={{
                                        color: "#3f8600",
                                        fontWeight: "bold",
                                    }}
                                    formatter={(val) => (
                                        <>
                                            {nf.format(Number(val || 0))}
                                            <Typography.Text
                                                type="secondary"
                                                style={{
                                                    fontSize: "0.5em",
                                                    marginLeft: 4,
                                                }}>
                                                /
                                                {nf.format(
                                                    Number(
                                                        s.potentialRevenue || 0,
                                                    ),
                                                )}
                                            </Typography.Text>
                                        </>
                                    )}
                                />
                            </Space>

                            <Divider style={{ margin: "12px 0" }} />

                            <Typography.Text type="secondary">
                                Last updated:{" "}
                                {formatDate(Date.now(), false, true)}
                            </Typography.Text>
                        </Space>
                    </Card>
                );
            })}
        </div>
    );
};

export default DashboardCard;
