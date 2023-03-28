import React, { useState } from "react";
import { Form, Input, Button, Space, message } from "antd";
import { useDispatch } from "react-redux";
import { createCategory } from "../../../../store/reducers/categoryReducer";
import Router from "next/router";

const AddCategoryForm = () => {
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const [showUploading, setShowUploading] = useState(false);

    const submitForm = (values) => {
        const text = confirm("Please confirm to add category");
        if (text) {
            setShowUploading(true);
            const createData = async () => {
                return dispatch(createCategory(values));
            };
            createData()
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
        <div>
            <Form
                ref={form}
                name="category"
                onFinish={submitForm}
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 14,
                }}>
                <Form.Item label="Name" name="name" required>
                    <Input placeholder="Name" />
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
        </div>
    );
};

export default AddCategoryForm;
