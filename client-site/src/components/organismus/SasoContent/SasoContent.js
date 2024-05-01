import React, { useState } from "react";
import { Typography } from "antd";
import ProductsTabs from "../../molecules/ProductsTabs/ProductsTabs";
import ContentLayout from "../ContentLayout/ContentLayout";
import { Space } from "antd";
import style from "./SasoContent.module.scss";

const SasoContent = ({ event }) => {
    const [barcode] = useState("");

    return (
        <ContentLayout className={style.contentLayout} hasCarousel>
            <Typography.Title level={2} style={{ textAlign: "center" }}>
                Products
            </Typography.Title>
            <Space
                className={style.productsContainer}
                direction="vertical"
                size="middle">
                <ProductsTabs event={event} barcode={barcode} />
            </Space>
        </ContentLayout>
    );
};

export default SasoContent;
