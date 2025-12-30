import React, { useEffect, useMemo, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createMenu } from "../../../../store/reducers/menuReducer";
import { Form, message } from "antd";
import { useRouter } from "next/router";
import FormComponent from "../../Form";

const AddMenuForm = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { query } = router;

    const [form] = Form.useForm();
    const [showUploading, setShowUploading] = useState(false);
    const [images, setImages] = useState([]);

    const events = useSelector((state) => state?.event?.events) ?? [];
    const categories =
        useSelector((state) => state?.category?.categories) ?? [];
    const vendors = useSelector((state) => state?.vendor?.vendors) ?? [];

    useEffect(() => {
        const patch = {};
        if (query?.event) patch.event = query.event;
        if (query?.category) patch.category = query.category;
        if (Object.keys(patch).length) form.setFieldsValue(patch);
    }, [form, query?.event, query?.category]);

    const submitForm = useCallback(
        async (values) => {
            if (!window.confirm("Please confirm to add menu")) return;

            setShowUploading(true);
            try {
                const data = new FormData();

                Object.entries(values).forEach(([key, val]) => {
                    data.append(key, val ?? "");
                });

                images.forEach((image) => {
                    if (image?.originFileObj) {
                        data.append("imageUrls", image.originFileObj);
                    }
                });

                const r = await dispatch(createMenu(data));

                if (r?.status !== "success") {
                    message.error(r?.message || "Failed to add menu.");
                } else {
                    message.success(r?.message || "Menu added.");
                    router.push("/database/menu");
                }
            } catch (error) {
                message.error(error?.message || "Something went wrong.");
            } finally {
                setShowUploading(false);
            }
        },
        [dispatch, images, router],
    );

    const onReset = useCallback(() => {
        form.resetFields();
        setImages([]);
    }, [form]);

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
                name: "barcode",
                label: "Barcode",
                type: "inputCamera",
                placeholder: "Barcode",
            },
            {
                name: "quantity",
                label: "Quantity",
                type: "number",
                placeholder: "Quantity",
                required: true,
                min: 0,
                step: 1,
            },
            {
                name: "price",
                label: "Price (€)",
                type: "number",
                placeholder: "Price (€)",
                required: true,
                min: 0,
                step: 0.01,
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
            {
                name: "category",
                label: "Category",
                type: "select",
                placeholder: "Category",
                options: categories.map((item) => ({
                    value: item._id,
                    label: item.name,
                })),
                required: true,
            },
            {
                name: "vendor",
                label: "Vendor",
                type: "select",
                placeholder: "Vendor",
                options: vendors.map((item) => ({
                    value: item._id,
                    label: item.name,
                })),
                required: true,
            },
            { name: "Additional Information", type: "divider" },
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
        ],
        [events, categories, vendors],
    );

    return (
        <FormComponent
            form={form}
            name="menu"
            submitForm={submitForm}
            formItems={formItems}
            onReset={onReset}
            showUploading={showUploading}
            images={images}
            setImages={setImages}
        />
    );
};

export default AddMenuForm;
