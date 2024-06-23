import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Table from "../../Table";

function MenuTable({ onDelete, isLoading, showTable }) {
    const menus = useSelector((state) => state.menu.menus);
    const events = useSelector((state) => state.event.events);
    const categories = useSelector((state) => state.category.categories);

    const [tableHead, setTableHead] = useState([]);

    useEffect(() => {
        setTableHead([
            {
                key: "name",
                dataIndex: "name",
                title: "Name",
            },
            {
                key: "category",
                dataIndex: "category",
                title: "Category",
                filterMode: "menu",
                filterSearch: true,
                filters: categories.map((category) => {
                    return {
                        text: category.name,
                        value: category._id,
                    };
                }),
                onFilter: (value, record) => {
                    return record.category.includes(value);
                },
            },
            {
                key: "price",
                dataIndex: "price",
                title: "Price (€)",
            },
            {
                key: "quantity",
                dataIndex: "quantity",
                title: "Quantity",
            },
            {
                key: "quantityOrder",
                dataIndex: "quantityOrder",
                title: "Ordered Quantity",
            },
            {
                key: "event",
                dataIndex: "event",
                title: "Event",
                filterMode: "menu",
                filterSearch: true,
                filters: events.map((event) => {
                    return {
                        text: event.name,
                        value: event._id,
                    };
                }),
                onFilter: (value, record) => {
                    return record.event.includes(value);
                },
            },
            {
                key: "note",
                dataIndex: "note",
                title: "Note",
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
    }, [events, menus]);

    return (
        <Table
            onDelete={onDelete}
            data={showTable ? menus : []}
            events={events}
            categories={categories}
            dataHead={tableHead}
            emptyMessage="Menu is empty"
            linkToEdit="/database/menu/edit/"
            linkToView="/database/menu/view/"
            isLoading={isLoading}
        />
    );
}

export default MenuTable;
