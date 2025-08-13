import { useMemo, useState } from "react";
import { Button, Card, Space, Typography, Tag, Tooltip, message } from "antd";
import {
    ShoppingCartOutlined,
    PictureOutlined,
    InfoCircleOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { addOrder } from "../../../../stores/reducers/cart";
import Router from "next/router";

const TOKENS = {
    radius: 14,
    border: "#eef1f5",
    soft: "#f7f9fc",
    text: "#0f172a",
    textMuted: "#64748b",
    success: "#10b981",
    successSoft: "rgba(16,185,129,.10)",
    danger: "#ef4444",
    shadow: "0 10px 28px rgba(15,23,42,.06)",
};

const currency = (n) =>
    typeof n === "number"
        ? new Intl.NumberFormat("de-DE", {
              style: "currency",
              currency: "EUR",
          }).format(n)
        : n;

const ProductItem = ({ product }) => {
    const dispatch = useDispatch();
    const events = useSelector((s) => s.event.data);
    const event = events?.[0] || {};
    const isPOClosed = !!event?.po_closed;

    const qty = Number(product?.quantity ?? 0);
    const ordered = Number(product?.quantityOrder ?? 0);
    const left = Math.max(qty - ordered, 0);
    const isSoldOut = left <= 0;

    const [imgError, setImgError] = useState(false);
    const image = product?.images?.[0]?.imageUrl || null;

    const priceText = useMemo(() => currency(product?.price), [product?.price]);

    const addToCart = (e) => {
        e.stopPropagation();
        if (isSoldOut || isPOClosed) return;
        message.success(`${product?.name ?? "Item"} added`);
        dispatch(addOrder(product));
    };

    const goDetail = () => {
        if (product?._id) Router.push(`/product/${product._id}`);
    };

    const cardStyle = {
        borderRadius: TOKENS.radius,
        overflow: "hidden",
        border: `1px solid ${TOKENS.border}`,
        cursor: "pointer",
        boxShadow: TOKENS.shadow,
        transition: "transform .18s ease, box-shadow .18s ease",
        padding: 0,
    };

    const headerWrap = {
        position: "relative",
        width: "100%",
        aspectRatio: "4 / 3",
        background: TOKENS.soft,
    };

    const headerInner = {
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        background: "#fff",
    };

    const imgStyle = {
        width: "100%",
        height: "100%",
        objectFit: "contain",
        transform: "scale(1)",
        transition: "transform .25s ease",
    };

    const placeholder = {
        width: "58%",
        height: "58%",
        borderRadius: 12,
        background: "linear-gradient(135deg,#f3f4f6 0%,#e5e7eb 100%)",
        color: "#94a3b8",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 28,
    };

    const chip = {
        position: "absolute",
        top: 10,
        left: 10,
        padding: "4px 10px",
        borderRadius: 999,
        fontSize: 12,
        fontWeight: 700,
        color: "#0f172a",
        background: "rgba(255,255,255,.92)",
        boxShadow: "0 2px 6px rgba(0,0,0,.08)",
    };

    const body = { padding: 12 };

    const nameStyle = {
        margin: 0,
        fontWeight: 700,
        fontSize: 15,
        color: TOKENS.text,
        lineHeight: 1.25,
    };

    const metaRow = {
        display: "flex",
        alignItems: "center",
        gap: 8,
        marginTop: 6,
    };

    const stockText = {
        fontSize: 12,
        color: isSoldOut ? TOKENS.danger : TOKENS.textMuted,
    };

    const bar = {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 8,
        marginTop: 10,
    };

    const price = { fontWeight: 800, fontSize: 18, color: TOKENS.text };

    const cta = {
        flexShrink: 0,
        borderRadius: 999,
        fontWeight: 700,
        padding: "6px 12px",
    };

    return (
        <Card
            hoverable
            style={cardStyle}
            onMouseEnter={(e) => {
                const img = e.currentTarget.querySelector("img[data-zoom]");
                if (img) img.style.transform = "scale(1.04)";
            }}
            onMouseLeave={(e) => {
                const img = e.currentTarget.querySelector("img[data-zoom]");
                if (img) img.style.transform = "scale(1)";
            }}
            onClick={goDetail}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    goDetail();
                }
            }}
        >
            <div style={headerWrap}>
                {(isSoldOut || isPOClosed) && (
                    <div style={chip}>
                        {isSoldOut ? "Sold out" : "Pre-order closed"}
                    </div>
                )}

                {!isSoldOut && !isPOClosed && (
                    <Tag
                        color={TOKENS.success}
                        style={{
                            position: "absolute",
                            top: 10,
                            right: 10,
                            background: TOKENS.successSoft,
                            border: `1px solid ${TOKENS.success}`,
                            color: "#065f46",
                            borderRadius: 999,
                            fontWeight: 700,
                        }}
                    >
                        {left} left
                    </Tag>
                )}

                <div style={headerInner}>
                    {image && !imgError ? (
                        <img
                            src={image}
                            alt={product?.name || "Product"}
                            loading="lazy"
                            style={imgStyle}
                            data-zoom
                            onError={() => setImgError(true)}
                        />
                    ) : (
                        <div style={placeholder} aria-label="No image">
                            <PictureOutlined />
                        </div>
                    )}
                </div>
            </div>

            <div style={body}>
                <Space direction="vertical" size={6} style={{ width: "100%" }}>
                    <Typography.Text
                        style={nameStyle}
                        ellipsis={{ tooltip: product?.name }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {product?.name}
                    </Typography.Text>

                    <div style={metaRow}>
                        <Tooltip title="Availability">
                            <InfoCircleOutlined
                                style={{
                                    fontSize: 14,
                                    color: TOKENS.textMuted,
                                }}
                            />
                        </Tooltip>
                        <Typography.Text style={stockText}>
                            {isSoldOut ? "Out of stock" : `Left: ${left}`}
                        </Typography.Text>
                    </div>

                    <div style={bar}>
                        <Typography.Text style={price}>
                            {priceText}
                        </Typography.Text>

                        <Button
                            type="primary"
                            shape="round"
                            icon={<ShoppingCartOutlined />}
                            onClick={addToCart}
                            disabled={isSoldOut || isPOClosed}
                            aria-label="Add to cart"
                            style={cta}
                        >
                            Add
                        </Button>
                    </div>
                </Space>
            </div>
        </Card>
    );
};

export default ProductItem;
