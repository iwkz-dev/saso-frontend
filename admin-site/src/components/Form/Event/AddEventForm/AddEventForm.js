import { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createEvent } from "../../../../store/reducers/eventReducer";
import { Form, message } from "antd";
import Router from "next/router";
import FormComponent from "../../Form";

export default function AddEventForm() {
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const [showUploading, setShowUploading] = useState(false);
    const [images, setImages] = useState([]);
    const [monthYear, setMonthYear] = useState("");
    const paymentTypes = useSelector((s) => s.paymentType.paymentTypes);

    const onChangeMonthYear = useCallback((date, dateString) => {
        setMonthYear(dateString || "");
    }, []);

    const onReset = () => {
        form.resetFields();
        setImages([]);
        setMonthYear("");
    };

    const submitForm = async (values) => {
        if (!monthYear) {
            message.warning("Please select the event month.");
            return;
        }

        const confirmed = window.confirm("Please confirm to add event");
        if (!confirmed) return;

        setShowUploading(true);

        try {
            const data = new FormData();

            Object.entries(values || {}).forEach(([key, val]) => {
                if (key !== "started_at") data.append(key, val ?? "");
            });

            data.set("started_at", monthYear);

            (images || []).forEach((img) => {
                if (img?.originFileObj)
                    data.append("imageUrls", img.originFileObj);
            });

            const res = await dispatch(createEvent(data));
            if (res?.status !== "success") {
                message.error(res?.message || "Failed to create event");
            } else {
                message.success(res?.message || "Event created");
                Router.replace("/database/event");
            }
        } catch (err) {
            message.error(err?.message || "Failed to create event");
        } finally {
            setShowUploading(false);
        }
    };

    const formItems = [
        { name: "General Information", type: "divider" },
        {
            name: "name",
            label: "Name",
            type: "text",
            placeholder: "Name",
            required: true,
        },
        {
            name: "started_at",
            label: "Month",
            type: "datePicker",
            placeholder: "Select month",
            picker: "month",
            format: "YYYY-MM",
            onChange: onChangeMonthYear,
            required: true,
        },
        {
            name: "po_closed",
            label: "PO Closed",
            type: "select",
            placeholder: "PO Closed",
            options: [
                { value: false, label: "No" },
                { value: true, label: "Yes" },
            ],
            required: true,
        },

        { name: "Payment Information", type: "divider" },
        {
            name: "paymentTypes",
            label: "Payment Types",
            type: "select-multiple",
            placeholder: "Select Payment Types",
            options: (paymentTypes || []).map((pt) => ({
                value: pt._id,
                label: pt.name,
                type: pt.type,
                note: pt.note,
            })),
            showDetail: true,
            required: false,
        },
        {
            name: "bankName",
            label: "Bank Name",
            type: "text",
            placeholder: "Bank name",
        },
        { name: "iban", label: "IBAN", type: "text", placeholder: "IBAN" },
        { name: "bic", label: "BIC", type: "text", placeholder: "BIC" },
        { name: "usageNote", label: "VZW", type: "text", placeholder: "VZW" },
        {
            name: "paypal",
            label: "Paypal",
            type: "text",
            placeholder: "Paypal",
        },

        { name: "Additional Information", type: "divider" },
        {
            name: "description",
            label: "Description",
            type: "description",
            placeholder: "Description",
        },
        { label: "images", type: "imageUploader" },
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
        />
    );
}
