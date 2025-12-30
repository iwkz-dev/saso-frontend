import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { getDetailVendor } from "../../../../src/store/reducers/vendorReducer";
import Protected from "../../../../src/components/Layout/Protected/Protected";
import VendorDataDisplay from "../../../../src/components/DataDisplay/VendorDataDisplay/VendorDataDisplay";
import RelatedMenuTable from "../../../../src/components/Table/Event/RelatedMenuTable/RelatedMenuTable";
import AddItemButton from "../../../../src/components/common/Button/AddItemButton/AddItemButton";
import Content from "../../../../src/components/Layout/Content/Content";
import { message, Space, Spin, Typography } from "antd";
import { isAuth } from "../../../../src/helpers/authHelper";

const VendorViewPage = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { id } = router.query;
    const pageTitle = "Saso App | Vendor";

    const vendor = useSelector((state) => state.vendor.detailVendor);

    const [showDataDisplay, setShowDataDisplay] = useState(false);
    const [showLoading, setShowLoading] = useState(false);

    const fetchData = useCallback(async () => {
        if (!id) return;
        setShowLoading(true);
        try {
            const res = await dispatch(getDetailVendor(id));
            if (res?.status === "success") {
                setShowDataDisplay(true);
            } else {
                message.error(res?.message || "Failed to load vendor");
                isAuth(res);
                setShowDataDisplay(false);
            }
        } catch (error) {
            message.error(error?.message || "Failed to load vendor");
            setShowDataDisplay(false);
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
                <Typography.Title level={3}>
                    View Vendor&nbsp;
                    {vendor?.name ? `“${vendor.name}”` : ""}
                </Typography.Title>
                <Spin spinning={showLoading} tip="Loading...">
                    {showDataDisplay ? (
                        <Space direction="vertical" style={{ display: "flex" }}>
                            <VendorDataDisplay vendor={vendor} />

                            <Typography.Title
                                level={3}
                                style={{ marginTop: 8 }}>
                                Related Menu
                            </Typography.Title>

                            <AddItemButton
                                hrefLink={`/database/menu/add?vendor=${vendor?._id}`}
                                text="Add Menu for this Vendor"
                            />

                            <RelatedMenuTable
                                filterName="vendor"
                                itemFilter={vendor}
                            />
                        </Space>
                    ) : null}
                </Spin>
            </Content>
        </Protected>
    );
};

export default VendorViewPage;
