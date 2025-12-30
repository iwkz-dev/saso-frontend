import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editDetailContactPerson } from "../../../../store/reducers/contactPersonReducer";
import { Form, message } from "antd";
import { useRouter } from "next/router";
import FormComponent from "../../Form";

const EditContactPersonForm = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const [form] = Form.useForm();
    const [showUploading, setShowUploading] = useState(false);

    const contactPerson =
        useSelector((state) => state?.contactPerson?.detailContactPerson) ?? {};
    const events = useSelector((state) => state?.event?.events) ?? [];

    const initialValues = useMemo(
        () => ({
            name: contactPerson?.name ?? "",
            phoneNumber: contactPerson?.phoneNumber ?? "",
            event: contactPerson?.event ?? undefined,
        }),
        [contactPerson],
    );

    const submitForm = async (values) => {
        const shouldSaveChanges = window.confirm(
            "Please confirm to save your changes",
        );
        if (!shouldSaveChanges) return;

        setShowUploading(true);
        try {
            const response = await dispatch(
                editDetailContactPerson(contactPerson?._id, values),
            );

            if (response?.status !== "success") {
                message.error(response?.message || "Failed to save changes.");
            } else {
                message.success(response?.message || "Changes saved.");
                router.push("/database/contact-person");
            }
        } catch (error) {
            message.error(error?.message || "Something went wrong.");
        } finally {
            setShowUploading(false);
        }
    };

    const onReset = () => {
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
            initialValues={initialValues}
        />
    );
};

export default EditContactPersonForm;
