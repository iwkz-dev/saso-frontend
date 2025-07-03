import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
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
    const [vendors, setVendors] = useState([]);

    const handleVendorChange = (value) => {
        setSelectedVendor(value);
        setScanned(false);
        setOrder(null);
    };

    useEffect(() => {
        const getVendors = async () => {
            const response = await dispatch(getAllVendors());
            if (response.status === "success") {
                setVendors(response.data.data);
            } else {
                message.error("Failed to load vendors.");
            }
        };

        getVendors();
    }, [dispatch]);

    const handleScan = async (result, error) => {
        if (result) {
            setScanned(true);
            setCameraOn(false);
            setLoading(true);

            const invoiceNumber = result?.text;

            try {
                const response = await dispatch(
                    getOrderByInvoiceNumber(invoiceNumber),
                );

                if (response.status === "success") {
                    setOrder(response.data);
                } else {
                    message.error("Order not found.");
                    setScanned(false);
                }
            } catch (err) {
                console.error(err);
                message.error("Failed to fetch order details.");
                setScanned(false);
            } finally {
                setLoading(false);
            }
        }

        if (error) {
            console.log(error);
        }
    };

    const handleConfirm = () => {
        setLoading(true);
        dispatch(
            confirmOrderedMenu({
                orderId: order._id,
                vendorId: selectedVendor,
            }),
        )
            .unwrap()
            .then(() => {
                message.success("Order confirmed!");
                setOrder(null);
                setScanned(false);
                setCameraOn(false);
            })
            .catch((error) => {
                console.error(error);
                message.error(error?.message || "Failed to confirm order.");
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleGoBack = () => {
        setOrder(null);
        setScanned(false);
    };

    const toggleCamera = () => {
        setCameraOn(!cameraOn);
        if (!cameraOn) {
            setScanned(false);
        }
    };

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
                            {vendors.length > 0 && (
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
                                            onClick={handleConfirm}>
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
                                            {order.menus.map((item, idx) => (
                                                <div
                                                    key={idx}
                                                    style={{
                                                        backgroundColor:
                                                            item.status === 1
                                                                ? "#f6ffed"
                                                                : "transparent",
                                                        border:
                                                            item.status === 1
                                                                ? "1px solid #b7eb8f"
                                                                : "1px solid #f0f0f0",
                                                        borderRadius: 4,
                                                        padding: "4px 8px",
                                                        marginBottom: 4,
                                                    }}>
                                                    {item.name} x{" "}
                                                    {item.totalPortion}{" "}
                                                    {item.status === 1 && (
                                                        <span
                                                            style={{
                                                                color: "#52c41a",
                                                                marginLeft: 8,
                                                            }}>
                                                            <CheckCircleOutlined />{" "}
                                                            Confirmed
                                                        </span>
                                                    )}
                                                </div>
                                            ))}
                                        </Descriptions.Item>
                                    </Descriptions>
                                </Card>
                            )}

                            <Modal
                                open={cameraOn}
                                onCancel={() => setCameraOn(false)}
                                footer={null}
                                destroyOnClose
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
