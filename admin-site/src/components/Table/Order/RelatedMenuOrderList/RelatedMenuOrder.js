import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllEvents } from "../../../../store/reducers/eventReducer";
import { getAllCategories } from "../../../../store/reducers/categoryReducer";
import Table from "../../Table";
import { message } from "antd";

const RelatedMenuOrder = ({ menus }) => {
    const dispatch = useDispatch();

    const categories = useSelector((s) => s?.category?.categories) ?? [];
    const events = useSelector((s) => s?.event?.events) ?? [];

    const [showTable, setShowTable] = useState(false);

    useEffect(() => {
        let mounted = true;

        (async () => {
            try {
                const [eventsResponse, categoriesResponse] = await Promise.all([
                    dispatch(getAllEvents()),
                    dispatch(getAllCategories()),
                ]);

                const eventsOk = eventsResponse?.status !== "failed";
                const categoriesOk = categoriesResponse?.status !== "failed";

                if (!mounted) return;

                if (eventsOk && categoriesOk) {
                    setShowTable(true);
                } else {
                    setShowTable(false);
                    const errorMessage = !eventsOk
                        ? eventsResponse?.message || "Failed to load events."
                        : categoriesResponse?.message ||
                          "Failed to load categories.";
                    message.error(errorMessage);
                }
            } catch (err) {
                if (!mounted) return;
                setShowTable(false);
                message.error(
                    err?.message || "Something went wrong loading data.",
                );
                console.error(err);
            }
        })();

        return () => {
            mounted = false;
        };
    }, [dispatch]);

    const tableHead = useMemo(
        () => [
            { key: "name", dataIndex: "name", title: "Name" },
            { key: "price", dataIndex: "price", title: "Price (€)" },
            {
                key: "totalPortion",
                dataIndex: "totalPortion",
                title: "Total Portion",
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
                    const rv = record?.category;
                    if (Array.isArray(rv))
                        return rv.map(String).includes(String(value));
                    return String(rv ?? "").includes(String(value));
                },
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
        ],
        [categories, events],
    );

    return (
        <Table
            data={showTable ? menus : []}
            dataHead={tableHead}
            events={events}
            categories={categories}
            emptyMessage="Menu is empty"
            actionsOff={true}
            isLoading={!showTable}
        />
    );
};

export default RelatedMenuOrder;
