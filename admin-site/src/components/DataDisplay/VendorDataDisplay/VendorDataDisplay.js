import React from "react";
import DataDisplay from "../DataDisplay";

const VendorDataDisplay = ({ vendor }) => {
    const dataForm = {
        _id: "ID",
        name: "Name",
        slug: "Slug",
        created_at: "Created At",
        updated_at: "Updated At",
    };

    return (
        <DataDisplay
            item={vendor}
            dataForm={dataForm}
            linkToEdit={`/admin/database/vendor/edit/${vendor._id}`}
        />
    );
};

export default VendorDataDisplay;
