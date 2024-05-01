import React from "react";
import { useSelector } from "react-redux";
import DataDisplay from "../DataDisplay";

const MenuDataDisplay = ({ menu }) => {
    const events = useSelector((state) => state.event.events);
    const categories = useSelector((state) => state.category.categories);

    const dataForm = {
        _id: "ID",
        name: "Name",
        barcode: "Barcode",
        description: "Description",
        price: "Price (€)",
        quantity: "Quantity",
        quantityOrder: "Ordered Quantity",
        category: "Category",
        event: "Event",
        images: "Image",
        created_at: "Created At",
        updated_at: "Updated At",
    };

    return (
        <DataDisplay
            item={menu}
            dataForm={dataForm}
            events={events}
            categories={categories}
            linkToEdit={`/admin/menu/edit/${menu._id}`}
        />
    );
};

export default MenuDataDisplay;
