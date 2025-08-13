import { Layout, Typography, Button, message, Divider, Empty } from "antd";
import { PictureOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import BackToButton from "../../atoms/BackToButton/BackToButton";
import ImagesPreview from "../../atoms/ImagesPreview/ImagesPreview";
import { addOrder } from "../../../stores/reducers/cart";
import { useDispatch, useSelector } from "react-redux";

const ProductDetailContent = ({ detailMenu }) => {
    const dispatch = useDispatch();
    const events = useSelector((state) => state.event.data);
    const event = events?.[0] || {};
    const isPOClosed = !!event?.po_closed;

    if (!detailMenu) {
        return (
            <Layout.Content>
                <div
                    style={{
                        maxWidth: "1200px",
                        padding: "12px",
                        margin: "12px auto",
                    }}>
                    <Empty />
                </div>
            </Layout.Content>
        );
    }

    const qty = Number(detailMenu?.quantity ?? 0);
    const ordered = Number(detailMenu?.quantityOrder ?? 0);
    const left = Math.max(qty - ordered, 0);
    const isSoldOut = left <= 0;

    const priceText =
        typeof detailMenu?.price === "number"
            ? new Intl.NumberFormat("de-DE", {
                  style: "currency",
                  currency: "EUR",
              }).format(detailMenu.price)
            : `${detailMenu?.price ?? ""} €`;

    const handleClick = () => {
        if (isSoldOut || isPOClosed) return;
        message.success(`${detailMenu.name} added`);
        dispatch(addOrder(detailMenu));
    };

    const pageWrap = {
        background: "#f7f9fb",
    };

    const container = {
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "12px",
    };

    const card = {
        background: "#fff",
        borderRadius: 16,
        padding: 12,
    };

    const grid = {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        gap: 16,
        alignItems: "start",
    };

    const headRow = {
        display: "flex",
        alignItems: "center",
        gap: 8,
        justifyContent: "space-between",
        marginBottom: 8,
    };

    const nameStyle = {
        margin: 0,
        fontSize: "clamp(18px, 4.8vw, 28px)",
        lineHeight: 1.15,
        fontWeight: 800,
        color: "#111827",
        textAlign: "left",
    };

    const chipRow = {
        display: "flex",
        gap: 8,
        flexWrap: "wrap",
        alignItems: "center",
    };

    const chip = (bg, color = "#111827", border = "transparent") => ({
        padding: "6px 10px",
        borderRadius: 999,
        fontSize: 12,
        fontWeight: 700,
        background: bg,
        color,
        border: `1px solid ${border}`,
    });

    const mediaCard = {
        borderRadius: 12,
        border: "1px solid #f0f2f5",
        overflow: "hidden",
        background: "#fff",
    };

    const mediaFrame = {
        position: "relative",
        width: "100%",
        paddingTop: "66.666%",
        background: "#f8fafc",
    };

    const mediaInner = {
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        background: "#fff",
        borderBottom: "1px solid #f0f2f5",
    };

    const soldOutChip = {
        position: "absolute",
        top: 10,
        left: 10,
        padding: "4px 8px",
        borderRadius: 999,
        background: "rgba(0,0,0,0.6)",
        color: "#fff",
        fontSize: 12,
        fontWeight: 700,
        letterSpacing: 0.2,
        zIndex: 1,
    };

    const detailsCol = {
        padding: 6,
    };

    const priceRow = {
        display: "flex",
        alignItems: "baseline",
        justifyContent: "space-between",
        gap: 8,
        marginTop: 4,
    };

    const priceStyle = {
        fontSize: "clamp(18px, 5vw, 24px)",
        fontWeight: 900,
        color: "#111827",
        margin: 0,
    };

    const stockText = {
        marginTop: 2,
        fontSize: 12,
        color: isSoldOut ? "#b91c1c" : "#6b7280",
    };

    const addBtn = {
        width: "100%",
        marginTop: 10,
        padding: "10px 14px",
        borderRadius: 999,
        fontWeight: 700,
    };

    const sectionTitle = {
        margin: 0,
        fontSize: 14,
        color: "#6b7280",
        fontWeight: 700,
        textTransform: "uppercase",
        letterSpacing: 0.4,
    };

    const descStyle = {
        marginTop: 4,
        color: "#374151",
        lineHeight: 1.65,
        fontSize: 14,
        textAlign: "justify",
    };

    return (
        <Layout.Content style={pageWrap}>
            <div style={container}>
                <div style={card}>
                    <div style={headRow}>
                        <BackToButton targetURL="/" buttonText="Back" />
                    </div>

                    <div style={{ margin: "4px 6px 10px 6px" }}>
                        <Typography.Title level={2} style={nameStyle}>
                            {detailMenu.name}
                        </Typography.Title>

                        <div style={{ marginTop: 8 }}>
                            <div style={chipRow}>
                                <span
                                    style={chip(
                                        isSoldOut
                                            ? "rgba(185,28,28,0.08)"
                                            : "rgba(16,185,129,0.1)",
                                        isSoldOut ? "#7f1d1d" : "#065f46",
                                        isSoldOut ? "#fecaca" : "#bbf7d0",
                                    )}>
                                    {isSoldOut
                                        ? "Sold out"
                                        : `In stock: ${left}`}
                                </span>

                                {isPOClosed && (
                                    <span
                                        style={chip(
                                            "rgba(107,114,128,0.12)",
                                            "#374151",
                                            "#e5e7eb",
                                        )}>
                                        Pre‑order closed
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    <div style={{ ...grid, marginTop: 6 }}>
                        <div style={mediaCard}>
                            <div style={mediaFrame}>
                                {isSoldOut && (
                                    <div style={soldOutChip}>Sold out</div>
                                )}

                                <div style={mediaInner}>
                                    <div
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            padding: 8,
                                        }}>
                                        {detailMenu.images?.length > 0 ? (
                                            <ImagesPreview
                                                productName={detailMenu.name}
                                                productImages={
                                                    detailMenu.images
                                                }
                                                height="100%"
                                            />
                                        ) : (
                                            <div
                                                style={{
                                                    width: "60%",
                                                    aspectRatio: "1 / 1",
                                                    borderRadius: 12,
                                                    background:
                                                        "linear-gradient(135deg,#f3f4f6 0%,#e5e7eb 100%)",
                                                    color: "#94a3b8",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    fontSize: 28,
                                                }}>
                                                <span
                                                    role="img"
                                                    aria-label="no image">
                                                    <PictureOutlined />
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div style={detailsCol}>
                            <div style={priceRow}>
                                <Typography.Text style={priceStyle}>
                                    {priceText}
                                </Typography.Text>
                            </div>

                            <Typography.Text style={stockText}>
                                {isSoldOut
                                    ? "This item is currently unavailable."
                                    : `Left stock: ${left} / ${qty}`}
                            </Typography.Text>

                            <Button
                                type="primary"
                                disabled={isSoldOut || isPOClosed}
                                onClick={handleClick}
                                shape="round"
                                icon={<ShoppingCartOutlined />}
                                style={addBtn}>
                                {isPOClosed
                                    ? "Pre‑order closed"
                                    : isSoldOut
                                    ? "Sold out"
                                    : "Add to cart"}
                            </Button>

                            <Divider style={{ margin: "12px 0" }} />

                            <div>
                                <Typography.Text style={sectionTitle}>
                                    Description
                                </Typography.Text>
                                <Typography.Paragraph style={descStyle}>
                                    {detailMenu.description ||
                                        "No description available."}
                                </Typography.Paragraph>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout.Content>
    );
};

export default ProductDetailContent;
