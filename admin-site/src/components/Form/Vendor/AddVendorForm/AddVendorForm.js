import { useState } from "react";
import { Form, Input, Button, Space, message } from "antd";
import { useDispatch } from "react-redux";
import { createVendor } from "../../../../store/reducers/vendorReducer";
import { useRouter } from "next/router";

const AddVendorForm = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const [form] = Form.useForm();
    const [showUploading, setShowUploading] = useState(false);

    const submitForm = async (values) => {
        const shouldAddVendor = window.confirm("Please confirm to add vendor");
        if (!shouldAddVendor) return;

        setShowUploading(true);
        try {
            const response = await dispatch(createVendor(values));

            if (response?.status !== "success") {
                message.error(response?.message || "Failed to add vendor.");
            } else {
                message.success(response?.message || "Vendor added.");
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
        <div>
            <Form
                form={form}
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
        </div>
    );
};

export default AddVendorForm;
