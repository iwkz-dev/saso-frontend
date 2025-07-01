import React, { useEffect, useState } from "react";
import Content from "../../../src/components/Layout/Content/Content";
import { useDispatch } from "react-redux";
import {
    deleteVendor,
    getAllVendors,
} from "../../../src/store/reducers/vendorReducer";
import LoggedIn from "../../../src/components/Layout/LoggedIn/LoggedIn";
import VendorTable from "../../../src/components/Table/Vendor/VendorTable/VendorTable";
import AddItemButton from "../../../src/components/common/Button/AddItemButton/AddItemButton";
import { Space, message, Typography } from "antd";
import { isAuth } from "../../../src/helpers/authHelper";

const index = () => {
    const dispatch = useDispatch();
    const pageTitle = "Saso App | Vendor";
    const [showTable, setShowTable] = useState(false);
    const [showLoadingData, setShowLoadingData] = useState(false);

    useEffect(() => {
        fetchVendors();
    }, []);

    const fetchVendors = async () => {
        try {
            setShowLoadingData(true);
            const result = await dispatch(getAllVendors());

            if (result.status === "success") {
                setShowLoadingData(false);
                setShowTable(true);
            } else {
                handleFailedRequest(result);
            }
        } catch (error) {
            handleFetchError(error);
        }
    };

    const handleFailedRequest = (response) => {
        setShowLoadingData(false);
        message.error(response.message);
        setShowTable(false);
        isAuth(response);
    };

    const handleFetchError = (error) => {
        // TODO: handle error here
        setShowLoadingData(false);
        message.error(error.message);
    };

    const onDelete = async (item) => {
        const isConfirm = window.confirm(
            `Please confirm if you want to delete "${item.name}"`,
        );

        if (isConfirm) {
            try {
                setShowLoadingData(true);
                const deleteResponse = await dispatch(
                    deleteVendor(item["_id"]),
                );

                if (deleteResponse.status !== "failed") {
                    setShowLoadingData(false);
                    message.success(deleteResponse.message);
                    fetchVendors();
                } else {
                    handleFailedRequest(deleteResponse);
                }
            } catch (error) {
                handleFetchError(error);
            }
        }
    };

    return (
        <LoggedIn title={pageTitle}>
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
        </LoggedIn>
    );
};

export default index;
