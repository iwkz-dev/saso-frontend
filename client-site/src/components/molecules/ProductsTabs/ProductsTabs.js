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

const TOKENS = {
    radius: 12,
    gap: 8,
    padX: 12,
    pillH: 36,
    brand: "#10b981",
    brandSoft: "rgba(16,185,129,.10)",
    brandText: "#065f46",
    text: "#111827",
    textMuted: "#6b7280",
    border: "#e5e7eb",
    surface: "#ffffff",
    shadow: "0 6px 18px rgba(0,0,0,.06)",
};

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
                                gap: 8,
                                height: TOKENS.pillH,
                                padding: `0 ${TOKENS.padX}px`,
                                borderRadius: 999,
                                border: `1px solid ${isActive ? TOKENS.brand : TOKENS.border}`,
                                background: isActive ? TOKENS.brandSoft : TOKENS.surface,
                                color: isActive ? TOKENS.brandText : TOKENS.text,
                                fontSize: 14,
                                fontWeight: 600,
                                lineHeight: 1,
                                letterSpacing: 0.1,
                                cursor: "pointer",
                                whiteSpace: "nowrap",
                                transition: "border-color .15s ease, background .15s ease, color .15s ease",
                                boxShadow: isActive ? "inset 0 0 0 1px rgba(16,185,129,.12)" : "none",
                            }}
                        >
                            <span
                                title={name}
                                style={{
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    maxWidth: 140,
                                }}
                            >
                                {name}
                            </span>

                            <span
                                aria-hidden
                                style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    minWidth: 22,
                                    height: 22,
                                    padding: "0 6px",
                                    borderRadius: 999,
                                    fontSize: 12,
                                    fontWeight: 700,
                                    background: isActive ? TOKENS.brand : "#f3f4f6",
                                    color: isActive ? "#fff" : TOKENS.textMuted,
                                }}
                            >
                                {count}
                            </span>
                        </span>
                    ),
                    children: (
                        <div style={{ padding: "12px 8px 8px" }}>
                            <ProductCards productList={c._menus} barcode={barcode} />
                        </div>
                    ),
                };
            });
    }, [categories, barcode, activeKey]);

    useEffect(() => {
        if (items.length && (activeKey === null || !items.some((i) => i.key === activeKey))) {
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
                style={{ borderRadius: TOKENS.radius, margin: 12 }}
            />
        );
    }

    if (!items.length) {
        return <Empty description="No products yet" style={{ paddingTop: 24, paddingBottom: 24 }} />;
    }

    return (
        <div
            style={{
                background: TOKENS.surface,
                borderRadius: TOKENS.radius,
                padding: 8,
                marginTop: 8,
                overflow: "visible",
                position: "relative",
                boxShadow: "0 1px 0 rgba(0,0,0,.03)",
            }}
        >
            <Tabs
                items={items}
                activeKey={activeKey || items[0]?.key}
                onChange={setActiveKey}
                destroyOnHidden
                animated
                tabBarGutter={TOKENS.gap}
                tabBarStyle={{ padding: 0, margin: 0 }}
                renderTabBar={(props, DefaultTabBar) => (
                    <div
                        style={{
                            position: "sticky",
                            top: "var(--navbar-h, 56px)",
                            zIndex: 1000,
                            background: TOKENS.surface,
                            boxShadow: TOKENS.shadow,
                            borderRadius: TOKENS.radius,
                            marginBottom: 8,
                        }}
                    >
                        <div style={{ position: "relative", padding: "10px 8px" }}>
                            <div
                                style={{
                                    overflowX: "auto",
                                    overflowY: "hidden",
                                    WebkitOverflowScrolling: "touch",
                                    scrollbarWidth: "none",
                                }}
                            >
                                <div style={{ display: "inline-block" }}>
                                    <DefaultTabBar
                                        {...props}
                                        style={{ display: "inline-flex", minWidth: "max-content", gap: TOKENS.gap }}
                                    />
                                </div>
                            </div>

                            <div aria-hidden style={{ pointerEvents: "none", position: "absolute", inset: 0 }}>
                                <div style={{
                                    position: "absolute", left: 0, top: 0, bottom: 0, width: 16,
                                    background: "linear-gradient(to right, rgba(255,255,255,1), rgba(255,255,255,0))",
                                    borderTopLeftRadius: TOKENS.radius, borderBottomLeftRadius: TOKENS.radius
                                }} />
                                <div style={{
                                    position: "absolute", right: 0, top: 0, bottom: 0, width: 16,
                                    background: "linear-gradient(to left, rgba(255,255,255,1), rgba(255,255,255,0))",
                                    borderTopRightRadius: TOKENS.radius, borderBottomRightRadius: TOKENS.radius
                                }} />
                            </div>
                        </div>
                    </div>
                )}
            />
        </div>
    );
};

export default ProductsTabs;
