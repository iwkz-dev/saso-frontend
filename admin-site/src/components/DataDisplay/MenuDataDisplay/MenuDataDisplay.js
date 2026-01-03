import DataDisplay from "../DataDisplay";

const MenuDataDisplay = ({ menu }) => {
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
            linkToEdit={`/admin/database/menu/edit/${menu._id}`}
        />
    );
};

export default MenuDataDisplay;
