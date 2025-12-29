import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { Space, Tabs, Typography, message, Alert } from "antd";

import { getDetailEvent } from "../../../../src/store/reducers/eventReducer";
import LoggedIn from "../../../../src/components/Layout/LoggedIn/LoggedIn";
import EventDataDisplay from "../../../../src/components/DataDisplay/EventDataDisplay/EventDataDisplay";
import RelatedMenuTable from "../../../../src/components/Table/Event/RelatedMenuTable/RelatedMenuTable";
import AddItemButton from "../../../../src/components/common/Button/AddItemButton/AddItemButton";
import Content from "../../../../src/components/Layout/Content/Content";
import EventSummary from "../../../../src/components/Card/Event/EventSummary/EventSummary";
import RelatedOrdersTable from "../../../../src/components/Table/Event/RelatedOrders/RelatedOrdersTable";
import OrderFilterForm from "../../../../src/components/Form/Order/OrderFilterForm/OrderFilterForm";
import MenuEventFilterForm from "../../../../src/components/Form/Menu/MenuEventFilterForm/MenuEventFilterForm";

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

    // Redux State
    const {
        detailEvent: event,
        status,
        error: eventError,
    } = useSelector((s) => s.event);
    const orders = useSelector((s) => s.order.orders) || [];
    const menus = useSelector((s) => s.menu.menus) || [];

    // Local State
    const [filterInvoiceOrderValues, setFilterInvoiceOrderValues] = useState(
        [],
    );
    const [filterMenuValues, setFilterMenuValues] = useState([]);

    const isLoading = status === "loading";
    const hasEvent = !!event?._id;

    useEffect(() => {
        if (!router.isReady || !id) return;

        const fetchEvent = async () => {
            try {
                await dispatch(getDetailEvent(id));
            } catch (err) {
                message.error(err?.message || "Failed to load event");
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
                        <Typography.Title level={4}>
                            Related Menu
                        </Typography.Title>
                        <AddItemButton
                            hrefLink={`/database/menu/add?event=${
                                event?._id || ""
                            }`}
                            text="Add Menu for this Event"
                        />
                        <MenuEventFilterForm
                            setFilterValues={setFilterMenuValues}
                            menus={menus}
                        />
                        <RelatedMenuTable
                            filterName="event"
                            itemFilter={event}
                            filterValues={filterMenuValues}
                        />
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
                            setFilterValues={setFilterInvoiceOrderValues}
                            orders={orders}
                        />
                        <RelatedOrdersTable
                            filterName="event"
                            itemFilter={event}
                            filterValues={filterInvoiceOrderValues}
                        />
                    </Space>
                ),
            },
        ],
        [event, menus, orders, filterMenuValues, filterInvoiceOrderValues],
    );

    return (
        <LoggedIn title="Saso App | Event">
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
        </LoggedIn>
    );
}
