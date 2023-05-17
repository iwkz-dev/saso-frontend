import { Carousel, Typography } from "antd";
import React from "react";

const MainCarousel = ({ eventName, images }) => {
    const contentStyle = {
        height: "300px",
        lineHeight: "300px",
        textAlign: "center",
        background: "rgb(242, 255, 239)",
        margin: "0",
        overflow: "hidden",
        margin: "auto",
    };

    return (
        <Carousel
            autoplay
            style={{
                maxWidth: "1440px",
                margin: "auto",
            }}
        >
            <div>
                <Typography>
                    <Typography.Title style={contentStyle}>
                        Welcome to {eventName}
                    </Typography.Title>
                </Typography>
            </div>
            {images?.map((image) => (
                <div>
                    <img
                        src={image.imageUrl}
                        style={{
                            width: "100%",
                            height: "300px",
                            overflow: "hidden",
                            objectFit: "cover",
                        }}
                    />
                </div>
            ))}
        </Carousel>
    );
};

export default MainCarousel;
