import React, { useEffect, useState } from "react";
import AddContactPersonForm from "../../../src/components/Form/ContactPerson/AddContactPersonForm/AddContactPersonForm";
import Content from "../../../src/components/Layout/Content/Content";
import LoggedIn from "../../../src/components/Layout/LoggedIn/LoggedIn";
import { Spin, Typography, message } from "antd";
import { getAllEvents } from "../../../src/store/reducers/eventReducer";
import { useDispatch } from "react-redux";
import { isAuth } from "../../../src/helpers/authHelper";

const index = () => {
    const dispatch = useDispatch();
    const pageTitle = "Saso App | Contact Person";
    const [showLoading, setShowLoading] = useState(false);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                setShowLoading(true);
                const response = await dispatch(getAllEvents());

                if (response.status === "success") {
                    setShowForm(true);
                } else {
                    message.error(response.message);
                    isAuth(response);
                }
            } catch (error) {
                message.error(error.message);
            } finally {
                setShowLoading(false);
            }
        };

        fetchEvents();
    }, []);

    return (
        <LoggedIn title={pageTitle}>
            <Content>
                <Spin spinning={showLoading} tip="Loading...">
                    <Typography.Title level={3}>
                        Add contact person
                    </Typography.Title>
                    {showForm ? <AddContactPersonForm /> : ""}
                </Spin>
            </Content>
        </LoggedIn>
    );
};

export default index;
