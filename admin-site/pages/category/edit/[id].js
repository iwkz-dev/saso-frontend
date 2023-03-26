import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { getDetailCategory } from "../../../src/store/reducers/categoryReducer";
import EditCategoryForm from "../../../src/components/Form/Category/EditCategoryForm/EditCategoryForm";
import LoggedIn from "../../../src/components/Layout/LoggedIn/LoggedIn";
import Content from "../../../src/components/Layout/Content/Content";
import { Spin, message } from "antd";

const id = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { id } = router.query;
    const pageTitle = "Saso App | Category";
    const [showForm, setShowForm] = useState(false);
    const [showLoading, setShowLoading] = useState(false);

    useEffect(() => {
        setShowLoading(true);
        if (id) {
            const getCategory = async () => {
                return dispatch(getDetailCategory(id));
            };
            getCategory().then((r) => {
                if (r.status === "success") {
                    setShowForm(true);
                    setShowLoading(false);
                } else {
                    setShowLoading(false);
                    message.error(r.message);
                }
            });
        }
    }, [id]);

    return (
        <LoggedIn title={pageTitle}>
            <Content>
                <h1 className="text-2xl font-bold text-left mb-3">
                    Edit Category
                </h1>
                <Spin spinning={showLoading} tip="Loading...">
                    {showForm ? <EditCategoryForm id={id} /> : ""}
                </Spin>
            </Content>
        </LoggedIn>
    );
};

export default id;
