import LoggedIn from "../../../src/components/Layout/LoggedIn/LoggedIn";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import EventTable from "../../../src/components/Table/Event/EventTable/EventTable";
import AddItemButton from "../../../src/components/common/Button/AddItemButton/AddItemButton";
import Content from "../../../src/components/Layout/Content/Content";
import {
    deleteEvent,
    getAllEvents,
} from "../../../src/store/reducers/eventReducer";
import {
    changeEventStatus,
    changeEventPOClosed,
} from "../../../src/store/reducers/eventReducer";
import { Space, Typography, message } from "antd";
import { isAuth } from "../../../src/helpers/authHelper";

const event = () => {
    const dispatch = useDispatch();
    const pageTitle = "Saso App | Event";
    const [showTable, setShowTable] = useState(false);
    const [showLoadingData, setShowLoadingData] = useState(false);

    useEffect(() => {
        getEvents();
    }, []);

    const getEvents = async () => {
        setShowLoadingData(true);
        try {
            const response = await dispatch(getAllEvents());
            if (response.status === "success") {
                setShowLoadingData(false);
                setShowTable(true);
            } else {
                setShowLoadingData(false);
                setShowTable(false);
                message.error(response.message);
                isAuth(response);
            }
        } catch (error) {
            setShowLoadingData(false);
            console.error("Error fetching events:", error);
        }
    };

    const onChangeStatus = async (value) => {
        setShowLoadingData(true);
        try {
            const { status, message: statusMessage } = await dispatch(
                changeEventStatus(
                    JSON.parse(value).id,
                    JSON.parse(value).value,
                ),
            );

            setShowLoadingData(false);
            if (status !== "failed") {
                message.success(statusMessage);
                getEvents();
            } else {
                message.error(statusMessage);
            }
        } catch (error) {
            setShowLoadingData(false);
            console.error("Error changing event status:", error);
        }
    };

    const onChangePOClosed = async (value) => {
        setShowLoadingData(true);
        try {
            const { status, message: statusMessage } = await dispatch(
                changeEventPOClosed(
                    JSON.parse(value).id,
                    JSON.parse(value).value,
                ),
            );

            setShowLoadingData(false);
            if (status !== "failed") {
                message.success(statusMessage);
                getEvents();
            } else {
                message.error(statusMessage);
            }
        } catch (error) {
            setShowLoadingData(false);
            console.error("Error changing event PO Closed status:", error);
        }
    };

    const onDelete = async (item) => {
        const isConfirm = confirm(
            `Please confirm this if you want to delete "${item.name}"`,
        );

        if (isConfirm) {
            setShowLoadingData(true);

            try {
                const result = await dispatch(deleteEvent(item["_id"]));
                setShowLoadingData(false);

                const { status, message: msg } = result;

                status !== "failed" ? message.success(msg) : message.error(msg);

                if (status !== "failed") {
                    getEvents();
                }
            } catch (e) {
                // TODO: handle error here
                setShowLoadingData(false);
                message.error(e.message);
            }
        }
    };

    return (
        <LoggedIn title={pageTitle}>
            <Content>
                <Typography.Title level={3}>Event</Typography.Title>
                <Space direction="vertical" style={{ display: "flex" }}>
                    <AddItemButton
                        hrefLink="/database/event/add"
                        text="Add Event"
                    />
                    <EventTable
                        onDelete={onDelete}
                        onChangeStatus={onChangeStatus}
                        onChangePOClosed={onChangePOClosed}
                        isLoading={showLoadingData}
                        showTable={showTable}
                    />
                </Space>
            </Content>
        </LoggedIn>
    );
};

export default event;
