import React, { useEffect, useState } from "react";
import Table from "../../Table";
import { useSelector } from "react-redux";

const PaymentTypeTable = ({ onDelete }) => {
    const paymentTypes = useSelector((state) => state.paymentType.paymentTypes);
    const [tableHead, setTableHead] = useState([]);

    useEffect(() => {
        setTableHead([
            {
                key: "type",
                dataIndex: "type",
                title: "Type",
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
    }, []);

    return (
        <Table
            data={paymentTypes}
            dataHead={tableHead}
            emptyMessage="Payment type is empty"
            linkToEdit="/database/payment-type/edit/"
            onDelete={onDelete}
        />
    );
};

export default PaymentTypeTable;
