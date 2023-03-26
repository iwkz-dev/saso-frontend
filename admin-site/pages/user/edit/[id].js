import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { getDetailUser } from "../../../src/store/reducers/userReducer";
import Loading from "../../../src/components/common/Loading/Loading";
import EditUserForm from "../../../src/components/Form/User/EditUserForm/EditUserForm";
import LoggedIn from "../../../src/components/Layout/LoggedIn/LoggedIn";
import Content from "../../../src/components/Layout/Content/Content";
import { Typography } from "antd";

const id = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { id } = router.query;
    const pageData = {
        name: "User",
        href: `/user/edit/${id}`,
        current: true,
    };
    const pageTitle = "Saso App | User";
    const [showForm, setShowForm] = useState(false);
    const [showError, setShowError] = useState("");
    const [showLoading, setShowLoading] = useState(false);

    useEffect(() => {
        setShowLoading(true);
        if (id) {
            const getData = async () => {
                return await dispatch(getDetailUser(id));
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
        <LoggedIn title={pageTitle} pageData={pageData}>
            <Content>
                <Typography.Title level={2}>Edit User</Typography.Title>
                {showLoading ? <Loading /> : ""}
                {showForm ? <EditUserForm id={id} /> : ""}
                {showError || ""}
            </Content>
        </LoggedIn>
    );
};

export default id;
