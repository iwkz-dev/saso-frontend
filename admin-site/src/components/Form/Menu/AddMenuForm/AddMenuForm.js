import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createMenu } from "../../../../store/reducers/menuReducer";
import { Form, message } from "antd";
import Router, { useRouter } from "next/router";
import FormComponent from "../../Form";
//import { BarcodeScanner } from '@ionic-native/barcode-scanner';

const AddMenuForm = () => {
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const events = useSelector((state) => state.event.events);
    const categories = useSelector((state) => state.category.categories);
    const [showUploading, setShowUploading] = useState(false);
    const [images, setImages] = useState([]);
    const { query } = useRouter();

    useEffect(() => {
        form.setFieldsValue({ event: query.event, category: query.category });
    }, [query.category, query.event]);

    const submitForm = async (values) => {
        if (!confirm("Please confirm to add menu")) {
            return;
        }

        setShowUploading(true);

        try {
            const data = new FormData();

            for (const [key, value] of Object.entries(values)) {
                data.append(key, value || "");
            }

            images.forEach((image) => {
                data.append("imageUrls", image.originFileObj);
            });

            const r = await dispatch(createMenu(data));

            if (r?.status === "failed") {
                setShowUploading(false);
                message.error(r.message);
            } else {
                setShowUploading(false);
                message.success(r.message);
                Router.push("/menu");
            }
        } catch (error) {
            setShowUploading(false);
        }
    };

    const onReset = () => {
        form.resetFields();
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
        <>
            <FormComponent
                form={form}
                name="menu"
                submitForm={submitForm}
                formItems={formItems}
                onReset={onReset}
                showUploading={showUploading}
                images={images}
                setImages={setImages}></FormComponent>
        </>
    );
};

export default AddMenuForm;
