import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { getDetailVendor } from "../../../../src/store/reducers/vendorReducer";
import LoggedIn from "../../../../src/components/Layout/LoggedIn/LoggedIn";
import VendorDataDisplay from "../../../../src/components/DataDisplay/VendorDataDisplay/VendorDataDisplay";
import RelatedMenuTable from "../../../../src/components/Table/Event/RelatedMenuTable/RelatedMenuTable";
import AddItemButton from "../../../../src/components/common/Button/AddItemButton/AddItemButton";
import Content from "../../../../src/components/Layout/Content/Content";
import { message, Space, Spin, Typography } from "antd";
import { isAuth } from "../../../../src/helpers/authHelper";

const id = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { id } = router.query;
    const pageTitle = "Saso App | Vendor";
    const [showDataDisplay, setShowDataDisplay] = useState(false);
    const [showLoading, setShowLoading] = useState(false);
    const vendor = useSelector((state) => state.vendor.detailVendor);

    useEffect(() => {
        const fetchData = async () => {
            setShowLoading(true);

            if (id) {
                try {
                    const response = await dispatch(getDetailVendor(id));

                    if (response.status === "success") {
                        setShowDataDisplay(true);
                    } else {
                        message.error(response.message);
                        isAuth(response);
                    }
                } catch (error) {
                    // Handle any error that might occur during the API call
                    message.error(error.message);
                } finally {
                    setShowLoading(false);
                }
            }
        };

        fetchData();
    }, [id]);

    return (
        <LoggedIn title={pageTitle}>
            <Content>
                <Spin spinning={showLoading} tip="Loading...">
                    <Typography.Title level={3}>
                        View Vendor &quot;{vendor.name}&quot;
                    </Typography.Title>
                    {showDataDisplay ? (
                        <Space direction="vertical" style={{ display: "flex" }}>
                            <VendorDataDisplay vendor={vendor} />
                            <Typography.Title level={3}>
                                Related Menu
                            </Typography.Title>
                            <AddItemButton
                                hrefLink={`/menu/add?vendor=${vendor._id}`}
                                text="Add Menu for this Vendor"
                            />
                            <RelatedMenuTable
                                filterName="vendor"
                                itemFilter={vendor}
                            />
                        </Space>
                    ) : (
                        ""
                    )}
                </Spin>
            </Content>
        </LoggedIn>
    );
};

export default id;
