import React, { useEffect, useState } from "react";
import Table from "../../Table";
import { useSelector } from "react-redux";

const CategoryTable = ({ onDelete }) => {
    const categories = useSelector((state) => state.category.categories);
    const [tableHead, setTableHead] = useState([]);

    useEffect(() => {
        setTableHead([
            {
                key: "name",
                dataIndex: "name",
                title: "Name",
            },
            {
                key: "created_at",
                dataIndex: "created_at",
                title: "Created At",
            },
            {
                key: "updated_at",
                dataIndex: "updated_at",
                title: "Updated At",
            },
        ]);
    }, [categories]);

    return (
        <Table
            onDelete={onDelete}
            data={categories}
            dataHead={tableHead}
            emptyMessage="Category is empty"
            linkToEdit="/category/edit/"
            linkToView="/category/view/"
        />
    );
};

export default CategoryTable;
