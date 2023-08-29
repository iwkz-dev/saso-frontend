import React, { useState } from "react";
import MainLayout from "../../components/organismus/MainLayout/MainLayout";
import { Button, Form, Input, Layout, Space, Typography, message } from "antd";
import { useDispatch } from "react-redux";
import { BASE_URL_HOST } from "../../config/config";
import { resetLogin } from "../../stores/reducers/login";
import axios from "axios";

const index = () => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);

    const onFinish = (values) => {
        dispatch(resetLogin());
        setIsLoading(true);
        axios({
            url: `${BASE_URL_HOST}/auth/forget-password`,
            method: "patch",
            data: {
                email: values.email,
            },
        })
            .then((response) => {
                if (response.status === 200) {
                    message.success(
                        "Link change password has been sent. Please check your email!",
                    );
                    setIsLoading(false);
                }
            })
            .catch((err) => {
                console.log(err);
                message.error(err.response.data.message);
                setIsLoading(false);
            });
    };
    return (
        <MainLayout>
            <Layout.Content>
                <div
                    style={{
                        maxWidth: "1024px",
                        padding: "1rem",
                        margin: "1rem auto",
                    }}
                >
                    <Space
                        direction="vertical"
                        size="middle"
                        align="center"
                        style={{ width: "100%" }}
                    >
                        <Typography.Title level={3}>
                            Forgot your password?
                        </Typography.Title>
                        <Typography.Text type="secondary">
                            Enter your email address below and we will send you
                            a link to reset your password.
                        </Typography.Text>
                        <Form
                            name="forgot-password"
                            labelCol={{
                                span: 6,
                            }}
                            onFinish={onFinish}
                            style={{
                                padding: "24px",
                                backgroundColor: "aliceblue",
                                width: "100vw",
                                maxWidth: "500px",
                            }}
                            autoComplete="off"
                        >
                            <div
                                style={{ maxWidth: "500px", margin: "0 auto" }}
                            >
                                <Form.Item
                                    label="Email"
                                    name="email"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please input your email!",
                                        },
                                        {
                                            type: "email",
                                        },
                                    ]}
                                >
                                    <Input placeholder="Input email" />
                                </Form.Item>
                                <Form.Item
                                    style={{
                                        width: "fit-content",
                                        margin: "auto",
                                    }}
                                >
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        loading={isLoading}
                                    >
                                        Send Email
                                    </Button>
                                </Form.Item>
                            </div>
                        </Form>
                    </Space>
                </div>
            </Layout.Content>
        </MainLayout>
    );
};

export default index;
