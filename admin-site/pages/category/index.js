import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
    deleteCategory,
    getAllCategories,
} from "../../src/store/reducers/categoryReducer";
import LoggedInLayout from "../../src/components/Layout/loggedInLayout/loggedInLayout";
import Link from "next/link";
import { IoMdAddCircle } from "react-icons/io";
import Loading from "../../src/components/common/Loading/Loading";
import CategoryTable from "../../src/components/Tables/Category/CategoryTable/CategoryTable";

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
            <h1 className="text-2xl font-bold text-left w-10/12 mb-3">
                Category
            </h1>
            <div className="flex justify-between items-center mb-3 w-10/12">
                <Link href="./category/add" className="cursor-pointer">
                    <a className="flex items-center rounded-lg p-2 border rounded-xl border-emerald-700">
                        <IoMdAddCircle
                            className="pr-1"
                            color="#047857"
                            size={30}
                        />
                        <span className="text-emerald-700">Add Category</span>
                    </a>
                </Link>
            </div>
            {showError || ""}
            {showLoading ? (
                <Loading />
            ) : showTable ? (
                <CategoryTable onDelete={onDelete} />
            ) : (
                ""
            )}
        </LoggedInLayout>
    );
};

export default index;
