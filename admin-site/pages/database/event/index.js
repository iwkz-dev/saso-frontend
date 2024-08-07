import LoggedIn from "../../../src/components/Layout/LoggedIn/LoggedIn";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EventTable from "../../../src/components/Table/Event/EventTable/EventTable";
import AddItemButton from "../../../src/components/common/Button/AddItemButton/AddItemButton";
import Content from "../../../src/components/Layout/Content/Content";
import {
    deleteEvent,
    getAllEvents,
} from "../../../src/store/reducers/eventReducer";
import { changeEventStatus } from "../../../src/store/reducers/eventReducer";
import { Space, Typography, message } from "antd";
import { isAuth } from "../../../src/helpers/authHelper";

const event = () => {
    const dispatch = useDispatch();
    const pageTitle = "Saso App | Event";
    const { events, loading, status, error, success } = useSelector(
        (state) => state.event,
    );
    const [showTable, setShowTable] = useState(false);
    const [showLoadingData, setShowLoadingData] = useState(false);

    useEffect(() => {
        dispatch(getAllEvents());
    }, []);

    useEffect(() => {
        if (status === "failed") {
            message.error(error);
        }

        if (status === "success") {
            message.success(success);
        }
    }, [status]);

    console.log(status);

    if (status === "failed") {
        message.error(error);
    }

    const onChangeStatus = async (value) => {
        const data = {
            id: JSON.parse(value).id,
            status: JSON.parse(value).value,
        };
        await dispatch(changeEventStatus(data));
        await dispatch(getAllEvents());
        if (status === "success") {
            message.success(success);
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
                        events={events}
                        onDelete={onDelete}
                        onChangeStatus={onChangeStatus}
                        isLoading={loading}
                        showTable={showTable}
                    />
                </Space>
            </Content>
        </LoggedIn>
    );
};

export default event;
