import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { getDetailEvent } from "../../../src/store/reducers/eventReducer";
import EditEventForm from "../../../src/components/Form/Event/EditEventForm/EditEventForm";
import LoggedIn from "../../../src/components/Layout/LoggedIn/LoggedIn";
import Content from "../../../src/components/Layout/Content/Content";
import { Spin, Typography, message } from "antd";

const id = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { id } = router.query;
    const pageTitle = "Saso App | Event";
    const [showForm, setShowForm] = useState(false);
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
                    message.error(r.message);
                }
            });
        }
    }, [id]);

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
