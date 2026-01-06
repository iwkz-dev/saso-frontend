import { useState } from "react";
import { Form, Input, Alert, Space, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { submitRegister, resetAuthState } from "../../../stores/reducers/auth";

const SignUpFormModal = ({ onSuccess }) => {
    const dispatch = useDispatch();
    const { error } = useSelector((state) => state.auth);
    const [form] = Form.useForm();
    const [localError, setLocalError] = useState(null);

    const onFinish = async (values) => {
        setLocalError(null);
        try {
            const res = await dispatch(submitRegister(values)).unwrap();
            if (res.status === "success") {
                message.success(
                    "Registration successful! A verification email has been sent to your inbox.",
                );
                form.resetFields();
                if (onSuccess) onSuccess();
            } else {
                setLocalError(res.message || "Registration failed");
            }
        } catch (err) {
            console.error("Registration error:", err);
            setLocalError(err || "Registration failed");
        } finally {
            // Optionally reset auth state after registration attempt
            dispatch(resetAuthState());
        }
    };

    return (
        <Form
            id="sign-up"
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
                    label="Full Name"
                    name="fullname"
                    rules={[
                        {
                            required: true,
                            message: "Please input your full name!",
                        },
                    ]}>
                    <Input
                        size="large"
                        placeholder="Your name"
                        autoComplete="name"
                    />
                </Form.Item>

                <Form.Item
                    label="Phone"
                    name="phone"
                    rules={[
                        {
                            required: true,
                            message: "Please input your phone number!",
                        },
                        {
                            pattern: /^[+\d][\d\s()-]{6,}$/,
                            message: "Please enter a valid phone number",
                        },
                    ]}>
                    <Input
                        size="large"
                        placeholder="+49 170 1234567"
                        autoComplete="tel"
                    />
                </Form.Item>

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
                        placeholder="you@example.com"
                        autoComplete="email"
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
                        {
                            min: 6,
                            message: "Password should be at least 6 characters",
                        },
                    ]}>
                    <Input.Password
                        size="large"
                        placeholder="Create a password"
                        autoComplete="new-password"
                    />
                </Form.Item>
            </Space>
        </Form>
    );
};

export default SignUpFormModal;
