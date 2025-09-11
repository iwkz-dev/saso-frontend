import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editDetailMenu } from "../../../../store/reducers/menuReducer";
import { Form, message } from "antd";
import { useRouter } from "next/router";
import FormComponent from "../../Form";

const toFileList = (images = []) =>
    images.map((image) => ({
        url: image.imageUrl,
        name: image.fileName,
        eTag: image.eTag,
        imageUrl: image.imageUrl,
        fileName: image.fileName,
    }));

const EditMenuForm = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    const [form] = Form.useForm();
    const [showUploading, setShowUploading] = useState(false);

    const menu = useSelector((state) => state?.menu?.detailMenu) ?? {};
    const events = useSelector((state) => state?.event?.events) ?? [];
    const categories =
        useSelector((state) => state?.category?.categories) ?? [];
    const vendors = useSelector((state) => state?.vendor?.vendors) ?? [];

    const [images, setImages] = useState(() => toFileList(menu?.images));
    useEffect(() => {
        setImages(toFileList(menu?.images));
    }, [menu?.images]);

    const initialValues = useMemo(
        () => ({
            name: menu?.name,
            barcode: menu?.barcode,
            quantity: menu?.quantity,
            price: menu?.price,
            event: menu?.event,
            category: menu?.category,
            vendor: menu?.vendor,
            description: menu?.description,
            note: menu?.note,
        }),
        [
            menu?.name,
            menu?.barcode,
            menu?.quantity,
            menu?.price,
            menu?.event,
            menu?.category,
            menu?.vendor,
            menu?.description,
            menu?.note,
        ],
    );

    const submitForm = useCallback(
        async (values) => {
            const confirmed = window.confirm(
                "Please confirm to save your changes",
            );
            if (!confirmed) return;

            setShowUploading(true);
            try {
                const data = new FormData();

                Object.entries(values).forEach(([k, v]) =>
                    data.append(k, v ?? ""),
                );

                images.forEach((image) => {
                    const fileOrRef = image?.originFileObj || image?.eTag;
                    if (fileOrRef) data.append("imageUrls", fileOrRef);
                });

                const response = await dispatch(
                    editDetailMenu(menu?._id, data),
                );

                if (response?.status === "failed") {
                    message.error(
                        response?.message || "Failed to save changes.",
                    );
                } else {
                    message.success(response?.message || "Changes saved.");
                    router.push("/database/menu");
                }
            } catch (error) {
                message.error(error?.message || "Something went wrong.");
            } finally {
                setShowUploading(false);
            }
        },
        [dispatch, images, menu?._id, router],
    );

    const onReset = useCallback(() => {
        form.resetFields();
        setImages(toFileList(menu?.images));
    }, [form, menu?.images]);

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
            { label: "images", type: "imageUploader" },
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
            initialValues={initialValues}
        />
    );
};

export default EditMenuForm;
