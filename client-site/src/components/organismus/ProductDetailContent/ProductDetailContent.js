import {
    Space,
    Layout,
    Typography,
    Button,
    message,
    Divider,
    Empty,
} from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import React from "react";
import BackToButton from "../../atoms/BackToButton/BackToButton";
import ImagesPreview from "../../atoms/ImagesPreview/ImagesPreview";
import { addOrder } from "../../../stores/reducers/cart";
import { useDispatch, useSelector } from "react-redux";

const ProductDetailContent = ({ detailMenu }) => {
    const dispatch = useDispatch();
    const events = useSelector((state) => state.event.data);

    const handleClick = () => {
        message.success(detailMenu.name + " Added");
        dispatch(addOrder(detailMenu));
    };

    return (
        <Layout.Content>
            {detailMenu ? (
                <div
                    style={{
                        maxWidth: "1024px",
                        padding: "1rem",
                        margin: "1rem auto",
                    }}>
                    <Space
                        size="large"
                        direction="vertical"
                        style={{ width: "100%" }}>
                        <BackToButton targetURL="/" buttonText="Back to home" />
                        <Space
                            direction="vertical"
                            size="large"
                            style={{
                                alignItems: "center",
                                textAlign: "center",
                                width: "100%",
                            }}>
                            <Typography.Title level={3}>
                                {detailMenu.name}
                            </Typography.Title>
                            <ImagesPreview
                                productName={detailMenu.name}
                                productImages={detailMenu.images}
                                height={300}
                            />
                            <Space direction="horizontal" size="small">
                                <Typography.Title level={5}>
                                    Price:
                                </Typography.Title>
                                <Typography.Title level={3} type="danger">
                                    {detailMenu.price} €
                                </Typography.Title>
                            </Space>
                            <Space direction="vertical" size="small">
                                <Typography.Title level={5}>
                                    Description:
                                </Typography.Title>
                                <Typography.Paragraph
                                    style={{
                                        textAlign: "justify",
                                        maxWidth: "550px",
                                    }}>
                                    {detailMenu.description}
                                </Typography.Paragraph>
                            </Space>
                            <Space direction="vertical" size="small">
                                <Typography.Title level={5}>
                                    Stock:
                                </Typography.Title>
                                <Typography.Text>
                                    {detailMenu.quantity -
                                        detailMenu.quantityOrder}
                                    <Typography.Text type="secondary">
                                        {" "}
                                        / {detailMenu.quantity}
                                    </Typography.Text>
                                </Typography.Text>
                            </Space>
                            <Button
                                type="primary"
                                disabled={
                                    detailMenu.quantity ==
                                        detailMenu.quantityOrder ||
                                    events[0].po_closed
                                }
                                onClick={handleClick}
                                shape="round"
                                icon={<ShoppingCartOutlined />}>
                                Add to cart
                            </Button>
                        </Space>
                    </Space>
                </div>
            ) : (
                <Layout.Content>
                    <div
                        style={{
                            maxWidth: "1024px",
                            padding: "1rem",
                            margin: "1rem auto",
                        }}>
                        <Empty />
                    </div>
                </Layout.Content>
            )}
        </Layout.Content>
    );
};

export default ProductDetailContent;
