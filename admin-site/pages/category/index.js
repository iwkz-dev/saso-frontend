import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
    deleteCategory,
    getAllCategories,
} from "../../src/store/reducers/categoryReducer";
import LoggedInLayout from "../../src/components/Layout/loggedInLayout/loggedInLayout";
import Loading from "../../src/components/common/Loading/Loading";
import CategoryTable from "../../src/components/Table/Category/CategoryTable/CategoryTable";
import AddItemButton from "../../src/components/common/Button/AddItemButton/AddItemButton";
import Alert from "../../src/components/common/Message/Alert/Alert";

const index = () => {
    const dispatch = useDispatch();
    const pageData = { name: "Category", href: "/category", current: true };
    const pageTitle = "Saso App | Event";
    const [showTable, setShowTable] = useState(false);
    const [showLoading, setShowLoading] = useState(false);
    const [showError, setShowError] = useState("");
    const [showSuccess, setShowSuccess] = useState(false);
    const [showFailed, setShowFailed] = useState(false);
    const [showUploading, setShowUploading] = useState(false);

    useEffect(() => {
        setShowLoading(true);
        setShowError("");
        const getEvents = async () => {
            return await dispatch(getAllCategories());
        };
        getEvents().then((r) => {
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

    const onDelete = async (item) => {
        const isConfirm = confirm(
            `Please confirm this if you want to delete "${item.name}"`,
        );
        if (isConfirm) {
            setShowFailed(false);
            setShowSuccess(false);
            setShowUploading(true);
            try {
                const onDelete = await dispatch(deleteCategory(item["_id"]));
                if (onDelete.status !== "failed") {
                    setShowUploading(false);
                    setShowSuccess(onDelete.message);
                    try {
                        setShowUploading(true);
                        const getCategories = await dispatch(
                            getAllCategories(),
                        );
                        if (getCategories.status !== "failed") {
                            setShowUploading(false);
                        } else {
                            setShowUploading(false);
                            setShowFailed(getCategories.message);
                        }
                    } catch (e) {
                        //TODO: handle error here
                        setShowUploading(false);
                        setShowFailed(e);
                    }
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
        <LoggedInLayout title={pageTitle} pageData={pageData}>
            <div className="w-10/12 mx-auto">
                <h1 className="text-2xl font-bold text-left mb-3">Category</h1>
                <div className="flex justify-between items-center mb-3">
                    <AddItemButton
                        hrefLink="/category/add"
                        text="Add Category"
                    />
                </div>
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
                    <CategoryTable onDelete={onDelete} />
                ) : (
                    ""
                )}
            </div>
        </LoggedInLayout>
    );
};

export default index;
