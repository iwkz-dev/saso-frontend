import LoggedIn from "../../src/components/Layout/LoggedIn/LoggedIn";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import EventTable from "../../src/components/Table/Event/EventTable/EventTable";
import AddItemButton from "../../src/components/common/Button/AddItemButton/AddItemButton";
import Content from "../../src/components/Layout/Content/Content";
import {
    deleteEvent,
    getAllEvents,
} from "../../src/store/reducers/eventReducer";
import { changeEventStatus } from "../../src/store/reducers/eventReducer";
import { Space, Typography, message } from "antd";

const event = () => {
    const dispatch = useDispatch();
    const pageTitle = "Saso App | Event";
    const [showTable, setShowTable] = useState(false);
    const [showLoadingData, setShowLoadingData] = useState(false);

    useEffect(() => {
        getEvents();
    }, []);

    const getEvents = () => {
        setShowLoadingData(true);
        const getEvents = async () => {
            return dispatch(getAllEvents());
        };
        getEvents().then((r) => {
            if (r.status === "success") {
                setShowLoadingData(false);
                setShowTable(true);
            } else {
                setShowLoadingData(false);
                setShowTable(false);
                message.error(r.message);
            }
        });
    };

    const onChangeStatus = async (value) => {
        setShowLoadingData(true);
        try {
            const onChangeStatus = await dispatch(
                changeEventStatus(
                    JSON.parse(value).id,
                    JSON.parse(value).value,
                ),
            );
            if (onChangeStatus.status !== "failed") {
                setShowLoadingData(false);
                message.success(onChangeStatus.message);
                getEvents();
            } else {
                setShowLoadingData(false);
                message.error(onChangeStatus.message);
            }
        } catch (error) {
            setShowLoadingData(false);
            message.error(onChangeStatus.message);
        }
    };

    const onDelete = async (item) => {
        const isConfirm = confirm(
            `Please confirm this if you want to delete "${item.name}"`,
        );
        if (isConfirm) {
            setShowLoadingData(true);
            try {
                const onDelete = await dispatch(deleteEvent(item["_id"]));
                if (onDelete.status !== "failed") {
                    setShowLoadingData(false);
                    message.success(onDelete.message);
                    getEvents();
                } else {
                    setShowLoadingData(false);
                    message.error(onDelete.message);
                }
            } catch (e) {
                //TODO: handle error here
                setShowLoadingData(false);
                message.error(e.mnessage);
            }
        }
    };

    return (
        <LoggedIn title={pageTitle}>
            <Content>
                <Typography.Title level={3}>Event</Typography.Title>
                <Space direction="vertical" style={{ display: "flex" }}>
                    <AddItemButton hrefLink="/event/add" text="Add Event" />
                    <EventTable
                        onDelete={onDelete}
                        onChangeStatus={onChangeStatus}
                        isLoading={showLoadingData}
                        showTable={showTable}
                    />
                </Space>
            </Content>
        </LoggedIn>
    );
};

export default event;
