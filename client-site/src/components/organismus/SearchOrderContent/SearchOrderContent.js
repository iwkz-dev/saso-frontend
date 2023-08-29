import React, { useEffect } from "react";
import { Button, Form, Input, Layout, Space, Typography, message } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import style from "./SearchOrderContent.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
    getOrderDetailByInvoiceNumber,
    resetOrderData,
} from "../../../stores/reducers/order";
import MyOrderDetailContent from "../MyOrderDetailContent/MyOrderDetailContent";

const SearchOrderContent = () => {
    const dispatch = useDispatch();
    const detailOrder = useSelector((state) => state.order.data.detailOrder);

    useEffect(() => {
        return () => {
            dispatch(resetOrderData());
        };
    }, []);

    const onFinish = (values) => {
        dispatch(getOrderDetailByInvoiceNumber(values)).then((response) => {
            if (!response) {
                message.error("Order not found");
            }
        });
    };

    return (
        <Layout.Content className={style.contentLayout}>
            <div
                style={{
                    maxWidth: "1024px",
                    padding: "1rem",
                    margin: "1rem auto",
                }}
            >
                <Space
                    className={style.searchOrderContent}
                    direction="vertical"
                    size="middle"
                >
                    <Typography.Title level={3}>Search Order</Typography.Title>
                    <Typography.Text type="secondary">
                        Please fill the form below to get the information of
                        your order
                    </Typography.Text>
                    <Form
                        name="basic"
                        labelCol={{
                            span: 6,
                        }}
                        style={{
                            padding: "24px",
                            backgroundColor: "aliceblue",
                        }}
                        onFinish={onFinish}
                        autoComplete="off"
                    >
                        <div style={{ maxWidth: "500px", margin: "0 auto" }}>
                            <Form.Item
                                label="Inovice Nr."
                                name="invoiceNumber"
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            "Please input your Invoice Number!",
                                    },
                                ]}
                            >
                                <Input placeholder="Input Invoice.Nr" />
                            </Form.Item>
                            <Form.Item
                                label="Full Name"
                                name="customerFullname"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input your Full Name!",
                                    },
                                ]}
                            >
                                <Input
                                    placeholder="Input Full Name"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                "Please input your full name!",
                                        },
                                    ]}
                                />
                            </Form.Item>
                            <Form.Item>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    icon={<SearchOutlined />}
                                >
                                    Search Order
                                </Button>
                            </Form.Item>
                        </div>
                    </Form>
                </Space>
            </div>
            {detailOrder ? (
                <MyOrderDetailContent
                    detailOrder={detailOrder}
                    withoutBackButton={true}
                />
            ) : null}
        </Layout.Content>
    );
};

export default SearchOrderContent;
