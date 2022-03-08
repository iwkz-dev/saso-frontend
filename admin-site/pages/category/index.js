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

const index = () => {
    const dispatch = useDispatch();
    const pageData = { name: "Category", href: "/category", current: true };
    const pageTitle = "Saso App | Event";
    const [showTable, setShowTable] = useState(false);
    const [showLoading, setShowLoading] = useState(false);
    const [showError, setShowError] = useState("");

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

    const onDelete = async (id, name) => {
        const isConfirm = confirm(
            `Please confirm this if you want to delete "${name}"`,
        );
        if (isConfirm) {
            setShowError("");
            try {
                const onDelete = await dispatch(deleteCategory(id));
                if (onDelete.status !== "failed") {
                    try {
                        setShowLoading(true);
                        const getCategories = await dispatch(
                            getAllCategories(),
                        );
                        if (getCategories.status !== "failed") {
                            setShowLoading(false);
                        } else {
                            setShowError(getCategories.message);
                        }
                    } catch (e) {
                        //TODO: handle error here
                        setShowError(e);
                    }
                }
            } catch (e) {
                //TODO: handle error here
                setShowError(e);
            }
        }
    };

    return (
        <LoggedInLayout title={pageTitle} pageData={pageData}>
            <div className="w-10/12 mx-auto">
                <h1 className="text-2xl font-bold text-left mb-3">Category</h1>
                <div className="flex justify-between items-center mb-3">
                    <AddItemButton
                        hrefLink="./category/add"
                        text="Add Category"
                    />
                </div>
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
