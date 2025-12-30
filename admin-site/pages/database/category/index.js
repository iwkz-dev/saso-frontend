import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import Protected from "../../../src/components/Layout/Protected/Protected";
import Content from "../../../src/components/Layout/Content/Content";
import CategoryTable from "../../../src/components/Table/Category/CategoryTable/CategoryTable";
import AddItemButton from "../../../src/components/common/Button/AddItemButton/AddItemButton";
import { Typography, Space, message } from "antd";
import {
    getAllCategories,
    deleteCategory,
} from "../../../src/store/reducers/categoryReducer";

export default function CategoryIndexPage() {
    const dispatch = useDispatch();
    const pageTitle = "Saso App | Category";

    const { status, error, categories } = useSelector((s) => s.category);
    const [opLoading, setOpLoading] = useState(false);

    const loading = status === "loading" || opLoading;
    const showTable = useMemo(
        () => (categories?.length || 0) > 0,
        [categories],
    );

    useEffect(() => {
        dispatch(getAllCategories()).then((res) => {
            if (res?.status !== "success") {
                message.error(res?.message || "Failed to load categories");
            }
        });
    }, [dispatch]);

    const onDelete = async (item) => {
        const ok = window.confirm(
            `Please confirm if you want to delete "${
                item?.name ?? "this category"
            }".`,
        );
        if (!ok) return;

        setOpLoading(true);
        try {
            const res = await dispatch(deleteCategory(item?._id));
            if (res?.status !== "success") {
                message.error(res?.message || "Failed to delete category");
            } else {
                message.success(res?.message || "Category deleted");
            }
        } finally {
            setOpLoading(false);
        }
    };

    return (
        <Protected title={pageTitle}>
            <Content>
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 12,
                        flexWrap: "wrap",
                    }}>
                    <Typography.Title level={3}>Category</Typography.Title>
                    <AddItemButton
                        hrefLink="/database/category/add"
                        text="Add Category"
                    />
                </div>

                {error && status !== "loading" ? (
                    <div
                        style={{
                            padding: 12,
                            borderRadius: 8,
                            background: "#fff1f0",
                            color: "#a8071a",
                            border: "1px solid #ffa39e",
                        }}>
                        {error}
                    </div>
                ) : null}

                <Space direction="vertical" style={{ display: "flex" }}>
                    <CategoryTable
                        onDelete={onDelete}
                        isLoading={loading}
                        showTable={showTable}
                    />
                    {!showTable && !loading && (
                        <div
                            style={{
                                width: "100%",
                                textAlign: "center",
                                padding: "24px 0",
                                color: "#7A8AA0",
                                background: "#fff",
                                borderRadius: 12,
                                border: "1px dashed #CFD8E3",
                            }}>
                            No categories to display yet.
                        </div>
                    )}
                </Space>
            </Content>
        </Protected>
    );
}
