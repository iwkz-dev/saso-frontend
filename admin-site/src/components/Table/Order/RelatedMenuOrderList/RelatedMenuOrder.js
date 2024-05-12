import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllEvents } from "../../../../store/reducers/eventReducer";
import { getAllCategories } from "../../../../store/reducers/categoryReducer";
import Table from "../../Table";
import { message } from "antd";

const RelatedMenuOrder = ({ menus }) => {
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.category.categories);
    const events = useSelector((state) => state.event.events);
    const [showTable, setShowTable] = useState(false);

    useEffect(() => {
        getAllData();
    }, []);

    const getAllData = async () => {
        try {
            const [eventsResponse, categoriesResponse] = await Promise.all([
                dispatch(getAllEvents()),
                dispatch(getAllCategories()),
            ]);

            if (
                eventsResponse.status !== "failed" &&
                categoriesResponse.status !== "failed"
            ) {
                setShowTable(true);
            } else {
                setShowTable(false);
                const errorMessage =
                    eventsResponse.status === "failed"
                        ? eventsResponse.message
                        : categoriesResponse.message;
                message.error(errorMessage);
            }
        } catch (error) {
            console.error("An error occurred:", error);
            // Handle the error appropriately, e.g., show a user-friendly message
        }
    };

    const [tableHead, setTableHead] = useState([]);

    useEffect(() => {
        setTableHead([
            {
                key: "name",
                dataIndex: "name",
                title: "Name",
            },
            {
                key: "price",
                dataIndex: "price",
                title: "Price (€)",
            },

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
        ]);
    }, [events, categories, menus]);

    console.log(tableHead);

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
