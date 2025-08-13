import { Button, Card, Space, Typography } from "antd";
import ImagesPreview from "../ImagesPreview/ImagesPreview";
import {
    MinusOutlined,
    PlusOutlined,
    DeleteOutlined,
    PictureOutlined,
} from "@ant-design/icons";

const CartList = ({ cart, add, remove }) => {
    const cardBodyStyle = {
        padding: 10,
        width: "100%",
        borderRadius: 12,
    };

    const itemWrap = {
        display: "grid",
        gridTemplateColumns: "auto 1fr auto",
        gridAutoRows: "auto",
        gap: 8,
    };

    const imgBox = {
        width: 56,
        height: 56,
        borderRadius: 8,
        overflow: "hidden",
        background: "#f8fafc",
        border: "1px solid #f0f2f5",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gridColumn: "1 / 2",
    };

    const controls = {
        gridColumn: "3 / 4",
        alignSelf: "center",
    };

    const compactWrap = {
        display: "inline-flex",
        alignItems: "center",
        border: "1px solid #e5e7eb",
        borderRadius: 999,
        overflow: "hidden",
    };

    const iconBtn = {
        padding: "2px 6px",
        lineHeight: 1,
        height: 26,
    };

    const countBox = {
        minWidth: 28,
        height: 26,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 8px",
        fontWeight: 600,
        fontSize: 13,
        borderLeft: "1px solid #e5e7eb",
        borderRight: "1px solid #e5e7eb",
        background: "#fff",
    };

    const textBlock = {
        gridColumn: "1 / 4",
        display: "flex",
        flexDirection: "column",
        gap: 2,
        marginTop: 2,
        textAlign: "left",
    };

    return (
        <Space direction="vertical" style={{ width: "100%" }} size="middle">
            {cart.items.map((item, i) => (
                <Card key={i} size="small" style={cardBodyStyle}>
                    <div style={itemWrap}>
                        <div style={imgBox}>
                            {item.menu.images?.length > 0 ? (
                                <ImagesPreview
                                    height="100%"
                                    productName={item.menu.name}
                                    productImages={item.menu.images}
                                />
                            ) : (
                                <div
                                    style={{
                                        borderRadius: 12,
                                        background:
                                            "linear-gradient(135deg,#f3f4f6 0%,#e5e7eb 100%)",
                                        color: "#94a3b8",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        fontSize: 28,
                                    }}
                                    aria-label="No image">
                                    <PictureOutlined />
                                </div>
                            )}
                        </div>

                        {/* Controls (right) */}
                        <div style={controls}>
                            <div
                                style={compactWrap}
                                aria-label="Quantity controls">
                                <Button
                                    type="text"
                                    style={iconBtn}
                                    icon={
                                        item.amount <= 1 ? (
                                            <DeleteOutlined />
                                        ) : (
                                            <MinusOutlined />
                                        )
                                    }
                                    onClick={() => remove(item.menu)}
                                />
                                <div style={countBox}>
                                    <Typography.Text style={{ fontSize: 12 }}>
                                        {item.amount}
                                    </Typography.Text>
                                </div>
                                <Button
                                    type="text"
                                    style={iconBtn}
                                    icon={<PlusOutlined />}
                                    onClick={() => add(item.menu)}
                                />
                            </div>
                        </div>

                        <div style={textBlock}>
                            <Typography.Text
                                strong
                                ellipsis={{ tooltip: item.menu.name }}
                                style={{
                                    fontSize: 14,
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                }}>
                                {item.menu.name}
                            </Typography.Text>

                            <Typography.Text style={{ fontWeight: 700 }}>
                                {new Intl.NumberFormat("de-DE", {
                                    style: "currency",
                                    currency: "EUR",
                                }).format(Number(item.menu.price) || 0)}
                            </Typography.Text>
                        </div>
                    </div>
                </Card>
            ))}
        </Space>
    );
};

export default CartList;
