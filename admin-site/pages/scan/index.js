import { useEffect, useMemo, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
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
} from "antd";
import { QrReader } from "react-qr-reader";
import { CameraOutlined, CheckCircleOutlined } from "@ant-design/icons";
import Content from "../../src/components/Layout/Content/Content";
import LoggedIn from "../../src/components/Layout/LoggedIn/LoggedIn";
import {
    getOrderByInvoiceNumber,
    confirmOrderedMenu,
} from "../../src/store/reducers/orderReducer";
import { getAllVendors } from "../../src/store/reducers/vendorReducer";

const { Title } = Typography;
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

    const hasVendors = vendors.length > 0;

    const handleVendorChange = (value) => {
        setSelectedVendor(value ?? null);
        setScanned(false);
        setOrder(null);
    };

    useEffect(() => {
        (async () => {
            const res = await dispatch(getAllVendors());
            if (res?.status !== "success") {
                message.error(res?.message || "Failed to load vendors.");
            }
        })();
    }, [dispatch]);

    const handleScan = useCallback(
        async (result, error) => {
            if (error) {
                console.error(error);
            }

            if (!selectedVendor) return;

            if (result && !scanned) {
                setScanned(true);
                setCameraOn(false);
                setLoading(true);

                const invoiceNumber = result?.text?.trim();
                if (!invoiceNumber) {
                    message.error("Invalid QR content.");
                    setScanned(false);
                    setLoading(false);
                    return;
                }

                try {
                    const res = await dispatch(
                        getOrderByInvoiceNumber(invoiceNumber),
                    );
                    if (res?.status === "success") {
                        const data = res?.data ?? res?.order ?? res;
                        setOrder(data);
                    } else {
                        message.error(res?.message || "Order not found.");
                        setScanned(false);
                    }
                } catch (err) {
                    message.error(
                        err?.message || "Failed to fetch order details.",
                    );
                    setScanned(false);
                } finally {
                    setLoading(false);
                }
            }
        },
        [dispatch, scanned, selectedVendor],
    );

    const handleConfirm = async () => {
        if (!order?._id || !selectedVendor) return;

        setLoading(true);
        try {
            const res = await dispatch(
                confirmOrderedMenu({
                    orderId: order._id,
                    vendorId: selectedVendor,
                }),
            );
            if (res?.status === "failed") {
                message.error(res?.message || "Failed to confirm order.");
            } else {
                message.success(res?.message || "Order confirmed!");
                setOrder(null);
                setScanned(false);
                setCameraOn(false);
            }
        } catch (err) {
            message.error(err?.message || "Failed to confirm order.");
        } finally {
            setLoading(false);
        }
    };

    const handleGoBack = () => {
        setOrder(null);
        setScanned(false);
    };

    const toggleCamera = () => {
        setCameraOn((prev) => !prev);
        setScanned(false);
    };

    const itemsList = useMemo(
        () =>
            (order?.menus ?? []).map((item, idx) => {
                const isConfirmed = Number(item?.status) === 1;
                return (
                    <div
                        key={item?.key ?? `${item?.name}-${idx}`}
                        style={{
                            backgroundColor: isConfirmed
                                ? "#f6ffed"
                                : "transparent",
                            border: `1px solid ${isConfirmed ? "#b7eb8f" : "#f0f0f0"
                                }`,
                            borderRadius: 4,
                            padding: "4px 8px",
                            marginBottom: 4,
                        }}>
                        {item?.name} x {item?.totalPortion}
                        {isConfirmed && (
                            <span style={{ color: "#52c41a", marginLeft: 8 }}>
                                <CheckCircleOutlined /> Confirmed
                            </span>
                        )}
                    </div>
                );
            }),
        [order],
    );

    return (
        <LoggedIn title={pageTitle}>
            <Content>
                <Spin spinning={loading} tip="Loading...">
                    <div
                        style={{
                            maxWidth: 600,
                            margin: "0 auto",
                            padding: 24,
                        }}>
                        <Title level={3}>QR Code Scanner</Title>

                        <Space
                            direction="vertical"
                            size="middle"
                            style={{ width: "100%" }}>
                            {hasVendors ? (
                                <Form layout="vertical">
                                    <Form.Item label="Select Vendor" required>
                                        <Select
                                            placeholder="Select Vendor"
                                            value={selectedVendor}
                                            onChange={handleVendorChange}
                                            allowClear>
                                            {vendors.map((vendor) => (
                                                <Option
                                                    key={vendor._id}
                                                    value={vendor._id}>
                                                    {vendor.name}
                                                </Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </Form>
                            ) : (
                                ""
                            )}

                            {selectedVendor && !scanned && (
                                <Button
                                    type="primary"
                                    icon={<CameraOutlined />}
                                    block
                                    onClick={toggleCamera}>
                                    Open Camera
                                </Button>
                            )}

                            {!selectedVendor && (
                                <Empty description="Please select a vendor to start scanning." />
                            )}

                            {order && (
                                <Card
                                    title={`Order Overview - ${order.invoiceNumber}`}
                                    actions={[
                                        <Button
                                            key="confirm"
                                            type="primary"
                                            onClick={handleConfirm}
                                            disabled={!selectedVendor}>
                                            Confirm Order
                                        </Button>,
                                        <Button
                                            key="back"
                                            onClick={handleGoBack}>
                                            Scan Again
                                        </Button>,
                                    ]}>
                                    <Descriptions
                                        column={1}
                                        bordered
                                        size="small">
                                        <Descriptions.Item label="Customer">
                                            {order.customerFullname}
                                        </Descriptions.Item>
                                        <Descriptions.Item label="Items">
                                            {itemsList}
                                        </Descriptions.Item>
                                    </Descriptions>
                                </Card>
                            )}

                            <Modal
                                open={cameraOn}
                                onCancel={() => setCameraOn(false)}
                                footer={null}
                                destroyOnHidden
                                title="Scan QR Code">
                                <div
                                    style={{
                                        border: "2px dashed #1890ff",
                                        borderRadius: 8,
                                        overflow: "hidden",
                                        padding: 16,
                                        textAlign: "center",
                                    }}>
                                    <QrReader
                                        constraints={{
                                            facingMode: "environment",
                                        }}
                                        onResult={handleScan}
                                        style={{ width: "100%" }}
                                    />
                                    <p style={{ marginTop: 12 }}>
                                        Align the QR code within the frame
                                    </p>
                                </div>
                            </Modal>
                        </Space>
                    </div>
                </Spin>
            </Content>
        </LoggedIn>
    );
};

export default Index;
