import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editDetailCategory } from "../../../../store/reducers/categoryReducer";
import { Form, Input, Button, Space, message } from "antd";
import Router from "next/router";

const EditCategoryForm = () => {
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const category = useSelector((state) => state.category.detailCategory);
    const [showUploading, setShowUploading] = useState(false);

    const initialValues = {
        name: category.name,
    };

    const submitForm = async (values) => {
        const shouldSaveChanges = confirm(
            "Please confirm to save your changes",
        );

        if (!shouldSaveChanges) {
            return;
        }

        setShowUploading(true);

        try {
            const response = await dispatch(
                editDetailCategory(category._id, values),
            );

            if (response?.status === "failed") {
                message.error(response.message);
            } else {
                message.success(response.message);
                Router.push("/database/category");
            }
        } catch (error) {
            message.error(error.message);
        } finally {
            setShowUploading(false);
        }
    };

    const onReset = () => {
        form.current?.resetFields();
    };

    return (
        <Form
            ref={form}
            initialValues={initialValues}
            name="category"
            onFinish={submitForm}
            labelCol={{
                span: 4,
            }}
            wrapperCol={{
                span: 14,
            }}>
            <Form.Item
                label="Name"
                name="name"
                rules={[
                    {
                        required: true,
                    },
                ]}>
                <Input placeholder="Name" defaultValue={category.name} />
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

export default EditCategoryForm;
