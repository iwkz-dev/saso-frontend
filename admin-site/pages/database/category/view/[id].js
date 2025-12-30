import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { getDetailCategory } from "../../../../src/store/reducers/categoryReducer";
import Protected from "../../../../src/components/Layout/Protected/Protected";
import CategoryDataDisplay from "../../../../src/components/DataDisplay/CategoryDataDisplay/CategoryDataDisplay";
import RelatedMenuTable from "../../../../src/components/Table/Event/RelatedMenuTable/RelatedMenuTable";
import AddItemButton from "../../../../src/components/common/Button/AddItemButton/AddItemButton";
import Content from "../../../../src/components/Layout/Content/Content";
import { message, Space, Spin, Typography } from "antd";

export default function CategoryViewPage() {
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
        if (!router.isReady || !id || Array.isArray(id)) return;

        dispatch(getDetailCategory(id)).then((res) => {
            if (res?.status === "failed") {
                message.error(res?.message || "Failed to load category");
            }
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
        <Protected title={pageTitle}>
            <Content>
                <Space direction="vertical" style={{ display: "flex" }}>
                    <Typography.Title level={3}>
                        {hasCategory
                            ? `View Category "${category.name}"`
                            : "View Category"}
                    </Typography.Title>

                    {error && !loading ? (
                        <div style={errorBox}>{error}</div>
                    ) : null}

                    <Spin spinning={loading} tip="Loading...">
                        {hasCategory ? (
                            <Space
                                direction="vertical"
                                style={{ display: "flex" }}>
                                <CategoryDataDisplay category={category} />

                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        gap: 12,
                                        flexWrap: "wrap",
                                        marginTop: 8,
                                    }}>
                                    <Typography.Title
                                        level={4}
                                        style={{ margin: 0 }}>
                                        Related Menu
                                    </Typography.Title>
                                    <AddItemButton
                                        hrefLink={`/database/menu/add?category=${
                                            category._id || ""
                                        }`}
                                        text="Add Menu for this Category"
                                    />
                                </div>

                                <RelatedMenuTable
                                    filterName="category"
                                    itemFilter={category}
                                />
                            </Space>
                        ) : !loading ? (
                            <div style={emptyBox}>
                                Category not found or not loaded.
                            </div>
                        ) : null}
                    </Spin>
                </Space>
            </Content>
        </Protected>
    );
}
