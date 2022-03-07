import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useRouter} from "next/router";
import {getDetailEvent} from "../../../src/store/reducers/eventReducer";
import Loading from "../../../src/components/common/Loading/Loading";
import LoggedInLayout from "../../../src/components/Layout/loggedInLayout/loggedInLayout";

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
    const [showForm, setShowForm] = useState(false);
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
            {
                showLoading ? <Loading /> : (
                    <>
                        <h1 className="text-2xl font-bold text-left w-10/12 mb-3">
                            Event "{event.name}"
                        </h1>
                        {showLoading ? <Loading /> : ""}
                        {
                            showForm ? (
                                <p>
                                    show something
                                </p>
                            ) : ""
                        }
                        {showError || ""}
                    </>
                )
            }
        </LoggedInLayout>
    );
};

export default id;