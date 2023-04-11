import React from "react";
import Table from "../../Table";
import { useSelector } from "react-redux";

const UserTable = ({ onDelete, isLoading, showTable }) => {
    const users = useSelector((state) => state.user.users);

    const tableHead = {
        fullname: "Fullname",
        email: "Email",
        isActive: "Is Active",
        phone: "Phone",
        role: "Role",
        created_at: "Created At",
        updated_at: "Updated At",
    };

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
