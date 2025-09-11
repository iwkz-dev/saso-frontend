import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editDetailCategory } from "../../../../store/reducers/categoryReducer";
import { Form, Input, Button, Space, message } from "antd";
import Router from "next/router";

const EditCategoryForm = () => {
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const category =
        useSelector((state) => state.category.detailCategory) || {};
    const [submitting, setSubmitting] = useState(false);

    const initialValues = useMemo(
        () => ({
            name: category?.name || "",
        }),
        [category?.name],
    );

    const submitForm = async (values) => {
        const shouldSave = window.confirm(
            "Please confirm to save your changes",
        );
        if (!shouldSave) return;

        setSubmitting(true);
        try {
            const res = await dispatch(
                editDetailCategory({ id: category._id, requestedData: values }),
            );

            message.success(res?.message || "Category updated");
            Router.replace("/database/category");
        } catch (err) {
            message.error(err?.message || "Failed to update category");
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
            initialValues={initialValues}
            name="category"
            onFinish={submitForm}
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}>
            <Form.Item
                label="Name"
                name="name"
                rules={[
                    { required: true, message: "Please input a category name" },
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

export default EditCategoryForm;
