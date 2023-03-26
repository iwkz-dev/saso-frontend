import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { getDetailEvent } from "../../../src/store/reducers/eventReducer";
import Loading from "../../../src/components/common/Loading/Loading";
import LoggedIn from "../../../src/components/Layout/LoggedIn/LoggedIn";
import EventDataDisplay from "../../../src/components/DataDisplay/EventDataDisplay/EventDataDisplay";
import RelatedMenuTable from "../../../src/components/Table/Event/RelatedMenuTable/RelatedMenuTable";
import AddItemButton from "../../../src/components/common/Button/AddItemButton/AddItemButton";
import Content from "../../../src/components/Layout/Content/Content";
import { Space, Typography } from "antd";

const id = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { id } = router.query;
    const pageData = {
        name: "Event",
        href: `/event/view/${id}`,
        current: true,
    };
    const pageTitle = "Saso App | Event";
    const [showDataDisplay, setShowDataDisplay] = useState(false);
    const [showError, setShowError] = useState("");
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
                    setShowError(r.message);
                }
            });
        }
    }, [id]);

    return (
        <LoggedIn title={pageTitle} pageData={pageData}>
            <Content>
                {showLoading ? (
                    <Loading />
                ) : (
                    <>
                        <Typography.Title level={2}>
                            View Event &quot;{event.name}&quot;
                        </Typography.Title>
                        {showDataDisplay ? (
                            <Space
                                direction="vertical"
                                style={{ display: "flex" }}>
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
                        {showError || ""}
                    </>
                )}
            </Content>
        </LoggedIn>
    );
};

export default id;
