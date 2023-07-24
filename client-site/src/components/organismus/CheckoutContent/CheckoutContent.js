import { Space } from "antd";
import { Layout } from "antd";
import CheckoutSummary from "../../molecules/CheckoutSummary/CheckoutSummary";
import BackToButton from "../../atoms/BackToButton/BackToButton";

const CheckoutContent = () => {
    const { Content } = Layout;

    return (
        <Content
            style={{
                minHeight: "500px",
                backgroundColor: "#ffffff",
            }}
        >
            <div
                style={{
                    maxWidth: "1024px",
                    padding: "1rem",
                    margin: "1rem auto",
                }}
            >
                <Space
                    size="large"
                    direction="vertical"
                    style={{ width: "100%" }}
                >
                    <BackToButton targetURL="/cart" buttonText="Back to cart"/>
                    {<CheckoutSummary />}
                </Space>
            </div>
        </Content>
    );
};

export default CheckoutContent;
