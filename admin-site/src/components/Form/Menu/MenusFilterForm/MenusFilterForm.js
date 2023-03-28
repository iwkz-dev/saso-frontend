import { Select, Space } from "antd";
import React from "react";
import { useSelector } from "react-redux";

const MenusFilterForm = ({ handleChange, filters }) => {
    const events = useSelector((state) => state.event.events);
    const categories = useSelector((state) => state.category.categories);

    return (
        <Space>
            <Space direction="vertical" size={16}>
                <span>Filter: </span>
                <span>Category: </span>
            </Space>
            <Space direction="vertical" size={16}>
                <Space>
                    <Select
                        onChange={handleChange}
                        defaultValue={JSON.stringify(
                            filters.find((f) => f.name === "event"),
                        )}
                        placeholder="Choose event"
                        options={events.map((event) => ({
                            value: JSON.stringify({
                                id: event._id,
                                name: "event",
                            }),
                            label: event.name,
                        }))}></Select>
                </Space>
                <Space>
                    <Select
                        onChange={handleChange}
                        placeholder="Choose category"
                        defaultValue={JSON.stringify(
                            filters.find((f) => f.name === "category"),
                        )}
                        options={categories.map((category) => ({
                            value: JSON.stringify({
                                id: category._id,
                                name: "category",
                            }),
                            label: category.name,
                        }))}></Select>
                </Space>
            </Space>
        </Space>
    );
};

export default MenusFilterForm;
