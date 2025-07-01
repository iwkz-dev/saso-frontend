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
} from "antd";
import { QrReader } from "react-qr-reader";
import Content from "../../src/components/Layout/Content/Content";
import LoggedIn from "../../src/components/Layout/LoggedIn/LoggedIn";
import { getOrderByInvoiceNumber } from "../../src/store/reducers/orderReducer";
import { getAllVendors } from "../../src/store/reducers/vendorReducer";

const { Title } = Typography;
const { Option } = Select;

const index = () => {
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
        setCameraOn(false);
    };

    useEffect(() => {
        const getVendors = async () => {
            const response = await dispatch(getAllVendors());
            if (response.status === "success") {
                setVendors(response.data.data);
                console.log("Vendors fetched:", response.data);
                setCameraOn(false);
            } else {
                message.error("Order not found.");
                setScanned(false);
            }
        };

        getVendors();
    }, []);

    const handleScan = async (result, error) => {
        if (result) {
            if (!scanned && selectedVendor) {
                setScanned(true);
                setLoading(true);

                const invoiceNumber = result?.text;

                try {
                    const response = await dispatch(
                        getOrderByInvoiceNumber(invoiceNumber),
                    );

                    if (response.status === "success") {
                        setOrder(response.data);
                        setCameraOn(false);
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
        }

        if (error) {
            console.log(error);
        }
    };

    const handleConfirm = () => {
        message.success("Order confirmed!");
        setOrder(null);
        setScanned(false);
        setCameraOn(false);
    };

    const toggleCamera = () => {
        setCameraOn((prev) => !prev);
        if (!cameraOn) {
            setScanned(false); // Reset scanned when turning camera ON
        }
    };

    return (
        <LoggedIn title={pageTitle}>
            <Content>
                <div style={{ maxWidth: 600, margin: "0 auto", padding: 24 }}>
                    <Title level={3}>QR Code Scanner</Title>

                    {vendors.length !== 0 ? (
                        <div style={{ marginBottom: 16 }}>
                            <Select
                                placeholder="Select Vendor"
                                value={selectedVendor}
                                onChange={handleVendorChange}
                                style={{ width: "100%" }}>
                                {vendors?.map((vendor) => (
                                    <Option key={vendor._id} value={vendor._id}>
                                        {vendor.name}
                                    </Option>
                                ))}
                            </Select>
                        </div>
                    ) : (
                        ""
                    )}

                    {selectedVendor && (
                        <div style={{ marginBottom: 16, textAlign: "center" }}>
                            <Button
                                type={cameraOn ? "default" : "primary"}
                                danger={cameraOn}
                                onClick={toggleCamera}>
                                {cameraOn
                                    ? "Turn Camera OFF"
                                    : "Turn Camera ON"}
                            </Button>
                        </div>
                    )}

                    {cameraOn && !order && selectedVendor && (
                        <div
                            style={{
                                border: "2px dashed #1890ff",
                                borderRadius: 8,
                                overflow: "hidden",
                                marginBottom: 24,
                            }}>
                            <QrReader
                                constraints={{ facingMode: "environment" }}
                                onResult={handleScan}
                                style={{ width: "100%" }}
                            />
                        </div>
                    )}

                    {!selectedVendor && (
                        <p style={{ textAlign: "center", color: "#999" }}>
                            Please select a vendor to start scanning.
                        </p>
                    )}

                    {loading && <Spin tip="Fetching order details..." />}

                    {order && (
                        <Card title={`Order Overview - ${order.invoiceNumber}`}>
                            <Descriptions column={1} bordered>
                                <Descriptions.Item label="Customer">
                                    {order.customerFullname}
                                </Descriptions.Item>
                                <Descriptions.Item label="Items">
                                    {order.menus.map((item, idx) => (
                                        <div key={idx}>
                                            {item.name} x {item.quantity}
                                        </div>
                                    ))}
                                </Descriptions.Item>
                            </Descriptions>
                            <Button
                                type="primary"
                                style={{ marginTop: 16 }}
                                onClick={handleConfirm}>
                                Confirm Order
                            </Button>
                        </Card>
                    )}
                </div>
            </Content>
        </LoggedIn>
    );
};

export default index;
