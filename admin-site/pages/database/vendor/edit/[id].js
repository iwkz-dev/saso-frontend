import React, { useEffect, useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { getDetailVendor } from "../../../../src/store/reducers/vendorReducer";
import EditVendorForm from "../../../../src/components/Form/Vendor/EditVendorForm/EditVendorForm";
import Protected from "../../../../src/components/Layout/Protected/Protected";
import Content from "../../../../src/components/Layout/Content/Content";
import { Spin, Typography, message } from "antd";
import { isAuth } from "../../../../src/helpers/authHelper";

const VendorEditPage = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { id } = router.query;

    const pageTitle = "Saso App | Vendor";
    const [showForm, setShowForm] = useState(false);
    const [showLoading, setShowLoading] = useState(false);

    const fetchData = useCallback(async () => {
        if (!id) return;
        setShowLoading(true);
        try {
            const res = await dispatch(getDetailVendor(id));
            if (res?.status === "success") {
                setShowForm(true);
            } else {
                message.error(res?.message || "Failed to load vendor");
                isAuth(res);
                setShowForm(false);
            }
        } catch (error) {
            message.error(error?.message || "Failed to load vendor");
            setShowForm(false);
        } finally {
            setShowLoading(false);
        }
    }, [dispatch, id]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <Protected title={pageTitle}>
            <Content>
                <Typography.Title level={3}>Edit vendor</Typography.Title>
                <Spin spinning={showLoading} tip="Loading...">
                    {showForm ? <EditVendorForm /> : null}
                </Spin>
            </Content>
        </Protected>
    );
};

export default VendorEditPage;
