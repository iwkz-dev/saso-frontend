import React, { useEffect, useMemo } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import Router from "next/router";
import { submitLogin } from "../../../store/reducers/loginReducer";
import { isAuth } from "../../../helpers/authHelper";
import { Button, Form, Input, Typography, message } from "antd";

export default function LoginForm() {
    const dispatch = useDispatch();
    const { status, data } = useSelector((s) => s.login);
    const errorMessage = data?.message?.error || "";
    const loading = status === "loading";

    useEffect(() => {
        if (isAuth()) Router.push("/");
    }, []);

    const containerStyle = {
        width: "100%",
        maxWidth: 420,
        background: "#fff",
        borderRadius: 16,
        padding: 24,
        boxShadow:
            "0 1px 2px rgba(0,0,0,0.04), 0 10px 28px -14px rgba(31,76,135,0.22)",
    };

    const titleWrapStyle = {
        marginBottom: 16,
        textAlign: "center",
    };

    const errorTextStyle = {
        fontSize: 12,
        marginBottom: 16,
        textAlign: "center",
        color: "#cf1322",
        minHeight: 16,
    };

    const submitBtnStyle = useMemo(
        () => ({
            width: "100%",
            height: 40,
            borderRadius: 10,
            fontWeight: 600,
        }),
        [],
    );

    const onFinish = async (values) => {
        try {
            const payload = { ...values, type: "admin" };
            await dispatch(submitLogin(payload));
            message.success("Welcome back!");
            Router.push("/");
        } catch (err) {
            message.error(err?.message || "Login failed");
        }
    };

    return (
        <div style={containerStyle}>
            <div style={titleWrapStyle}>
                <Typography.Title level={3} style={{ margin: 0 }}>
                    Login
                </Typography.Title>
                <Typography.Text type="secondary">
                    Sign in to manage your bookings
                </Typography.Text>
            </div>

            <Form layout="vertical" onFinish={onFinish} autoComplete="off">
                <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                        { required: true, message: "Please input your email!" },
                        {
                            type: "email",
                            message: "Please input a valid email!",
                        },
                    ]}>
                    <Input
                        placeholder="you@example.com"
                        prefix={<UserOutlined />}
                        size="large"
                        style={{ borderRadius: 10 }}
                    />
                </Form.Item>

                <Form.Item
                    name="password"
                    label="Password"
                    rules={[
                        {
                            required: true,
                            message: "Please input your password!",
                        },
                    ]}>
                    <Input.Password
                        placeholder="••••••••"
                        prefix={<LockOutlined />}
                        size="large"
                        style={{ borderRadius: 10 }}
                    />
                </Form.Item>

                <div style={errorTextStyle}>{errorMessage}</div>

                <Form.Item style={{ marginBottom: 0 }}>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={loading}
                        style={submitBtnStyle}>
                        Sign In
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}
