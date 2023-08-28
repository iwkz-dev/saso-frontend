import React from "react";
import Table from "../../Table";
import { useSelector } from "react-redux";

const PaymentTypeTable = ({ onDelete }) => {
    const paymentTypes = useSelector((state) => state.paymentType.paymentTypes);

    const tableHead = {
        type: "Type",
        created_at: "Created At",
        updated_at: "Updated At",
    };

    return (
        <Table
            data={paymentTypes}
            dataHead={tableHead}
            emptyMessage="Payment type is empty"
            linkToEdit="/payment-type/edit/"
            linkToView="/payment-type/view/"
            onDelete={onDelete}
        />
    );
};

export default PaymentTypeTable;
