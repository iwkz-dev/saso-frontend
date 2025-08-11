import { useEffect, useState } from "react";
import {
    Button,
    Card,
    Form,
    Input,
    Layout,
    Space,
    Typography,
    message,
    Grid,
    Spin,
    Empty,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import style from "./SearchOrderContent.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
    getOrderDetailByInvoiceNumber,
    resetOrderState,
} from "../../../stores/reducers/order";
import MyOrderDetailContent from "../MyOrderDetailContent/MyOrderDetailContent";
import { fetchEvents } from "../../../stores/reducers/event";

const { Content } = Layout;
const { Title, Text, Paragraph } = Typography;
const { useBreakpoint } = Grid;

const SearchOrderContent = () => {
    const dispatch = useDispatch();
    const screens = useBreakpoint();
    const isMobile = !screens.md;

    const detailOrder = useSelector((state) => state.order.detail);
    const detailStatus = useSelector((state) => state.order.detailStatus);
    const events = useSelector((state) => state.event.data);

    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        dispatch(fetchEvents("approved"));
    }, [dispatch]);

    useEffect(() => {
        return () => {
            dispatch(resetOrderState());
        };
    }, [dispatch]);

    const onFinish = async (values) => {
        const currentEventId = events?.[0]?._id;
        if (!currentEventId) {
            message.error("Event is not ready yet. Please try again shortly.");
            return;
        }

        setSubmitting(true);
        try {
            const requestData = { ...values, eventId: currentEventId };
            const resultAction = await dispatch(getOrderDetailByInvoiceNumber(requestData));
            if (resultAction.meta.requestStatus !== "fulfilled" || !resultAction.payload?.detail) {
                message.error("Order not found. Please check your details.");
            } else {
                message.success("Order found.");
            }
        } catch (e) {
            message.error("Something went wrong. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Content className={style.contentLayout}>
            <div
                style={{
                    maxWidth: 960,
                    padding: isMobile ? 12 : 16,
                    margin: "0 auto",
                }}
            >
                <Space
                    className={style.searchOrderContent}
                    direction="vertical"
                    size={isMobile ? "middle" : "large"}
                    style={{ width: "100%" }}
                >
                    <Title level={isMobile ? 4 : 3} style={{ marginBottom: 0 }}>
                        Search Order
                    </Title>
                    <Text type="secondary">
                        Enter your invoice number and full name to look up your order.
                    </Text>

                    <Card
                        size="small"
                        bodyStyle={{ padding: isMobile ? 12 : 16 }}
                        style={{ borderRadius: 12 }}
                    >
                        <Form
                            layout="vertical"
                            onFinish={onFinish}
                            autoComplete="off"
                            style={{ width: "100%" }}
                        >
                            <Form.Item
                                label="Invoice Nr."
                                name="invoiceNumber"
                                rules={[
                                    { required: true, message: "Please input your Invoice Number!" },
                                ]}
                            >
                                <Input
                                    placeholder="e.g., SS123"
                                    allowClear
                                    size="large"
                                />
                            </Form.Item>

                            <Form.Item
                                label="Full Name"
                                name="customerFullname"
                                rules={[{ required: true, message: "Please input your Full Name!" }]}
                            >
                                <Input
                                    placeholder="e.g., Max Mustermann"
                                    allowClear
                                    size="large"
                                />
                            </Form.Item>

                            <Form.Item style={{ marginBottom: 0 }}>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    icon={<SearchOutlined />}
                                    loading={submitting}
                                    size="large"
                                    block
                                >
                                    Search Order
                                </Button>
                            </Form.Item>
                        </Form>
                    </Card>

                    {detailStatus === "loading" && (
                        <div style={{ display: "flex", justifyContent: "center", padding: 24 }}>
                            <Spin />
                        </div>
                    )}

                    {detailStatus === "succeeded" && detailOrder && (
                        <MyOrderDetailContent
                            detailOrder={detailOrder}
                            withoutBackButton={true}
                            events={events}
                        />
                    )}

                    {detailStatus === "failed" && (
                        <Empty description="No order found" />
                    )}
                </Space>
            </div>
        </Content>
    );
};

export default SearchOrderContent;
