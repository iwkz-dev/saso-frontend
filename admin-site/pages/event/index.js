import LoggedInLayout from "../../src/components/Layout/loggedInLayout/loggedInLayout";
import React, { useEffect, useState } from "react";
import {
    deleteEvent,
    getAllEvents,
} from "../../src/store/reducers/eventReducer";
import { useDispatch } from "react-redux";
import Loading from "../../src/components/common/Loading/Loading";
import EventTable from "../../src/components/Table/Event/EventTable/EventTable";
import AddItemButton from "../../src/components/common/Button/AddItemButton/AddItemButton";

const event = () => {
    const dispatch = useDispatch();
    const pageData = { name: "Event", href: "/event", current: true };
    const pageTitle = "Saso App | Event";
    const [showTable, setShowTable] = useState(false);
    const [showLoading, setShowLoading] = useState(false);
    const [showError, setShowError] = useState("");

    useEffect(() => {
        setShowLoading(true);
        setShowError("");
        const getEvents = async () => {
            return await dispatch(getAllEvents());
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

    const onDelete = async (id, name) => {
        const isConfirm = confirm(
            `Please confirm this if you want to delete "${name}"`,
        );
        if (isConfirm) {
            setShowError("");
            try {
                const onDelete = await dispatch(deleteEvent(id));
                if (onDelete.status !== "failed") {
                    try {
                        setShowLoading(true);
                        const getEvents = await dispatch(getAllEvents());
                        if (getEvents.status !== "failed") {
                            setShowLoading(false);
                        } else {
                            setShowError(getEvents.message);
                        }
                    } catch (e) {
                        //TODO: handle error here
                        setShowError(e);
                    }
                }
            } catch (e) {
                //TODO: handle error here
                setShowError(e);
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
                {showError || ""}
                {showLoading ? (
                    <Loading />
                ) : showTable ? (
                    <EventTable onDelete={onDelete} />
                ) : (
                    ""
                )}
            </div>
        </LoggedInLayout>
    );
};

export default event;
