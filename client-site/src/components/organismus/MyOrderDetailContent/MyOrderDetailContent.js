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
    Collapse,
    Descriptions,
    Tooltip,
    message,
} from "antd";
import {
    CopyOutlined,
    WhatsAppOutlined,
    FilePdfOutlined,
    CreditCardOutlined,
} from "@ant-design/icons";
import BackToButton from "../../atoms/BackToButton/BackToButton";
import { formatDate } from "../../../helpers/dateHelper";
import style from "./MyOrderDetailContent.module.scss";

const { Content } = Layout;
const { useBreakpoint } = Grid;
const { Title, Text, Paragraph } = Typography;
const { Panel } = Collapse;

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

const currency = (n) => (typeof n === "number" ? `${n} €` : n || "-");

const MyOrderDetailContent = ({
    detailOrder,
    withoutBackButton,
    events,
    onDownloadPdf,
}) => {
    const screens = useBreakpoint();
    const isMobile = !screens.md;

    const cp = events?.[0]?.contactPersons?.[0];
    const paypal = events?.[0]?.paypal || "";
    const iban = events?.[0]?.iban || "-";
    const bic = events?.[0]?.bic || "-";

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
        itemsWithSubtotal.reduce((s, it) => s + (it._subtotal || 0), 0) ||
        detailOrder?.totalPrice;

    return (
        <Content className={style.myOrderDetailContent}>
            <div
                style={{
                    maxWidth: 960,
                    padding: isMobile ? "12px" : "16px",
                    margin: "0 auto",
                }}>
                <Space
                    direction="vertical"
                    size={isMobile ? 12 : 16}
                    style={{ width: "100%" }}>
                    {!withoutBackButton && (
                        <BackToButton
                            targetURL="/my-order"
                            buttonText="Back to My Orders"
                        />
                    )}

                    {/* Header */}
                    <Title
                        level={isMobile ? 4 : 3}
                        style={{ textAlign: "center", margin: "8px 0 0" }}>
                        {detailOrder.invoiceNumber}
                    </Title>

                    {/* Summary Card */}
                    <Card
                        size="small"
                        styles={{ padding: isMobile ? 12 : 16 }}
                        style={{ borderRadius: 12 }}>
                        <Space
                            direction={isMobile ? "vertical" : "horizontal"}
                            style={{
                                width: "100%",
                                justifyContent: "space-between",
                                alignItems: isMobile ? "flex-start" : "center",
                            }}
                            size={isMobile ? 10 : 16}>
                            {/* Left: customer + meta */}
                            <Space direction="vertical" size={6}>
                                <Space size={8} wrap align="center">
                                    <Text strong>
                                        {detailOrder.customerFullname}
                                    </Text>
                                    {tagForStatus(detailOrder.status)}
                                </Space>
                                <Text type="secondary">
                                    Updated •{" "}
                                    {formatDate(
                                        detailOrder.updated_at,
                                        true,
                                        true,
                                    )}
                                </Text>
                                <Text type="secondary">
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
                                    <Tooltip title="Copy invoice number">
                                        <Button
                                            size="small"
                                            onClick={() =>
                                                handleCopy(
                                                    detailOrder.invoiceNumber,
                                                    "Invoice copied",
                                                )
                                            }
                                            icon={<CopyOutlined />}>
                                            Invoice
                                        </Button>
                                    </Tooltip>

                                    {whatsappHref && (
                                        <Tooltip title="Contact via WhatsApp">
                                            <Button
                                                size="small"
                                                icon={<WhatsAppOutlined />}
                                                href={whatsappHref}
                                                target="_blank"
                                                rel="noopener noreferrer">
                                                Contact
                                            </Button>
                                        </Tooltip>
                                    )}

                                    {!!paypal && (
                                        <Tooltip title="Open PayPal">
                                            <Button
                                                size="small"
                                                icon={<CreditCardOutlined />}
                                                href={
                                                    paypal.startsWith("http")
                                                        ? paypal
                                                        : `https://paypal.me/${paypal}`
                                                }
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                type="primary">
                                                Pay
                                            </Button>
                                        </Tooltip>
                                    )}

                                    {/* Optional PDF action if a handler is provided */}
                                    {typeof onDownloadPdf === "function" && (
                                        <Tooltip title="Download PDF">
                                            <Button
                                                size="small"
                                                icon={<FilePdfOutlined />}
                                                onClick={() =>
                                                    onDownloadPdf(
                                                        detailOrder._id,
                                                    )
                                                }>
                                                PDF
                                            </Button>
                                        </Tooltip>
                                    )}
                                </Space>
                            </Space>
                        </Space>

                        <Divider
                            style={{ margin: isMobile ? "12px 0" : "16px 0" }}
                        />

                        {/* Quick facts row */}
                        <Space
                            direction={isMobile ? "vertical" : "horizontal"}
                            size={isMobile ? 8 : 24}
                            style={{ width: "100%", flexWrap: "wrap" }}>
                            <Space size={6}>
                                <Text type="secondary">Payment:</Text>
                                <Text strong>
                                    {detailOrder.paymentType?.name ||
                                        detailOrder.paymentType ||
                                        "-"}
                                </Text>
                            </Space>
                            <Space size={6}>
                                <Text type="secondary">Arrived at:</Text>
                                <Text>{detailOrder.arrived_at || "-"}</Text>
                            </Space>
                            <Space size={6}>
                                <Text type="secondary">Email:</Text>
                                <Text>{detailOrder.customerEmail}</Text>
                            </Space>
                            <Space size={6}>
                                <Text type="secondary">Phone:</Text>
                                <Text>{detailOrder.customerPhone}</Text>
                            </Space>
                            {detailOrder.note && (
                                <Space size={6}>
                                    <Text type="secondary">Note:</Text>
                                    <Text>{detailOrder.note}</Text>
                                </Space>
                            )}
                        </Space>
                    </Card>

                    {/* Items */}
                    <Card
                        size="small"
                        title={<Text strong>Ordered Items</Text>}
                        styles={{ padding: isMobile ? 8 : 12 }}
                        headStyles={{
                            padding: isMobile ? "8px 12px" : "12px 16px",
                        }}
                        style={{ borderRadius: 12 }}>
                        <List
                            itemLayout="horizontal"
                            dataSource={itemsWithSubtotal}
                            renderItem={(item) => (
                                <List.Item
                                    style={{
                                        padding: isMobile
                                            ? "8px 4px"
                                            : "10px 6px",
                                    }}>
                                    <Space
                                        direction="vertical"
                                        size={2}
                                        style={{ width: "100%" }}>
                                        <Space
                                            style={{
                                                justifyContent: "space-between",
                                                width: "100%",
                                            }}>
                                            <Text
                                                strong
                                                style={{
                                                    maxWidth: "70%",
                                                    whiteSpace: "nowrap",
                                                    overflow: "hidden",
                                                    textOverflow: "ellipsis",
                                                }}>
                                                {item.name}
                                            </Text>
                                            <Text>
                                                {currency(item._subtotal)}
                                            </Text>
                                        </Space>
                                        <Text type="secondary">
                                            {item.totalPortion} ×{" "}
                                            {currency(item.price)}
                                        </Text>
                                    </Space>
                                </List.Item>
                            )}
                        />
                        <Divider
                            style={{ margin: isMobile ? "8px 0" : "12px 0" }}
                        />
                        <Space
                            style={{
                                width: "100%",
                                justifyContent: "space-between",
                            }}>
                            <Text type="secondary">Total</Text>
                            <Text strong>{currency(computedTotal)}</Text>
                        </Space>
                    </Card>

                    {/* Payment Instructions (collapsible) */}
                    <Collapse
                        bordered
                        style={{ borderRadius: 12, overflow: "hidden" }}
                        defaultActiveKey={isMobile ? [] : ["payment"]}>
                        <Panel header="Payment Instructions" key="payment">
                            <Space
                                direction="vertical"
                                size={10}
                                style={{ width: "100%" }}>
                                <Paragraph
                                    type="secondary"
                                    style={{ marginBottom: 0 }}>
                                    Please transfer your payment if you haven’t
                                    already, then send the proof to the contact
                                    below.
                                </Paragraph>
                                <Descriptions size="small" column={1} bordered>
                                    <Descriptions.Item label="Contact Person">
                                        <Paragraph
                                            copyable
                                            style={{ margin: 0 }}>
                                            {cp?.name || "-"}
                                        </Paragraph>
                                    </Descriptions.Item>
                                    <Descriptions.Item label="WhatsApp">
                                        <Paragraph
                                            copyable
                                            style={{ margin: 0 }}>
                                            {cp?.phoneNumber || "-"}
                                        </Paragraph>
                                    </Descriptions.Item>
                                    <Descriptions.Item label="PayPal">
                                        <Paragraph
                                            copyable
                                            style={{ margin: 0 }}>
                                            {paypal || "-"}
                                        </Paragraph>
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Account Name">
                                        <Text>IWKZ e.V.</Text>
                                    </Descriptions.Item>
                                    <Descriptions.Item label="IBAN">
                                        <Paragraph
                                            copyable
                                            style={{ margin: 0 }}>
                                            {iban}
                                        </Paragraph>
                                    </Descriptions.Item>
                                    <Descriptions.Item label="BIC">
                                        <Text>{bic}</Text>
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Invoice Number">
                                        <Paragraph
                                            copyable
                                            style={{ margin: 0 }}>
                                            {detailOrder?.invoiceNumber}
                                        </Paragraph>
                                    </Descriptions.Item>
                                </Descriptions>
                            </Space>
                        </Panel>
                    </Collapse>
                </Space>
            </div>
        </Content>
    );
};

export default MyOrderDetailContent;
