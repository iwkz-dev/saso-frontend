import { Layout } from "antd";
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
                }}
            >
                {children}
            </div>
        </Content>
    );
};

export default ContentLayout;
