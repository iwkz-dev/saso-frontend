import React, { useState } from "react";
import { Button, Input, message, Modal, Space } from "antd";
import { QrcodeOutlined } from "@ant-design/icons";
import { QrReader } from "react-qr-reader";

const OrderFilterForm = ({ filterValues, setFilterValues }) => {
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
        </Space.Compact>
    );
};

export default OrderFilterForm;
