import { useState } from "react";
import { Button, Card, Space, Typography, message } from "antd";
import { ShoppingCartOutlined, PictureOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { addOrder } from "../../../../stores/reducers/cart";
import Router from "next/router";

const ProductItem = ({ product }) => {
    const dispatch = useDispatch();
    const events = useSelector((state) => state.event.data);
    const event = events?.[0] || {};
    const isPOClosed = !!event?.po_closed;

    const qty = Number(product?.quantity ?? 0);
    const ordered = Number(product?.quantityOrder ?? 0);
    const left = Math.max(qty - ordered, 0);
    const isSoldOut = left <= 0;

    const priceText =
        typeof product?.price === "number"
            ? new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(product.price)
            : `${product?.price ?? ""} €`;

    const primaryImage = product?.images?.[0]?.imageUrl || null;
    const [imgError, setImgError] = useState(false);

    const handleClick = (e) => {
        e.stopPropagation();
        if (isSoldOut || isPOClosed) return;
        message.success(`${product?.name ?? "Item"} added`);
        dispatch(addOrder(product));
    };

    const productPreview = () => {
        if (product?._id) Router.push(`/product/${product._id}`);
    };

    const cardStyle = {
        borderRadius: 14,
        overflow: "hidden",
        border: "1px solid #f0f2f5",
        cursor: "pointer",
        boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
    };

    const bodyWrapStyle = {
        padding: 12,
    };

    const coverFrameStyle = {
        position: "relative",
        width: "100%",
        paddingTop: "66.666%",
        background: "#f8fafc",
    };

    const coverInnerStyle = {
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        background: "#fff",
        borderBottom: "1px solid #f0f2f5",
    };

    const imgStyle = {
        maxWidth: "100%",
        maxHeight: "100%",
        objectFit: "contain",
        transition: "transform 220ms ease",
    };

    const imgWrapStyle = {
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    };

    const placeholderStyle = {
        width: "60%",
        height: "60%",
        borderRadius: 12,
        background: "linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)",
        color: "#9ca3af",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 28,
        boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.04)",
    };

    const soldOutChipStyle = {
        position: "absolute",
        top: 8,
        left: 8,
        padding: "4px 8px",
        borderRadius: 999,
        background: "rgba(0,0,0,0.6)",
        color: "#fff",
        fontSize: 12,
        fontWeight: 700,
        letterSpacing: 0.2,
        zIndex: 1,
    };

    const titleStyle = {
        margin: 0,
        fontWeight: 600,
        fontSize: "clamp(14px, 3.6vw, 16px)",
        color: "#111827",
    };

    const stockStyle = {
        marginTop: 4,
        fontSize: 12,
        color: isSoldOut ? "#b91c1c" : "#6b7280",
    };

    const priceStyle = {
        marginTop: 6,
        fontWeight: 800,
        fontSize: "clamp(16px, 4.2vw, 20px)",
        color: "#111827",
    };

    const btnStyle = {
        width: "100%",
        marginTop: 8,
        padding: "8px 12px",
        borderRadius: 999,
        fontWeight: 600,
    };

    return (
        <Card
            hoverable
            style={cardStyle}
            cover={
                <div
                    style={coverFrameStyle}
                    onClick={productPreview}
                    onMouseEnter={(e) => {
                        const img = e.currentTarget.querySelector("img[data-zoom='1']");
                        if (img) img.style.transform = "scale(1.05)";
                    }}
                    onMouseLeave={(e) => {
                        const img = e.currentTarget.querySelector("img[data-zoom='1']");
                        if (img) img.style.transform = "scale(1)";
                    }}
                >
                    {isSoldOut && <div style={soldOutChipStyle}>Sold out</div>}

                    <div style={coverInnerStyle}>
                        <div style={imgWrapStyle}>
                            {primaryImage && !imgError ? (
                                <img
                                    src={primaryImage}
                                    alt={product?.name || "Product image"}
                                    loading="lazy"
                                    style={imgStyle}
                                    data-zoom="1"
                                    onError={() => setImgError(true)}
                                />
                            ) : (
                                <div style={placeholderStyle} aria-label="No image">
                                    <PictureOutlined />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            }
        >
            <div style={bodyWrapStyle} onClick={productPreview}>
                <Space direction="vertical" size={6} style={{ width: "100%" }}>
                    <Typography.Text style={titleStyle} ellipsis>
                        {product?.name}
                    </Typography.Text>

                    <Typography.Text style={stockStyle}>
                        {isSoldOut ? "Sold out" : `Left Stock: ${left}`}
                    </Typography.Text>

                    <Typography.Text style={priceStyle}>{priceText}</Typography.Text>

                    <Button
                        type="primary"
                        disabled={isSoldOut || isPOClosed}
                        onClick={(e) => {
                            e.stopPropagation();
                            handleClick(e);
                        }}
                        shape="round"
                        icon={<ShoppingCartOutlined />}
                        style={btnStyle}
                    >
                        {isPOClosed ? "Pre-order closed" : isSoldOut ? "Sold out" : "Add to cart"}
                    </Button>
                </Space>
            </div>
        </Card>
    );
};

export default ProductItem;
