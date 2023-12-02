import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createEvent } from "../../../../store/reducers/eventReducer";
import { Form, message } from "antd";
import Router from "next/router";
import FormComponent from "../../Form";

const AddEventForm = () => {
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const [showUploading, setShowUploading] = useState(false);
    const [images, setImages] = useState([]);
    const [date, setDate] = useState("");

    const submitForm = async (values) => {
        const text = confirm("Please confirm to add event");

        if (text) {
            setShowUploading(true);

            const createData = async () => {
                const data = new FormData();
                for (const [key, value] of Object.entries(values)) {
                    data.append(key, value || "");
                }

                data.set("started_at", date);

                await Promise.all(
                    images.map((image) => {
                        return data.append("imageUrls", image.originFileObj);
                    }),
                );

                return dispatch(createEvent(data));
            };

            try {
                const result = await createData();

                if (result?.status === "failed") {
                    setShowUploading(false);
                    message.error(result.message);
                } else {
                    setShowUploading(false);
                    message.success(result.message);
                    Router.push("/event");
                }
            } catch (error) {
                setShowUploading(false);
            }
        }
    };

    const onChange = (_, dateString) => {
        setDate(dateString);
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
            label: "Name",
            type: "text",
            placeholder: "Name",
            required: true,
        },
        {
            name: "started_at",
            label: "Started At",
            type: "datePicker",
            placeholder: "Started At",
            picker: "month",
            onChange: onChange,
            showTime: true,
            required: true,
        },
        {
            name: "Payment Information",
            type: "divider",
        },
        {
            name: "bankName",
            label: "Bank Name",
            type: "text",
            placeholder: "Bank name",
        },
        {
            name: "iban",
            label: "IBAN",
            type: "text",
            placeholder: "IBAN",
        },
        {
            name: "bic",
            label: "BIC",
            type: "text",
            placeholder: "BIC",
        },
        {
            name: "usageNote",
            label: "VZW",
            type: "text",
            placeholder: "VZW",
        },
        {
            name: "paypal",
            label: "Paypal",
            type: "text",
            placeholder: "Paypal",
        },
        {
            name: "Additional Information",
            type: "divider",
        },
        {
            name: "description",
            label: "Description",
            type: "description",
            placeholder: "Description",
        },
        {
            label: "images",
            type: "imageUploader",
        },
    ];

    return (
        <FormComponent
            form={form}
            name="event"
            submitForm={submitForm}
            formItems={formItems}
            onReset={onReset}
            showUploading={showUploading}
            images={images}
            setImages={setImages}></FormComponent>
    );
};

export default AddEventForm;
