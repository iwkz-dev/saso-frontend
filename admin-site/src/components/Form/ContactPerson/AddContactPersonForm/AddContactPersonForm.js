import React, { useMemo, useState } from "react";
import { Form, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { createContactPerson } from "../../../../store/reducers/contactPersonReducer";
import { useRouter } from "next/router";
import FormComponent from "../../Form";

const AddContactPersonForm = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const [form] = Form.useForm();
    const [showUploading, setShowUploading] = useState(false);

    // Be defensive in case event slice isn't loaded yet
    const events = useSelector((state) => state?.event?.events) ?? [];

    const submitForm = async (values) => {
        const shouldAddContactPerson = window.confirm(
            "Please confirm to add contact person",
        );
        if (!shouldAddContactPerson) return;

        setShowUploading(true);
        try {
            const response = await dispatch(createContactPerson(values));

            if (response?.status === "failed") {
                message.error(
                    response?.message || "Failed to add contact person.",
                );
            } else {
                message.success(response?.message || "Contact person added.");
                router.push("/database/contact-person");
            }
        } catch (error) {
            message.error(error?.message || "Something went wrong.");
        } finally {
            setShowUploading(false);
        }
    };

    const onReset = () => {
        // Form.useForm() returns an instance, not a ref
        form.resetFields();
    };

    const formItems = useMemo(
        () => [
            { name: "General Information", type: "divider" },
            {
                name: "name",
                label: "Full Name",
                type: "text",
                placeholder: "Full Name",
                required: true,
            },
            {
                name: "phoneNumber",
                label: "Phone Number",
                type: "text",
                placeholder: "Please use country code, instead of '0'",
                required: true,
            },
            {
                name: "event",
                label: "Event",
                type: "select",
                placeholder: "Event",
                options: events.map((item) => ({
                    value: item._id,
                    label: item.name,
                })),
                required: true,
            },
        ],
        [events],
    );

    return (
        <FormComponent
            form={form}
            name="phoneNumber"
            submitForm={submitForm}
            formItems={formItems}
            onReset={onReset}
            showUploading={showUploading}
        />
    );
};

export default AddContactPersonForm;
