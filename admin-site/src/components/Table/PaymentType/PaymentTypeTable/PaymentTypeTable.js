import React from "react";
import Table from "../../Table";
import { useSelector } from "react-redux";

const PaymentTypeTable = () => {
    const paymentTypes = useSelector((state) => state.paymentType.paymentTypes);

    const tableHead = {
        type: "Type",
    };

    return (
        <Table
            data={paymentTypes}
            dataHead={tableHead}
            emptyMessage="Payment type is empty"
            actionsOff={true}
        />
    );
};

export default PaymentTypeTable;
