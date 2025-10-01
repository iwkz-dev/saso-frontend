import React, { useCallback, useState } from "react";
import { Button, Input, message, Modal, Space, Popconfirm } from "antd";
import { QrcodeOutlined, UploadOutlined } from "@ant-design/icons";
import { QrReader } from "react-qr-reader";

const OrderFilterForm = ({ setFilterValues, exportToXlsx }) => {
    const { Search } = Input;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [inputValue, setInputValue] = useState("");

    const upsertInvoiceFilter = useCallback(
        (value) => {
            const data = { id: value, name: "invoiceNumber" };

            setFilterValues((prev) => {
                const filters = Array.isArray(prev) ? prev : [];
                const idx = filters.findIndex((f) => f.name === data.name);

                if (idx === -1) {
                    return [...filters, data];
                }
                const next = [...filters];
                next[idx] = { ...next[idx], id: data.id };
                return next;
            });
        },
        [setFilterValues],
    );

    const handleSearch = useCallback(
        (value) => {
            setInputValue(value);
            upsertInvoiceFilter(value);
        },
        [upsertInvoiceFilter],
    );

    const handleChange = useCallback(
        (e) => handleSearch(e.target.value),
        [handleSearch],
    );

    const showModal = useCallback(() => setIsModalOpen(true), []);
    const handleCancelModal = useCallback(() => setIsModalOpen(false), []);

    const handleQrResult = useCallback(
        (result, error) => {
            if (result?.text) {
                message.success(`Received QR code: ${result.text}`);
                handleSearch(result.text);
                setIsModalOpen(false);
            }
            if (error) {
                console.error(error);
            }
        },
        [handleSearch],
    );

    return (
        <Space.Compact block>
            <Search
                placeholder="input search text"
                onSearch={handleSearch}
                onChange={handleChange}
                allowClear
                enterButton
                value={inputValue}
            />

            <Button icon={<QrcodeOutlined />} onClick={showModal}>
                Scan
            </Button>

            <Modal
                destroyOnClose
                title="Scan barcode"
                open={isModalOpen}
                footer={null}
                onCancel={handleCancelModal}>
                <QrReader
                    constraints={{ facingMode: "environment" }}
                    onResult={handleQrResult}
                    style={{ width: "100%" }}
                />
            </Modal>

            <Popconfirm
                title="Export to xlsx file"
                description="Are you sure want to export order to xlsx file?"
                onConfirm={exportToXlsx}
                okText="Yes"
                cancelText="No">
                <Button icon={<UploadOutlined />} />
            </Popconfirm>
        </Space.Compact>
    );
};

export default OrderFilterForm;
