import React from "react";
import DataDisplay from "../DataDisplay";

const CategoryDataDisplay = ({ category }) => {
    const dataForm = {
        _id: "ID",
        name: "Name",
        slug: "Slug",
        created_at: "Created At",
        updated_at: "Updated At",
    };

    return <DataDisplay item={category} dataForm={dataForm} />;
};

export default CategoryDataDisplay;
