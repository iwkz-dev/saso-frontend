import { useMemo } from "react";
import { useSelector } from "react-redux";

import Table from "../../Table";

function MenuTable({ onDelete, isLoading, showTable }) {
    const menus = useSelector((state) => state?.menu?.menus) ?? [];
    const events = useSelector((state) => state?.event?.events) ?? [];
    const categories =
        useSelector((state) => state?.category?.categories) ?? [];
    const vendors = useSelector((state) => state?.vendor?.vendors) ?? [];

    const refMap = useMemo(
        () =>
            new Map([
                ["events", events],
                ["categories", categories],
                ["vendors", vendors],
            ]),
        [events, categories, vendors],
    );

    const tableHead = useMemo(
        () => [
            { key: "name", dataIndex: "name", title: "Name" },
            {
                key: "category",
                dataIndex: "category",
                title: "Category",
                filterMode: "menu",
                filterSearch: true,
                filters: categories.map((c) => ({
                    text: c.name,
                    value: c._id,
                })),
                onFilter: (value, record) => {
                    const rv = record?.category;
                    if (Array.isArray(rv))
                        return rv.map(String).includes(String(value));
                    return String(rv ?? "").includes(String(value));
                },
            },
            {
                key: "vendor",
                dataIndex: "vendor",
                title: "Vendor",
                filterMode: "menu",
                filterSearch: true,
                filters: vendors.map((v) => ({ text: v.name, value: v._id })),
                onFilter: (value, record) => {
                    const rv = record?.vendor;
                    if (Array.isArray(rv))
                        return rv.map(String).includes(String(value));
                    return String(rv ?? "").includes(String(value));
                },
            },
            { key: "price", dataIndex: "price", title: "Price (€)" },
            { key: "quantity", dataIndex: "quantity", title: "Quantity" },
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
                filters: events.map((e) => ({ text: e.name, value: e._id })),
                onFilter: (value, record) => {
                    const rv = record?.event;
                    if (Array.isArray(rv))
                        return rv.map(String).includes(String(value));
                    return String(rv ?? "").includes(String(value));
                },
            },
            { key: "note", dataIndex: "note", title: "Note" },
            { key: "created_at", dataIndex: "created_at", title: "Created At" },
            { key: "updated_at", dataIndex: "updated_at", title: "Updated At" },
        ],
        [categories, vendors, events],
    );

    return (
        <Table
            onDelete={onDelete}
            data={showTable ? menus : []}
            refMap={refMap}
            dataHead={tableHead}
            emptyMessage="Menu is empty"
            linkToEdit="/database/menu/edit/"
            linkToView="/database/menu/view/"
            isLoading={isLoading}
        />
    );
}

export default MenuTable;
