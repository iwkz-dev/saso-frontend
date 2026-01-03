import { Button, Descriptions, Image, Space, Typography, Modal } from "antd";
import { formatDate } from "../../helpers/dateHelper";
import { useState } from "react";

const DataDisplay = ({ item, dataForm, linkToEdit }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const imageColumnHandler = (data) => {
        if (data.length > 0) {
            return data.map((d) => (
                <Image key={d.eTag} width={75} src={d.imageUrl} />
            ));
        }
    };

    const getStatusTitle = (statusValue) => {
        switch (statusValue) {
            case 0:
                return "Draft";
            case 1:
                return "Approved";
            case 2:
                return "Done";
            default:
                return "No Status";
        }
    };

    const columnHandler = (key, i) => {
        let value = "No data";
        if (key === "created_at" || key === "updated_at") {
            value = formatDate(item[key], true, true);
        } else if (key === "description") {
            value = (
                <Typography.Paragraph
                    style={{
                        "white-space": "unset",
                    }}
                    ellipsis={{
                        rows: 2,
                        expandable: true,
                    }}
                    title={item[key]}>
                    {item[key]}
                </Typography.Paragraph>
            );
        } else if (key === "status") {
            value = getStatusTitle(item[key]);
        } else if (key === "started_at") {
            value = formatDate(item[key], false, true);
        } else if (key === "images") {
            value = <Space>{imageColumnHandler(item[key])}</Space>;
        } else if (
            Array.isArray(item[key]) &&
            item[key].length > 0 &&
            typeof item[key][0] === "object" &&
            item[key][0]._id &&
            item[key][0].name
        ) {
            value = (
                <Space>
                    {item[key].map((obj) => (
                        <Button
                            key={obj._id}
                            type="link"
                            onClick={() => {
                                setSelectedItem(obj);
                                setModalVisible(true);
                            }}>
                            {obj.name}
                        </Button>
                    ))}
                </Space>
            );
        } else if (
            typeof item[key] === "object" &&
            item[key] !== null &&
            item[key]._id &&
            item[key].name
        ) {
            value = (
                <Button
                    type="link"
                    onClick={() => {
                        setSelectedItem(item[key]);
                        setModalVisible(true);
                    }}>
                    {item[key].name}
                </Button>
            );
        } else {
            value = item[key];
        }
        return (
            <Descriptions.Item key={key + i} label={dataForm[key]}>
                {value ?? ""}
            </Descriptions.Item>
        );
    };

    return (
        <>
            <Descriptions
                title="Detail Information"
                layout="vertical"
                bordered
                extra={
                    linkToEdit ? (
                        <Button type="link" href={linkToEdit}>
                            Edit
                        </Button>
                    ) : (
                        ""
                    )
                }>
                {Object.keys(dataForm).map((key, i) => columnHandler(key, i))}
            </Descriptions>
            <Modal
                title={`Details for ${selectedItem?.name || "Item"}`}
                open={modalVisible}
                onCancel={() => setModalVisible(false)}
                footer={null}>
                {selectedItem ? (
                    <Descriptions size="small" column={1}>
                        {Object.entries(selectedItem).map(([k, v]) => (
                            <Descriptions.Item key={k} label={k}>
                                {String(v)}
                            </Descriptions.Item>
                        ))}
                    </Descriptions>
                ) : (
                    <p>No item selected.</p>
                )}
            </Modal>
        </>
    );
};

export default DataDisplay;
