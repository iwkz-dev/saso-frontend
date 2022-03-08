import LoggedInLayout from "../../../src/components/Layout/loggedInLayout/loggedInLayout";
import AddMenuForm from "../../../src/components/Form/Menu/AddMenuForm/AddMenuForm";
import React, { useEffect, useState } from "react";
import { getAllEvents } from "../../../src/store/reducers/eventReducer";
import { getAllCategories } from "../../../src/store/reducers/categoryReducer";
import { useDispatch } from "react-redux";
import Loading from "../../../src/components/common/Loading/Loading";
import { useRouter } from "next/router";

const index = () => {
    const dispatch = useDispatch();
    const pageData = {
        name: "Menu",
        href: `/menu/add/`,
        current: true,
    };
    const pageTitle = "Saso App | Menu";
    const [showForm, setShowForm] = useState(false);
    const [showError, setShowError] = useState("");
    const [showLoading, setShowLoading] = useState(false);
    const { query } = useRouter();

    useEffect(() => {
        setShowLoading(true);
        Promise.all([
            dispatch(getAllEvents()),
            dispatch(getAllCategories()),
        ]).then((responses) => {
            const failed = responses.find((r) => r?.status === "failed");
            if (!failed) {
                setShowForm(true);
                setShowLoading(false);
            } else {
                setShowLoading(false);
                setShowError(failed.message);
            }
        });
    }, []);

    return (
        <LoggedInLayout title={pageTitle} pageData={pageData}>
            <div className="w-10/12 mx-auto">
                <h1 className="text-2xl font-bold text-left w-10/12 mb-3">
                    Add menu
                </h1>
                {showLoading ? <Loading /> : ""}
                {showForm ? (
                    <AddMenuForm name="imageUrls" eventId={query.event} />
                ) : (
                    ""
                )}
                {showError || ""}
            </div>
        </LoggedInLayout>
    );
};

export default index;
