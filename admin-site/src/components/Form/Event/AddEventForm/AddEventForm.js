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

    const submitForm = (values) => {
        const text = confirm("Please confirm to add event");
        if (text) {
            setShowUploading(true);
            const createData = async () => {
                var data = new FormData();
                for (var key in values) {
                    data.append(key, values[key] || "");
                }
                data.set("started_at", date);
                images.map((image) => {
                    data.append("imageUrls", image.originFileObj);
                });
                return dispatch(createEvent(data));
            };
            createData()
                .then((r) => {
                    if (r?.status === "failed") {
                        setShowUploading(false);
                        message.error(r.message);
                    } else {
                        setShowUploading(false);
                        message.success(r.message);
                        Router.push("/event");
                    }
                })
                .catch(() => {
                    setShowUploading(false);
                });
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
