import React from "react";
import Table from "../../Table";
import { useSelector } from "react-redux";

const CategoryTable = ({ onDelete }) => {
    const categories = useSelector((state) => state.category.categories);

    const tableHead = {
        name: "Name",
        created_at: "Created At",
        updated_at: "Updated At",
    };

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
