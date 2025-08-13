import { useSelector } from "react-redux";
import { Divider, Space, Typography } from "antd";
import ImagesPreview from "../../atoms/ImagesPreview/ImagesPreview";
import { isAuth } from "../../../helpers/authHelper";
import CheckoutGuestForm from "../CheckoutGuestForm/CheckoutGuestForm";
import PaymentMethods from "../PaymentMethods/PaymentMethods";
import style from "./CheckoutSummary.module.scss";

const currency = (v) =>
    new Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: "EUR",
    }).format(Number(v) || 0);

const CheckoutSummary = () => {
    const cart = useSelector((state) => state.cart.data);

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
                        style={{ textAlign: "right" }}
                    >
                        Qty
                    </Typography.Text>
                    <Typography.Text
                        className={style.muted}
                        style={{ textAlign: "right" }}
                    >
                        Subtotal
                    </Typography.Text>
                </div>

                <div className={style.itemsWrap}>
                    {cart.items.map((cartItem, i) => (
                        <div
                            key={i}
                            className={`${style.gridRow} ${style.gridItem}`}
                        >
                            {/* Left: image + name + unit price */}
                            <div className={style.itemInfo}>
                                <div className={style.image}>
                                    <ImagesPreview
                                        productName={cartItem.menu.name}
                                        productImages={cartItem.menu.images}
                                    />
                                </div>
                                <div className={style.itemText}>
                                    <Typography.Text
                                        strong
                                        className={style.title}
                                        ellipsis
                                    >
                                        {cartItem.menu.name}
                                    </Typography.Text>
                                    <Typography.Text
                                        className={style.unitPrice}
                                    >
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

                {!isAuth() ? <CheckoutGuestForm /> : <PaymentMethods />}
            </Space>
        </div>
    );
};

export default CheckoutSummary;
