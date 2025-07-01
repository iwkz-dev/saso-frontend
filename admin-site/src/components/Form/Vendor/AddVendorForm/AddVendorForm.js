import { useState } from "react";
import { Form, Input, Button, Space, message } from "antd";
import { useDispatch } from "react-redux";
import { createVendor } from "../../../../store/reducers/vendorReducer";
import Router from "next/router";

const AddVendorForm = () => {
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const [showUploading, setShowUploading] = useState(false);

    const submitForm = async (values) => {
        const shouldAddVendor = confirm("Please confirm to add vendor");

        if (shouldAddVendor) {
            setShowUploading(true);

            try {
                const response = await dispatch(createVendor(values));

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
        }
    };

    const onReset = () => {
        form.current?.resetFields();
    };

    return (
        <div>
            <Form
                ref={form}
                name="vendor"
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

export default AddVendorForm;
