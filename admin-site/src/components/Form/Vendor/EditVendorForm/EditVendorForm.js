import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editDetailVendor } from "../../../../store/reducers/vendorReducer";
import { Form, Input, Button, Space, message } from "antd";
import { useRouter } from "next/router";

const EditVendorForm = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const [form] = Form.useForm();
    const [showUploading, setShowUploading] = useState(false);

    const vendor = useSelector((state) => state?.vendor?.detailVendor) ?? null;

    const initialValues = useMemo(
        () => ({
            name: vendor?.name ?? "",
        }),
        [vendor],
    );

    useEffect(() => {
        if (vendor) {
            form.setFieldsValue({ name: vendor.name });
        }
    }, [vendor, form]);

    const submitForm = async (values) => {
        const shouldSaveChanges = window.confirm(
            "Please confirm to save your changes",
        );
        if (!shouldSaveChanges) return;

        if (!vendor?._id) {
            message.error("Vendor data is not available.");
            return;
        }

        setShowUploading(true);
        try {
            const response = await dispatch(
                editDetailVendor(vendor._id, values),
            );

            if (response?.status === "failed") {
                message.error(response?.message || "Failed to save changes.");
            } else {
                message.success(response?.message || "Changes saved.");
                router.push("/database/vendor");
            }
        } catch (error) {
            message.error(error?.message || "Something went wrong.");
        } finally {
            setShowUploading(false);
        }
    };

    const onReset = () => {
        form.resetFields();
    };

    return (
        <Form
            form={form}
            initialValues={initialValues}
            name="vendor"
            onFinish={submitForm}
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}>
            <Form.Item
                label="Name"
                name="name"
                rules={[
                    { required: true, message: "Please enter vendor name" },
                ]}>
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
    );
};

export default EditVendorForm;
