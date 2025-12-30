import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { getDetailContactPerson } from "../../../../src/store/reducers/contactPersonReducer";
import EditContactPersonForm from "../../../../src/components/Form/ContactPerson/EditContactPersonForm/EditContactPersonForm";
import Protected from "../../../../src/components/Layout/Protected/Protected";
import Content from "../../../../src/components/Layout/Content/Content";
import { Spin, Typography, message } from "antd";
import { isAuth } from "../../../../src/helpers/authHelper";

const EditContactPersonPage = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { id } = router.query;

    const pageTitle = "Saso App | Contact Person";
    const [showForm, setShowForm] = useState(false);
    const [showLoading, setShowLoading] = useState(false);

    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {
            if (!id) return; // wait until the id is available

            try {
                if (isMounted) setShowLoading(true);

                const res = await dispatch(getDetailContactPerson(id));
                if (!isMounted) return;

                if (res?.status === "success") {
                    setShowForm(true);
                } else {
                    message.error(
                        res?.message || "Failed to load contact person",
                    );
                    isAuth(res);
                    setShowForm(false);
                }
            } catch (err) {
                if (!isMounted) return;
                message.error(err?.message || "Failed to load contact person");
                setShowForm(false);
            } finally {
                if (isMounted) setShowLoading(false);
            }
        };

        fetchData();
        return () => {
            isMounted = false;
        };
    }, [dispatch, id]);

    return (
        <Protected title={pageTitle}>
            <Content>
                <Spin spinning={showLoading} tip="Loading...">
                    <Typography.Title level={3} style={{ margin: 0 }}>
                        Edit contact person
                    </Typography.Title>
                    {showForm ? <EditContactPersonForm /> : null}
                </Spin>
            </Content>
        </Protected>
    );
};

export default EditContactPersonPage;
