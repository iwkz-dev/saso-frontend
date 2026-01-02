import { useEffect, useMemo, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { QrReader } from "react-qr-reader";
import { CheckCircleOutlined, ScanOutlined } from "@ant-design/icons";
import {
    Spin,
    Card,
    Button,
    Typography,
    Descriptions,
    message,
    Select,
    Form,
    Space,
    Empty,
    Modal,
    List,
    Tag,
} from "antd";

import Content from "../../src/components/Layout/Content/Content";
import Protected from "../../src/components/Layout/Protected/Protected";
import {
    getOrderByInvoiceNumber,
    confirmOrderedMenu,
} from "../../src/store/reducers/orderReducer";
import { getAllVendors } from "../../src/store/reducers/vendorReducer";

const { Title, Text } = Typography;
const { Option } = Select;

const Index = () => {
    const pageTitle = "Saso App | Scan";
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);
    const [order, setOrder] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [selectedVendor, setSelectedVendor] = useState(null);
    const [cameraOn, setCameraOn] = useState(false);

    const vendors = useSelector((s) => s?.vendor?.vendors) ?? [];

    useEffect(() => {
        dispatch(getAllVendors()).then((res) => {
            if (res?.status !== "success") {
                message.error(res?.message || "Failed to load vendors.");
            }
        });
    }, [dispatch]);

    const handleScan = useCallback(
        async (result) => {
            if (!selectedVendor || scanned || !result?.text) return;

            setScanned(true);
            setCameraOn(false);
            setLoading(true);

            try {
                const res = await dispatch(
                    getOrderByInvoiceNumber(result.text.trim()),
                );
                if (res?.status === "success") {
                    setOrder(res?.data ?? res);
                } else {
                    message.error(res?.message || "Order not found.");
                    setScanned(false);
                }
            } catch {
                message.error("Failed to fetch order.");
                setScanned(false);
            } finally {
                setLoading(false);
            }
        },
        [dispatch, scanned, selectedVendor],
    );

    const handleConfirm = async () => {
        if (!order?._id) return;

        setLoading(true);
        try {
            const res = await dispatch(
                confirmOrderedMenu({
                    orderId: order._id,
                    vendorId: selectedVendor,
                }),
            );
            if (res?.status === "success") {
                message.success("Order confirmed");
                setOrder(null);
                setScanned(false);
            } else {
                message.error(res?.message);
            }
        } finally {
            setLoading(false);
        }
    };

    const itemsList = useMemo(
        () => (
            <List
                size="small"
                dataSource={order?.menus ?? []}
                renderItem={(item) => (
                    <List.Item>
                        <Space>
                            <Text>
                                {item.name} × {item.totalPortion}
                            </Text>
                            {Number(item.status) === 1 && (
                                <Tag
                                    color="green"
                                    icon={<CheckCircleOutlined />}>
                                    Confirmed
                                </Tag>
                            )}
                        </Space>
                    </List.Item>
                )}
            />
        ),
        [order],
    );

    return (
        <Protected title={pageTitle}>
            <Content>
                <Spin spinning={loading}>
                    <div
                        style={{
                            maxWidth: 560,
                            margin: "0 auto",
                            padding: 24,
                        }}>
                        <Title level={3}>Scan Order QR</Title>

                        {/* Vendor Selection */}
                        <Card size="small" style={{ marginBottom: 16 }}>
                            <Form layout="vertical">
                                <Form.Item
                                    label="Vendor"
                                    required
                                    style={{ marginBottom: 0 }}>
                                    <Select
                                        placeholder="Select vendor"
                                        value={selectedVendor}
                                        onChange={setSelectedVendor}
                                        allowClear>
                                        {vendors.map((v) => (
                                            <Option key={v._id} value={v._id}>
                                                {v.name}
                                            </Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </Form>
                        </Card>

                        {/* Scan Action */}
                        {!order && (
                            <Card
                                hoverable
                                onClick={() =>
                                    selectedVendor && setCameraOn(true)
                                }
                                style={{
                                    textAlign: "center",
                                    borderStyle: "dashed",
                                    opacity: selectedVendor ? 1 : 0.5,
                                    cursor: selectedVendor
                                        ? "pointer"
                                        : "not-allowed",
                                }}>
                                <Space direction="vertical">
                                    <ScanOutlined
                                        style={{
                                            fontSize: 32,
                                            color: "#1890ff",
                                        }}
                                    />
                                    <Text strong>Tap to scan QR code</Text>
                                    <Text type="secondary">
                                        Camera will open automatically
                                    </Text>
                                </Space>
                            </Card>
                        )}

                        {!selectedVendor && (
                            <Empty
                                style={{ marginTop: 24 }}
                                description="Select a vendor to start"
                            />
                        )}

                        {/* Order Summary */}
                        {order && (
                            <Card
                                title={`Order #${order.invoiceNumber}`}
                                style={{ marginTop: 16 }}
                                actions={[
                                    <Button
                                        key="confirm"
                                        type="primary"
                                        onClick={handleConfirm}>
                                        Confirm Order
                                    </Button>,
                                    <Button
                                        key="scan-again"
                                        onClick={() => {
                                            setOrder(null);
                                            setScanned(false);
                                        }}>
                                        Scan Again
                                    </Button>,
                                ]}>
                                <Descriptions column={1} size="small">
                                    <Descriptions.Item label="Customer">
                                        {order.customerFullname}
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Items">
                                        {itemsList}
                                    </Descriptions.Item>
                                </Descriptions>
                            </Card>
                        )}

                        {/* Camera Modal */}
                        <Modal
                            open={cameraOn}
                            footer={null}
                            onCancel={() => setCameraOn(false)}
                            destroyOnClose
                            title="Scan QR Code">
                            <div
                                style={{
                                    position: "relative",
                                    width: "100%",
                                    borderRadius: 8,
                                    overflow: "hidden",
                                }}>
                                <QrReader
                                    className="react-qr-reader"
                                    constraints={{ facingMode: "environment" }}
                                    onResult={handleScan}
                                    style={{ width: "100%" }}
                                />

                                <div
                                    style={{
                                        position: "absolute",
                                        inset: 0,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        pointerEvents: "none",
                                    }}>
                                    <div
                                        style={{
                                            width: "50vw",
                                            maxWidth: 250,
                                            aspectRatio: "1 / 1",
                                            border: "1.5px dashed #1890ff",
                                            borderRadius: 12,
                                            boxShadow:
                                                "0 0 0 9999px rgba(0,0,0,0.45)",
                                        }}
                                    />
                                </div>
                            </div>
                            <Text
                                type="secondary"
                                style={{
                                    display: "block",
                                    textAlign: "center",
                                    marginTop: 12,
                                }}>
                                Place the QR code inside the frame
                            </Text>
                        </Modal>
                    </div>
                </Spin>
            </Content>
        </Protected>
    );
};

export default Index;
