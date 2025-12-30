import React, { useEffect, useState } from "react";
import AddContactPersonForm from "../../../../src/components/Form/ContactPerson/AddContactPersonForm/AddContactPersonForm";
import Content from "../../../../src/components/Layout/Content/Content";
import Protected from "../../../../src/components/Layout/Protected/Protected";
import { Spin, Typography, message } from "antd";
import { getAllEvents } from "../../../../src/store/reducers/eventReducer";
import { useDispatch } from "react-redux";
import { isAuth } from "../../../../src/helpers/authHelper";

const AddContactPersonPage = () => {
    const dispatch = useDispatch();
    const pageTitle = "Saso App | Contact Person";

    const [showLoading, setShowLoading] = useState(false);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        let isMounted = true;

        (async () => {
            try {
                if (isMounted) setShowLoading(true);
                const res = await dispatch(getAllEvents());
                if (!isMounted) return;

                if (res?.status === "success") {
                    setShowForm(true);
                } else {
                    message.error(res?.message || "Failed to load events");
                    isAuth(res); // keep your existing auth handling
                    setShowForm(false);
                }
            } catch (err) {
                if (!isMounted) return;
                message.error(err?.message || "Failed to load events");
                setShowForm(false);
            } finally {
                if (isMounted) setShowLoading(false);
            }
        })();

        return () => {
            isMounted = false;
        };
    }, [dispatch]);

    return (
        <Protected title={pageTitle}>
            <Content>
                <Typography.Title level={3}>
                    Add contact person
                </Typography.Title>
                <Spin spinning={showLoading} tip="Loading...">
                    {showForm ? <AddContactPersonForm /> : null}
                </Spin>
            </Content>
        </Protected>
    );
};

export default AddContactPersonPage;
