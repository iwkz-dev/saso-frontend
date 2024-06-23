import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editDetailContactPerson } from "../../../../store/reducers/contactPersonReducer";
import { Form, message } from "antd";
import Router from "next/router";
import FormComponent from "../../Form";

const EditContactPersonForm = () => {
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const contactPerson = useSelector(
        (state) => state.contactPerson.detailContactPerson,
    );
    const events = useSelector((state) => state.event.events);
    const [showUploading, setShowUploading] = useState(false);

    const initialValues = {
        name: contactPerson.name,
        phoneNumber: contactPerson.phoneNumber,
        event: contactPerson.event,
    };

    const submitForm = async (values) => {
        const shouldSaveChanges = confirm(
            "Please confirm to save your changes",
        );

        if (!shouldSaveChanges) {
            return;
        }

        setShowUploading(true);

        try {
            const response = await dispatch(
                editDetailContactPerson(contactPerson._id, values),
            );

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
                showUploading={showUploading}
                initialValues={initialValues}></FormComponent>
        </>
    );
};

export default EditContactPersonForm;
