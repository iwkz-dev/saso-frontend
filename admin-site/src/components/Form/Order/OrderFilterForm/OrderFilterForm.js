import React, { useState } from "react";
import { Button, Input, message, Modal, Space, Popconfirm } from "antd";
import { QrcodeOutlined } from "@ant-design/icons";
import { QrReader } from "react-qr-reader";
import { UploadOutlined } from "@ant-design/icons";

const OrderFilterForm = ({ filterValues, setFilterValues, exportToXlsx }) => {
    const Search = Input.Search;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [inputValue, setInputValue] = useState("");

    const handleSearch = (value) => {
        setInputValue(value);
        const data = {
            id: value,
            name: "invoiceNumber",
        };

        const filterIndex = filterValues.findIndex((f) => f.name === data.name);
        if (!(filterIndex > -1)) {
            setFilterValues([...filterValues, data]);
        } else {
            const tempFilters = [...filterValues];
            tempFilters[filterIndex].id = data.id;
            setFilterValues([...tempFilters]);
        }
    };

    const handleChange = (e) => {
        handleSearch(e.target.value);
    };

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancelModal = () => {
        setIsModalOpen(false);
    };

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
                destroyOnClose={true}
                title="Scan barcode"
                open={isModalOpen}
                footer={[]}
                onCancel={handleCancelModal}>
                <QrReader
                    constraints={{
                        facingMode: "environment",
                    }}
                    onResult={(result, error) => {
                        if (result) {
                            message.success(
                                `Recieved QR-Code: ${result?.text}`,
                            );
                            handleSearch(result?.text);
                            setIsModalOpen(false);
                        }

                        if (error) {
                            console.info(error);
                        }
                    }}
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
