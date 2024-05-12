import React, { useEffect, useState } from "react";
import Table from "../../Table";
import { useSelector } from "react-redux";

const UserTable = ({ onDelete, isLoading, showTable }) => {
    const users = useSelector((state) => state.user.users);
    const [tableHead, setTableHead] = useState([]);

    useEffect(() => {
        setTableHead([
            {
                key: "fullname",
                dataIndex: "fullname",
                title: "Full Name",
            },
            {
                key: "email",
                dataIndex: "email",
                title: "Email",
            },
            {
                key: "isActive",
                dataIndex: "isActive",
                title: "Is Active",
            },
            {
                key: "phone",
                dataIndex: "phone",
                title: "Phone",
            },
            {
                key: "role",
                dataIndex: "role",
                title: "Role",
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
            data={showTable ? users : []}
            onDelete={onDelete}
            dataHead={tableHead}
            actionsOff={true}
            isLoading={isLoading}
        />
    );
};

export default UserTable;
