import { Button, Form, Input, Space, Typography } from "antd";
import React from "react";

const StepsContent = ({ userData, onFinish, showModalForSignIn }) => {
    const layout = {
        labelCol: {
            span: 8,
        },
        wrapperCol: {
            span: 16,
        },
    };

    return (
        <Space
            direction="vertical"
            style={{
                width: "100%",
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
                    label="Phone Nr."
                    name="phone"
                    rules={[
                        {
                            required: true,
                            message: "Please input your phone number!",
                        },
                    ]}>
                    <Input id="phone" placeholder="Phone Number" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Continue Payment
                    </Button>
                </Form.Item>
            </Form>
            <Space>
                <Typography.Text>Already have an account?</Typography.Text>
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
    );
};

export default StepsContent;
