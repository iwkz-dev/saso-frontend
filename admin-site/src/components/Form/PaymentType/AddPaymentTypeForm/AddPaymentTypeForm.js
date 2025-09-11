import React, { useMemo, useState, useCallback } from "react";
import { Form, message } from "antd";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { createPaymentType } from "../../../../store/reducers/paymentTypeReducer";
import FormComponent from "../../Form";

const AddPaymentTypeForm = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const [form] = Form.useForm();
    const [showUploading, setShowUploading] = useState(false);

    const submitForm = useCallback(
        async (values) => {
            const shouldAddPaymentType = window.confirm(
                "Please confirm to add Payment Type",
            );
            if (!shouldAddPaymentType) return;

            setShowUploading(true);
            try {
                const response = await dispatch(createPaymentType(values));
                if (response?.status === "failed") {
                    message.error(
                        response?.message || "Failed to add payment type.",
                    );
                } else {
                    message.success(response?.message || "Payment type added.");
                    router.push("/database/payment-type");
                }
            } catch (error) {
                message.error(error?.message || "Something went wrong.");
            } finally {
                setShowUploading(false);
            }
        },
        [dispatch, router],
    );

    const onReset = useCallback(() => {
        form.resetFields();
    }, [form]);

    const formItems = useMemo(
        () => [
            { name: "General Information", type: "divider" },
            {
                name: "type",
                label: "Type",
                type: "text",
                placeholder: "Type of Payment",
                required: true,
            },
        ],
        [],
    );

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
