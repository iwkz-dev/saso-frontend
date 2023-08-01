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

    const submitForm = (values) => {
        const text = confirm("Please confirm to add menu");
        if (text) {
            setShowUploading(true);
            const createData = async () => {
                var data = new FormData();
                for (var key in values) {
                    data.append(key, values[key] || "");
                }
                images.map((image) => {
                    data.append("imageUrls", image.originFileObj);
                });
                return dispatch(createMenu(data));
            };
            createData()
                .then((r) => {
                    if (r?.status === "failed") {
                        setShowUploading(false);
                        message.error(r.message);
                    } else {
                        setShowUploading(false);
                        message.success(r.message);
                        Router.push("/menu");
                    }
                })
                .catch(() => {
                    setShowUploading(false);
                });
        }
    };

    const onReset = () => {
        form.resetFields();
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
