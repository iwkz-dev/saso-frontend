import React, { useEffect, useState } from "react";
import Content from "../../../src/components/Layout/Content/Content";
import { useDispatch } from "react-redux";
import {
    deleteCategory,
    getAllCategories,
} from "../../../src/store/reducers/categoryReducer";
import LoggedIn from "../../../src/components/Layout/LoggedIn/LoggedIn";
import CategoryTable from "../../../src/components/Table/Category/CategoryTable/CategoryTable";
import AddItemButton from "../../../src/components/common/Button/AddItemButton/AddItemButton";
import { Space, message, Typography } from "antd";
import { isAuth } from "../../../src/helpers/authHelper";

const index = () => {
    const dispatch = useDispatch();
    const pageTitle = "Saso App | Category";
    const [showTable, setShowTable] = useState(false);
    const [showLoadingData, setShowLoadingData] = useState(false);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            setShowLoadingData(true);
            const result = await dispatch(getAllCategories());

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
                    deleteCategory(item["_id"]),
                );

                if (deleteResponse.status !== "failed") {
                    setShowLoadingData(false);
                    message.success(deleteResponse.message);
                    fetchCategories();
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
                <Typography.Title level={3}>Category</Typography.Title>
                <Space direction="vertical" style={{ display: "flex" }}>
                    <AddItemButton
                        hrefLink="/database/category/add"
                        text="Add Category"
                    />
                    <CategoryTable
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
