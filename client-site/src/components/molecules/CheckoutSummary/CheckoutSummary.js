import { Divider, Space, Typography } from "antd";
import { PictureOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";

import ImagesPreview from "../../atoms/ImagesPreview/ImagesPreview";
import CheckoutGuestForm from "../CheckoutGuestForm/CheckoutGuestForm";
import PaymentMethods from "../PaymentMethods/PaymentMethods";

import style from "./CheckoutSummary.module.scss";

const currency = (v) =>
    new Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: "EUR",
    }).format(Number(v) || 0);

const CheckoutSummary = ({ cart }) => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    return (
        <div className={style.checkoutSummary}>
            <Space size="large" direction="vertical" style={{ width: "100%" }}>
                <div className={style.headerRow}>
                    <Typography.Title level={4} style={{ margin: 0 }}>
                        Order summary
                    </Typography.Title>
                    <Typography.Text type="secondary">
                        {cart.items.length} item
                        {cart.items.length > 1 ? "s" : ""}
                    </Typography.Text>
                </div>

                <div className={`${style.gridRow} ${style.gridHead}`}>
                    <Typography.Text className={style.muted}>
                        Item
                    </Typography.Text>
                    <Typography.Text
                        className={style.muted}
                        style={{ textAlign: "right" }}>
                        Qty
                    </Typography.Text>
                    <Typography.Text
                        className={style.muted}
                        style={{ textAlign: "right" }}>
                        Subtotal
                    </Typography.Text>
                </div>

                <div className={style.itemsWrap}>
                    {cart.items.map((cartItem, i) => (
                        <div
                            key={i}
                            className={`${style.gridRow} ${style.gridItem}`}>
                            {/* Item info */}
                            <div className={style.itemInfo}>
                                <div className={style.image}>
                                    {cartItem.menu.images?.length > 0 ? (
                                        <ImagesPreview
                                            height="100%"
                                            productName={cartItem.menu.name}
                                            productImages={cartItem.menu.images}
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
                                <div className={style.itemText}>
                                    <Typography.Text
                                        strong
                                        className={style.title}
                                        ellipsis>
                                        {cartItem.menu.name}
                                    </Typography.Text>
                                    <Typography.Text
                                        className={style.unitPrice}>
                                        {currency(cartItem.menu.price)}
                                    </Typography.Text>
                                </div>
                            </div>

                            <div className={style.qtyCell}>
                                <Typography.Text>
                                    {cartItem.amount}
                                </Typography.Text>
                            </div>

                            <div className={style.subtotalCell}>
                                <Typography.Text strong>
                                    {currency(cartItem.sumPrice)}
                                </Typography.Text>
                            </div>
                        </div>
                    ))}
                </div>

                <Divider style={{ margin: "8px 0" }} />

                <div className={style.totals}>
                    <div className={`${style.totalRow} ${style.totalEmphasis}`}>
                        <Typography.Text strong>Total</Typography.Text>
                        <Typography.Title level={4} style={{ margin: 0 }}>
                            {currency(cart.totalPrice)}
                        </Typography.Title>
                    </div>
                </div>

                {!isAuthenticated ? (
                    <CheckoutGuestForm cart={cart} />
                ) : (
                    <PaymentMethods cart={cart} />
                )}
            </Space>
        </div>
    );
};

export default CheckoutSummary;
