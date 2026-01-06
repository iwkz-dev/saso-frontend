import { useState } from "react";
import { Button, Form, Input, Alert, Space, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import Router from "next/router";

import { loginUser, resetAuthState } from "../../../stores/reducers/auth";

const SignInFormModal = ({ setShowModal }) => {
    const dispatch = useDispatch();
    const { error } = useSelector((state) => state.auth);

    const [form] = Form.useForm();
    const [localError, setLocalError] = useState(null);

    const onFinish = async (values) => {
        setLocalError(null);
        dispatch(resetAuthState());

        try {
            const payload = {
                ...values,
            };

            await dispatch(loginUser(payload)).unwrap();

            message.success("Welcome back!");
            if (typeof setShowModal === "function") setShowModal(false);
            Router.push("/");
        } catch (err) {
            setLocalError(err || "Login failed");
            if (typeof setShowModal === "function") setShowModal(true);
        }
    };

    const forgotPasswordOnClick = () => {
        Router.push("/forgot-password");
    };

    return (
        <Form
            id="sign-in"
            form={form}
            layout="vertical"
            onFinish={onFinish}
            style={{ width: "100%" }}>
            <Space direction="vertical" size={12} style={{ width: "100%" }}>
                {(localError || error) && (
                    <Alert
                        type="error"
                        showIcon
                        message={localError || error}
                    />
                )}

                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        { required: true, message: "Please input your email!" },
                        {
                            type: "email",
                            message: "Please enter a valid email address!",
                        },
                    ]}>
                    <Input
                        size="large"
                        autoComplete="email"
                        prefix={<UserOutlined />}
                        placeholder="you@example.com"
                    />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: "Please input your password!",
                        },
                    ]}>
                    <Input.Password
                        size="large"
                        autoComplete="current-password"
                        prefix={<LockOutlined />}
                        placeholder="••••••••"
                    />
                </Form.Item>

                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                    }}>
                    <Button
                        type="link"
                        style={{ padding: 0 }}
                        onClick={forgotPasswordOnClick}>
                        Forgot password?
                    </Button>
                </div>
            </Space>
        </Form>
    );
};

export default SignInFormModal;
