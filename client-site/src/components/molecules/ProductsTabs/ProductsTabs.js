import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Tabs, Spin, Alert, Empty } from "antd";
import {
    fetchCategories,
    selectCategories,
    selectCategoryStatus,
    selectCategoryError,
} from "../../../stores/reducers/category";
import ProductCards from "../ProductCards.js/ProductCards";

const ProductsTabs = ({ event, barcode, headerOffset = 56 }) => {
    const dispatch = useDispatch();
    const categories = useSelector(selectCategories);
    const status = useSelector(selectCategoryStatus);
    const error = useSelector(selectCategoryError);
    const [activeKey, setActiveKey] = useState(null);

    useEffect(() => {
        if (event?._id) {
            dispatch(fetchCategories({ event: event._id }));
        }
    }, [dispatch, event?._id]);

    const getMenusArray = (c) => {
        if (!c) return [];
        if (Array.isArray(c.menus)) return c.menus;
        if (c.menus?.data && Array.isArray(c.menus.data)) return c.menus.data;
        return [];
    };

    const items = useMemo(() => {
        if (!Array.isArray(categories)) return [];

        return categories
            .map((c) => ({ ...c, _menus: getMenusArray(c) }))
            .filter((c) => c._menus.length > 0)
            .map((c, idx) => {
                const key = String(c.id ?? c._id ?? idx + 1);
                const name = c.name ?? c.title ?? `Category ${idx + 1}`;
                const count = c._menus.length;
                const isActive = key === (activeKey ?? "");

                return {
                    key,
                    label: (
                        <span
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                padding: "8px 12px",
                                borderRadius: 999,
                                border: `1px solid ${isActive ? "#10b981" : "#e5e7eb"}`,
                                backgroundColor: isActive ? "rgba(16,185,129,0.08)" : "#fff",
                                color: isActive ? "#065f46" : "#374151",
                                fontSize: 14,
                                fontWeight: 500,
                                lineHeight: 1.2,
                                transition: "all 160ms ease",
                                cursor: "pointer",
                                whiteSpace: "nowrap",
                                flex: "0 0 auto",
                            }}
                        >
                            <span
                                style={{
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    maxWidth: 120,
                                }}
                            >
                                {name}
                            </span>
                            <span
                                style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    minWidth: 20,
                                    height: 20,
                                    borderRadius: "999px",
                                    fontSize: 12,
                                    fontWeight: 700,
                                    padding: "0 6px",
                                    background: "#10b981",
                                    color: "#fff",
                                    marginLeft: 8,
                                    flex: "0 0 auto",
                                }}
                            >
                                {count}
                            </span>
                        </span>
                    ),
                    children: (
                        <div style={{ padding: "10px 6px 6px 6px" }}>
                            <ProductCards productList={c._menus} barcode={barcode} />
                        </div>
                    ),
                };
            });
    }, [categories, barcode, activeKey]);

    useEffect(() => {
        if (
            items.length &&
            (activeKey === null || !items.some((i) => i.key === activeKey))
        ) {
            setActiveKey(items[0].key);
        }
    }, [items, activeKey]);

    if (status === "loading") {
        return (
            <div style={{ display: "flex", justifyContent: "center", padding: 24 }}>
                <Spin />
            </div>
        );
    }

    if (status === "failed") {
        return (
            <Alert
                type="error"
                message="Failed to load categories"
                description={error}
                style={{
                    borderRadius: 12,
                    margin: "12px",
                }}
            />
        );
    }

    if (!items.length) {
        return (
            <Empty
                description="No products yet"
                style={{ paddingTop: 24, paddingBottom: 24 }}
            />
        );
    }

    return (
        <div
            style={{
                background: "#fff",
                borderRadius: 12,
                padding: 8,
                marginTop: 8,
                overflow: "visible",
            }}
        >
            <Tabs
                items={items}
                activeKey={activeKey || items[0]?.key}
                onChange={setActiveKey}
                destroyOnHidden
                animated
                tabBarGutter={8}
                tabBarStyle={{
                    position: "sticky",
                    top: headerOffset,
                    zIndex: 10,
                    background: "#fff",
                    padding: "6px 6px",
                    borderBottom: "1px solid #f0f2f5",
                    margin: 0,
                }}
                renderTabBar={(props, DefaultTabBar) => (
                    <div
                        style={{
                            overflowX: "auto",
                            overflowY: "hidden",
                            WebkitOverflowScrolling: "touch",
                        }}
                    >
                        <DefaultTabBar
                            {...props}
                            style={{
                                display: "inline-flex",
                                minWidth: "max-content",
                                gap: 8,
                            }}
                        />
                    </div>
                )}
            />
        </div>
    );
};

export default ProductsTabs;
