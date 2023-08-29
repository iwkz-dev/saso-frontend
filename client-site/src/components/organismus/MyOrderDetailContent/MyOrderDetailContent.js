import { Descriptions, Layout, Space, Table, Tag, Typography } from "antd";
import React from "react";
import BackToButton from "../../atoms/BackToButton/BackToButton";
import style from "./MyOrderDetailContent.module.scss";
import { formatDate } from "../../../helpers/dateHelper";
import { insertKeytoData } from "../../../helpers/dataHelper";

const MyOrderDetailContent = ({ detailOrder, withoutBackButton }) => {
    const { Content } = Layout;
    const columns = [
        {
            title: "Menu",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Total Portion",
            dataIndex: "totalPortion",
            key: "totalPortion",
        },
        {
            title: "Price",
            dataIndex: "price",
            key: "price",
            render: (item) => `${item} €`,
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
        <Content className={style.myOrderDetailContent}>
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
                    {withoutBackButton ? null : (
                        <BackToButton
                            targetURL="/my-order"
                            buttonText="Back to my order"
                        />
                    )}

                    <Typography.Title level={3} style={{ textAlign: "center" }}>
                        {detailOrder.invoiceNumber}
                    </Typography.Title>
                    <Descriptions title="Order detail" size="small" bordered>
                        <Descriptions.Item label="Customer">
                            {detailOrder.customerFullname}
                        </Descriptions.Item>
                        <Descriptions.Item label="Email">
                            {detailOrder.customerEmail}
                        </Descriptions.Item>
                        <Descriptions.Item label="Phone">
                            {detailOrder.customerPhone}
                        </Descriptions.Item>
                        <Descriptions.Item label="Note">
                            {detailOrder.note}
                        </Descriptions.Item>
                        <Descriptions.Item label="Payment Type">
                            {detailOrder.paymentType?.name}
                        </Descriptions.Item>
                        <Descriptions.Item label="Status">
                            {reformStatus(detailOrder.status)}
                        </Descriptions.Item>
                        <Descriptions.Item label="Total price">
                            {detailOrder.totalPrice} €
                        </Descriptions.Item>
                        <Descriptions.Item label="Arrived at">
                            {detailOrder.arrived_at}
                        </Descriptions.Item>
                        <Descriptions.Item label="Created at">
                            {formatDate(detailOrder.created_at, true, true)}
                        </Descriptions.Item>
                        <Descriptions.Item label="Updated at">
                            {formatDate(detailOrder.updated_at, true, true)}
                        </Descriptions.Item>
                    </Descriptions>
                    <Typography.Title level={5}>Ordered Menu</Typography.Title>
                    <Table
                        columns={columns}
                        bordered
                        dataSource={insertKeytoData(detailOrder.menus)}
                        size="small"
                    />
                </Space>
            </div>
        </Content>
    );
};

export default MyOrderDetailContent;
