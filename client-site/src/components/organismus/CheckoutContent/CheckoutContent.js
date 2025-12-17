import { Empty, Space, Layout, Grid, Typography, Card } from "antd";
import { useSelector } from "react-redux";

import CheckoutSummary from "../../molecules/CheckoutSummary/CheckoutSummary";
import BackToButton from "../../atoms/BackToButton/BackToButton";
import { selectCartData } from "../../../stores/reducers/cart";

const { useBreakpoint } = Grid;

const CheckoutContent = () => {
    const { Content } = Layout;
    const event = useSelector((state) => state.event.data);
    const cart = useSelector((state) => selectCartData(state, event._id));

    const screens = useBreakpoint();

    return (
        <Content style={{ backgroundColor: "#fff" }}>
            {cart.items.length <= 0 ? (
                <Empty style={{ padding: "48px 0" }} />
            ) : (
                <div
                    style={{
                        maxWidth: 960,
                        padding: screens.md
                            ? "16px 16px 32px"
                            : "12px 12px 24px",
                        margin: "0 auto",
                    }}>
                    <Space
                        size={screens.md ? "large" : "middle"}
                        direction="vertical"
                        style={{ width: "100%" }}>
                        <div
                            style={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: 8,
                                alignItems: "center",
                                justifyContent: "space-between",
                            }}>
                            <BackToButton
                                to={`/${event.slug}/cart`}
                                buttonText="Back to cart"
                            />
                            <Typography.Title
                                level={screens.md ? 3 : 4}
                                style={{ margin: 0 }}>
                                Checkout
                            </Typography.Title>
                        </div>

                        <Card
                            style={{
                                borderRadius: 12,
                                padding: screens.md ? 16 : 12,
                            }}>
                            <CheckoutSummary cart={cart} />
                        </Card>
                    </Space>
                </div>
            )}
        </Content>
    );
};

export default CheckoutContent;
