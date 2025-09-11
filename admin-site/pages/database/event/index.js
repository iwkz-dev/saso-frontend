import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoggedIn from "../../../src/components/Layout/LoggedIn/LoggedIn";
import EventTable from "../../../src/components/Table/Event/EventTable/EventTable";
import AddItemButton from "../../../src/components/common/Button/AddItemButton/AddItemButton";
import Content from "../../../src/components/Layout/Content/Content";
import {
    deleteEvent,
    getAllEvents,
    changeEventStatus,
    changeEventPOClosed,
} from "../../../src/store/reducers/eventReducer";
import { Typography, message, Spin } from "antd";

const EventPage = () => {
    // ---- inside your component ----
    const dispatch = useDispatch();
    const pageTitle = "Saso App | Event";

    const events = useSelector((s) => s.event.events);
    const eventStatus = useSelector((s) => s.event.status);
    const eventError = useSelector((s) => s.event.error);

    const [opLoading, setOpLoading] = useState(false);

    useEffect(() => {
        (async () => {
            const res = await dispatch(getAllEvents());
            if (res?.status === "failed") {
                message.error(res?.message || "Failed to load events");
            }
        })();
    }, [dispatch]);

    const initialLoading = eventStatus === "loading";
    const showTable = (events?.length || 0) > 0;

    // unchanged helper
    const parseActionValue = (value) => {
        if (value && typeof value === "string") {
            try {
                const obj = JSON.parse(value);
                return { id: obj.id, status: obj.value ?? obj.status };
            } catch {
                return { id: undefined, status: undefined };
            }
        }
        if (value && typeof value === "object") {
            return { id: value.id, status: value.value ?? value.status };
        }
        return { id: undefined, status: undefined };
    };

    const onChangeStatus = async (raw) => {
        const { id, status } = parseActionValue(raw);
        if (!id || typeof status === "undefined") {
            message.error("Invalid status payload");
            return;
        }
        setOpLoading(true);
        try {
            // wrapper signature: (id, status)
            const res = await dispatch(changeEventStatus(id, status));
            if (res?.status !== "failed") {
                message.success(res?.message || "Event status updated");
            } else {
                message.error(res?.message || "Failed to update status");
            }
        } catch (err) {
            message.error(err?.message || "Failed to update status");
        } finally {
            setOpLoading(false);
        }
    };

    const onChangePOClosed = async (raw) => {
        const { id, status } = parseActionValue(raw);
        if (!id || typeof status === "undefined") {
            message.error("Invalid PO Closed payload");
            return;
        }
        setOpLoading(true);
        try {
            // wrapper signature: (id, status)
            const res = await dispatch(changeEventPOClosed(id, status));
            if (res?.status !== "failed") {
                message.success(res?.message || "PO status updated");
            } else {
                message.error(res?.message || "Failed to update PO status");
            }
        } catch (err) {
            message.error(err?.message || "Failed to update PO status");
        } finally {
            setOpLoading(false);
        }
    };

    const onDelete = async (item) => {
        const ok = window.confirm(
            `Please confirm if you want to delete "${
                item?.name ?? "this event"
            }".`,
        );
        if (!ok) return;

        setOpLoading(true);
        try {
            const res = await dispatch(deleteEvent(item?._id));
            if (res?.status !== "failed") {
                message.success(res?.message || "Event deleted");
            } else {
                message.error(res?.message || "Failed to delete event");
            }
        } catch (err) {
            message.error(err?.message || "Failed to delete event");
        } finally {
            setOpLoading(false);
        }
    };

    //inline styles
    const headerRowStyle = {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 12,
        flexWrap: "wrap",
    };

    return (
        <LoggedIn title={pageTitle}>
            <Content>
                <div style={headerRowStyle}>
                    <Typography.Title level={3}>Event</Typography.Title>
                    <AddItemButton
                        hrefLink="/database/event/add"
                        text="Add Event"
                    />
                </div>

                {eventError && !initialLoading ? (
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
                ) : null}

                <Spin
                    spinning={initialLoading || opLoading}
                    tip={initialLoading ? "Loading..." : "Working..."}>
                    <EventTable
                        onDelete={onDelete}
                        onChangeStatus={onChangeStatus}
                        onChangePOClosed={onChangePOClosed}
                        isLoading={initialLoading || opLoading}
                        showTable={showTable}
                    />
                    {!showTable && !initialLoading && (
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
                            No events to display yet.
                        </div>
                    )}
                </Spin>
            </Content>
        </LoggedIn>
    );
};

export default EventPage;
