import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editDetailVendor } from "../../../../store/reducers/vendorReducer";
import { Form, Input, Button, Space, message } from "antd";
import Router from "next/router";

const EditVendorForm = () => {
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const vendor = useSelector((state) => state.vendor.detailVendor);
    const [showUploading, setShowUploading] = useState(false);

    const initialValues = {
        name: vendor.name,
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
                editDetailVendor(vendor._id, values),
            );

            if (response?.status === "failed") {
                message.error(response.message);
            } else {
                message.success(response.message);
                Router.push("/database/vendor");
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
            name="vendor"
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
                <Input placeholder="Name" defaultValue={vendor.name} />
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

export default EditVendorForm;
