import React, { useState } from "react";
import { Form, message } from "antd";
import { useDispatch } from "react-redux";
import Router from "next/router";
import { createPaymentType } from "../../../../store/reducers/paymentTypeReducer";
import FormComponent from "../../Form";

const AddPaymentTypeForm = () => {
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const [showUploading, setShowUploading] = useState(false);

    const submitForm = async (values) => {
        const shouldAddPaymentType = confirm(
            "Please confirm to add Payment Type",
        );

        if (shouldAddPaymentType) {
            setShowUploading(true);

            try {
                const response = await dispatch(createPaymentType(values));

                if (response?.status === "failed") {
                    message.error(response.message);
                } else {
                    message.success(response.message);
                    Router.push("/database/payment-type");
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

    const formItems = [
        {
            name: "General Information",
            type: "divider",
        },
        {
            name: "type",
            label: "Type",
            type: "text",
            placeholder: "Type of Payment",
            required: true,
        },
    ];

    return (
        <FormComponent
            form={form}
            name="payment-type"
            submitForm={submitForm}
            formItems={formItems}
            onReset={onReset}
            showUploading={showUploading}
        />
    );
};

export default AddPaymentTypeForm;
