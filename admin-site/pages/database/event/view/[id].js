import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { getDetailEvent } from "../../../../src/store/reducers/eventReducer";
import LoggedIn from "../../../../src/components/Layout/LoggedIn/LoggedIn";
import EventDataDisplay from "../../../../src/components/DataDisplay/EventDataDisplay/EventDataDisplay";
import RelatedMenuTable from "../../../../src/components/Table/Event/RelatedMenuTable/RelatedMenuTable";
import AddItemButton from "../../../../src/components/common/Button/AddItemButton/AddItemButton";
import Content from "../../../../src/components/Layout/Content/Content";
import { Space, Spin, Tabs, Typography, message } from "antd";
import { isAuth } from "../../../../src/helpers/authHelper";
import EventSummary from "../../../../src/components/Card/Event/EventSummary/EventSummary";
import RelatedOrdersTable from "../../../../src/components/Table/Event/RelatedOrders/RelatedOrdersTable";

const id = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { id } = router.query;
    const pageTitle = "Saso App | Event";
    const [showDataDisplay, setShowDataDisplay] = useState(false);
    const [showLoading, setShowLoading] = useState(false);
    const event = useSelector((state) => state.event.detailEvent);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setShowLoading(true);
                const response = await dispatch(getDetailEvent(id));

                if (response.status === "success") {
                    setShowDataDisplay(true);
                } else {
                    message.error(response.message);
                    isAuth(response);
                }
            } catch (error) {
                // Handle any unexpected errors
                console.error("Error fetching data:", error);
            } finally {
                setShowLoading(false);
            }
        };

        if (id) {
            fetchData();
        }
    }, [id, dispatch]);

    const items = [
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
                        hrefLink={`/database/menu/add?event=${event._id}`}
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
                    <RelatedOrdersTable filterName="event" itemFilter={event} />
                </Space>
            ),
        },
    ];

    return (
        <LoggedIn title={pageTitle}>
            <Content>
                <Spin spinning={showLoading} tip="Loading...">
                    <Typography.Title level={3}>{event.name}</Typography.Title>
                    {showDataDisplay ? (
                        <Space direction="vertical" style={{ display: "flex" }}>
                            <Tabs
                                defaultActiveKey="1"
                                items={items}
                                destroyInactiveTabPane={true}
                            />
                        </Space>
                    ) : (
                        ""
                    )}
                </Spin>
            </Content>
        </LoggedIn>
    );
};

export default id;
