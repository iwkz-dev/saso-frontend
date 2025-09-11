import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import Table from "../../Table";

const CategoryTable = ({ onDelete, isLoading = false, showTable = true }) => {
    const categories = useSelector((state) => state.category.categories) || [];

    const tableHead = useMemo(
        () => [
            { key: "name", dataIndex: "name", title: "Name" },
            { key: "created_at", dataIndex: "created_at", title: "Created At" },
            { key: "updated_at", dataIndex: "updated_at", title: "Updated At" },
        ],
        [],
    );

    return (
        <Table
            onDelete={onDelete}
            data={showTable ? categories : []}
            dataHead={tableHead}
            emptyMessage="Category is empty"
            linkToEdit="/database/category/edit/"
            linkToView="/database/category/view/"
            isLoading={isLoading}
        />
    );
};

export default CategoryTable;
