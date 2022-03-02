import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllCategories } from "../../../src/store/reducers/categoryReducer";
import Loading from "../../../src/components/common/Loading/Loading";
import AddCategoryForm from "../../../src/components/Form/Category/AddCategoryForm/AddCategoryForm";
import LoggedInLayout from "../../../src/components/Layout/loggedInLayout/loggedInLayout";

const index = () => {
    const dispatch = useDispatch();
    const pageData = {
        name: "Category",
        href: `/category/add/`,
        current: true,
    };
    const pageTitle = "Saso App | Category";
    const [showForm, setShowForm] = useState(false);
    const [showError, setShowError] = useState("");
    const [showLoading, setShowLoading] = useState(false);

    useEffect(() => {
        setShowLoading(true);
        const getCategories = async () => {
            return await dispatch(getAllCategories());
        };
        getCategories().then((r) => {
            if (r.status === "success") {
                setShowLoading(false);
                setShowForm(true);
            } else {
                setShowLoading(false);
                setShowError(r.message);
                setShowForm(false);
            }
        });
    }, []);

    return (
        <LoggedInLayout title={pageTitle} pageData={pageData}>
            <h1 className="text-2xl font-bold text-left w-10/12 mb-3">
                Add category
            </h1>
            {showLoading ? <Loading /> : ""}
            {showForm ? <AddCategoryForm /> : ""}
            {showError || ""}
        </LoggedInLayout>
    );
};

export default index;
