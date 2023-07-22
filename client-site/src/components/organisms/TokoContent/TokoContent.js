import React, { useState } from "react";
import { Tag, Typography, message } from "antd";
import TabsComponent from "../../molecules/TabsComponent/Tabs";
import ContentLayout from "../ContentLayout/ContentLayout";
import BarcodeScanner from "../../atoms/BarcodeScanner/BarcodeScanner";
import { Button, Input, Space, Modal } from "antd";
import style from "./FormItem.module.scss";
import { CameraOutlined } from "@ant-design/icons";

const { Search } = Input;
const TokoContent = ({ event }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [barcode, setBarcode] = useState("");

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancelModal = () => {
        setIsModalOpen(false);
    };

    const onSearch = (value) => console.log(value);

    const getBarcode = (barcode) => {
        message.success("Barcode has been successfully detected!");
        setIsModalOpen(false);
        setBarcode(barcode);
    };
    const onCloseBarcodeTag = () => {
        setBarcode("");
    };

    <Space direction="vertical"></Space>;

    return (
        <ContentLayout className={style.contentLayout} hasCarousel>
            <Typography.Title level={2} style={{ textAlign: "center" }}>
                Products
            </Typography.Title>
            <Space
                className={style.productsContainer}
                direction="vertical"
                size="middle"
            >
                <Space.Compact direction="horizontal">
                    <Search
                        placeholder="input search text"
                        allowClear
                        onSearch={onSearch}
                        style={{
                            width: 200,
                        }}
                    />
                    <Button icon={<CameraOutlined />} onClick={showModal} />
                </Space.Compact>
                <Modal
                    className={style.scannerModal}
                    destroyOnClose={true}
                    title="Scan barcode"
                    open={isModalOpen}
                    onOk={handleOk}
                    onCancel={handleCancelModal}
                >
                    <BarcodeScanner getBarcode={getBarcode} />
                </Modal>

                {barcode ? (
                    <Tag closable onClose={onCloseBarcodeTag}>
                        Barcode: {barcode}
                    </Tag>
                ) : null}

                <TabsComponent event={event} barcode={barcode} />
            </Space>
        </ContentLayout>
    );
};

export default TokoContent;
