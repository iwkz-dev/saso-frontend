import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { Spin, Typography, message } from "antd";

import { getDetailEvent } from "../../../../src/store/reducers/eventReducer";
import { getAllPaymentTypes } from "../../../../src/store/reducers/paymentTypeReducer";
import EditEventForm from "../../../../src/components/Form/Event/EditEventForm/EditEventForm";
import Protected from "../../../../src/components/Layout/Protected/Protected";
import Content from "../../../../src/components/Layout/Content/Content";

export default function EditEventPage() {
    const dispatch = useDispatch();
    const router = useRouter();
    const { id } = router.query;
    const eventError = useSelector((state) => state.event?.error);

    const pageTitle = "Saso App | Event";

    const [showLoading, setShowLoading] = useState(false);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        if (!router.isReady || !id) return;

        const fetchData = async () => {
            try {
                setShowLoading(true);
                const [eventRes] = await Promise.all([
                    dispatch(getDetailEvent(id)),
                    dispatch(getAllPaymentTypes()),
                ]);
                if (eventRes?.status !== "success") {
                    message.error(eventRes?.message || "Failed to load event");
                } else {
                    setShowForm(true);
                }
            } catch (error) {
                message.error("An error occurred while loading data");
            } finally {
                setShowLoading(false);
            }
        };

        fetchData();
    }, [router.isReady, id, dispatch]);

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

                {eventError && !showLoading ? (
                    <div style={errorBox}>{eventError}</div>
                ) : null}

                <Spin spinning={showLoading} tip="Loading...">
                    {showForm ? (
                        <EditEventForm id={id} />
                    ) : !showLoading ? (
                        <div style={emptyBox}>
                            Event not found or not loaded.
                        </div>
                    ) : null}
                </Spin>
            </Content>
        </Protected>
    );
}
