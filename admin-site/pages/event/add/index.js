import LoggedInLayout from "../../../src/components/Layout/loggedInLayout/loggedInLayout";
import React, { useEffect, useState } from "react";
import { getAllEvents } from "../../../src/store/reducers/eventReducer";
import { useDispatch } from "react-redux";
import Loading from "../../../src/components/common/Loading/Loading";
import AddEventForm from "../../../src/components/Form/Event/AddEventForm/AddEventForm";

const index = () => {
    const dispatch = useDispatch();
    const pageData = {
        name: "Event",
        href: `/event/add/`,
        current: true,
    };
    const pageTitle = "Saso App | Event";
    const [showForm, setShowForm] = useState(false);
    const [showError, setShowError] = useState("");
    const [showLoading, setShowLoading] = useState(false);

    useEffect(() => {
        setShowLoading(true);
        const getEvents = async () => {
            return await dispatch(getAllEvents());
        };
        getEvents().then((r) => {
            if (r.status === "success") {
                setShowLoading(false);
                setShowForm(true);
            } else {
                setShowLoading(false);
                setShowError(r.message);
                setShowForm(false);
            }
        });
    }, []);

    return (
        <LoggedInLayout title={pageTitle} pageData={pageData}>
            <h1 className="text-2xl font-bold text-left w-10/12 mb-3">
                Add event
            </h1>
            {showLoading ? <Loading /> : ""}
            {showForm ? <AddEventForm /> : ""}
            {showError || ""}
        </LoggedInLayout>
    );
};

export default index;
