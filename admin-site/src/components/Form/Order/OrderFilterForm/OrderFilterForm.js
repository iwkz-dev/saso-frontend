import React, { useState } from "react";
import { Button, Input, message, Modal, Space } from "antd";
import { QrcodeOutlined } from "@ant-design/icons";
import { QrReader } from "react-qr-reader";

const OrderFilterForm = ({ filters, setFilters }) => {
    const Search = Input.Search;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [inputValue, setInputValue] = useState("");

    const handleChange = (value) => {
        setInputValue(value);
        const data = {
            id: value,
            name: "invoiceNumber",
        };

        const filterIndex = filters.findIndex((f) => f.name === data.name);
        if (!(filterIndex > -1)) {
            setFilters([...filters, data]);
        } else {
            const tempFilters = [...filters];
            tempFilters[filterIndex].id = data.id;
            setFilters([...tempFilters]);
        }
    };

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancelModal = () => {
        setIsModalOpen(false);
    };

    return (
        <Space.Compact block>
            <Search
                placeholder="input search text"
                onSearch={handleChange}
                allowClear
                enterButton
                value={inputValue}
            />

            <Button icon={<QrcodeOutlined />} onClick={showModal}></Button>
            <Modal
                destroyOnClose={true}
                title="Scan barcode"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancelModal}>
                <QrReader
                    onResult={(result, error) => {
                        if (result) {
                            message.success(
                                `Recieved QR-Code: ${result?.text}`,
                            );
                            handleChange(result?.text);
                            setIsModalOpen(false);
                        }

                        if (error) {
                            console.info(error);
                        }
                    }}
                    style={{ width: "100%" }}
                />
            </Modal>
        </Space.Compact>
    );
};

export default OrderFilterForm;
