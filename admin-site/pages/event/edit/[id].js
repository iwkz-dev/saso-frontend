import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { getDetailEvent } from "../../../src/store/reducers/eventReducer";
import Loading from "../../../src/components/common/Loading/Loading";
import EditEventForm from "../../../src/components/Form/Event/EditEventForm/EditEventForm";
import LoggedInLayout from "../../../src/components/Layout/loggedInLayout/loggedInLayout";

const id = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { id } = router.query;
    const pageData = {
        name: "Event",
        href: `/event/edit/${id}`,
        current: true,
    };
    const pageTitle = "Saso App | Event";
    const [showForm, setShowForm] = useState(false);
    const [showError, setShowError] = useState("");
    const [showLoading, setShowLoading] = useState(false);

    useEffect(() => {
        setShowLoading(true);
        if (id) {
            const getData = async () => {
                return await dispatch(getDetailEvent(id));
            };
            getData().then((r) => {
                if (r.status === "success") {
                    setShowForm(true);
                    setShowLoading(false);
                } else {
                    setShowLoading(false);
                    setShowError(r.message);
                }
            });
        }
    }, [id]);

    return (
        <LoggedInLayout title={pageTitle} pageData={pageData}>
            <div className="w-10/12 mx-auto">
                <h1 className="text-2xl font-bold text-left mb-3">
                    Edit Event
                </h1>
                {showLoading ? <Loading /> : ""}
                {showForm ? <EditEventForm id={id} /> : ""}
                {showError || ""}
            </div>
        </LoggedInLayout>
    );
};

export default id;