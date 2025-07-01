import React, { useEffect, useState } from "react";
import Table from "../../Table";
import { useSelector } from "react-redux";

const VendorTable = ({ onDelete }) => {
    const vendors = useSelector((state) => state.vendor.vendors);
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
    }, [vendors]);

    return (
        <Table
            onDelete={onDelete}
            data={vendors}
            dataHead={tableHead}
            emptyMessage="Vendor is empty"
            linkToEdit="/database/vendor/edit/"
            linkToView="/database/vendor/view/"
        />
    );
};

export default VendorTable;
