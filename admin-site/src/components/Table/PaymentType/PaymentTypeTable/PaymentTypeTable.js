import { useMemo } from "react";
import { useSelector } from "react-redux";

import Table from "../../Table";

const PaymentTypeTable = ({ onDelete }) => {
    const paymentTypes =
        useSelector((state) => state?.paymentType?.paymentTypes) ?? [];
    const events = useSelector((s) => s?.event?.events) ?? [];

    const tableHead = useMemo(
        () => [
            { key: "name", dataIndex: "name", title: "Name" },
            { key: "type", dataIndex: "type", title: "Type" },
            { key: "note", dataIndex: "note", title: "Note" },
            { key: "created_at", dataIndex: "created_at", title: "Created At" },
            { key: "updated_at", dataIndex: "updated_at", title: "Updated At" },
        ],
        [],
    );

    return (
        <Table
            events={events}
            data={paymentTypes}
            dataHead={tableHead}
            emptyMessage="Payment type is empty"
            linkToEdit="/database/payment-type/edit/"
            onDelete={onDelete}
        />
    );
};

export default PaymentTypeTable;
