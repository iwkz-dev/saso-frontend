import React from "react";
import { useSelector } from "react-redux";
import Table from "../../Table";

function MenuTable({ onDelete }) {
    const menus = useSelector((state) => state.menu.menus);
    const events = useSelector((state) => state.event.events);
    const categories = useSelector((state) => state.category.categories);

    const tableHead = {
        name: "Name",
        category: "Category",
        price: "Price (€)",
        quantity: "Quantity",
        quantityOrder: "Ordered Quantity",
        event: "Event",
        created_at: "Created At",
        updated_at: "Updated At",
    };

    return (
        <Table
            onDelete={onDelete}
            data={menus}
            events={events}
            categories={categories}
            dataHead={tableHead}
            emptyMessage="Menu is empty"
            linkToEdit="/menu/edit/"
            linkToView="/menu/view/"
        />
    );
}

export default MenuTable;
