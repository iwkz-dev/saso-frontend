import { Button, Layout } from "antd";
import { WhatsAppOutlined } from "@ant-design/icons";
import React from "react";
import MainCarousel from "../../atoms/MainCarousel/MainCarousel";
import { useSelector } from "react-redux";

const ContentLayout = ({ children, hasCarousel, className }) => {
    const { Content } = Layout;
    const events = useSelector((state) => state.event.data);

    return (
        <Content className={className}>
            {hasCarousel ? (
                <MainCarousel
                    eventName={events[0].name}
                    images={events[0].images}
                />
            ) : null}
            <div
                className="test"
                style={{
                    maxWidth: "1024px",
                    padding: "1rem",
                    margin: "1rem auto",
                }}>
                {children}
            </div>
            <div
                style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: "1rem",
                }}>
                <Button
                    type="link"
                    href="https://wa.me/+491783588811"
                    icon={<WhatsAppOutlined />}>
                    Need help? Ask Almira
                </Button>
            </div>
        </Content>
    );
};

export default ContentLayout;
