import React, { useState } from "react";
import {
    DatePicker,
    Form,
    Input,
    Select,
    Upload,
    InputNumber,
    message,
    Modal,
    Space,
    Button,
    Divider,
} from "antd";
import { PlusOutlined, CameraOutlined } from "@ant-design/icons";
import BarcodeScanner from "../BarcodeScanner/BarcodeScanner";
import style from "./FormItem.module.scss";

const FormItem = ({ item, setImages, images, form }) => {
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState("");
    const [previewTitle, setPreviewTitle] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

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

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancelModal = () => {
        setIsModalOpen(false);
    };

    const getBarcode = (barcode) => {
        form.setFieldsValue({ barcode: barcode });
        message.success("Barcode has been successfully detected!");
        setIsModalOpen(false);
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

    const renderFormItem = (item) => {
        switch (item.type) {
            case "text":
                return (
                    <Form.Item
                        label={item.label}
                        name={item.name}
                        rules={[
                            {
                                required: item.required,
                            },
                        ]}>
                        <Input placeholder={item.placeholder} />
                    </Form.Item>
                );
            case "inputCamera":
                return (
                    <>
                        <Form.Item label={item.label}>
                            <Space.Compact direction="horizontal">
                                <Form.Item
                                    name={item.name}
                                    style={{ margin: 0 }}>
                                    <Input placeholder={item.placeholder} />
                                </Form.Item>
                                <Button
                                    icon={<CameraOutlined />}
                                    onClick={showModal}
                                />
                            </Space.Compact>
                        </Form.Item>
                        <Modal
                            className={style.scannerModal}
                            destroyOnClose={true}
                            title="Scan barcode"
                            open={isModalOpen}
                            onOk={handleOk}
                            onCancel={handleCancelModal}>
                            <BarcodeScanner getBarcode={getBarcode} />
                        </Modal>
                    </>
                );

            case "description":
                return (
                    <Form.Item
                        label={item.label}
                        name={item.name}
                        rules={[
                            {
                                required: item.required,
                            },
                        ]}>
                        <Input.TextArea placeholder={item.placeholder} />
                    </Form.Item>
                );
            case "select":
                return (
                    <Form.Item
                        label={item.label}
                        name={item.name}
                        rules={[
                            {
                                required: item.required,
                            },
                        ]}>
                        <Select
                            options={item.options}
                            placeholder={item.placeholder}
                        />
                    </Form.Item>
                );
            case "number":
                return (
                    <Form.Item
                        label={item.label}
                        name={item.name}
                        rules={[
                            {
                                required: item.required,
                            },
                        ]}>
                        <InputNumber
                            min={item.min}
                            step={item.step}
                            placeholder={item.placeholder}
                        />
                    </Form.Item>
                );
            case "datePicker":
                return (
                    <Form.Item
                        label={item.label}
                        name={item.name}
                        rules={[
                            {
                                required: item.required,
                            },
                        ]}>
                        <DatePicker
                            picker={item.picker}
                            showTime={item.showTime}
                            placeholder={item.placeholder}
                            onChange={item.onChange}
                        />
                    </Form.Item>
                );
            case "imageUploader":
                return (
                    <>
                        <Form.Item
                            label={item.label}
                            rules={[
                                {
                                    required: item.required,
                                },
                            ]}>
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
                    </>
                );
            case "password":
                return (
                    <Form.Item
                        label={item.label}
                        name={item.password}
                        rules={[
                            {
                                required: true,
                            },
                        ]}>
                        <Input.Password placeholder={item.placeholder} />
                    </Form.Item>
                );
            case "divider":
                return <Divider orientation="left">{item.name}</Divider>;
            default:
                <Form.Item
                    label={item.label}
                    name={item.name}
                    rules={[
                        {
                            required: item.required,
                        },
                    ]}>
                    <Input placeholder={item.placeholder} />
                </Form.Item>;
                break;
        }
    };
    return <>{renderFormItem(item)}</>;
};

export default FormItem;
