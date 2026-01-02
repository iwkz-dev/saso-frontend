import { useMemo, useState, useCallback } from "react";
import { Form, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

import { createPaymentType } from "../../../../store/reducers/paymentTypeReducer";
import FormComponent from "../../Form";

const AddPaymentTypeForm = () => {
    const dispatch = useDispatch();
    const events = useSelector((state) => state?.event?.events) ?? [];
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
                if (response?.status !== "success") {
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
                name: "name",
                label: "Name",
                type: "text",
                placeholder: "Name of Payment Type",
                required: true,
            },
            {
                name: "type",
                label: "Type",
                type: "text",
                placeholder: "Type of Payment",
                required: true,
            },
            {
                name: "note",
                label: "Note",
                type: "description",
                placeholder: "Note of Payment Type",
                required: false,
            },
            {
                name: "events",
                label: "Events",
                type: "select-multiple",
                options: events.map((item) => ({
                    value: item._id,
                    label: item.name,
                })),
                placeholder: "Select Events",
                required: false,
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
