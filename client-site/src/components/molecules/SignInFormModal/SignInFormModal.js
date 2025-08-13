import { useState } from "react";
import { Button, Form, Input, Alert, Space, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { submitLogin } from "../../../stores/reducers/login";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import Router from "next/router";

const SignInFormModal = ({ setShowModal }) => {
    const dispatch = useDispatch();
    const storeError = useSelector((state) => state.login.error);
    const [form] = Form.useForm();
    const [localError, setLocalError] = useState(null);

    const onFinish = async (values) => {
        setLocalError(null);
        try {
            const payload = { ...values, type: "client" };
            await dispatch(submitLogin(payload)).unwrap();
            message.success("Welcome back!");
            if (typeof setShowModal === "function") setShowModal(false);
            Router.push("/"); // or Router.reload() if you must
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
                {(localError || storeError) && (
                    <Alert
                        type="error"
                        showIcon
                        message={localError || storeError}
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
                        id="email"
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
                        id="password"
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
