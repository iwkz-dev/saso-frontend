import React from "react";
import { Form, Button, Space } from "antd";
import FormItem from "../common/FormItem/FormItem";

const FormComponent = ({
    form,
    submitForm,
    formName,
    onReset,
    showUploading,
    formItems,
    images,
    setImages,
    initialValues,
}) => {
    return (
        <Form
            form={form}
            name={formName}
            onFinish={submitForm}
            labelCol={{
                span: 4,
            }}
            wrapperCol={{
                span: 14,
            }}
            initialValues={initialValues}>
            {formItems.map((item) => (
                <FormItem
                    key={item.name}
                    item={item}
                    images={images}
                    setImages={setImages}
                />
            ))}
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

export default FormComponent;
