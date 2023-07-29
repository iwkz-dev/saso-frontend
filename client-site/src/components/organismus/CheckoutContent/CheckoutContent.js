import { Empty, Space } from "antd";
import { Layout } from "antd";
import CheckoutSummary from "../../molecules/CheckoutSummary/CheckoutSummary";
import BackToButton from "../../atoms/BackToButton/BackToButton";
import { useSelector } from "react-redux";

const CheckoutContent = () => {
    const { Content } = Layout;
    const cart = useSelector((state) => state.cart.data);

    return (
        <Content
            style={{
                minHeight: "500px",
                backgroundColor: "#ffffff",
            }}>
            {cart.items.length <= 0 ? (
                <Empty />
            ) : (
                <div
                    style={{
                        maxWidth: "1024px",
                        padding: "1rem",
                        margin: "1rem auto",
                    }}>
                    <Space
                        size="large"
                        direction="vertical"
                        style={{ width: "100%" }}>
                        <BackToButton
                            targetURL="/cart"
                            buttonText="Back to cart"
                        />
                        {<CheckoutSummary />}
                    </Space>
                </div>
            )}
        </Content>
    );
};

export default CheckoutContent;
