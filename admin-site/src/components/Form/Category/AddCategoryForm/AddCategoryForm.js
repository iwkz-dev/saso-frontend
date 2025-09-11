import React, { useState } from "react";
import { Form, Input, Button, Space, message } from "antd";
import { useDispatch } from "react-redux";
import { createCategory } from "../../../../store/reducers/categoryReducer";
import Router from "next/router";

const AddCategoryForm = () => {
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const [submitting, setSubmitting] = useState(false);

    const submitForm = async (values) => {
        const confirmAdd = window.confirm("Please confirm to add category");
        if (!confirmAdd) return;

        setSubmitting(true);
        try {
            const res = await dispatch(createCategory(values));
            message.success(res?.message || "Category created");
            Router.replace("/database/category");
        } catch (err) {
            message.error(err?.message || "Failed to create category");
        } finally {
            setSubmitting(false);
        }
    };

    const onReset = () => {
        form.resetFields();
    };

    return (
        <Form
            form={form}
            name="category"
            onFinish={submitForm}
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}>
            <Form.Item
                label="Name"
                name="name"
                rules={[
                    {
                        required: true,
                        whitespace: true,
                        message: "Please input a category name",
                    },
                ]}>
                <Input placeholder="Name" />
            </Form.Item>

            <Form.Item>
                <Space>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={submitting}>
                        Submit
                    </Button>
                    <Button
                        htmlType="button"
                        onClick={onReset}
                        disabled={submitting}>
                        Reset
                    </Button>
                </Space>
            </Form.Item>
        </Form>
    );
};

export default AddCategoryForm;
