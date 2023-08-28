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

    const submitForm = (values) => {
        const text = confirm("Please confirm to save your changes");
        if (text) {
            setShowUploading(true);
            const editData = async () => {
                return dispatch(editDetailCategory(category._id, values));
            };
            editData()
                .then((r) => {
                    if (r?.status === "failed") {
                        setShowUploading(false);
                        message.error(r.message);
                    } else {
                        setShowUploading(false);
                        message.success(r.message);
                        Router.push("/category");
                    }
                })
                .catch((e) => {
                    setShowUploading(false);
                    message.error(e.message);
                });
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
