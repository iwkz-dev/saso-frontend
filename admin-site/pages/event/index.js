import LoggedInLayout from "../../src/components/Layout/loggedInLayout/loggedInLayout";
import React, { useEffect, useState } from "react";
import {
    deleteEvent,
    getAllEvents,
} from "../../src/store/reducers/eventReducer";
import { useDispatch } from "react-redux";
import Alert from "../../src/components/common/Message/Alert/Alert";
import Loading from "../../src/components/common/Loading/Loading";
import EventTable from "../../src/components/Table/Event/EventTable/EventTable";
import AddItemButton from "../../src/components/common/Button/AddItemButton/AddItemButton";
import { changeEventStatus } from "../../src/store/reducers/eventReducer";

const event = () => {
    const dispatch = useDispatch();
    const pageData = { name: "Event", href: "/event", current: true };
    const pageTitle = "Saso App | Event";
    const [showTable, setShowTable] = useState(false);
    const [showLoading, setShowLoading] = useState(false);
    const [showError, setShowError] = useState("");
    const [showSuccess, setShowSuccess] = useState(false);
    const [showFailed, setShowFailed] = useState(false);
    const [showUploading, setShowUploading] = useState(false);

    useEffect(() => {
        setShowLoading(true);
        setShowError("");
        const getEvents = async () => {
            return dispatch(getAllEvents());
        };
        getEvents().then((r) => {
            if (r.status === "success") {
                setShowLoading(false);
                setShowTable(true);
            } else {
                setShowLoading(false);
                setShowError(r.message);
                setShowTable(false);
            }
        });
    }, []);

    const onChangeStatus = async (e, id) => {
        setShowSuccess(false);
        setShowFailed(false);
        setShowUploading(true);
        try {
            const onChangeStatus = await dispatch(
                changeEventStatus(id, e.target.value),
            );
            setShowSuccess(onChangeStatus.message);
            if (onChangeStatus.status !== "failed") {
                setShowUploading(false);
                setShowSuccess(onChangeStatus.message);
                try {
                    setShowUploading(true);
                    const getEvents = await dispatch(getAllEvents());
                    if (getEvents.status !== "failed") {
                        setShowUploading(false);
                    } else {
                        setShowUploading(false);
                        setShowFailed(getEvents.message);
                    }
                } catch (e) {
                    //TODO: handle error here
                    setShowUploading(false);
                    setShowFailed(e);
                }
            } else {
                setShowUploading(false);
                setShowFailed(onChangeStatus.message);
            }
        } catch (error) {
            setShowUploading(false);
            setShowFailed(true);
        }
    };

    const onDelete = async (id, name) => {
        const isConfirm = confirm(
            `Please confirm this if you want to delete "${name}"`,
        );
        if (isConfirm) {
            setShowFailed(false);
            setShowSuccess(false);
            setShowUploading(true);
            try {
                const onDelete = await dispatch(deleteEvent(id));
                if (onDelete.status !== "failed") {
                    setShowUploading(false);
                    setShowSuccess(onDelete.message);
                    try {
                        setShowUploading(true);
                        const getEvents = await dispatch(getAllEvents());
                        if (getEvents.status !== "failed") {
                            setShowUploading(false);
                        } else {
                            setShowUploading(false);
                            setShowFailed(getEvents.message);
                        }
                    } catch (e) {
                        //TODO: handle error here
                        setShowUploading(false);
                        setShowFailed(e);
                    }
                } else {
                    setShowUploading(false);
                    setShowFailed(onDelete.message);
                }
            } catch (e) {
                //TODO: handle error here
                setShowUploading(false);
                setShowFailed(e);
            }
        }
    };

    return (
        <LoggedInLayout title={pageTitle} pageData={pageData}>
            <div className="w-10/12 mx-auto">
                <h1 className="text-2xl font-bold text-left w-10/12 mb-3">
                    Event
                </h1>
                <div className="flex justify-between items-center mb-3">
                    <AddItemButton hrefLink="/event/add" text="Add Event" />
                </div>
                <Alert
                    showFailed={showFailed}
                    showSuccess={showSuccess}
                    setShowFailed={setShowFailed}
                    setShowSuccess={setShowSuccess}
                    successMessage={showSuccess}
                    failedMessage={showFailed}
                    showUploading={showUploading}
                />
                {showError || ""}
                {showLoading ? (
                    <Loading />
                ) : showTable ? (
                    <EventTable
                        onDelete={onDelete}
                        onChangeStatus={onChangeStatus}
                        showFailed={showFailed}
                        showSuccess={showSuccess}
                        setShowFailed={setShowFailed}
                        setShowSuccess={setShowSuccess}
                        showUploading={showUploading}
                        setShowUploading={setShowUploading}
                    />
                ) : (
                    ""
                )}
            </div>
        </LoggedInLayout>
    );
};

export default event;
