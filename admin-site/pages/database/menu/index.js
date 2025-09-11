import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    deleteMenu,
    getAllMenus,
} from "../../../src/store/reducers/menuReducer";
import { getAllCategories } from "../../../src/store/reducers/categoryReducer";
import { getAllEvents } from "../../../src/store/reducers/eventReducer";
import { getAllVendors } from "../../../src/store/reducers/vendorReducer";
import LoggedIn from "../../../src/components/Layout/LoggedIn/LoggedIn";
import MenuTable from "../../../src/components/Table/Menu/MenuTable/MenuTable";
import AddItemButton from "../../../src/components/common/Button/AddItemButton/AddItemButton";
import Content from "../../../src/components/Layout/Content/Content";
import { message, Space, Typography } from "antd";
import { isAuth } from "../../../src/helpers/authHelper";

const Index = () => {
    const dispatch = useDispatch();
    const pageTitle = "Saso App | Menu";

    const menus = useSelector((s) => s.menu.menus);

    const [showTable, setShowTable] = useState(false);
    const [showLoading, setShowLoading] = useState(false);

    const mountedRef = useRef(true);
    useEffect(
        () => () => {
            mountedRef.current = false;
        },
        [],
    );

    const fetchAll = useCallback(async () => {
        if (!mountedRef.current) return;
        setShowLoading(true);
        try {
            const [evRes, catRes, menRes, venRes] = await Promise.all([
                dispatch(getAllEvents()),
                dispatch(getAllCategories()),
                dispatch(getAllMenus()),
                dispatch(getAllVendors()),
            ]);

            const failed = [evRes, catRes, menRes, venRes].find(
                (r) => r?.status === "failed",
            );

            if (failed) {
                // Show the most relevant message, honor auth handling
                message.error(failed?.message || "Failed to load data");
                isAuth(failed);
                if (mountedRef.current) setShowTable(false);
                return;
            }

            if (mountedRef.current) setShowTable(true);
        } catch (err) {
            message.error(err?.message || "Failed to load data");
            isAuth(err);
            if (mountedRef.current) setShowTable(false);
        } finally {
            if (mountedRef.current) setShowLoading(false);
        }
    }, [dispatch]);

    useEffect(() => {
        fetchAll();
    }, [fetchAll]);

    const onDelete = async (item) => {
        const ok = window.confirm(
            `Please confirm this if you want to delete "${
                item?.name ?? "this menu"
            }"`,
        );
        if (!ok) return;

        if (mountedRef.current) setShowLoading(true);
        try {
            const res = await dispatch(deleteMenu(item["_id"]));
            if (res?.status !== "failed") {
                message.success(res?.message || "Menu deleted");
                await fetchAll();
            } else {
                message.error(res?.message || "Failed to delete menu");
                isAuth(res);
            }
        } catch (err) {
            message.error(err?.message || "Failed to delete menu");
            isAuth(err);
        } finally {
            if (mountedRef.current) setShowLoading(false);
        }
    };

    return (
        <LoggedIn title={pageTitle}>
            <Content>
                <Typography.Title level={3}>Menu</Typography.Title>

                <Space direction="vertical" style={{ display: "flex" }}>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            gap: 12,
                        }}>
                        <AddItemButton
                            hrefLink="/database/menu/add"
                            text="Add Menu"
                        />
                    </div>

                    <MenuTable
                        onDelete={onDelete}
                        isLoading={showLoading}
                        showTable={showTable && (menus?.length ?? 0) > 0}
                    />
                </Space>
            </Content>
        </LoggedIn>
    );
};

export default Index;
