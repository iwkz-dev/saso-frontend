import { useEffect, useState } from "react";
import { Button, Form, Input, Layout, Space, Typography, message } from "antd";
import { useRouter } from "next/router";
import Link from "next/link";

import MainLayout from "../../components/organismus/MainLayout/MainLayout";
import authService from "../../services/authService";

export default function ChangePassword() {
    const router = useRouter();
    const { token, email } = router.query;
    const [isChanged, setIsChanged] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(false);
    }, []);

    const onFinish = async (values) => {
        setIsLoading(true);
        try {
            const response = await authService.resetPassword(
                {
                    newPassword: values.newPassword,
                },
                email,
                token,
            );

            if (response.status === "success") {
                message.success("Your password has been changed");
                setIsChanged(true);
            }
        } catch (err) {
            console.log(err);
            message.error(err?.message || "Failed to reset password");
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
                        {isChanged ? (
                            <Typography.Paragraph>
                                Your password has been changed. Click{" "}
                                <Link href="/">here</Link> to go to the SASO
                                page.
                            </Typography.Paragraph>
                        ) : (
                            <Form
                                name="change-password"
                                labelCol={{ span: 8 }}
                                onFinish={onFinish}
                                style={{
                                    padding: "24px",
                                    width: "100vw",
                                    maxWidth: "500px",
                                    backgroundColor: "aliceblue",
                                }}
                                autoComplete="off">
                                <Form.Item
                                    label="New Password"
                                    name="newPassword"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                "Please input your new password!",
                                        },
                                    ]}
                                    hasFeedback>
                                    <Input.Password placeholder="New password" />
                                </Form.Item>

                                <Form.Item
                                    label="Confirm Password"
                                    name="confirmPassword"
                                    dependencies={["newPassword"]}
                                    hasFeedback
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                "Please confirm your password!",
                                        },
                                        ({ getFieldValue }) => ({
                                            validator(_, value) {
                                                if (
                                                    !value ||
                                                    getFieldValue(
                                                        "newPassword",
                                                    ) === value
                                                ) {
                                                    return Promise.resolve();
                                                }
                                                return Promise.reject(
                                                    new Error(
                                                        "Passwords do not match!",
                                                    ),
                                                );
                                            },
                                        }),
                                    ]}>
                                    <Input.Password placeholder="Confirm password" />
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
                                        Reset Password
                                    </Button>
                                </Form.Item>
                            </Form>
                        )}
                    </Space>
                </div>
            </Layout.Content>
        </MainLayout>
    );
}
