import {
    Button,
    Upload,
    Modal,
    Col,
    Card,
    Row,
    Typography,
    message,
} from "antd";
import { PlusOutlined, UploadOutlined, FormOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import * as XLSX from "xlsx";

import { bulkCreateMenus } from "../../../store/reducers/menuReducer";

const REQUIRED_FIELDS = ["name", "price", "quantity"];

const normalizeKey = (key) => key?.toString().trim().toLowerCase();

const EventAddMenuModal = ({ event }) => {
    const dispatch = useDispatch();

    const [visible, setVisible] = useState(false);
    const router = useRouter();

    const { id: eventId } = router.query;
    const { Text, Title } = Typography;

    const handleUploadXlsx = (file) => {
        if (!file) return false;

        const reader = new FileReader();

        reader.onload = (e) => {
            try {
                const workbook = XLSX.read(e.target.result, {
                    type: "array",
                });

                const sheetName = workbook.SheetNames[0];
                const sheet = workbook.Sheets[sheetName];

                const rawRows = XLSX.utils.sheet_to_json(sheet, {
                    defval: "",
                });

                if (!rawRows.length) {
                    message.error("The uploaded file is empty");
                    return;
                }

                const parsedMenus = rawRows.map((row) => {
                    const normalizedRow = {};

                    Object.keys(row).forEach((key) => {
                        normalizedRow[normalizeKey(key)] = row[key];
                    });

                    for (const field of REQUIRED_FIELDS) {
                        if (
                            normalizedRow[field] === "" ||
                            normalizedRow[field] === null ||
                            typeof normalizedRow[field] === "undefined"
                        ) {
                            throw new Error(`"${field}" is required`);
                        }
                    }

                    return {
                        name: normalizedRow.name,
                        category: normalizedRow.category || null,
                        vendor: normalizedRow.vendor || null,
                        price: Number(normalizedRow.price),
                        quantity: Number(normalizedRow.quantity),
                        description: normalizedRow.description || null,
                    };
                });

                const payload = {
                    event: eventId,
                    menus: parsedMenus,
                };

                message.success(
                    `${parsedMenus.length} menu items parsed successfully`,
                );

                dispatch(bulkCreateMenus(payload));
            } catch (err) {
                message.error(err.message || "Failed to read .xlsx file");
            } finally {
                setVisible(false);
            }
        };

        reader.readAsArrayBuffer(file);

        return false;
    };

    return (
        <div>
            <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => setVisible(true)}>
                Add Item
            </Button>

            <Modal
                title={<Title level={4}>Add Menu Item</Title>}
                open={visible}
                onCancel={() => setVisible(false)}
                footer={null}
                centered
                bodyStyle={{ padding: "24px" }}>
                <Row gutter={[16, 16]}>
                    <Col span={24} sm={12} style={{ display: "flex" }}>
                        <Card
                            hoverable
                            style={{ textAlign: "center", flex: 1 }}
                            bodyStyle={{
                                padding: "24px",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                height: "100%",
                            }}
                            onClick={() => {
                                window.location.href = `/admin/database/menu/add?event=${
                                    event?._id || ""
                                }`;
                            }}>
                            <FormOutlined
                                style={{ fontSize: 32, color: "#1890ff" }}
                            />
                            <Title level={5} style={{ marginTop: 12 }}>
                                Add Manually
                            </Title>
                            <Text type="secondary">
                                Fill in the menu item manually
                            </Text>
                        </Card>
                    </Col>

                    <Col span={24} sm={12} style={{ display: "flex" }}>
                        <Card
                            style={{ textAlign: "center", flex: 1 }}
                            bodyStyle={{
                                padding: "24px",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                height: "100%",
                            }}>
                            <Upload
                                accept=".xlsx"
                                showUploadList={false}
                                beforeUpload={handleUploadXlsx}>
                                <Button
                                    type="default"
                                    icon={<UploadOutlined />}
                                    style={{ width: "100%" }}>
                                    Upload .xlsx File
                                </Button>
                            </Upload>
                            <Text
                                type="secondary"
                                style={{ display: "block", marginTop: 8 }}>
                                Import menu items from a spreadsheet
                            </Text>
                        </Card>
                    </Col>
                </Row>
            </Modal>
        </div>
    );
};

export default EventAddMenuModal;
