import React, { useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import style from "./MyOrderContent.module.scss";
import { Button, Layout, Space, Table, Tag, Typography } from "antd";
import BackToButton from "../../atoms/BackToButton/BackToButton";
import { getOrderPdf } from "../../../stores/reducers/order";
import { formatDate } from "../../../helpers/dateHelper";
import { saveAs } from "file-saver";
import { insertKeytoData } from "../../../helpers/dataHelper";
import Router from "next/router";

const MyOrderContent = () => {
    const { Content } = Layout;
    const [isLoading, setIsLoading] = useState(false);
    const order = useSelector((state) => state.order);

    const downloadPDF = async (id) => {
        setIsLoading(true);
        try {
            const data = await getOrderPdf(id);
            setIsLoading(false);
            const blob = new Blob([data], { type: "application/pdf" });
            saveAs(blob, "invoice.pdf");
        } catch (e) {
            setIsLoading(false);
            console.error(e);
        }
    };

    const columns = [
        {
            title: "Invoice Nr.",
            dataIndex: "invoiceNumber",
            key: "invoiceNumber",
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (item) => reformStatus(item),
        },
        {
            title: "Download PDF",
            dataIndex: "_id",
            key: "_id",
            render: (item) => (
                <Button onClick={() => downloadPDF(item)} loading={isLoading}>
                    Download
                </Button>
            ),
        },
        {
            title: "Updated At",
            dataIndex: "updated_at",
            key: "updated_at",
            render: (item) => formatDate(item, true, true),
        },
        {
            title: "Created At",
            dataIndex: "created_at",
            key: "created_at",
            render: (item) => formatDate(item, true, true),
        },
        {
            title: "Action",
            dataIndex: "_id",
            key: "_id",
            render: (item) => (
                <Button
                    shape="circle"
                    icon={<SearchOutlined />}
                    onClick={() => Router.push(`/my-order/detail/${item}`)}
                />
            ),
        },
    ];

    const reformStatus = (status) => {
        if (status == 1) {
            return <Tag color="processing">Paid</Tag>;
        } else if (status == 2) {
            return <Tag color="error">Refund/cancel</Tag>;
        } else if (status == 3) {
            return <Tag color="success">Done</Tag>;
        } else {
            return <Tag color="default">Waiting for Confirmation</Tag>;
        }
    };

    return (
        <Content className={style.myOrderContent}>
            <div
                style={{
                    maxWidth: "1024px",
                    padding: "1rem",
                    margin: "1rem auto",
                }}
            >
                <Space
                    size="large"
                    direction="vertical"
                    style={{ width: "100%" }}
                >
                    <BackToButton targetURL="/" buttonText="Back to home" />

                    <Typography.Title level={3} style={{ textAlign: "center" }}>
                        My order
                    </Typography.Title>
                    <Table
                        columns={columns}
                        bordered
                        dataSource={insertKeytoData(order.data.data)}
                    />
                </Space>
            </div>
        </Content>
    );
};

export default MyOrderContent;
