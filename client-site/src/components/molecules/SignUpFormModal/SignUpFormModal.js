import { useState } from "react";
import { Form, Input, Alert, Space, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { submitRegister } from "../../../stores/reducers/register";

const SignUpFormModal = ({ onSuccess }) => {
    const dispatch = useDispatch();
    const storeError = useSelector((state) => state.register.error);
    const [form] = Form.useForm();
    const [localError, setLocalError] = useState(null);

    const onFinish = async (values) => {
        setLocalError(null);
        try {
            const res = await dispatch(submitRegister(values)).unwrap();
            message.success(res?.message || "Registration success");
            form.resetFields();
            if (typeof onSuccess === "function") onSuccess(res);
        } catch (err) {
            setLocalError(err || "Registration failed");
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
                {(localError || storeError) && (
                    <Alert
                        type="error"
                        showIcon
                        message={localError || storeError}
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
