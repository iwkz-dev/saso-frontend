import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Form, Input, Button, Space, message, Select } from "antd";
import Router from "next/router";
import { createUser } from "../../../../store/reducers/userReducer";

const AddUserForm = () => {
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const [showUploading, setShowUploading] = useState(false);

    const submitForm = (values) => {
        const text = confirm("Please confirm to add user");
        if (text) {
            setShowUploading(true);
            const createData = async () => {
                return dispatch(createUser(values));
            };
            createData()
                .then((r) => {
                    if (r?.status === "failed") {
                        setShowUploading(false);
                        message.error(r.message);
                    } else {
                        setShowUploading(false);
                        message.success(r.message);
                        Router.push("/user");
                    }
                })
                .catch(() => {
                    setShowUploading(false);
                });
        }
    };

    const onReset = () => {
        form.current?.resetFields();
    };

    return (
        <Form
            form={form}
            name="event"
            onFinish={submitForm}
            labelCol={{
                span: 4,
            }}
            wrapperCol={{
                span: 14,
            }}>
            <Form.Item
                label="Full Name"
                name="fullname"
                rules={[
                    {
                        required: true,
                    },
                ]}>
                <Input placeholder="Full name" />
            </Form.Item>
            <Form.Item
                label="Email"
                name="email"
                rules={[
                    {
                        required: true,
                    },
                ]}>
                <Input placeholder="Email" />
            </Form.Item>
            <Form.Item
                label="Password"
                name="password"
                rules={[
                    {
                        required: true,
                    },
                ]}>
                <Input.Password placeholder="Password" />
            </Form.Item>
            <Form.Item
                label="Role"
                name="role"
                rules={[
                    {
                        required: true,
                    },
                ]}>
                <Select
                    placeholder="Choose role"
                    options={[
                        {
                            value: 1,
                            label: "Super Admin",
                        },
                        {
                            value: 2,
                            label: "Admin",
                        },
                        {
                            value: 3,
                            label: "Customer",
                        },
                    ]}
                />
            </Form.Item>
            <Form.Item
                label="Is Active"
                name="isActive"
                rules={[
                    {
                        required: true,
                    },
                ]}>
                <Select
                    placeholder="Is Active"
                    options={[
                        {
                            value: true,
                            label: "True",
                        },
                        {
                            value: false,
                            label: "False",
                        },
                    ]}
                />
            </Form.Item>
            <Form.Item
                label="Phone"
                name="phone"
                rules={[
                    {
                        required: true,
                    },
                ]}>
                <Input placeholder="Phone" />
            </Form.Item>
            <Form.Item>
                <Space>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={showUploading}>
                        Submit
                    </Button>
                    <Button htmlType="button" onClick={onReset}>
                        Reset
                    </Button>
                </Space>
            </Form.Item>
        </Form>
    );
};

export default AddUserForm;
