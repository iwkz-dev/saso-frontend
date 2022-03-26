import React from "react";
import { useSelector } from "react-redux";
import Table from "../../Table";

function MenuTable({ onDelete }) {
    const menus = useSelector((state) => state.menu.menus);
    const events = useSelector((state) => state.event.events);
    const categories = useSelector((state) => state.category.categories);

    const tableHead = {
        name: "Name",
        description: "Description",
        category: "Category",
        price: "Price (€)",
        quantity: "Quantity",
        images: "Image",
        event: "Event",
        created_at: "Created At",
        updated_at: "Updated At",
    };

    return (
        <Table
            onDelete={onDelete}
            items={menus}
            events={events}
            categories={categories}
            tableHead={tableHead}
            emptyMessage="Event is empty"
            linkToEdit="/menu/edit/"
        />
    );
}

export default MenuTable;
