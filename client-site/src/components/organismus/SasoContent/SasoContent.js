import { Typography, Space, Divider } from "antd";
import ContentLayout from "../ContentLayout/ContentLayout";
import ProductsTabs from "../../molecules/ProductsTabs/ProductsTabs";

const SasoContent = ({ event }) => {
    const barcode = "";

    const headerWrapStyle = {
        textAlign: "center",
        marginBottom: 6,
    };

    const titleStyle = {
        margin: 0,
        lineHeight: 1.2,
        fontSize: "clamp(18px, 4.5vw, 24px)",
    };

    const spaceStyle = {
        width: "100%",
        marginTop: 6,
    };

    return (
        <ContentLayout hasCarousel>
            <div style={headerWrapStyle}>
                <Typography.Title level={2} style={titleStyle}>
                    Menu
                </Typography.Title>
            </div>

            <Divider style={{ margin: "12px 0" }} />

            <Space direction="vertical" size="middle" style={spaceStyle}>
                <ProductsTabs event={event} barcode={barcode} />
            </Space>
        </ContentLayout>
    );
};

export default SasoContent;
