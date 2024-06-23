import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
    deleteMenu,
    getAllMenus,
} from "../../../src/store/reducers/menuReducer";
import { getAllCategories } from "../../../src/store/reducers/categoryReducer";
import { getAllEvents } from "../../../src/store/reducers/eventReducer";
import LoggedIn from "../../../src/components/Layout/LoggedIn/LoggedIn";
import MenuTable from "../../../src/components/Table/Menu/MenuTable/MenuTable";
import AddItemButton from "../../../src/components/common/Button/AddItemButton/AddItemButton";
import Content from "../../../src/components/Layout/Content/Content";
import { message, Space, Typography } from "antd";
import { isAuth } from "../../../src/helpers/authHelper";

const index = () => {
    const dispatch = useDispatch();
    const pageTitle = "Saso App | Menu";
    const [showTable, setShowTable] = useState(false);
    const [showLoading, setShowLoading] = useState(false);

    useEffect(() => {
        getEventsCategoriesMenus();
    }, []);

    const getEventsCategoriesMenus = async () => {
        try {
            setShowLoading(true);

            const [eventsResponse, categoriesResponse, menusResponse] =
                await Promise.all([
                    dispatch(getAllEvents()),
                    dispatch(getAllCategories()),
                    dispatch(getAllMenus()),
                ]);

            // Check for failed responses
            if (
                [eventsResponse, categoriesResponse, menusResponse].some(
                    (r) => r?.status === "failed",
                )
            ) {
                throw new Error("One or more requests failed");
            }

            // If all responses are successful
            setShowTable(true);
        } catch (error) {
            setShowTable(false);
            message.error(error.message);
            isAuth(error);
        } finally {
            setShowLoading(false);
        }
    };

    const onDelete = async (item) => {
        const isConfirmed = window.confirm(
            `Please confirm this if you want to delete "${item.name}"`,
        );

        if (isConfirmed) {
            setShowLoading(true);

            try {
                const onDeleteResult = await dispatch(deleteMenu(item["_id"]));

                if (onDeleteResult.status !== "failed") {
                    message.success(onDeleteResult.message);
                    getEventsCategoriesMenus();
                } else {
                    message.error(onDeleteResult.message);
                }
            } catch (error) {
                // TODO: Handle error here
                message.error(error.message);
            } finally {
                setShowLoading(false);
            }
        }
    };

    return (
        <LoggedIn title={pageTitle}>
            <Content>
                <Typography.Title level={3}>Menu</Typography.Title>
                <Space direction="vertical" style={{ display: "flex" }}>
                    <Space
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                        }}>
                        <AddItemButton
                            hrefLink="/database/menu/add"
                            text="Add Menu"
                        />
                    </Space>
                    <MenuTable
                        onDelete={onDelete}
                        isLoading={showLoading}
                        showTable={showTable}
                    />
                </Space>
            </Content>
        </LoggedIn>
    );
};

export default index;
