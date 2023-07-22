import React from "react";
import { Typography } from "antd";
import ProductsTabs from "../../molecules/ProductsTabs/ProductsTabs";
import ContentLayout from "../ContentLayout/ContentLayout";

const ZakatContent = ({ event }) => {
    return (
        <ContentLayout
            hasCarousel
            style={{
                minHeight: "500px",
                backgroundColor: "#ffffff",
            }}
        >
            <Typography>
                <Typography.Title level={2} style={{ textAlign: "center" }}>
                    Products
                </Typography.Title>
            </Typography>
            <ProductsTabs event={event} />
        </ContentLayout>
    );
};

export default ZakatContent;
