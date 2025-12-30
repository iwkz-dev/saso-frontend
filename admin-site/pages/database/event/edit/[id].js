import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { getDetailEvent } from "../../../../src/store/reducers/eventReducer";
import EditEventForm from "../../../../src/components/Form/Event/EditEventForm/EditEventForm";
import Protected from "../../../../src/components/Layout/Protected/Protected";
import Content from "../../../../src/components/Layout/Content/Content";
import { Spin, Typography, message } from "antd";

export default function EditEventPage() {
    const dispatch = useDispatch();
    const router = useRouter();
    const { id } = router.query;

    const pageTitle = "Saso App | Event";

    const eventStatus = useSelector((s) => s.event.status);
    const eventError = useSelector((s) => s.event.error);
    const detailEvent = useSelector((s) => s.event.detailEvent);

    const loading = eventStatus === "loading";
    const hasEvent = !!detailEvent && !!detailEvent._id;

    useEffect(() => {
        if (!router.isReady || !id) return;

        (async () => {
            const res = await dispatch(getDetailEvent(id)); // wrapper returns {status, ...}
            if (res?.status === "failed") {
                message.error(res?.message || "Failed to load event");
            }
        })();
    }, [router.isReady, id, dispatch]);

    // Inline styles
    const errorBox = {
        padding: 12,
        borderRadius: 8,
        background: "#fff1f0",
        color: "#a8071a",
        border: "1px solid #ffa39e",
    };
    const emptyBox = {
        width: "100%",
        textAlign: "center",
        padding: "24px 0",
        color: "#7A8AA0",
        background: "#fff",
        borderRadius: 12,
        border: "1px dashed #CFD8E3",
    };

    return (
        <Protected title={pageTitle}>
            <Content>
                <Typography.Title level={3}>Edit Event</Typography.Title>

                {eventError && !loading ? (
                    <div style={errorBox}>{eventError}</div>
                ) : null}

                <Spin spinning={loading} tip="Loading...">
                    {hasEvent ? (
                        <EditEventForm id={id} />
                    ) : !loading ? (
                        <div style={emptyBox}>
                            Event not found or not loaded.
                        </div>
                    ) : null}
                </Spin>
            </Content>
        </Protected>
    );
}
