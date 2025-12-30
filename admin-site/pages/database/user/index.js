import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import Protected from "../../../src/components/Layout/Protected/Protected";
import AddItemButton from "../../../src/components/common/Button/AddItemButton/AddItemButton";
import UserTable from "../../../src/components/Table/User/UserTable/UserTable";
import {
    deleteUser,
    getAllUsers,
    getDetailUser,
} from "../../../src/store/reducers/userReducer";
import { getUserId, isAuth } from "../../../src/helpers/authHelper";
import Content from "../../../src/components/Layout/Content/Content";
import { message, Space, Typography } from "antd";

const UserIndexPage = () => {
    const dispatch = useDispatch();
    const pageTitle = "Saso App | User";

    const [showTable, setShowTable] = useState(false);
    const [showLoading, setShowLoading] = useState(false);

    const currUser = useSelector((state) => state.user.detailUser);

    const fetchUsers = useCallback(async () => {
        setShowLoading(true);
        try {
            const uid = getUserId?.();
            const results = await Promise.all([
                uid
                    ? dispatch(getDetailUser(uid))
                    : Promise.resolve({ status: "success" }),
                dispatch(getAllUsers()),
            ]);

            const failed = results.find((r) => r?.status === "failed");
            if (failed) {
                setShowTable(false);
                message.error(failed?.message || "Failed to load users");
                isAuth(failed);
            } else {
                setShowTable(true);
            }
        } catch (err) {
            setShowTable(false);
            message.error(err?.message || "Failed to load users");
        } finally {
            setShowLoading(false);
        }
    }, [dispatch]);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    const onDelete = async (item) => {
        const ok = window.confirm(
            `Please confirm this if you want to delete "${item.fullname}"`,
        );
        if (!ok) return;

        setShowLoading(true);
        try {
            const res = await dispatch(deleteUser(item["_id"]));
            if (res?.status !== "failed") {
                message.success(res?.message || "User deleted");
                await fetchUsers();
            } else {
                message.error(res?.message || "Failed to delete user");
            }
        } catch (e) {
            message.error(e?.message || "Failed to delete user");
        } finally {
            setShowLoading(false);
        }
    };

    const isAdmin = currUser?.role === 1;

    return (
        <Protected title={pageTitle}>
            <Content>
                <Typography.Title level={3}>User</Typography.Title>
                <Space direction="vertical" style={{ display: "flex" }}>
                    {isAdmin && (
                        <div>
                            <AddItemButton
                                hrefLink="/database/user/add"
                                text="Add User"
                            />
                        </div>
                    )}
                    <UserTable
                        onDelete={onDelete}
                        isLoading={showLoading}
                        showTable={showTable}
                    />
                </Space>
            </Content>
        </Protected>
    );
};

export default UserIndexPage;
