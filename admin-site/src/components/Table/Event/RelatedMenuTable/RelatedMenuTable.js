import React, { useEffect, useState } from "react";
import { getAllEvents } from "../../../../store/reducers/eventReducer";
import { getAllCategories } from "../../../../store/reducers/categoryReducer";
import { getAllMenus } from "../../../../store/reducers/menuReducer";
import { useDispatch, useSelector } from "react-redux";
import Table from "../../Table";
import { message } from "antd";

const RelatedMenuTable = ({ filterName, itemFilter, onDelete }) => {
    const dispatch = useDispatch();
    const menus = useSelector((state) => state.menu.menus);
    const categories = useSelector((state) => state.category.categories);
    const events = useSelector((state) => state.event.events);
    const [showTable, setShowTable] = useState(false);
    const [tableHead, setTableHead] = useState([]);

    useEffect(() => {
        getAllData();
    }, []);

    const getAllData = async () => {
        try {
            const filter = `?${filterName}=${itemFilter._id}`;
            const responses = await Promise.all([
                dispatch(getAllEvents()),
                dispatch(getAllCategories()),
                dispatch(getAllMenus(filter)),
            ]);

            if (!responses.some((r) => r?.status === "failed")) {
                setShowTable(true);
            } else {
                setShowTable(false);
                const failedResponse = responses.find(
                    (r) => r?.status === "failed",
                );
                message.error(failedResponse?.message);
            }
        } catch (error) {
            // Handle unexpected errors here
            console.error("Unexpected error:", error);
        }
    };

    useEffect(() => {
        setTableHead([
            {
                key: "name",
                dataIndex: "name",
                title: "Name",
            },
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
            linkToEdit="/menu/edit/"
            linkToView="/menu/view/"
            isLoading={!showTable}
        />
    );
};

export default RelatedMenuTable;
