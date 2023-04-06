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

    const submitForm = (values) => {
        const text = confirm("Please confirm to save your changes");
        if (text) {
            setShowUploading(true);
            const createData = async () => {
                var data = new FormData();

                const getYearAndMonth = (date) => {
                    return `${dayjs(date).get("year")}-${
                        parseInt(dayjs(date).get("month")) + 1
                    }`;
                };
                for (var key in values) {
                    data.append(key, values[key]);
                }
                data.set("started_at", getYearAndMonth(date));

                images.map((image) => {
                    if (image.originFileObj) {
                        data.append("imageUrls", image.originFileObj);
                    } else {
                        data.append("eTags", image.eTag);
                    }
                });

                return dispatch(editDetailEvent(event._id, data));
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
                .catch((e) => {
                    setShowUploading(false);
                    message.error(e.message);
                });
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
                { label: "draft", value: 0 },
                { label: "approved", value: 1 },
                { label: "done", value: 2 },
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
            name: "bankName",
            label: "Bank Name",
            type: "text",
            placeholder: "Bank name",
            required: true,
        },
        {
            name: "iban",
            label: "IBAN",
            type: "text",
            placeholder: "IBAN",
            required: true,
        },
        {
            name: "bic",
            label: "BIC",
            type: "text",
            placeholder: "BIC",
            required: true,
        },
        {
            name: "usageNote",
            label: "VZW",
            type: "text",
            placeholder: "VZW",
            required: true,
        },
        {
            name: "paypal",
            label: "Paypal",
            type: "text",
            placeholder: "Paypal",
            required: true,
        },
        {
            name: "description",
            label: "Description",
            type: "text",
            placeholder: "Description",
            required: true,
        },
        {
            label: "images",
            type: "imageUploader",
            required: false,
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
                status: event.status,
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
