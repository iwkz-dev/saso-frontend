import { useMemo } from "react";
import { useSelector } from "react-redux";

import Table from "../../Table";

const UserTable = ({ onDelete, isLoading, showTable }) => {
    const users = useSelector((state) => state?.user?.users) ?? [];

    const tableHead = useMemo(
        () => [
            { key: "fullname", dataIndex: "fullname", title: "Full Name" },
            { key: "email", dataIndex: "email", title: "Email" },
            { key: "isActive", dataIndex: "isActive", title: "Is Active" },
            { key: "phone", dataIndex: "phone", title: "Phone" },
            { key: "role", dataIndex: "role", title: "Role" },
            { key: "created_at", dataIndex: "created_at", title: "Created At" },
            { key: "updated_at", dataIndex: "updated_at", title: "Updated At" },
        ],
        [],
    );

    return (
        <Table
            data={showTable ? users : []}
            onDelete={onDelete}
            dataHead={tableHead}
            isLoading={isLoading}
        />
    );
};

export default UserTable;
