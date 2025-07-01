import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { getDetailVendor } from "../../../../src/store/reducers/vendorReducer";
import EditVendorForm from "../../../../src/components/Form/Vendor/EditVendorForm/EditVendorForm";
import LoggedIn from "../../../../src/components/Layout/LoggedIn/LoggedIn";
import Content from "../../../../src/components/Layout/Content/Content";
import { Spin, Typography, message } from "antd";
import { isAuth } from "../../../../src/helpers/authHelper";

const id = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { id } = router.query;
    const pageTitle = "Saso App | Vendor";
    const [showForm, setShowForm] = useState(false);
    const [showLoading, setShowLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setShowLoading(true);
                if (id) {
                    const response = await dispatch(getDetailVendor(id));

                    if (response.status === "success") {
                        setShowForm(true);
                    } else {
                        message.error(response.message);
                        isAuth(response);
                    }
                }
            } catch (error) {
                message.error(error.message);
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
                    <Typography.Title level={3}>Edit vendor</Typography.Title>
                    {showForm ? <EditVendorForm /> : ""}
                </Spin>
            </Content>
        </LoggedIn>
    );
};

export default id;
