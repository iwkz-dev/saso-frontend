import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";
import Table from "../../Table";
import { getAllEvents } from "../../../../store/reducers/eventReducer";
import { getAllCategories } from "../../../../store/reducers/categoryReducer";
import { getAllMenus } from "../../../../store/reducers/menuReducer";

const RelatedMenuTable = ({ filterName, itemFilter, onDelete }) => {
    const dispatch = useDispatch();

    const menus = useSelector((s) => s.menu.menus) || [];
    const categories = useSelector((s) => s.category.categories) || [];
    const events = useSelector((s) => s.event.events) || [];

    const [loading, setLoading] = useState(true);
    const [canShow, setCanShow] = useState(false);

    useEffect(() => {
        let mounted = true;

        const load = async () => {
            // guard until we have the filter id and name
            if (!filterName || !itemFilter?._id) {
                setLoading(false);
                setCanShow(false);
                return;
            }

            setLoading(true);
            try {
                const filter = `?${encodeURIComponent(
                    filterName,
                )}=${encodeURIComponent(itemFilter._id)}`;

                await Promise.all([
                    dispatch(getAllEvents()),
                    dispatch(getAllCategories()),
                    dispatch(getAllMenus(filter)),
                ]);

                if (mounted) {
                    setCanShow(true);
                }
            } catch (err) {
                if (mounted) {
                    setCanShow(false);
                    message.error(
                        err?.message || "Failed to load related menus",
                    );
                }
            } finally {
                if (mounted) setLoading(false);
            }
        };

        load();
        return () => {
            mounted = false;
        };
    }, [dispatch, filterName, itemFilter?._id]);

    const tableHead = useMemo(
        () => [
            { key: "name", dataIndex: "name", title: "Name" },
            {
                key: "description",
                dataIndex: "description",
                title: "Description",
            },
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
                    const v = record.category;
                    return Array.isArray(v)
                        ? v.includes(value)
                        : String(v) === String(value);
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
                    const v = record.event;
                    return Array.isArray(v)
                        ? v.includes(value)
                        : String(v) === String(value);
                },
            },
            { key: "note", dataIndex: "note", title: "Note" },
            { key: "created_at", dataIndex: "created_at", title: "Created At" },
            { key: "updated_at", dataIndex: "updated_at", title: "Updated At" },
        ],
        [categories, events],
    );

    return (
        <Table
            onDelete={onDelete}
            data={canShow ? menus : []}
            events={events}
            categories={categories}
            dataHead={tableHead}
            emptyMessage="Menu is empty"
            linkToEdit="/database/menu/edit/"
            linkToView="/database/menu/view/"
            isLoading={loading}
        />
    );
};

export default RelatedMenuTable;
