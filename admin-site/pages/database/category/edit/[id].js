import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { getDetailCategory } from "../../../../src/store/reducers/categoryReducer";
import EditCategoryForm from "../../../../src/components/Form/Category/EditCategoryForm/EditCategoryForm";
import LoggedIn from "../../../../src/components/Layout/LoggedIn/LoggedIn";
import Content from "../../../../src/components/Layout/Content/Content";
import { Spin, Typography, message } from "antd";

export default function EditCategoryPage() {
    const dispatch = useDispatch();
    const router = useRouter();
    const { id } = router.query;

    const pageTitle = "Saso App | Category";

    const status = useSelector((s) => s.category.status);
    const error = useSelector((s) => s.category.error);
    const category = useSelector((s) => s.category.detailCategory) || {};

    const loading = status === "loading";
    const hasCategory = !!category && !!category._id;

    useEffect(() => {
        if (!router.isReady || !id) return;
        dispatch(getDetailCategory(id)).catch((err) => {
            message.error(err?.message || "Failed to load category");
        });
    }, [router.isReady, id, dispatch]);

    const errorBox = {
        padding: 12,
        borderRadius: 8,
        background: "#fff1f0",
        color: "#a8071a",
        border: "1px solid #ffa39e",
    };
    const emptyBox = {
        width: "100%",
        textAlign: "center",
        padding: "24px 0",
        color: "#7A8AA0",
        background: "#fff",
        borderRadius: 12,
        border: "1px dashed #CFD8E3",
    };

    return (
        <LoggedIn title={pageTitle}>
            <Content>
                <Typography.Title level={3}>
                    Edit Category{hasCategory ? ` — ${category.name}` : ""}
                </Typography.Title>

                {error && !loading ? <div style={errorBox}>{error}</div> : null}

                <Spin spinning={loading} tip="Loading...">
                    {hasCategory ? (
                        // Pass id if your form component needs it; otherwise it can read from the store
                        <EditCategoryForm id={id} />
                    ) : !loading ? (
                        <div style={emptyBox}>
                            Category not found or not loaded.
                        </div>
                    ) : null}
                </Spin>
            </Content>
        </LoggedIn>
    );
}
