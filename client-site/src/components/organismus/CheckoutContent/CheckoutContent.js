import { Button, Space, Steps, message } from "antd";
import { Layout } from "antd";
import Router from "next/router";
import { LeftOutlined } from "@ant-design/icons";
import CheckoutSummary from "../../molecules/CheckoutSummary/CheckoutSummary";
import { useState } from "react";

const CheckoutContent = () => {
    const { Content } = Layout;
    const [current, setCurrent] = useState(0);

    const next = () => {
        setCurrent(current + 1);
    };
    const prev = () => {
        setCurrent(current - 1);
    };

    const steps = [
        {
            title: "Checkout Summary",
            content: "First-content",
        },
        {
            title: "Payment",
            content: "Second-content",
        },
        {
            title: "Done",
            content: "Last-content",
        },
    ];

    const items = steps.map((item) => ({
        key: item.title,
        title: item.title,
    }));

    const getCurrContent = (current) => {
        if (current === 0) return <CheckoutSummary />;
        if (current === 1) return <div>payment content</div>;
        if (current === 2) return <div>Done content</div>;
    };

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
                    <Steps current={current} items={items} />
                    {getCurrContent(current)}
                </Space>
                {current < steps.length - 1 && (
                    <Button type="primary" onClick={() => next()}>
                        Next
                    </Button>
                )}
                {current === steps.length - 1 && (
                    <Button
                        type="primary"
                        onClick={() => message.success("Processing complete!")}
                    >
                        Done
                    </Button>
                )}
                {current > 0 && (
                    <Button
                        style={{
                            margin: "0 8px",
                        }}
                        onClick={() => prev()}
                    >
                        Previous
                    </Button>
                )}
            </div>
        </Content>
    );
};

export default CheckoutContent;
