import {
    Layout,
    Space,
    Typography,
    Grid,
    Tag,
    Card,
    Button,
    Divider,
    List,
    Descriptions,
    message,
} from "antd";
import {
    CopyOutlined,
    WhatsAppOutlined,
    CreditCardOutlined,
    InfoCircleOutlined,
} from "@ant-design/icons";

import BackToButton from "../../atoms/BackToButton/BackToButton";
import { formatDate } from "../../../helpers/dateHelper";
import style from "./MyOrderDetailContent.module.scss";

const { Content } = Layout;
const { useBreakpoint } = Grid;
const { Title, Text, Paragraph } = Typography;

const tagForStatus = (status) => {
    switch (status) {
        case 1:
            return <Tag color="processing">Paid</Tag>;
        case 2:
            return <Tag color="error">Refund / Canceled</Tag>;
        case 3:
            return <Tag color="success">Completed</Tag>;
        default:
            return <Tag>Pending</Tag>;
    }
};

const currency = (n) =>
    typeof n === "number" ? `${n.toFixed(2)} €` : n || "-";

const MyOrderDetailContent = ({ detailOrder, withoutBackButton, event }) => {
    const screens = useBreakpoint();
    const isMobile = !screens.md;

    const cp = event?.contactPersons?.[0];
    const paypal = event?.paypal || "";

    const handleCopy = async (text, label = "Copied") => {
        try {
            await navigator.clipboard.writeText(text);
            message.success(label);
        } catch {
            message.error("Copy failed");
        }
    };

    const whatsappHref = cp?.phoneNumber
        ? `https://wa.me/${cp.phoneNumber.replace(/\D/g, "")}`
        : null;

    const items = Array.isArray(detailOrder?.menus) ? detailOrder.menus : [];

    const itemsWithSubtotal = items.map((m) => ({
        ...m,
        _subtotal: (Number(m.price) || 0) * (Number(m.totalPortion) || 0),
    }));

    const computedTotal =
        itemsWithSubtotal.reduce((s, it) => s + it._subtotal, 0) ||
        detailOrder?.totalPrice;

    return (
        <Content className={style.myOrderDetailContent}>
            <div
                style={{
                    maxWidth: 960,
                    padding: isMobile ? 12 : 16,
                    margin: "0 auto",
                }}>
                <Space direction="vertical" size={16} style={{ width: "100%" }}>
                    {!withoutBackButton && (
                        <BackToButton
                            buttonText="Back to My Orders"
                            to={`/${event.slug}/my-order`}
                        />
                    )}

                    <Title
                        level={isMobile ? 4 : 3}
                        style={{ textAlign: "center", marginBottom: 0 }}>
                        {detailOrder.invoiceNumber}
                    </Title>

                    {/* Summary */}
                    <Card
                        size="small"
                        bodyStyle={{ padding: isMobile ? 12 : 16 }}
                        style={{ borderRadius: 12 }}>
                        <Space
                            direction={isMobile ? "vertical" : "horizontal"}
                            style={{
                                width: "100%",
                                justifyContent: "space-between",
                            }}>
                            <Space direction="vertical" size={2}>
                                <Space align="center">
                                    <Text strong>
                                        {detailOrder.customerFullname}
                                    </Text>
                                    {tagForStatus(detailOrder.status)}
                                </Space>

                                <Text
                                    type="secondary"
                                    style={{
                                        fontSize: isMobile ? 10 : 12,
                                        color: "rgba(0,0,0,0.35)",
                                    }}>
                                    Updated •{" "}
                                    {formatDate(
                                        detailOrder.updated_at,
                                        true,
                                        true,
                                    )}
                                </Text>
                                <Text
                                    type="secondary"
                                    style={{
                                        fontSize: isMobile ? 10 : 12,
                                        color: "rgba(0,0,0,0.35)",
                                    }}>
                                    Created •{" "}
                                    {formatDate(
                                        detailOrder.created_at,
                                        true,
                                        true,
                                    )}
                                </Text>
                            </Space>

                            {/* Right: total + quick actions */}
                            <Space
                                direction="vertical"
                                align={isMobile ? "flex-start" : "flex-end"}
                                size={8}>
                                <Text type="secondary">Total</Text>
                                <Title
                                    level={isMobile ? 4 : 3}
                                    style={{ margin: 0 }}>
                                    {currency(computedTotal)}
                                </Title>

                                <Space wrap>
                                    <Button
                                        size="small"
                                        icon={<CopyOutlined />}
                                        onClick={() =>
                                            handleCopy(
                                                detailOrder.invoiceNumber,
                                                "Invoice copied",
                                            )
                                        }>
                                        Invoice
                                    </Button>

                                    {whatsappHref && (
                                        <Button
                                            size="small"
                                            icon={<WhatsAppOutlined />}
                                            href={whatsappHref}
                                            target="_blank">
                                            Contact
                                        </Button>
                                    )}

                                    {!!paypal && (
                                        <Button
                                            size="small"
                                            type="primary"
                                            icon={<CreditCardOutlined />}
                                            href={
                                                paypal.startsWith("http")
                                                    ? paypal
                                                    : `https://paypal.me/${paypal}`
                                            }
                                            target="_blank">
                                            Pay
                                        </Button>
                                    )}
                                </Space>
                            </Space>
                        </Space>

                        <Divider />

                        {/* Details */}
                        <Descriptions
                            size="small"
                            column={{ xs: 1, md: 2, lg: 3 }}>
                            <Descriptions.Item label="Payment">
                                <Space direction="vertical" size={2}>
                                    <Text strong>
                                        {detailOrder.paymentType?.name ||
                                            detailOrder.paymentType ||
                                            "-"}
                                    </Text>
                                    <Text type="secondary">
                                        <InfoCircleOutlined /> See payment
                                        information in invoice
                                    </Text>
                                </Space>
                            </Descriptions.Item>

                            <Descriptions.Item label="Arrived At">
                                {detailOrder.arrived_at || "-"}
                            </Descriptions.Item>

                            <Descriptions.Item label="Email">
                                {detailOrder.customerEmail || "-"}
                            </Descriptions.Item>

                            <Descriptions.Item label="Phone">
                                {detailOrder.customerPhone || "-"}
                            </Descriptions.Item>

                            {detailOrder.note && (
                                <Descriptions.Item label="Customer Note">
                                    <Paragraph
                                        ellipsis={{
                                            rows: 3,
                                            expandable: true,
                                        }}>
                                        {detailOrder.note}
                                    </Paragraph>
                                </Descriptions.Item>
                            )}
                        </Descriptions>
                    </Card>

                    {/* Items */}
                    <Card
                        size="small"
                        title="Ordered Items"
                        bodyStyle={{ padding: isMobile ? 8 : 12 }}
                        style={{ borderRadius: 12 }}>
                        <List
                            dataSource={itemsWithSubtotal}
                            renderItem={(item) => (
                                <List.Item>
                                    <Space
                                        style={{
                                            width: "100%",
                                            justifyContent: "space-between",
                                        }}>
                                        <Space direction="vertical" size={0}>
                                            <Text strong>{item.name}</Text>
                                            <Text type="secondary">
                                                {item.totalPortion} ×{" "}
                                                {currency(item.price)}
                                            </Text>
                                        </Space>
                                        <Text>{currency(item._subtotal)}</Text>
                                    </Space>
                                </List.Item>
                            )}
                        />

                        <Divider />

                        <Space
                            style={{
                                width: "100%",
                                justifyContent: "space-between",
                            }}>
                            <Text type="secondary">Total</Text>
                            <Text strong>{currency(computedTotal)}</Text>
                        </Space>
                    </Card>
                </Space>
            </div>
        </Content>
    );
};

export default MyOrderDetailContent;
