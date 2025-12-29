import { useCallback, useState } from "react";
import { Button, Input, Space, Popconfirm } from "antd";
import { useSelector } from "react-redux";
import { UploadOutlined } from "@ant-design/icons";

import MenuExportToXlsx from "../../../../helpers/ExportToXlsxFormat/MenuExportToXlsx";

const { Search } = Input;

const MenuEventFilterForm = ({ setFilterValues, menus }) => {
    const [inputValue, setInputValue] = useState("");

    const event = useSelector((s) => s.event.detailEvent);
    const vendors = useSelector((s) => s.vendor.vendors);
    const categories = useSelector((s) => s.category.categories);

    const updateFilter = useCallback(
        (value) => {
            setFilterValues((prev) => {
                const filters = Array.isArray(prev) ? prev : [];
                const otherFilters = filters.filter((f) => f.name !== "name");

                if (!value) return otherFilters;

                return [...otherFilters, { id: value, name: "name" }];
            });
        },
        [setFilterValues],
    );

    const handleSearch = (value) => {
        setInputValue(value);
        updateFilter(value);
    };

    return (
        <Space.Compact block>
            <Search
                placeholder="Search menu name"
                onSearch={handleSearch}
                onChange={(e) => handleSearch(e.target.value)}
                allowClear
                enterButton
                value={inputValue}
            />

            <Popconfirm
                title="Export to xlsx file"
                description="Are you sure you want to export menus to an xlsx file?"
                onConfirm={() =>
                    MenuExportToXlsx(menus, event, vendors, categories)
                }
                okText="Yes"
                cancelText="No">
                <Button icon={<UploadOutlined />} />
            </Popconfirm>
        </Space.Compact>
    );
};

export default MenuEventFilterForm;
