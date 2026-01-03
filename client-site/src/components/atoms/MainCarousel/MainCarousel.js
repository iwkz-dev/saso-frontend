import { Carousel, Typography, Modal } from "antd";
import { useState } from "react";

const MainCarousel = ({
    eventName = "Our Event",
    images = [],
    eventDescription = "",
}) => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const ASPECT = "16 / 9";

    const wrapperStyle = {
        maxWidth: 1200,
        margin: "12px auto 16px",
    };

    const frameStyle = {
        borderRadius: 16,
        overflow: "hidden",
        background: "#fff",
    };

    const slideBoxStyle = {
        position: "relative",
        width: "100%",
        aspectRatio: ASPECT,
    };

    const mediaFillStyle = {
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
        display: "block",
    };

    const welcomeBgStyle = {
        ...slideBoxStyle,
        background:
            "linear-gradient(135deg, rgba(62,207,142,0.14) 0%, rgba(12,188,143,0.14) 100%)",
    };

    const contentLayerStyle = {
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        userSelect: "none",
    };

    const titleStyle = {
        margin: 0,
        padding: "0 16px",
        lineHeight: 1.2,
        color: "#111827",
        fontWeight: 800,
        fontSize: "clamp(20px, 5vw, 36px)",
    };

    const ctaWrapStyle = {
        marginTop: 14,
        display: "inline-flex",
        gap: 8,
        flexWrap: "wrap",
        justifyContent: "center",
    };

    const ctaBtnStyle = {
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "10px 14px",
        borderRadius: 999,
        border: "1px solid #10b981",
        background: "#10b981",
        color: "#fff",
        fontSize: 14,
        fontWeight: 600,
        cursor: "pointer",
        textDecoration: "none",
    };

    const captionStyle = {
        position: "absolute",
        left: 12,
        bottom: 12,
        padding: "6px 10px",
        background: "rgba(0,0,0,0.45)",
        color: "#fff",
        borderRadius: 10,
        fontSize: 13,
        letterSpacing: 0.2,
        backdropFilter: "blur(2px)",
    };

    const hasImages = Array.isArray(images) && images.length > 0;

    return (
        <>
            <div style={wrapperStyle}>
                <div style={frameStyle}>
                    <Carousel
                        autoplay
                        autoplaySpeed={4200}
                        pauseOnHover
                        draggable
                        arrows
                        dotPosition="bottom"
                        style={{ width: "100%" }}>
                        <div>
                            <div style={welcomeBgStyle}>
                                <div style={contentLayerStyle}>
                                    <div
                                        style={{
                                            maxWidth: 900,
                                            margin: "0 auto",
                                        }}>
                                        <div
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                gap: 8,
                                            }}>
                                            <Typography.Title
                                                level={1}
                                                style={titleStyle}>
                                                Welcome to {eventName}
                                            </Typography.Title>
                                            <button
                                                onClick={() =>
                                                    setIsModalVisible(true)
                                                }
                                                style={{
                                                    background:
                                                        "rgba(0,0,0,0.5)",
                                                    color: "#fff",
                                                    border: "none",
                                                    borderRadius: "50%",
                                                    width: 24,
                                                    height: 24,
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    cursor: "pointer",
                                                    fontSize: 14,
                                                    fontWeight: "bold",
                                                }}
                                                aria-label="Show event description">
                                                !
                                            </button>
                                        </div>
                                        <div style={ctaWrapStyle}>
                                            <a
                                                href="#menus"
                                                style={ctaBtnStyle}
                                                aria-label="Shop now">
                                                Shop now
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {hasImages &&
                            images.map((img, i) => (
                                <div key={img?.imageUrl || i}>
                                    <div style={slideBoxStyle}>
                                        <img
                                            src={img?.imageUrl}
                                            alt={
                                                img?.alt ||
                                                `${eventName} slide ${i + 1}`
                                            }
                                            loading="lazy"
                                            style={mediaFillStyle}
                                        />
                                        <div style={captionStyle}>
                                            {eventName}
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </Carousel>
                </div>
            </div>
            <Modal
                title="Event Description"
                open={isModalVisible}
                onOk={() => setIsModalVisible(false)}
                onCancel={() => setIsModalVisible(false)}>
                <Typography.Text>{eventDescription}</Typography.Text>
            </Modal>
        </>
    );
};

export default MainCarousel;
