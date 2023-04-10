import React, { useEffect, useState } from "react";
import LoggedIn from "../../src/components/Layout/LoggedIn/LoggedIn";
import { useDispatch } from "react-redux";
import AddItemButton from "../../src/components/common/Button/AddItemButton/AddItemButton";
import UserTable from "../../src/components/Table/User/UserTable/UserTable";
import { useSelector } from "react-redux";
import {
    deleteUser,
    getAllUsers,
    getDetailUser,
} from "../../src/store/reducers/userReducer";
import { getUserId } from "../../src/helpers/authHelper";
import Content from "../../src/components/Layout/Content/Content";
import { message, Space, Typography } from "antd";

const index = () => {
    const dispatch = useDispatch();
    const pageTitle = "Saso App | User";
    const [showTable, setShowTable] = useState(false);
    const [showLoading, setShowLoading] = useState(false);
    const currUser = useSelector((state) => state.user.detailUser);

    useEffect(() => {
        getdetailedUserAllUsers();
    }, []);

    const getdetailedUserAllUsers = () => {
        setShowLoading(true);
        Promise.all([
            dispatch(getDetailUser(getUserId())),
            dispatch(getAllUsers()),
        ]).then((responses) => {
            const failed = responses.find((r) => r?.status === "failed");
            if (!failed) {
                setShowLoading(false);
                setShowTable(true);
            } else {
                setShowLoading(false);
                message.error(failed.message);
                setShowTable(false);
            }
        });
    };

    const onDelete = async (item) => {
        const isConfirm = confirm(
            `Please confirm this if you want to delete "${item.fullname}"`,
        );
        if (isConfirm) {
            setShowLoading(true);
            try {
                const onDelete = await dispatch(deleteUser(item["_id"]));
                if (onDelete.status !== "failed") {
                    setShowLoading(false);
                    message.success(onDelete.message);
                    getdetailedUserAllUsers();
                } else {
                    setShowLoading(false);
                    message.error(onDelete.message);
                }
            } catch (e) {
                //TODO: handle error here
                setShowLoading(false);
                message.error(e.mnessage);
            }
        }
    };

    return (
        <LoggedIn title={pageTitle}>
            <Content>
                <Typography.Title level={3}>User</Typography.Title>
                <Space direction="vertical" style={{ display: "flex" }}>
                    {currUser?.role == 1 ? (
                        <div>
                            <AddItemButton
                                hrefLink="/user/add"
                                text="Add User"
                            />
                        </div>
                    ) : null}
                    <UserTable
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
