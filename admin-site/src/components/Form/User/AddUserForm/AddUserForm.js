import React, { useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { Form, message } from "antd";
import { useRouter } from "next/router";
import { createUser } from "../../../../store/reducers/userReducer";
import FormComponent from "../../Form";

const AddUserForm = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const [form] = Form.useForm();
    const [showUploading, setShowUploading] = useState(false);

    const submitForm = async (values) => {
        const shouldAddUser = window.confirm("Please confirm to add user");
        if (!shouldAddUser) return;

        setShowUploading(true);
        try {
            const response = await dispatch(createUser(values));
            if (response?.status === "failed") {
                message.error(response?.message || "Failed to add user.");
            } else {
                message.success(
                    response?.message || "User added successfully.",
                );
                router.push("/database/user");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            message.error(
                error?.message ||
                    "An error occurred while submitting the form.",
            );
        } finally {
            setShowUploading(false);
        }
    };

    const onReset = () => {
        // AntD returns a form instance (not a ref)
        form.resetFields();
    };

    const roleOptions = useMemo(
        () => [
            { value: 1, label: "Super Admin" },
            { value: 2, label: "Admin" },
            { value: 3, label: "Customer" },
        ],
        [],
    );

    const activeOptions = useMemo(
        () => [
            { value: true, label: "True" },
            { value: false, label: "False" },
        ],
        [],
    );

    const formItems = useMemo(
        () => [
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
                options: roleOptions,
                required: true,
            },
            {
                name: "isActive",
                label: "Is Active",
                type: "select",
                placeholder: "Is Active",
                options: activeOptions,
                required: true,
            },
            {
                name: "phone",
                label: "Phone",
                type: "text",
                placeholder: "Phone",
                required: true,
            },
        ],
        [roleOptions, activeOptions],
    );

    return (
        <FormComponent
            form={form}
            name="user"
            submitForm={submitForm}
            formItems={formItems}
            onReset={onReset}
            showUploading={showUploading}
        />
    );
};

export default AddUserForm;
