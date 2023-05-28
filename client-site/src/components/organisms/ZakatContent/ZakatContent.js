import React from "react";
import { Typography } from "antd";
import TabsComponent from "../../molecules/TabsComponent/Tabs";
import ContentLayout from "../ContentLayout/ContentLayout";

const ZakatContent = ({ event }) => {
    return (
        <ContentLayout
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
            <TabsComponent event={event} />
        </ContentLayout>
    );
};

export default ZakatContent;
