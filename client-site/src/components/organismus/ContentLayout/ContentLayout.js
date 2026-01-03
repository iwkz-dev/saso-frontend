import { useMemo } from "react";
import { Layout } from "antd";
import { useSelector } from "react-redux";
import MainCarousel from "../../atoms/MainCarousel/MainCarousel";

const ContentLayout = ({ children, hasCarousel = true, className }) => {
    const { Content } = Layout;
    const event = useSelector((state) => state.event.data);
    const showCarousel = hasCarousel && event;

    const contentOuterStyle = {
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "12px",
    };

    const contentInnerStyle = {
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "12px",
        background: "#fff",
        borderRadius: 12,
    };

    const carouselProps = useMemo(
        () => ({
            eventName: event?.name || "Our Event",
            images: event?.images || [],
            eventDescription: event?.description || "",
        }),
        [event],
    );

    return (
        <Content className={className}>
            <div style={contentOuterStyle}>
                {showCarousel ? <MainCarousel {...carouselProps} /> : null}

                <div id="menus" style={contentInnerStyle}>
                    {children}
                </div>
            </div>
        </Content>
    );
};

export default ContentLayout;
