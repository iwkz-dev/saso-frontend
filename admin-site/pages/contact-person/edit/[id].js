import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { getDetailContactPerson } from "../../../src/store/reducers/contactPersonReducer";
import EditContactPersonForm from "../../../src/components/Form/ContactPerson/EditContactPersonForm/EditContactPersonForm";
import LoggedIn from "../../../src/components/Layout/LoggedIn/LoggedIn";
import Content from "../../../src/components/Layout/Content/Content";
import { Spin, Typography, message } from "antd";
import { isAuth } from "../../../src/helpers/authHelper";

const id = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { id } = router.query;
    const pageTitle = "Saso App | Contact Person";
    const [showForm, setShowForm] = useState(false);
    const [showLoading, setShowLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setShowLoading(true);
                if (id) {
                    const response = await dispatch(getDetailContactPerson(id));

                    if (response.status === "success") {
                        setShowForm(true);
                    } else {
                        message.error(response.message);
                        isAuth(response);
                    }
                }
            } catch (error) {
                // Handle errors if necessary
            } finally {
                setShowLoading(false);
            }
        };

        fetchData();
    }, [id]);

    return (
        <LoggedIn title={pageTitle}>
            <Content>
                <Spin spinning={showLoading} tip="Loading...">
                    <Typography.Title level={3}>
                        Edit contact person
                    </Typography.Title>
                    {showForm ? <EditContactPersonForm /> : ""}
                </Spin>
            </Content>
        </LoggedIn>
    );
};

export default id;
