import React, { useEffect, useState } from "react";
import LoggedInLayout from "../../src/components/Layout/loggedInLayout/loggedInLayout";
import { useDispatch } from "react-redux";
import AddItemButton from "../../src/components/common/Button/AddItemButton/AddItemButton";
import Loading from "../../src/components/common/Loading/Loading";
import UserTable from "../../src/components/Table/User/UserTable/UserTable";
import { deleteUser, getAllUsers } from "../../src/store/reducers/userReducer";

const index = () => {
    const dispatch = useDispatch();
    const pageData = { name: "User", href: "/user", current: true };
    const pageTitle = "Saso App | User";
    const [showTable, setShowTable] = useState(false);
    const [showLoading, setShowLoading] = useState(false);
    const [showError, setShowError] = useState("");

    useEffect(() => {
        setShowLoading(true);
        setShowError("");
        const getData = async () => {
            return await dispatch(getAllUsers());
        };
        getData().then((r) => {
            if (r.status === "success") {
                setShowLoading(false);
                setShowTable(true);
            } else {
                setShowLoading(false);
                setShowError(r.message);
                setShowTable(false);
            }
        });
    }, []);

    const onDelete = async (id, name) => {
        const isConfirm = confirm(
            `Please confirm this if you want to delete "${name}"`,
        );
        if (isConfirm) {
            setShowError("");
            try {
                const onDelete = await dispatch(deleteUser(id));
                if (onDelete.status !== "failed") {
                    try {
                        setShowLoading(true);
                        const getEvents = await dispatch(getAllUsers());
                        if (getEvents.status !== "failed") {
                            setShowLoading(false);
                        } else {
                            setShowError(getEvents.message);
                        }
                    } catch (e) {
                        //TODO: handle error here
                        setShowError(e.message);
                    }
                }
            } catch (e) {
                //TODO: handle error here
                setShowError(e.message);
            }
        }
    };

    return (
        <LoggedInLayout title={pageTitle} pageData={pageData}>
            <div className="w-10/12 mx-auto">
                <h1 className="text-2xl font-bold text-left w-10/12 mb-3">
                    User
                </h1>
                <div className="flex justify-between items-center mb-3 w-10/12">
                    <AddItemButton hrefLink="./user/add" text="Add User" />
                </div>
                {showError || ""}
                {showLoading ? (
                    <Loading />
                ) : showTable ? (
                    <UserTable onDelete={onDelete} />
                ) : (
                    ""
                )}
            </div>
        </LoggedInLayout>
    );
};

export default index;
