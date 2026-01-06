import { useEffect, useState } from "react";
import { Button, Form, Input, Layout, Space, Typography, message } from "antd";
import axios from "axios";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

import MainLayout from "../../components/organismus/MainLayout/MainLayout";
import { BASE_URL_HOST } from "../../config/config";

const ForgotPassword = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const { isAuthenticated } = useSelector((state) => state.auth);

    useEffect(() => {
        if (isAuthenticated) {
            router.replace("/");
        }
    }, [isAuthenticated, router]);

    const onFinish = async (values) => {
        setIsLoading(true);
        try {
            const response = await axios.patch(
                `${BASE_URL_HOST}/auth/forget-password`,
                {
                    email: values.email,
                },
            );

            if (response.status === 200) {
                message.success(
                    "Link change password has been sent. Please check your email!",
                );
            }
        } catch (err) {
            message.error(
                err?.response?.data?.message ||
                    "Failed to send reset password email",
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <MainLayout>
            <Layout.Content>
                <div
                    style={{
                        maxWidth: "1024px",
                        padding: "1rem",
                        margin: "1rem auto",
                    }}>
                    <Space
                        direction="vertical"
                        size="middle"
                        align="center"
                        style={{ width: "100%" }}>
                        <Typography.Title level={3}>
                            Forgot your password?
                        </Typography.Title>
                        <Typography.Text type="secondary">
                            Enter your email address below and we will send you
                            a link to reset your password.
                        </Typography.Text>

                        <Form
                            name="forgot-password"
                            labelCol={{ span: 6 }}
                            onFinish={onFinish}
                            style={{
                                padding: "24px",
                                backgroundColor: "aliceblue",
                                width: "100vw",
                                maxWidth: "500px",
                            }}
                            autoComplete="off">
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
                                        message: "Please enter a valid email!",
                                    },
                                ]}>
                                <Input placeholder="Input email" />
                            </Form.Item>

                            <Form.Item
                                style={{
                                    width: "fit-content",
                                    margin: "auto",
                                }}>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    loading={isLoading}>
                                    Send Email
                                </Button>
                            </Form.Item>
                        </Form>
                    </Space>
                </div>
            </Layout.Content>
        </MainLayout>
    );
};

export default ForgotPassword;
