import React, { useState } from "react";
import { Form, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { createContactPerson } from "../../../../store/reducers/contactPersonReducer";
import Router from "next/router";
import FormComponent from "../../Form";

const AddContactPersonForm = () => {
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const events = useSelector((state) => state.event.events);
    const [showUploading, setShowUploading] = useState(false);

    const submitForm = async (values) => {
        const shouldAddContactPerson = confirm(
            "Please confirm to add contact person",
        );

        if (shouldAddContactPerson) {
            setShowUploading(true);

            try {
                const response = await dispatch(createContactPerson(values));

                if (response?.status === "failed") {
                    message.error(response.message);
                } else {
                    message.success(response.message);
                    Router.push("/database/contact-person");
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
    ];

    return (
        <>
            <FormComponent
                form={form}
                name="phoneNumber"
                submitForm={submitForm}
                formItems={formItems}
                onReset={onReset}
                showUploading={showUploading}></FormComponent>
        </>
    );
};

export default AddContactPersonForm;
