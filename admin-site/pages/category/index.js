import React, { useEffect, useState } from "react";
import Content from "../../src/components/Layout/Content/Content";
import { useDispatch } from "react-redux";
import {
    deleteCategory,
    getAllCategories,
} from "../../src/store/reducers/categoryReducer";
import LoggedIn from "../../src/components/Layout/LoggedIn/LoggedIn";
import CategoryTable from "../../src/components/Table/Category/CategoryTable/CategoryTable";
import AddItemButton from "../../src/components/common/Button/AddItemButton/AddItemButton";
import { Space, message, Typography } from "antd";

const index = () => {
    const dispatch = useDispatch();
    const pageTitle = "Saso App | Category";
    const [showTable, setShowTable] = useState(false);
    const [showLoadingData, setShowLoadingData] = useState(false);

    useEffect(() => {
        getCategories();
    }, []);

    const getCategories = () => {
        setShowLoadingData(true);
        const getEvents = async () => {
            return dispatch(getAllCategories());
        };
        getEvents().then((r) => {
            if (r.status === "success") {
                setShowLoadingData(false);
                setShowTable(true);
            } else {
                setShowLoadingData(false);
                message.error(r.message);
                setShowTable(false);
            }
        });
    };

    const onDelete = async (item) => {
        const isConfirm = confirm(
            `Please confirm this if you want to delete "${item.name}"`,
        );
        if (isConfirm) {
            setShowLoadingData(true);
            try {
                const onDelete = await dispatch(deleteCategory(item["_id"]));
                if (onDelete.status !== "failed") {
                    setShowLoadingData(false);
                    message.success(onDelete.message);
                    getCategories();
                } else {
                    setShowLoadingData(false);
                    message.error(onDelete.message);
                }
            } catch (e) {
                //TODO: handle error here
                setShowLoadingData(false);
                message.error(e);
            }
        }
    };

    return (
        <LoggedIn title={pageTitle}>
            <Content>
                <Typography.Title level={2}>Category</Typography.Title>
                <Space direction="vertical" style={{ display: "flex" }}>
                    <AddItemButton
                        hrefLink="/category/add"
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
