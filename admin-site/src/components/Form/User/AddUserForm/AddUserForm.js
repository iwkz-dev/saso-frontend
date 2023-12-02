import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Form, message } from "antd";
import Router from "next/router";
import { createUser } from "../../../../store/reducers/userReducer";
import FormComponent from "../../Form";

const AddUserForm = () => {
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const [showUploading, setShowUploading] = useState(false);

    const submitForm = async (values) => {
        const shouldAddUser = window.confirm("Please confirm to add user");

        if (!shouldAddUser) {
            return;
        }

        setShowUploading(true);

        try {
            const response = await dispatch(createUser(values));

            if (response?.status === "failed") {
                message.error(response.message);
            } else {
                message.success(response.message);
                Router.push("/user");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            message.error("An error occurred while submitting the form");
        } finally {
            setShowUploading(false);
        }
    };

    const onReset = () => {
        form.current?.resetFields();
    };

    const formItems = [
        {
            name: "fullname",
            label: "Full Name",
            type: "text",
            placeholder: "Full Name",
            required: true,
        },
        {
            name: "email",
            label: "Email",
            type: "text",
            placeholder: "Email",
            required: true,
        },
        {
            name: "password",
            label: "Password",
            type: "password",
            placeholder: "Password",
            required: true,
        },
        {
            name: "role",
            label: "Role",
            type: "select",
            placeholder: "Role",
            options: [
                {
                    value: 1,
                    label: "Super Admin",
                },
                {
                    value: 2,
                    label: "Admin",
                },
                {
                    value: 3,
                    label: "Customer",
                },
            ],
            required: true,
        },
        {
            name: "isActive",
            label: "Is Active",
            type: "select",
            placeholder: "Is Active",
            options: [
                {
                    value: true,
                    label: "True",
                },
                {
                    value: false,
                    label: "False",
                },
            ],
            required: true,
        },
        {
            name: "phone",
            label: "Phone",
            type: "text",
            placeholder: "Phone",
            required: true,
        },
    ];

    return (
        <FormComponent
            form={form}
            name="user"
            submitForm={submitForm}
            formItems={formItems}
            onReset={onReset}
            showUploading={showUploading}></FormComponent>
    );
};

export default AddUserForm;
