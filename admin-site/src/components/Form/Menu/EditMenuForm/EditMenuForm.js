import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editDetailMenu } from "../../../../store/reducers/menuReducer";
import { Form, message } from "antd";
import Router from "next/router";
import FormComponent from "../../Form";

const getFileList = (images) => {
    return images?.map((image) => ({
        url: image.imageUrl,
        name: image.fileName,
        eTag: image.eTag,
        imageUrl: image.imageUrl,
        fileName: image.fileName,
    }));
};

const EditMenuForm = () => {
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const menu = useSelector((state) => state.menu.detailMenu);
    const events = useSelector((state) => state.event.events);
    const categories = useSelector((state) => state.category.categories);
    const [showUploading, setShowUploading] = useState(false);
    const [images, setImages] = useState(getFileList(menu.images));

    const initialValues = {
        name: menu.name,
        barcode: menu.barcode,
        quantity: menu.quantity,
        price: menu.price,
        event: menu.event,
        category: menu.category,
        description: menu.description,
        note: menu.note,
    };

    const submitForm = async (values) => {
        const confirmed = confirm("Please confirm to save your changes");

        if (!confirmed) {
            return;
        }

        setShowUploading(true);

        try {
            const data = new FormData();

            for (const key in values) {
                data.append(key, values[key] || "");
            }

            images.forEach((image) => {
                const file = image.originFileObj || image.eTag;
                data.append("imageUrls", file);
            });

            const response = await dispatch(editDetailMenu(menu._id, data));

            if (response?.status === "failed") {
                setShowUploading(false);
                message.error(response.message);
            } else {
                setShowUploading(false);
                message.success(response.message);
                Router.push("/menu");
            }
        } catch (error) {
            setShowUploading(false);
        }
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
            name: "note",
            label: "Note",
            type: "text",
            placeholder: "Note",
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
            name="menu"
            submitForm={submitForm}
            formItems={formItems}
            onReset={onReset}
            showUploading={showUploading}
            images={images}
            setImages={setImages}
            initialValues={initialValues}></FormComponent>
    );
};

export default EditMenuForm;
