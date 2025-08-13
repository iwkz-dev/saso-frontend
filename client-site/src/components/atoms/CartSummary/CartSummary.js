import { Button, Typography, Divider, Space } from "antd";
import Router from "next/router";

const CartSummary = ({ cart, title = "Order Summary" }) => {
    const currency = (value) =>
        new Intl.NumberFormat("de-DE", {
            style: "currency",
            currency: "EUR",
        }).format(Number(value) || 0);

    const rowStyle = {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "baseline",
    };

    const subtotal = cart.items.reduce((acc, item) => acc + item.sumPrice, 0);

    const total = subtotal;

    return (
        <div style={{ width: "100%" }}>
            <Typography.Title level={4} style={{ marginBottom: 12 }}>
                {title}
            </Typography.Title>

            <Space direction="vertical" size="small" style={{ width: "100%" }}>
                {cart.items.map((item) => (
                    <div key={item.menu._id}>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "baseline",
                                gap: 8,
                            }}>
                            <Typography.Text
                                strong
                                ellipsis={{ tooltip: item.menu.name }}
                                style={{
                                    maxWidth: "100%",
                                    flex: 1,
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                }}>
                                {item.menu.name}
                            </Typography.Text>

                            <Typography.Text>
                                {currency(item.menu.price)}
                            </Typography.Text>
                        </div>

                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "baseline",
                                gap: 8,
                            }}>
                            <Typography.Text type="secondary">
                                {item.amount} × {currency(item.menu.price)}
                            </Typography.Text>
                            <Typography.Text strong>
                                {currency(item.sumPrice)}
                            </Typography.Text>
                        </div>

                        <Divider style={{ margin: "8px 0" }} />
                    </div>
                ))}

                <div style={{ ...rowStyle, fontSize: 16, fontWeight: 700 }}>
                    <Typography.Text strong>Total</Typography.Text>
                    <Typography.Text strong type="danger">
                        {currency(total)}
                    </Typography.Text>
                </div>
            </Space>

            <Button
                size="large"
                type="primary"
                style={{
                    width: "100%",
                    marginTop: 16,
                    borderRadius: 999,
                    fontWeight: 700,
                }}
                onClick={() => Router.push("/checkout")}>
                Checkout
            </Button>
        </div>
    );
};

export default CartSummary;
