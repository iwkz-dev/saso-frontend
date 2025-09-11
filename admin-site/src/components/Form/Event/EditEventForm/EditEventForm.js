import React, { useMemo, useState, useCallback } from "react";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { editDetailEvent } from "../../../../store/reducers/eventReducer";
import { Form, message } from "antd";
import Router from "next/router";
import FormComponent from "../../Form";

const safeFileList = (images = []) =>
    (Array.isArray(images) ? images : []).map((img, i) => ({
        uid: img?.eTag || String(i),
        url: img?.imageUrl,
        name: img?.fileName || `image-${i + 1}`,
        eTag: img?.eTag, // keep server id/tag
        imageUrl: img?.imageUrl, // keep original URL
        fileName: img?.fileName,
    }));

export default function EditEventForm() {
    const dispatch = useDispatch();
    const [form] = Form.useForm();

    const event = useSelector((s) => s.event.detailEvent);

    const [showUploading, setShowUploading] = useState(false);
    const [images, setImages] = useState(() => safeFileList(event?.images));
    const [monthYear, setMonthYear] = useState(() => {
        const raw = event?.started_at || "";
        return raw.length >= 7 ? raw.slice(0, 7) : raw;
    });

    const onReset = () => {
        form.resetFields();
        setImages(safeFileList(event?.images));
        setMonthYear(event?.started_at?.slice(0, 7) || "");
    };

    const onChangeMonth = useCallback((_, dateString) => {
        setMonthYear(dateString || "");
    }, []);

    const buildFormData = (values) => {
        const fd = new FormData();
        Object.entries(values || {}).forEach(([k, v]) => {
            if (k !== "started_at") fd.append(k, v == null ? "" : String(v));
        });
        fd.set("started_at", monthYear || "");
        (images || []).forEach((img) => {
            const fileOrTag = img?.originFileObj || img?.eTag;
            if (fileOrTag) fd.append("imageUrls", fileOrTag);
        });
        return fd;
    };

    const submitForm = async (values) => {
        if (!monthYear) {
            message.warning("Please select the event month.");
            return;
        }
        const shouldSave = window.confirm(
            "Please confirm to save your changes",
        );
        if (!shouldSave) return;

        setShowUploading(true);
        try {
            const data = buildFormData(values);
            const res = await dispatch(editDetailEvent(event?._id, data));
            message.success(res?.message || "Event updated");
            Router.replace("/database/event");
        } catch (err) {
            message.error(err?.message || "Failed to update event");
        } finally {
            setShowUploading(false);
        }
    };

    const formItems = useMemo(
        () => [
            { name: "General Information", type: "divider" },
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
                label: "Month",
                type: "datePicker",
                placeholder: "Select month",
                picker: "month", // Month/Year only
                format: "YYYY-MM",
                onChange: onChangeMonth,
                required: true,
            },

            { name: "Payment Information", type: "divider" },
            {
                name: "bankName",
                label: "Bank Name",
                type: "text",
                placeholder: "Bank name",
            },
            { name: "iban", label: "IBAN", type: "text", placeholder: "IBAN" },
            { name: "bic", label: "BIC", type: "text", placeholder: "BIC" },
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

            { name: "Additional Information", type: "divider" },
            {
                name: "description",
                label: "Description",
                type: "description",
                placeholder: "Description",
            },
            { label: "images", type: "imageUploader" },
        ],
        [onChangeMonth],
    );

    const startedAtDayjs = monthYear
        ? dayjs(monthYear, "YYYY-MM")
        : event?.started_at
        ? dayjs(String(event.started_at).slice(0, 7), "YYYY-MM")
        : null;

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
                name: event?.name || "",
                status: String(event?.status ?? "0"),
                po_closed: Boolean(event?.po_closed),
                started_at: startedAtDayjs,
                bankName: event?.bankName || "",
                iban: event?.iban || "",
                bic: event?.bic || "",
                usageNote: event?.usageNote || "",
                paypal: event?.paypal || "",
                description: event?.description || "",
            }}
        />
    );
}
