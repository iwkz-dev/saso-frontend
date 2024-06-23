import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { getDetailEvent } from "../../../../src/store/reducers/eventReducer";
import EditEventForm from "../../../../src/components/Form/Event/EditEventForm/EditEventForm";
import LoggedIn from "../../../../src/components/Layout/LoggedIn/LoggedIn";
import Content from "../../../../src/components/Layout/Content/Content";
import { Spin, Typography, message } from "antd";
import { isAuth } from "../../../../src/helpers/authHelper";

const id = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { id } = router.query;
    const pageTitle = "Saso App | Event";
    const [showForm, setShowForm] = useState(false);
    const [showLoading, setShowLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setShowLoading(true);
                const response = await dispatch(getDetailEvent(id));

                if (response.status === "success") {
                    setShowForm(true);
                } else {
                    message.error(response.message);
                    isAuth(response);
                }
            } catch (error) {
                // Handle any unexpected errors
                console.error("Error fetching data:", error);
            } finally {
                setShowLoading(false);
            }
        };

        if (id) {
            fetchData();
        }
    }, [id, dispatch]);

    return (
        <LoggedIn title={pageTitle}>
            <Content>
                <Spin spinning={showLoading} tip="Loading...">
                    <Typography.Title level={3}>Edit Event</Typography.Title>
                    {showForm ? <EditEventForm id={id} /> : ""}
                </Spin>
            </Content>
        </LoggedIn>
    );
};

export default id;
