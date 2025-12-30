import React, { useEffect, useState, useCallback } from "react";
import Content from "../../../src/components/Layout/Content/Content";
import { useDispatch } from "react-redux";
import {
    deleteVendor,
    getAllVendors,
} from "../../../src/store/reducers/vendorReducer";
import Protected from "../../../src/components/Layout/Protected/Protected";
import VendorTable from "../../../src/components/Table/Vendor/VendorTable/VendorTable";
import AddItemButton from "../../../src/components/common/Button/AddItemButton/AddItemButton";
import { Space, message, Typography } from "antd";
import { isAuth } from "../../../src/helpers/authHelper";

const VendorIndexPage = () => {
    const dispatch = useDispatch();
    const pageTitle = "Saso App | Vendor";
    const [showTable, setShowTable] = useState(false);
    const [showLoadingData, setShowLoadingData] = useState(false);

    const handleFailedRequest = useCallback((response) => {
        setShowLoadingData(false);
        setShowTable(false);
        message.error(response?.message || "Failed to load vendors");
        isAuth(response);
    }, []);

    const handleFetchError = useCallback((error) => {
        setShowLoadingData(false);
        setShowTable(false);
        message.error(error?.message || "Failed to load vendors");
    }, []);

    const fetchVendors = useCallback(async () => {
        setShowLoadingData(true);
        try {
            const result = await dispatch(getAllVendors());
            if (result?.status === "success") {
                setShowTable(true);
            } else {
                handleFailedRequest(result);
            }
        } catch (error) {
            handleFetchError(error);
        } finally {
            setShowLoadingData(false);
        }
    }, [dispatch, handleFailedRequest, handleFetchError]);

    useEffect(() => {
        fetchVendors();
    }, [fetchVendors]);

    const onDelete = async (item) => {
        const ok = window.confirm(
            `Please confirm if you want to delete "${item.name}"`,
        );
        if (!ok) return;

        setShowLoadingData(true);
        try {
            const res = await dispatch(deleteVendor(item["_id"]));
            if (res?.status !== "failed") {
                message.success(res?.message || "Vendor deleted");
            } else {
                handleFailedRequest(res);
            }
        } catch (error) {
            handleFetchError(error);
        } finally {
            setShowLoadingData(false);
        }
    };

    return (
        <Protected title={pageTitle}>
            <Content>
                <Typography.Title level={3}>Vendor</Typography.Title>
                <Space direction="vertical" style={{ display: "flex" }}>
                    <AddItemButton
                        hrefLink="/database/vendor/add"
                        text="Add Vendor"
                    />
                    <VendorTable
                        onDelete={onDelete}
                        isLoading={showLoadingData}
                        showTable={showTable}
                    />
                </Space>
            </Content>
        </Protected>
    );
};

export default VendorIndexPage;
