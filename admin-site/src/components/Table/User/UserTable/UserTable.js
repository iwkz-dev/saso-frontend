import React from "react";
import Table from "../../Table";
import { useSelector } from "react-redux";

const UserTable = ({ onDelete }) => {
    const categories = useSelector((state) => state.user.users);

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
            onDelete={onDelete}
            data={categories}
            dataHead={tableHead}
            emptyMessage="User is empty"
            linkToEdit="/user/edit/"
        />
    );
};

export default UserTable;
