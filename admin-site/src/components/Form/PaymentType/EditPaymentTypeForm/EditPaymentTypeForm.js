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

    const submitForm = (values) => {
        const text = confirm("Please confirm to save your changes");
        if (text) {
            setShowUploading(true);
            const editData = async () => {
                return dispatch(editDetailPaymentType(paymentType._id, values));
            };
            editData()
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
