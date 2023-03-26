import LoggedIn from "../../../src/components/Layout/LoggedIn/LoggedIn";
import AddMenuForm from "../../../src/components/Form/Menu/AddMenuForm/AddMenuForm";
import React, { useEffect, useState } from "react";
import { getAllEvents } from "../../../src/store/reducers/eventReducer";
import { getAllCategories } from "../../../src/store/reducers/categoryReducer";
import { useDispatch } from "react-redux";
import Loading from "../../../src/components/common/Loading/Loading";
import { useRouter } from "next/router";
import Content from "../../../src/components/Layout/Content/Content";
import { Typography } from "antd";

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
        <LoggedIn title={pageTitle} pageData={pageData}>
            <Content>
                <Typography.Title level={2}>Add menu</Typography.Title>
                {showLoading ? <Loading /> : ""}
                {showForm ? (
                    <AddMenuForm
                        name="imageUrls"
                        eventId={query.event}
                        categoryId={query.category}
                    />
                ) : (
                    ""
                )}
                {showError || ""}
            </Content>
        </LoggedIn>
    );
};

export default index;
