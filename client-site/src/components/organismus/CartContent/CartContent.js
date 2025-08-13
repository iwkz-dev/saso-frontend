import { useDispatch, useSelector } from "react-redux";
import { Empty, Space, Row, Col, Card } from "antd";
import CartList from "../../atoms/CartList/CartList";
import ContentLayout from "../ContentLayout/ContentLayout";
import CartSummary from "../../atoms/CartSummary/CartSummary";
import { addOrder, removeOrder } from "../../../stores/reducers/cart";
import BackToButton from "../../atoms/BackToButton/BackToButton";

const CartContent = () => {
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart.data);

    const add = (menu) => dispatch(addOrder(menu));
    const remove = (menu) => dispatch(removeOrder(menu));

    const cardStyle = {
        background: "#fff",
        borderRadius: 16,
        padding: 12,
    };

    if (!cart?.items?.length) {
        return (
            <ContentLayout hasCarousel={false}>
                <div style={{ maxWidth: 1200, margin: "0 auto", padding: 12 }}>
                    <div style={{ marginBottom: 8 }}>
                        <BackToButton targetURL="/" buttonText="Back to home" />
                    </div>
                    <Card style={cardStyle}>
                        <Empty description="Your cart is empty" />
                    </Card>
                </div>
            </ContentLayout>
        );
    }

    return (
        <ContentLayout hasCarousel={false}>
            <div style={{ maxWidth: 1200, margin: "0 auto", padding: 12 }}>
                <Space
                    direction="vertical"
                    size="middle"
                    style={{ width: "100%" }}>
                    <BackToButton targetURL="/" buttonText="Back to home" />

                    <Row gutter={[16, 16]}>
                        <Col xs={24} md={16} lg={16}>
                            <Card style={cardStyle}>
                                <CartList
                                    cart={cart}
                                    add={add}
                                    remove={remove}
                                />
                            </Card>
                        </Col>

                        <Col xs={24} md={8} lg={8}>
                            <div
                                style={{
                                    position: "sticky",
                                    top: 64,
                                }}>
                                <Card style={cardStyle}>
                                    <CartSummary
                                        cart={cart}
                                        title="Order Summary"
                                    />
                                </Card>
                            </div>
                        </Col>
                    </Row>
                </Space>
            </div>
        </ContentLayout>
    );
};

export default CartContent;
