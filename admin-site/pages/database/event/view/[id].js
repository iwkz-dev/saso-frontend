import React, { useEffect, useMemo, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { getDetailEvent } from "../../../../src/store/reducers/eventReducer";
import LoggedIn from "../../../../src/components/Layout/LoggedIn/LoggedIn";
import EventDataDisplay from "../../../../src/components/DataDisplay/EventDataDisplay/EventDataDisplay";
import RelatedMenuTable from "../../../../src/components/Table/Event/RelatedMenuTable/RelatedMenuTable";
import AddItemButton from "../../../../src/components/common/Button/AddItemButton/AddItemButton";
import Content from "../../../../src/components/Layout/Content/Content";
import { Space, Spin, Tabs, Typography, message } from "antd";
import EventSummary from "../../../../src/components/Card/Event/EventSummary/EventSummary";
import RelatedOrdersTable from "../../../../src/components/Table/Event/RelatedOrders/RelatedOrdersTable";
import OrderFilterForm from "../../../../src/components/Form/Order/OrderFilterForm/OrderFilterForm";
import * as XLSX from "xlsx";

export default function EventViewPage() {
    const dispatch = useDispatch();
    const router = useRouter();
    const { id } = router.query;

    const pageTitle = "Saso App | Event";

    // Slice state
    const eventStatus = useSelector((s) => s.event.status);
    const eventError = useSelector((s) => s.event.error);
    const event = useSelector((s) => s.event.detailEvent);
    const orders = useSelector((s) => s.order.orders) || [];

    const [filterValues, setFilterValues] = useState([]);

    const loading = eventStatus === "loading";
    const hasEvent = !!event && !!event._id;

    useEffect(() => {
        if (!router.isReady || !id) return;
        (async () => {
            try {
                await dispatch(getDetailEvent(id));
            } catch (err) {
                message.error(err?.message || "Failed to load event");
            }
        })();
    }, [router.isReady, id, dispatch]);

    const getStatusDescription = useCallback((status) => {
        switch (status) {
            case 0:
                return "Waiting for Confirmation";
            case 1:
                return "Paid";
            case 2:
                return "Cancel / Refund";
            case 3:
                return "Done";
            default:
                return "Unknown Status";
        }
    }, []);

    const safeFileName = useMemo(() => {
        const base = event?.name || "event";
        return base.replace(/[\\/:*?"<>|]+/g, "_");
    }, [event?.name]);

    const exportToXlsx = useCallback(() => {
        try {
            if (!orders?.length) {
                message.info("No orders to export.");
                return;
            }

            const menuNames = Array.from(
                new Set(
                    orders.flatMap((o) =>
                        (o?.menus || []).map((m) => m?.name).filter(Boolean),
                    ),
                ),
            );

            const orderSheetData = orders.map((order) => {
                const rec = {
                    OrderID: order?._id || "",
                    InvoiceNumber: order?.invoiceNumber || "",
                    Status: getStatusDescription(order?.status),
                    CustomerName: order?.customerFullname || "",
                    CustomerEmail: order?.customerEmail || "",
                    CustomerPhone: order?.customerPhone || "",
                    PaymentType: order?.paymentType || "",
                    TotalPrice: order?.totalPrice ?? "",
                    Event: event?.name || "",
                    Note: order?.note || "",
                    CreatedAt: order?.created_at || "",
                    UpdatedAt: order?.updated_at || "",
                };

                menuNames.forEach((name) => {
                    const found = (order?.menus || []).find(
                        (m) => m?.name === name,
                    );
                    rec[name] =
                        found && Number(found.totalPortion) !== 0
                            ? found.totalPortion
                            : "";
                });

                return rec;
            });

            const wb = XLSX.utils.book_new();
            const ws = XLSX.utils.json_to_sheet(orderSheetData);
            XLSX.utils.book_append_sheet(wb, ws, "Orders");
            XLSX.writeFile(wb, `${safeFileName}-orders.xlsx`);
        } catch (e) {
            message.error("Failed to export to XLSX");
            console.error(e);
        }
    }, [orders, event?.name, getStatusDescription, safeFileName]);

    // ---- Inline styles
    const headerWrap = {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 12,
        flexWrap: "wrap",
    };

    const tabsItems = [
        {
            key: "1",
            label: "Event Details",
            children: (
                <>
                    <EventSummary event={event} />
                    <EventDataDisplay event={event} />
                </>
            ),
        },
        {
            key: "2",
            label: "Menu",
            children: (
                <Space direction="vertical" style={{ display: "flex" }}>
                    <Typography.Title level={4}>Related Menu</Typography.Title>
                    <AddItemButton
                        hrefLink={`/database/menu/add?event=${
                            event?._id || ""
                        }`}
                        text="Add Menu for this Event"
                    />
                    <RelatedMenuTable filterName="event" itemFilter={event} />
                </Space>
            ),
        },
        {
            key: "3",
            label: "Orders",
            children: (
                <Space direction="vertical" style={{ display: "flex" }}>
                    <Typography.Title level={4}>
                        Related Orders
                    </Typography.Title>
                    <OrderFilterForm
                        filterValues={filterValues}
                        setFilterValues={setFilterValues}
                        exportToXlsx={exportToXlsx}
                    />
                    <RelatedOrdersTable
                        filterName="event"
                        itemFilter={event}
                        filterValues={filterValues}
                    />
                </Space>
            ),
        },
    ];

    return (
        <LoggedIn title={pageTitle}>
            <Content>
                {eventError && (
                    <div
                        style={{
                            padding: 12,
                            borderRadius: 8,
                            background: "#fff1f0",
                            color: "#a8071a",
                            border: "1px solid #ffa39e",
                        }}>
                        {eventError}
                    </div>
                )}

                <Spin spinning={loading} tip="Loading...">
                    <div style={headerWrap}>
                        <Typography.Title level={3}>
                            {event?.name || "Event"}
                        </Typography.Title>
                    </div>

                    {hasEvent ? (
                        <Space direction="vertical" style={{ display: "flex" }}>
                            <Tabs
                                defaultActiveKey="1"
                                items={tabsItems}
                                destroyInactiveTabPane
                                onChange={() => {
                                    setFilterValues([]);
                                }}
                            />
                        </Space>
                    ) : !loading ? (
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
                            Event not found or not loaded.
                        </div>
                    ) : null}
                </Spin>
            </Content>
        </LoggedIn>
    );
}
