import React from "react";
import { Input } from "antd";

const OrderFilterForm = ({ filters, setFilters }) => {
    const Search = Input.Search;

    const handleChange = (value) => {
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

    return (
        <Search
            placeholder="input search text"
            onSearch={handleChange}
            enterButton
        />
    );
};

export default OrderFilterForm;
