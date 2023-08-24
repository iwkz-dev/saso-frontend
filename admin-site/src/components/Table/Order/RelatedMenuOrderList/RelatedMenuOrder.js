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

    const getAllData = () => {
        Promise.all([
            dispatch(getAllEvents()),
            dispatch(getAllCategories()),
        ]).then((responses) => {
            const failed = responses.find((r) => r?.status === "failed");
            if (!failed) {
                setShowTable(true);
            } else {
                setShowTable(false);
                message.error(failed.message);
            }
        });
    };

    const tableHead = {
        name: "Name",
        price: "Price (€)",
        totalPortion: "Total Portion",
        category: "Category",
        event: "Event",
    };

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
