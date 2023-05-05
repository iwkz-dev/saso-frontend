import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { getDetailEvent } from "../../../src/store/reducers/eventReducer";
import LoggedIn from "../../../src/components/Layout/LoggedIn/LoggedIn";
import EventDataDisplay from "../../../src/components/DataDisplay/EventDataDisplay/EventDataDisplay";
import RelatedMenuTable from "../../../src/components/Table/Event/RelatedMenuTable/RelatedMenuTable";
import AddItemButton from "../../../src/components/common/Button/AddItemButton/AddItemButton";
import Content from "../../../src/components/Layout/Content/Content";
import { Space, Spin, Typography, message } from "antd";
import { isAuth } from "../../../src/helpers/authHelper";
import EventSummary from "../../../src/components/Card/Event/EventSummary/EventSummary";

const id = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { id } = router.query;
    const pageTitle = "Saso App | Event";
    const [showDataDisplay, setShowDataDisplay] = useState(false);
    const [showLoading, setShowLoading] = useState(false);
    const event = useSelector((state) => state.event.detailEvent);

    useEffect(() => {
        setShowLoading(true);
        if (id) {
            const getData = async () => {
                return await dispatch(getDetailEvent(id));
            };
            getData().then((r) => {
                if (r.status === "success") {
                    setShowDataDisplay(true);
                    setShowLoading(false);
                } else {
                    setShowLoading(false);
                    message.error(r.message);
                    isAuth(r);
                }
            });
        }
    }, [id]);

    return (
        <LoggedIn title={pageTitle}>
            <Content>
                <Spin spinning={showLoading} tip="Loading...">
                    <Typography.Title level={3}>
                        View Event &quot;{event.name}&quot;
                    </Typography.Title>
                    {showDataDisplay ? (
                        <Space direction="vertical" style={{ display: "flex" }}>
                            <EventSummary event={event} />
                            <EventDataDisplay event={event} />
                            <Typography.Title level={3}>
                                Related Menu
                            </Typography.Title>
                            <AddItemButton
                                hrefLink={`/menu/add?event=${event._id}`}
                                text="Add Menu for this Event"
                            />
                            <RelatedMenuTable
                                filterName="event"
                                itemFilter={event}
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
