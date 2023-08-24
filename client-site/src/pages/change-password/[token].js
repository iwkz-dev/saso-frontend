import React, { useEffect, useState } from "react";
import MainLayout from "../../components/organismus/MainLayout/MainLayout";
import axios from "axios";
import { useRouter } from "next/router";
import { BASE_URL_HOST } from "../../config/config";
import { Button, Form, Input, Layout, Space, Typography, message } from "antd";
import Link from "next/link";

export default function changePassword() {
    const router = useRouter();
    const { token } = router.query;
    const [isChanged, setIsChanged] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(false);
    }, []);

    const onFinish = (values) => {
        setIsLoading(true);
        axios({
            url: `${BASE_URL_HOST}/auth/change-password`,
            method: "patch",
            data: {
                password: values.newPassword,
                token: token,
            },
        })
            .then((response) => {
                if (response.status === 200) {
                    message.success("Your password has been changed");
                    setIsChanged(true);
                    setIsLoading(false);
                }
            })
            .catch((err) => {
                setIsLoading(false);
                message.error(err.response.data.message);
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
                    }}>
                    <Space
                        direction="vertical"
                        size="middle"
                        align="center"
                        style={{ width: "100%" }}>
                        {isChanged ? (
                            <Typography.Paragraph>
                                Your password has been change. Click this{" "}
                                <Link href="/">to the SASO page</Link>
                            </Typography.Paragraph>
                        ) : (
                            <Form
                                name="change-password"
                                labelCol={{
                                    span: 6,
                                }}
                                onFinish={onFinish}
                                style={{
                                    padding: "24px",
                                    width: "100vw",
                                    maxWidth: "500px",
                                }}
                                autoComplete="off">
                                <div
                                    style={{
                                        maxWidth: "500px",
                                        margin: "0 auto",
                                    }}>
                                    <Form.Item
                                        label="New Password"
                                        name="newPassword"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    "Please input your new password!",
                                            },
                                            {
                                                type: "password",
                                            },
                                        ]}>
                                        <Input placeholder="Input password" />
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
                                            Reset password
                                        </Button>
                                    </Form.Item>
                                </div>
                            </Form>
                        )}
                    </Space>
                </div>
            </Layout.Content>
        </MainLayout>
    );
}
