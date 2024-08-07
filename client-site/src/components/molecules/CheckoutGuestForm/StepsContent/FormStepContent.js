import { Button, Form, Input, Space, Typography } from "antd";
import React from "react";

const FormStepContent = ({ userData, onFinish, showModalForSignIn }) => {
    const layout = {
        labelCol: {
            span: 8,
        },
        wrapperCol: {
            span: 14,
        },
    };

    return (
        <Space
            direction="vertical"
            style={{
                width: "100%",
            }}>
            <div
                style={{
                    maxWidth: 480,
                    margin: "auto",
                }}>
                <Form
                    initialValues={userData}
                    id="guest-information"
                    {...layout}
                    onFinish={onFinish}>
                    <Form.Item
                        label="Full Name"
                        name="fullname"
                        rules={[
                            {
                                required: true,
                                message: "Please input your full name!",
                            },
                        ]}>
                        <Input id="fullname" placeholder="Full Name" />
                    </Form.Item>
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
                        ]}>
                        <Input id="email" placeholder="Email" />
                    </Form.Item>
                    <Form.Item
                        label="Phone Nr. (WA)"
                        name="phone"
                        rules={[
                            {
                                required: true,
                                message:
                                    "Please input your phone number (WhatsApp)!",
                            },
                        ]}>
                        <Input
                            id="phone"
                            placeholder="Phone Number (WhatsApp)"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Continue Payment
                        </Button>
                    </Form.Item>
                </Form>
                <Space direction="vertical">
                    <Space>
                        <Typography.Text>
                            Already have an account?
                        </Typography.Text>
                        <Button
                            size="small"
                            onClick={() => showModalForSignIn(true)}
                            type="link">
                            Log in
                        </Button>
                    </Space>
                    <Space>
                        <Typography.Text>Or you can sign up</Typography.Text>
                        <Button
                            size="small"
                            onClick={() => showModalForSignIn(false)}
                            type="link">
                            here
                        </Button>
                    </Space>
                </Space>
            </div>
        </Space>
    );
};

export default FormStepContent;
