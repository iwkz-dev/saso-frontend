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

    const submitForm = (values) => {
        const text = confirm("Please confirm to add Payment Type");
        if (text) {
            setShowUploading(true);
            const createData = async () => {
                return dispatch(createPaymentType(values));
            };
            createData()
                .then((r) => {
                    if (r?.status === "failed") {
                        setShowUploading(false);
                        message.error(r.message);
                    } else {
                        setShowUploading(false);
                        message.success(r.message);
                        Router.push("/payment-type");
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
