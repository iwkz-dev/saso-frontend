import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createMenu } from "../../../../store/reducers/menuReducer";
import {
    Button,
    Form,
    Input,
    InputNumber,
    message,
    Modal,
    Select,
    Space,
    Upload,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import Router from "next/router";

const AddMenuForm = () => {
    const dispatch = useDispatch();
    const [form] = useRef();
    const events = useSelector((state) => state.event.events);
    const categories = useSelector((state) => state.category.categories);
    const [showUploading, setShowUploading] = useState(false);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState("");
    const [previewTitle, setPreviewTitle] = useState("");
    const [images, setImages] = useState([]);

    const submitForm = (values) => {
        const text = confirm("Please confirm to add menu");
        if (text) {
            setShowUploading(true);
            const createData = async () => {
                var data = new FormData();
                for (var key in values) {
                    data.append(key, values[key]);
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

    const beforeUpload = (file) => {
        const isPNG = file.type === "image/png";
        const isJPEG = file.type === "image/jpg" || file.type === "image/jpeg";
        if (!isPNG && !isJPEG) {
            message.error(`${file.name} is not a png, jpg, or jpeg file`);
            return isPNG || Upload.LIST_IGNORE;
        }
        return false;
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
        form.resetFields();
    };

    return (
        <Form
            form={form}
            name="menu"
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
                label="Quantity"
                name="quantity"
                rules={[
                    {
                        required: true,
                    },
                ]}>
                <InputNumber min={0} step={1} placeholder="Menu quantity" />
            </Form.Item>
            <Form.Item
                label="Price (€)"
                name="price"
                min={0}
                rules={[
                    {
                        required: true,
                    },
                ]}>
                <InputNumber min={0} step={0.01} placeholder="Menu price" />
            </Form.Item>
            <Form.Item
                label="Event"
                name="event"
                rules={[
                    {
                        required: true,
                    },
                ]}>
                <Select
                    placeholder="Choose event"
                    options={events.map((item) => ({
                        value: item._id,
                        label: item.name,
                    }))}></Select>
            </Form.Item>
            <Form.Item
                label="Category"
                name="category"
                rules={[
                    {
                        required: true,
                    },
                ]}>
                <Select
                    placeholder="Choose menu category"
                    options={categories.map((item) => ({
                        value: item._id,
                        label: item.name,
                    }))}></Select>
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

export default AddMenuForm;
