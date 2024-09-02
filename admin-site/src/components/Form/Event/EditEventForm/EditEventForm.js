import React, { useState } from "react";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { editDetailEvent } from "../../../../store/reducers/eventReducer";
import { Form, message } from "antd";
import Router from "next/router";
import FormComponent from "../../Form";

const getFileList = (images) => {
    return images.map((image) => ({
        url: image.imageUrl,
        name: image.fileName,
        eTag: image.eTag,
        imageUrl: image.imageUrl,
        fileName: image.fileName,
    }));
};

const EditEventForm = () => {
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const event = useSelector((state) => state.event.detailEvent);
    const [showUploading, setShowUploading] = useState(false);
    const [images, setImages] = useState(getFileList(event.images));
    const [date, setDate] = useState(event.started_at);

    const submitForm = async (values) => {
        const shouldSaveChanges = confirm(
            "Please confirm to save your changes",
        );

        if (!shouldSaveChanges) {
            return;
        }

        try {
            setShowUploading(true);

            const getYearAndMonth = (date) => {
                return `${dayjs(date).get("year")}-${
                    dayjs(date).get("month") + 1
                }`;
            };

            const data = new FormData();

            for (const [key, value] of Object.entries(values)) {
                data.append(key, value || "");
            }

            data.set("started_at", getYearAndMonth(date));

            images.forEach((image) => {
                const file = image.originFileObj || image.eTag;
                data.append("imageUrls", file);
            });

            const response = await dispatch(editDetailEvent(event._id, data));

            if (response?.status === "failed") {
                setShowUploading(false);
                message.error(response.message);
            } else {
                setShowUploading(false);
                message.success(response.message);
                Router.push("/database/event");
            }
        } catch (error) {
            setShowUploading(false);
            message.error(error.message);
        }
    };

    const onReset = () => {
        form.current?.resetFields();
    };

    const onChange = (_, dateString) => {
        setDate(dateString);
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
            name: "status",
            label: "Status",
            type: "select",
            placeholder: "Status",
            options: [
                { label: "draft", value: "0" },
                { label: "approved", value: "1" },
                { label: "done", value: "2" },
            ],
            required: true,
        },
        {
            name: "po_closed",
            label: "PO Closed",
            type: "select",
            placeholder: "PO Closed",
            options: [
                { label: "No", value: false },
                { label: "Yes", value: true },
            ],
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
            setImages={setImages}
            initialValues={{
                name: event.name,
                status: event.status.toString(),
                po_closed: event.po_closed,
                started_at: dayjs(event.started_at),
                bankName: event.bankName,
                iban: event.iban,
                bic: event.bic,
                usageNote: event.usageNote,
                paypal: event.paypal,
                description: event.description,
            }}></FormComponent>
    );
};

export default EditEventForm;
