import { useEffect, useMemo, useState } from "react";
import LoggedIn from "../src/components/Layout/LoggedIn/LoggedIn";
import Content from "../src/components/Layout/Content/Content";
import DashboardCard from "../src/components/Card/DashboardCard/DashboardCard";
import { useDispatch, useSelector } from "react-redux";
import { getAllEvents } from "../src/store/reducers/eventReducer";
import { getAllOrders } from "../src/store/reducers/orderReducer";
import { message, Spin, Typography } from "antd";
import { isAuth } from "../src/helpers/authHelper";

const IndexPage = () => {
    const dispatch = useDispatch();
    const pageTitle = "Saso App | Dashboard";
    const [showLoading, setShowLoading] = useState(false);
    const [showCard, setShowCard] = useState(false);

    const events = useSelector((s) => s.event.events) || [];
    const orders = useSelector((s) => s.order.orders) || [];

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setShowLoading(true);
        setShowCard(false);
        try {
            await Promise.all([
                dispatch(getAllEvents()),
                dispatch(getAllOrders()),
            ]);
            setShowCard(true);
        } catch (err) {
            handleFailedRequest(err);
        } finally {
            setShowLoading(false);
        }
    };

    const handleFailedRequest = (payload) => {
        setShowCard(false);
        setShowLoading(false);
        const msg = payload?.message || "Server Error";
        message.error(msg);
        isAuth({ status: "failed", message: msg });
    };

    const wrapperStyle = {
        minHeight: "calc(100vh - 120px)",
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        gap: "24px",
    };

    const headerCardStyle = {
        borderRadius: 16,
        padding: "16px 20px",
        background: "#fff",
        boxShadow:
            "0 1px 2px rgba(0,0,0,0.04), 0 8px 24px -12px rgba(31, 76, 135, 0.18)",
    };

    const gridStyle = {
        display: "flex",
        flexWrap: "wrap",
        gap: 16,
        width: "100%",
    };

    const nf = useMemo(
        () =>
            new Intl.NumberFormat(undefined, {
                style: "currency",
                currency: "EUR",
                minimumFractionDigits: 2,
            }),
        [],
    );

    // Summary including potential revenue
    const summary = useMemo(() => {
        if (!events?.length || !orders?.length) {
            return {
                activeEvents: 0,
                totalOrders: 0,
                revenue: 0,
                potentialRevenue: 0,
                deliveredRate: 0,
            };
        }

        const activeEventIds = new Set(
            events.filter((e) => [1, 2].includes(e.status)).map((e) => e._id),
        );

        const filteredOrders = orders.filter((o) =>
            activeEventIds.has(o.event),
        );
        const totalOrders = filteredOrders.length;

        const revenue = filteredOrders
            .filter((o) => o.status === 1 || o.status === 3) // Actual revenue
            .reduce((acc, o) => acc + (o.totalPrice || 0), 0);

        const potentialRevenue = filteredOrders
            .filter((o) => o.status !== 2) // exclude canceled
            .reduce((acc, o) => acc + (o.totalPrice || 0), 0);

        const delivered = filteredOrders.filter((o) => o.status === 3).length;
        const deliveredRate = totalOrders ? (delivered / totalOrders) * 100 : 0;

        return {
            activeEvents: activeEventIds.size,
            totalOrders,
            revenue,
            potentialRevenue,
            deliveredRate,
        };
    }, [events, orders]);

    return (
        <LoggedIn title={pageTitle}>
            <Content>
                <div style={wrapperStyle}>
                    {/* Header / Summary */}
                    <div style={headerCardStyle}>
                        <div
                            style={{
                                display: "flex",
                                gap: 16,
                                alignItems: "center",
                                justifyContent: "space-between",
                                flexWrap: "wrap",
                            }}>
                            <div>
                                <Typography.Title
                                    level={3}
                                    style={{ margin: 0 }}>
                                    Dashboard
                                </Typography.Title>
                                <Typography.Text type="secondary">
                                    SASO App — quick snapshot
                                </Typography.Text>
                            </div>

                            <div
                                style={{
                                    display: "flex",
                                    gap: 12,
                                    flexWrap: "wrap",
                                    alignItems: "stretch",
                                }}>
                                {[
                                    {
                                        label: "Active Events",
                                        value: summary.activeEvents,
                                    },
                                    {
                                        label: "Total Orders",
                                        value: summary.totalOrders,
                                    },
                                    {
                                        label: "Revenue",
                                        value: (
                                            <>
                                                <span
                                                    style={{
                                                        fontWeight: "bold",
                                                        color: "#3f8600",
                                                    }}>
                                                    {nf.format(summary.revenue)}
                                                </span>
                                                <Typography.Text
                                                    type="secondary"
                                                    style={{
                                                        fontSize: "0.5em",
                                                        marginLeft: 4,
                                                    }}>
                                                    /
                                                    {nf.format(
                                                        summary.potentialRevenue,
                                                    )}
                                                </Typography.Text>
                                            </>
                                        ),
                                    },
                                    {
                                        label: "Delivered Rate",
                                        value: `${summary.deliveredRate.toFixed(
                                            1,
                                        )}%`,
                                    },
                                ].map((it, idx) => (
                                    <div
                                        key={idx}
                                        style={{
                                            padding: "10px 14px",
                                            background: "#F6F9FF",
                                            border: "1px solid #E7EEFF",
                                            borderRadius: 12,
                                            minWidth: 140,
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "flex-start",
                                            gap: 4,
                                        }}>
                                        <div
                                            style={{
                                                fontSize: 12,
                                                color: "#7A8AA0",
                                                fontWeight: 500,
                                                textTransform: "uppercase",
                                                letterSpacing: 0.3,
                                            }}>
                                            {it.label}
                                        </div>
                                        <div
                                            style={{
                                                fontSize: 18,
                                                fontWeight: 700,
                                                lineHeight: 1.2,
                                            }}>
                                            {it.value}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Event Cards */}
                    <Spin spinning={showLoading} tip="Loading...">
                        <div style={gridStyle}>
                            {showCard ? (
                                <DashboardCard />
                            ) : (
                                !showLoading && (
                                    <div
                                        style={{
                                            width: "100%",
                                            textAlign: "center",
                                            padding: "32px 0",
                                            color: "#7A8AA0",
                                            background: "#fff",
                                            borderRadius: 16,
                                            border: "1px dashed #CFD8E3",
                                        }}>
                                        No data to display yet.
                                    </div>
                                )
                            )}
                        </div>
                    </Spin>
                </div>
            </Content>
        </LoggedIn>
    );
};

export default IndexPage;
