import { Space, Typography, Button, Upload, message, Spin } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import * as XLSX from "xlsx";

import AddItemButton from "../../../common/Button/AddItemButton/AddItemButton";
import MenuEventFilterForm from "../../../Form/Menu/MenuEventFilterForm/MenuEventFilterForm";
import RelatedMenuTable from "../../../Table/Event/RelatedMenuTable/RelatedMenuTable";
import {
    bulkCreateMenus,
    deleteMenu,
} from "../../../../store/reducers/menuReducer";
import { useState } from "react";

const REQUIRED_FIELDS = ["name", "price", "quantity"];

const normalizeKey = (key) => key?.toString().trim().toLowerCase();

const EventMenusTab = ({
    event,
    menus,
    setFilterMenuValues,
    filterMenuValues,
}) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const { id: eventId } = router.query;

    const onDelete = async (item) => {
        const ok = window.confirm(
            `Please confirm if you want to delete "${
                item?.name ?? "this category"
            }".`,
        );
        if (!ok) return;

        setLoading(true);
        try {
            const res = await dispatch(deleteMenu(item?._id));
            if (res?.status === "failed") {
                message.error(res?.message || "Failed to delete category");
            } else {
                message.success(res?.message || "Category deleted");
            }
        } finally {
            setLoading(false);
        }
    };

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

                    // Validation
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
            }
        };

        reader.readAsArrayBuffer(file);

        return false;
    };

    return (
        <Space direction="vertical" style={{ display: "flex" }}>
            <Typography.Title level={4}>Related Menu</Typography.Title>
            <Space.Compact block>
                <AddItemButton
                    hrefLink={`/database/menu/add?event=${event?._id || ""}`}
                    text="Add Menu for this Event"
                />

                <Upload
                    accept=".xlsx"
                    showUploadList={false}
                    beforeUpload={handleUploadXlsx}>
                    <Button icon={<DownloadOutlined />}>
                        Import from .xlsx file
                    </Button>
                </Upload>
            </Space.Compact>

            <MenuEventFilterForm
                setFilterValues={setFilterMenuValues}
                menus={menus}
            />

            <Spin spinning={loading}>
                <RelatedMenuTable
                    filterName="event"
                    itemFilter={event}
                    filterValues={filterMenuValues}
                    onDelete={onDelete}
                />
            </Spin>
        </Space>
    );
};

export default EventMenusTab;
