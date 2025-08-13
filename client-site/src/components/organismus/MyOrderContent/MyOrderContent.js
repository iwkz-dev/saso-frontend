import { useMemo, useState } from "react";
import {
    SearchOutlined,
    FilePdfOutlined,
    EyeOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
    Button,
    Empty,
    Grid,
    Input,
    Layout,
    List,
    Segmented,
    Space,
    Table,
    Tag,
    Typography,
} from "antd";
import BackToButton from "../../atoms/BackToButton/BackToButton";
import {
    fetchOrderPdf,
    selectOrderStatuses,
} from "../../../stores/reducers/order";
import { formatDate } from "../../../helpers/dateHelper";
import { insertKeytoData } from "../../../helpers/dataHelper";
import Router from "next/router";

const { Content } = Layout;
const { Text, Title } = Typography;
const { useBreakpoint } = Grid;

const STATUS_FILTERS = [
    { label: "All", value: "all" },
    { label: "Pending", value: "0" },
    { label: "Paid", value: "1" },
    { label: "Refund", value: "2" },
    { label: "Done", value: "3" },
];

const statusTag = (status) => {
    switch (status) {
        case 1:
            return <Tag color="processing">Paid</Tag>;
        case 2:
            return <Tag color="error">Refund / Cancel</Tag>;
        case 3:
            return <Tag color="success">Done</Tag>;
        default:
            return <Tag>Pending</Tag>;
    }
};

const MyOrderContent = () => {
    const dispatch = useDispatch();
    const screens = useBreakpoint();
    const isMobile = !screens.md;

    // state
    const [search, setSearch] = useState("");
    const [statusVal, setStatusVal] = useState("all");
    const [pdfLoadingId, setPdfLoadingId] = useState(null);

    const orders = useSelector((state) => state.order.list ?? []);
    const events = useSelector((state) => state.event.data ?? []);
    const { listStatus } = useSelector(selectOrderStatuses);

    const currentEventId = events?.[0]?._id ?? null;

    const filtered = useMemo(() => {
        let data = Array.isArray(orders) ? orders : [];
        if (currentEventId) {
            data = data.filter((o) => o.event === currentEventId);
        }
        if (statusVal !== "all") {
            data = data.filter((o) => String(o.status) === statusVal);
        }
        if (search.trim()) {
            const q = search.trim().toLowerCase();
            data = data.filter((o) =>
                (o.invoiceNumber || "").toLowerCase().includes(q),
            );
        }
        return data;
    }, [orders, currentEventId, statusVal, search]);

    const onView = (id) => Router.push(`/my-order/detail/${id}`);

    const onDownloadPdf = async (id) => {
        try {
            setPdfLoadingId(id);
            await dispatch(fetchOrderPdf(id));
        } finally {
            setPdfLoadingId(null);
        }
    };

    const columns = [
        {
            title: "Invoice",
            dataIndex: "invoiceNumber",
            key: "invoiceNumber",
            width: 140,
            ellipsis: true,
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            width: 150,
            render: (v) => statusTag(v),
        },
        {
            title: "Updated",
            dataIndex: "updated_at",
            key: "updated_at",
            width: 180,
            render: (v) => (
                <Text type="secondary">{formatDate(v, true, true)}</Text>
            ),
        },
        {
            title: "Created",
            dataIndex: "created_at",
            key: "created_at",
            width: 180,
            render: (v) => (
                <Text type="secondary">{formatDate(v, true, true)}</Text>
            ),
        },
        {
            title: "",
            key: "actions",
            fixed: "right",
            width: 120,
            render: (_, record) => (
                <Space>
                    <Button
                        size="small"
                        icon={<EyeOutlined />}
                        onClick={() => onView(record._id)}
                    />
                    <Button
                        size="small"
                        icon={<FilePdfOutlined />}
                        loading={pdfLoadingId === record._id}
                        onClick={() => onDownloadPdf(record._id)}
                    />
                </Space>
            ),
        },
    ];

    return (
        <Content>
            <div
                style={{
                    maxWidth: 960,
                    padding: isMobile ? "12px" : "16px",
                    margin: "0 auto",
                }}
            >
                <Space
                    direction="vertical"
                    size={isMobile ? 12 : 16}
                    style={{ width: "100%" }}
                >
                    <BackToButton targetURL="/" buttonText="Back to Home" />

                    <Space
                        direction={isMobile ? "vertical" : "horizontal"}
                        style={{
                            width: "100%",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                        size={12}
                    >
                        <Title level={isMobile ? 4 : 3} style={{ margin: 0 }}>
                            My Orders
                        </Title>

                        <Space wrap size={8}>
                            <Input
                                allowClear
                                size="middle"
                                placeholder="Search invoice..."
                                prefix={<SearchOutlined />}
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                style={{ width: isMobile ? "100%" : 240 }}
                            />
                            <Segmented
                                size="middle"
                                options={STATUS_FILTERS}
                                value={statusVal}
                                onChange={(v) => setStatusVal(String(v))}
                            />
                        </Space>
                    </Space>

                    {isMobile ? (
                        filtered.length === 0 ? (
                            <Empty
                                image={Empty.PRESENTED_IMAGE_SIMPLE}
                                description="No orders yet"
                            />
                        ) : (
                            <List
                                loading={listStatus === "loading"}
                                itemLayout="vertical"
                                dataSource={filtered}
                                renderItem={(item) => (
                                    <List.Item
                                        key={item._id}
                                        style={{
                                            border: "1px solid var(--ant-color-border)",
                                            borderRadius: 12,
                                            padding: 12,
                                            marginBottom: 8,
                                        }}
                                        actions={[
                                            <Button
                                                key="view"
                                                size="small"
                                                icon={<EyeOutlined />}
                                                onClick={() => onView(item._id)}
                                            >
                                                View
                                            </Button>,
                                            <Button
                                                key="pdf"
                                                size="small"
                                                icon={<FilePdfOutlined />}
                                                loading={
                                                    pdfLoadingId === item._id
                                                }
                                                onClick={() =>
                                                    onDownloadPdf(item._id)
                                                }
                                            >
                                                PDF
                                            </Button>,
                                        ]}
                                    >
                                        <Space
                                            direction="vertical"
                                            size={4}
                                            style={{ width: "100%" }}
                                        >
                                            <Space
                                                align="center"
                                                style={{
                                                    justifyContent:
                                                        "space-between",
                                                    width: "100%",
                                                }}
                                            >
                                                <Text strong>
                                                    {item.invoiceNumber}
                                                </Text>
                                                {statusTag(item.status)}
                                            </Space>
                                            <Text type="secondary">
                                                Updated •{" "}
                                                {formatDate(
                                                    item.updated_at,
                                                    true,
                                                    true,
                                                )}
                                            </Text>
                                            <Text type="secondary">
                                                Created •{" "}
                                                {formatDate(
                                                    item.created_at,
                                                    true,
                                                    true,
                                                )}
                                            </Text>
                                        </Space>
                                    </List.Item>
                                )}
                            />
                        )
                    ) : (
                        <Table
                            size="small"
                            bordered
                            sticky
                            loading={listStatus === "loading"}
                            rowKey={(r) => r._id}
                            columns={columns}
                            dataSource={insertKeytoData(filtered)}
                            pagination={{
                                size: "small",
                                pageSize: 10,
                                showSizeChanger: false,
                            }}
                            scroll={{ x: 760 }}
                        />
                    )}
                </Space>
            </div>
        </Content>
    );
};

export default MyOrderContent;
