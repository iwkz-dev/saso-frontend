import { useRouter } from "next/router";
import LoggedInLayout from "../../../src/components/Layout/loggedInLayout/loggedInLayout";
import EditMenuForm from "../../../src/components/Forms/Menu/EditMenuForm/EditMenuForm";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getDetailMenu } from "../../../src/store/reducers/menuReducer";
import { getAllEvents } from "../../../src/store/reducers/eventReducer";
import { getAllCategories } from "../../../src/store/reducers/categoryReducer";
import Loading from "../../../src/components/common/Loading/Loading";

const id = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { id } = router.query;
    const pageData = {
        name: "Menu",
        href: `/menu/edit/${id}`,
        current: true,
    };
    const pageTitle = "Saso App | Menu";
    const [showForm, setShowForm] = useState(false);
    const [showError, setShowError] = useState("");
    const [showLoading, setShowLoading] = useState(false);

    useEffect(() => {
        setShowLoading(true);
        if (id) {
            Promise.all([
                dispatch(getAllEvents()),
                dispatch(getAllCategories()),
                dispatch(getDetailMenu(id)),
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
        }
    }, [id]);

    return (
        <LoggedInLayout title={pageTitle} pageData={pageData}>
            <h1 className="text-2xl font-bold text-left w-10/12 mb-3">
                Edit menu
            </h1>
            {showLoading ? <Loading /> : ""}
            {showForm ? <EditMenuForm id={id} /> : ""}
            {showError || ""}
        </LoggedInLayout>
    );
};

export default id;
