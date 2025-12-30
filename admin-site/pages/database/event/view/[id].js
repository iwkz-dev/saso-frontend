import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { Space, Tabs, Typography, message, Alert } from "antd";

import { getDetailEvent } from "../../../../src/store/reducers/eventReducer";
import Protected from "../../../../src/components/Layout/Protected/Protected";
import Content from "../../../../src/components/Layout/Content/Content";
import EventDetailTab from "../../../../src/components/TabContents/Event/EventDetailTab/EventDetailTab";
import EventMenusTab from "../../../../src/components/TabContents/Event/EventMenusTab/EventMenusTab";
import EventOrdersTab from "../../../../src/components/TabContents/Event/EventOrdersTab/EventOrdersTab";

const HEADER_WRAP_STYLE = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
    flexWrap: "wrap",
};

const EMPTY_STATE_STYLE = {
    width: "100%",
    textAlign: "center",
    padding: "24px 0",
    color: "#7A8AA0",
    background: "#fff",
    borderRadius: 12,
    border: "1px dashed #CFD8E3",
};

export default function EventViewPage() {
    const dispatch = useDispatch();
    const router = useRouter();
    const { id } = router.query;

    const {
        detailEvent: event,
        status,
        error: eventError,
    } = useSelector((s) => s.event);
    const orders = useSelector((s) => s.order.orders) || [];
    const menus = useSelector((s) => s.menu.menus) || [];

    const [filterInvoiceOrderValues, setFilterInvoiceOrderValues] = useState(
        [],
    );
    const [filterMenuValues, setFilterMenuValues] = useState([]);

    const isLoading = status === "loading";
    const hasEvent = !!event?._id;

    useEffect(() => {
        if (!router.isReady || !id) return;

        const fetchEvent = async () => {
            const result = await dispatch(getDetailEvent(id));
            if (result.status !== "success") {
                message.error(result.message || "Failed to load event");
            }
        };

        fetchEvent();
    }, [router.isReady, id, dispatch]);

    const handleTabsChange = () => {
        setFilterInvoiceOrderValues([]);
        setFilterMenuValues([]);
    };

    const tabsItems = useMemo(
        () => [
            {
                key: "1",
                label: "Event Details",
                children: <EventDetailTab event={event} />,
            },
            {
                key: "2",
                label: "Menu",
                children: (
                    <EventMenusTab
                        event={event}
                        menus={menus}
                        setFilterMenuValues={setFilterMenuValues}
                        filterMenuValues={filterMenuValues}
                    />
                ),
            },
            {
                key: "3",
                label: "Orders",
                children: (
                    <EventOrdersTab
                        event={event}
                        menus={menus}
                        filterInvoiceOrderValues={filterInvoiceOrderValues}
                        setFilterInvoiceOrderValues={
                            setFilterInvoiceOrderValues
                        }
                    />
                ),
            },
        ],
        [event, menus, orders, filterMenuValues, filterInvoiceOrderValues],
    );

    return (
        <Protected title="Saso App | Event">
            <Content>
                {eventError && (
                    <Alert
                        message={eventError}
                        type="error"
                        showIcon
                        style={{ marginBottom: 16 }}
                    />
                )}

                <div style={HEADER_WRAP_STYLE}>
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
                            onChange={handleTabsChange}
                        />
                    </Space>
                ) : (
                    !isLoading && (
                        <div style={EMPTY_STATE_STYLE}>
                            Event not found or not loaded.
                        </div>
                    )
                )}
            </Content>
        </Protected>
    );
}
