import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, message } from "antd";
import Router from "next/router";
import FormComponent from "../../Form";
import { editDetailPaymentType } from "../../../../store/reducers/paymentTypeReducer";

const EditPaymentTypeForm = () => {
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const paymentType = useSelector(
        (state) => state.paymentType.detailPaymentType,
    );
    const [showUploading, setShowUploading] = useState(false);

    const initialValues = {
        type: paymentType.type,
    };

    const submitForm = async (values) => {
        const text = confirm("Please confirm to save your changes");

        if (text) {
            setShowUploading(true);

            try {
                const response = await dispatch(
                    editDetailPaymentType(paymentType._id, values),
                );

                if (response?.status === "failed") {
                    message.error(response.message);
                } else {
                    message.success(response.message);
                    Router.push("/payment-type");
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
            initialValues={initialValues}
            form={form}
            name="payment-type"
            submitForm={submitForm}
            formItems={formItems}
            onReset={onReset}
            showUploading={showUploading}
        />
    );
};

export default EditPaymentTypeForm;
