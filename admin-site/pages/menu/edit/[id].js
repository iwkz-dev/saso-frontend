import { useRouter } from "next/router";
import LoggedIn from "../../../src/components/Layout/LoggedIn/LoggedIn";
import EditMenuForm from "../../../src/components/Form/Menu/EditMenuForm/EditMenuForm";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getDetailMenu } from "../../../src/store/reducers/menuReducer";
import { getAllEvents } from "../../../src/store/reducers/eventReducer";
import { getAllCategories } from "../../../src/store/reducers/categoryReducer";
import Loading from "../../../src/components/common/Loading/Loading";
import Content from "../../../src/components/Layout/Content/Content";
import { Typography } from "antd";

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
        <LoggedIn title={pageTitle} pageData={pageData}>
            <Content>
                <Typography.Title level={2}>Edit menu</Typography.Title>
                {showLoading ? <Loading /> : ""}
                {showForm ? <EditMenuForm id={id} /> : ""}
                {showError || ""}
            </Content>
        </LoggedIn>
    );
};

export default id;
