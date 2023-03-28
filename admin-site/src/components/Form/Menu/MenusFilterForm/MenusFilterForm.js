import { Select, Space } from "antd";
import React from "react";
import { useSelector } from "react-redux";

const MenusFilterForm = ({ handleChange }) => {
    const events = useSelector((state) => state.event.events);
    const categories = useSelector((state) => state.category.categories);

    return (
        <Space>
            <Space direction="vertical">
                <span>Filter: </span>
                <span>Category: </span>
            </Space>
            <Space direction="vertical">
                <Space>
                    <Select
                        onChange={handleChange}
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
