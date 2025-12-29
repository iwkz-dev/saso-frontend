import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Typography, message, Spin } from "antd";

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

const headerRowStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
    flexWrap: "wrap",
};

const emptyStateStyle = {
    width: "100%",
    textAlign: "center",
    padding: "24px 0",
    color: "#7A8AA0",
    background: "#fff",
    borderRadius: 12,
    border: "1px dashed #CFD8E3",
};

const EventPage = () => {
    const dispatch = useDispatch();
    const pageTitle = "Saso App | Event";

    const { events, status, error } = useSelector((s) => s.event);
    const [opLoading, setOpLoading] = useState(false);

    const initialLoading = status === "loading";
    const isLoading = initialLoading || opLoading;
    const showTable = (events?.length || 0) > 0;

    useEffect(() => {
        dispatch(getAllEvents()).then((res) => {
            if (res?.status === "failed") {
                message.error(res?.message || "Failed to load events");
            }
        });
    }, [dispatch]);

    const parseActionValue = useCallback((value) => {
        if (!value) return {};

        if (typeof value === "string") {
            try {
                const parsed = JSON.parse(value);
                return {
                    id: parsed?.id,
                    status: parsed?.value ?? parsed?.status,
                };
            } catch {
                return {};
            }
        }

        if (typeof value === "object") {
            return {
                id: value?.id,
                status: value?.value ?? value?.status,
            };
        }

        return {};
    }, []);

    const runAction = useCallback(
        async (action, successMsg, errorMsg) => {
            setOpLoading(true);
            try {
                const res = await dispatch(action);
                if (res?.status === "failed") {
                    message.error(res?.message || errorMsg);
                } else {
                    message.success(res?.message || successMsg);
                }
            } catch (err) {
                message.error(err?.message || errorMsg);
            } finally {
                setOpLoading(false);
            }
        },
        [dispatch],
    );

    const onChangeStatus = useCallback(
        (raw) => {
            const { id, status } = parseActionValue(raw);
            if (!id || typeof status === "undefined") {
                message.error("Invalid status payload");
                return;
            }
            runAction(
                changeEventStatus(id, status),
                "Event status updated",
                "Failed to update status",
            );
        },
        [parseActionValue, runAction],
    );

    const onChangePOClosed = useCallback(
        (raw) => {
            const { id, status } = parseActionValue(raw);
            if (!id || typeof status === "undefined") {
                message.error("Invalid PO Closed payload");
                return;
            }
            runAction(
                changeEventPOClosed(id, status),
                "PO status updated",
                "Failed to update PO status",
            );
        },
        [parseActionValue, runAction],
    );

    const onDelete = useCallback(
        (item) => {
            const ok = window.confirm(
                `Please confirm if you want to delete "${
                    item?.name ?? "this event"
                }".`,
            );
            if (!ok) return;

            runAction(
                deleteEvent(item?._id),
                "Event deleted",
                "Failed to delete event",
            );
        },
        [runAction],
    );

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

                {error && !initialLoading && (
                    <div
                        style={{
                            padding: 12,
                            borderRadius: 8,
                            background: "#fff1f0",
                            color: "#a8071a",
                            border: "1px solid #ffa39e",
                        }}>
                        {error}
                    </div>
                )}

                <Spin
                    spinning={isLoading}
                    tip={initialLoading ? "Loading..." : "Working..."}>
                    <EventTable
                        onDelete={onDelete}
                        onChangeStatus={onChangeStatus}
                        onChangePOClosed={onChangePOClosed}
                        isLoading={isLoading}
                        showTable={showTable}
                    />

                    {!showTable && !initialLoading && (
                        <div style={emptyStateStyle}>
                            No events to display yet.
                        </div>
                    )}
                </Spin>
            </Content>
        </LoggedIn>
    );
};

export default EventPage;
