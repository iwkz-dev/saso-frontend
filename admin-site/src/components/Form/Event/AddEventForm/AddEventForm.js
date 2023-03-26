import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createEvent } from "../../../../store/reducers/eventReducer";
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

const AddEventForm = () => {
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const [showUploading, setShowUploading] = useState(false);
    const [images, setImages] = useState([]);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState("");
    const [previewTitle, setPreviewTitle] = useState("");
    const [date, setDate] = useState("");

    const submitForm = (values) => {
        const text = confirm("Please confirm to add event");
        if (text) {
            setShowUploading(true);
            const createData = async () => {
                var data = new FormData();
                for (var key in values) {
                    data.append(key, values[key]);
                }
                data.set("started_at", date);
                images.map((image) => {
                    data.append("imageUrls", image.originFileObj);
                });
                return await dispatch(createEvent(data));
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
                .catch(() => {
                    setShowUploading(false);
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
    const handleChange = ({ fileList: newFileList }) => setImages(newFileList);

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
        <div>
            <Form
                form={form}
                layout="vertical"
                name="event"
                onFinish={submitForm}
                labelCol={{
                    span: 8,
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
                        picker="month"
                        showTime
                        placeholder="Started at"
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
                <Upload
                    listType="picture-card"
                    fileList={images}
                    onPreview={handlePreview}
                    onChange={handleChange}
                    beforeUpload={beforeUpload}>
                    {images.length >= 4 ? null : uploadButton}
                </Upload>
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
        </div>
    );
};

export default AddEventForm;
