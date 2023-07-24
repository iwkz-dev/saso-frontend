import { Button, Space } from "antd";
import { Layout } from "antd";
import Router from "next/router";
import { LeftOutlined } from "@ant-design/icons";
import CheckoutSummary from "../../molecules/CheckoutSummary/CheckoutSummary";

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
                    <Button
                        type="link"
                        onClick={() => Router.push("/cart")}
                        icon={<LeftOutlined />}
                    >
                        Back to cart
                    </Button>
                    {<CheckoutSummary />}
                </Space>
            </div>
        </Content>
    );
};

export default CheckoutContent;
