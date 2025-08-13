import { Carousel, Typography } from "antd";

const MainCarousel = ({ eventName = "Our Event", images = [] }) => {
    const heroHeight = "clamp(220px, 36vh, 520px)";

    const wrapperStyle = {
        maxWidth: "1200px",
        margin: "12px auto 16px",
    };

    const frameStyle = {
        borderRadius: 16,
        overflow: "hidden",
        background: "#fff",
    };

    const slideStyle = {
        position: "relative",
        width: "100%",
        height: heroHeight,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        userSelect: "none",
    };

    const welcomeBgStyle = {
        ...slideStyle,
        background:
            "linear-gradient(135deg, rgba(62,207,142,0.14) 0%, rgba(12,188,143,0.14) 100%)",
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

    const imageStyle = {
        width: "100%",
        height: heroHeight,
        objectFit: "cover",
        display: "block",
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
                            <div style={{ maxWidth: 900, margin: "0 auto" }}>
                                <Typography.Title level={1} style={titleStyle}>
                                    Welcome to {eventName}
                                </Typography.Title>
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

                    {hasImages &&
                        images.map((img, i) => (
                            <div key={img?.imageUrl || i}>
                                <div style={{ position: "relative" }}>
                                    <img
                                        src={img?.imageUrl}
                                        alt={
                                            img?.alt ||
                                            `${eventName} slide ${i + 1}`
                                        }
                                        loading="lazy"
                                        style={imageStyle}
                                    />
                                    <div style={captionStyle}>{eventName}</div>
                                </div>
                            </div>
                        ))}
                </Carousel>
            </div>
        </div>
    );
};

export default MainCarousel;
