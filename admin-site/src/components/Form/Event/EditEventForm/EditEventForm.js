import React, { useState } from "react";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { editDetailEvent } from "../../../../store/reducers/eventReducer";
import {
    Form,
    Input,
    Button,
    DatePicker,
    Upload,
    Modal,
    Space,
    message,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import Router from "next/router";

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
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState("");
    const [previewTitle, setPreviewTitle] = useState("");
    const [images, setImages] = useState(getFileList(event.images));
    const [date, setDate] = useState(event.started_at);

    /*
    const status = [
        { title: "draft", value: 0 },
        { title: "approved", value: 1 },
        { title: "done", value: 2 },
    ];
    */

    const getYearAndMonth = (date) => {
        return `${dayjs(date).get("year")}-${
            parseInt(dayjs(date).get("month")) + 1
        }`;
    };

    const submitForm = (values) => {
        const text = confirm("Please confirm to save your changes");
        if (text) {
            setShowUploading(true);
            const createData = async () => {
                var data = new FormData();
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

    const getBase64 = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });

    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
        setPreviewTitle(
            file.name || file.url.substring(file.url.lastIndexOf("/") + 1),
        );
    };

    const handleCancel = () => setPreviewOpen(false);
    const handleChange = ({ fileList: newFileList }) => {
        setImages(newFileList);
    };

    const uploadButton = (
        <div>
            <PlusOutlined />
            <div
                style={{
                    marginTop: 8,
                }}>
                Upload
            </div>
        </div>
    );

    const onReset = () => {
        form.current?.resetFields();
    };

    const beforeUpload = (file) => {
        const isPNG = file.type === "image/png";
        const isJPEG = file.type === "image/jpg" || file.type === "image/jpeg";
        if (!isPNG && !isJPEG) {
            message.error(`${file.name} is not a png, jpg, or jpeg file`);
            return isPNG || Upload.LIST_IGNORE;
        }
        return false;
    };

    const onChange = (_, dateString) => {
        setDate(dateString);
    };

    return (
        <Form
            form={form}
            initialValues={{
                name: event.name,
                started_at: dayjs(event.started_at),
                bankName: event.bankName,
                iban: event.iban,
                bic: event.bic,
                usageNote: event.usageNote,
                paypal: event.paypal,
                description: event.description,
            }}
            name="event"
            onFinish={submitForm}
            labelCol={{
                span: 4,
            }}
            wrapperCol={{
                span: 14,
            }}>
            <Form.Item
                label="Name"
                name="name"
                rules={[
                    {
                        required: true,
                    },
                ]}>
                <Input placeholder="Name" />
            </Form.Item>
            <Form.Item
                label="Started At"
                name="started_at"
                rules={[
                    {
                        required: true,
                    },
                ]}>
                <DatePicker
                    placeholder="Started at"
                    picker="month"
                    onChange={onChange}
                />
            </Form.Item>
            <Form.Item
                label="Bank Name"
                name="bankName"
                rules={[
                    {
                        required: true,
                    },
                ]}>
                <Input placeholder="Bank name" />
            </Form.Item>
            <Form.Item
                label="IBAN"
                name="iban"
                rules={[
                    {
                        required: true,
                    },
                ]}>
                <Input placeholder="IBAN" />
            </Form.Item>
            <Form.Item
                label="BIC"
                name="bic"
                rules={[
                    {
                        required: true,
                    },
                ]}>
                <Input placeholder="BIC" />
            </Form.Item>
            <Form.Item
                label="VZW"
                name="usageNote"
                rules={[
                    {
                        required: true,
                    },
                ]}>
                <Input placeholder="VZW" />
            </Form.Item>
            <Form.Item
                label="Paypal"
                name="paypal"
                rules={[
                    {
                        required: true,
                    },
                ]}>
                <Input placeholder="Paypal" />
            </Form.Item>
            <Form.Item
                label="Description"
                name="description"
                rules={[
                    {
                        required: true,
                    },
                ]}>
                <Input.TextArea placeholder="Description" rows={4} />
            </Form.Item>
            <Form.Item label="images">
                <Upload
                    listType="picture-card"
                    fileList={images}
                    onPreview={handlePreview}
                    onChange={handleChange}
                    beforeUpload={beforeUpload}>
                    {images.length >= 4 ? null : uploadButton}
                </Upload>
            </Form.Item>

            <Modal
                open={previewOpen}
                title={previewTitle}
                footer={null}
                onCancel={handleCancel}>
                <img
                    alt="example"
                    style={{
                        width: "100%",
                    }}
                    src={previewImage}
                />
            </Modal>
            <Form.Item>
                <Space>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={showUploading}>
                        Submit
                    </Button>
                    <Button htmlType="button" onClick={onReset}>
                        Reset
                    </Button>
                </Space>
            </Form.Item>
        </Form>
    );
};

export default EditEventForm;
