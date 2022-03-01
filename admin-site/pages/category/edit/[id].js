import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { getDetailCategory } from "../../../src/store/reducers/categoryReducer";
import Loading from "../../../src/components/common/Loading/Loading";
import LoggedInLayout from "../../../src/components/Layout/loggedInLayout/loggedInLayout";
import EditCategoryForm from "../../../src/components/Forms/Category/EditCategoryForm/EditCategoryForm";

const id = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { id } = router.query;
    const pageData = {
        name: "Category",
        href: `/category/edit/${id}`,
        current: true,
    };
    const pageTitle = "Saso App | Category";
    const [showForm, setShowForm] = useState(false);
    const [showError, setShowError] = useState("");
    const [showLoading, setShowLoading] = useState(false);

    useEffect(() => {
        setShowLoading(true);
        if (id) {
            const getCategory = async () => {
                return await dispatch(getDetailCategory(id));
            };
            getCategory().then((r) => {
                if (r.status === "success") {
                    setShowForm(true);
                    setShowLoading(false);
                } else {
                    setShowLoading(false);
                    setShowError(r.message);
                }
            });
        }
    }, [id]);

    return (
        <LoggedInLayout title={pageTitle} pageData={pageData}>
            <h1 className="text-2xl font-bold text-left w-10/12 mb-3">
                Edit Category
            </h1>
            {showLoading ? <Loading /> : ""}
            {showForm ? <EditCategoryForm id={id} /> : ""}
            {showError || ""}
        </LoggedInLayout>
    );
};

export default id;
