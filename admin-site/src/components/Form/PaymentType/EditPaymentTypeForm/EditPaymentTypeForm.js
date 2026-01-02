import { useEffect, useMemo, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, message } from "antd";
import { useRouter } from "next/router";

import FormComponent from "../../Form";
import { editDetailPaymentType } from "../../../../store/reducers/paymentTypeReducer";

const EditPaymentTypeForm = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const [form] = Form.useForm();
    const [showUploading, setShowUploading] = useState(false);
    const events = useSelector((state) => state?.event?.events) ?? [];

    const paymentType = useSelector(
        (state) => state?.paymentType?.detailPaymentType,
    );

    const initialValues = useMemo(
        () => ({
            name: paymentType?.name ?? "",
            type: paymentType?.type ?? "",
            note: paymentType?.note ?? "",
            events: paymentType?.events.map((item) => item._id) ?? [],
        }),
        [paymentType.type, paymentType.note, paymentType.events],
    );

    useEffect(() => {
        if (paymentType) {
            form.setFieldsValue({ type: paymentType.type ?? "" });
        }
    }, [paymentType, form]);

    const submitForm = useCallback(
        async (values) => {
            const shouldSave = window.confirm(
                "Please confirm to save your changes",
            );
            if (!shouldSave) return;

            if (!paymentType?._id) {
                message.error("Payment type data is not available.");
                return;
            }

            setShowUploading(true);
            try {
                const response = await dispatch(
                    editDetailPaymentType(paymentType._id, values),
                );

                if (response?.status !== "success") {
                    message.error(
                        response?.message || "Failed to save changes.",
                    );
                } else {
                    message.success(response?.message || "Changes saved.");
                    router.push("/database/payment-type");
                }
            } catch (error) {
                message.error(error?.message || "Something went wrong.");
            } finally {
                setShowUploading(false);
            }
        },
        [dispatch, router, paymentType],
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
