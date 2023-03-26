import React, { useEffect, useState } from "react";
import LoggedIn from "../../src/components/Layout/LoggedIn/LoggedIn";
import { useDispatch } from "react-redux";
import AddItemButton from "../../src/components/common/Button/AddItemButton/AddItemButton";
import Loading from "../../src/components/common/Loading/Loading";
import UserTable from "../../src/components/Table/User/UserTable/UserTable";
import { useSelector } from "react-redux";
import {
    deleteUser,
    getAllUsers,
    getDetailUser,
} from "../../src/store/reducers/userReducer";
import Alert from "../../src/components/common/Message/Alert/Alert";
import { getUserId } from "../../src/helpers/authHelper";
import Content from "../../src/components/Layout/Content/Content";
import { Typography } from "antd";

const index = () => {
    const dispatch = useDispatch();
    const pageTitle = "Saso App | User";
    const [showTable, setShowTable] = useState(false);
    const [showLoading, setShowLoading] = useState(false);
    const [showError, setShowError] = useState("");
    const [showSuccess, setShowSuccess] = useState(false);
    const [showFailed, setShowFailed] = useState(false);
    const [showUploading, setShowUploading] = useState(false);
    const currUser = useSelector((state) => state.user.detailUser);

    useEffect(() => {
        getdetailedUserAllUsers();
    }, []);

    const getdetailedUserAllUsers = () => {
        setShowLoading(true);
        setShowError("");
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
                setShowError(failed.message);
                setShowTable(false);
            }
        });
    };

    const onDelete = async (item) => {
        const isConfirm = confirm(
            `Please confirm this if you want to delete "${item.fullname}"`,
        );
        if (isConfirm) {
            setShowFailed(false);
            setShowSuccess(false);
            setShowUploading(true);
            try {
                const onDelete = await dispatch(deleteUser(item["_id"]));
                if (onDelete.status !== "failed") {
                    setShowUploading(false);
                    setShowSuccess(onDelete.message);
                    getdetailedUserAllUsers();
                } else {
                    setShowUploading(false);
                    setShowFailed(onDelete.message);
                }
            } catch (e) {
                //TODO: handle error here
                setShowUploading(false);
                setShowFailed(e);
            }
        }
    };

    return (
        <LoggedIn title={pageTitle}>
            <Content>
                <Typography.Title level={2}>User</Typography.Title>
                {currUser?.role == 1 ? (
                    <div className="flex justify-between items-center mb-3 w-10/12">
                        <AddItemButton hrefLink="/user/add" text="Add User" />
                    </div>
                ) : null}
                <Alert
                    showFailed={showFailed}
                    showSuccess={showSuccess}
                    setShowFailed={setShowFailed}
                    setShowSuccess={setShowSuccess}
                    successMessage={showSuccess}
                    failedMessage={showFailed}
                    showUploading={showUploading}
                />
                {showError || ""}
                {showLoading ? (
                    <Loading />
                ) : showTable ? (
                    <UserTable onDelete={onDelete} />
                ) : (
                    ""
                )}
            </Content>
        </LoggedIn>
    );
};

export default index;
