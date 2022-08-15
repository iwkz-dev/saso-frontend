import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllEvents } from "../../../../store/reducers/eventReducer";
import { getAllCategories } from "../../../../store/reducers/categoryReducer";
import Table from "../../Table";
import Loading from "../../../common/Loading/Loading";

const RelatedMenuOrder = ({ menus }) => {
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.category.categories);
    const events = useSelector((state) => state.event.events);

    const [showTable, setShowTable] = useState(false);
    const [showError, setShowError] = useState("");

    useEffect(() => {
        getAllData();
    }, []);

    const getAllData = () => {
        setShowError("");
        Promise.all([
            dispatch(getAllEvents()),
            dispatch(getAllCategories()),
        ]).then((responses) => {
            const failed = responses.find((r) => r?.status === "failed");
            if (!failed) {
                setShowTable(true);
            } else {
                setShowTable(false);
                setShowError(failed.message);
            }
        });
    };

    const tableHead = {
        name: "Name",
        category: "Category",
        price: "Price (€)",
        quantityOrder: "Quantity Order",
        images: "Image",
        event: "Event",
        totalPortion: "Total Portion",
    };

    return (
        <>
            {showTable ? (
                <Table
                    items={menus}
                    tableHead={tableHead}
                    events={events}
                    categories={categories}
                    emptyMessage="Menu is empty"
                    actionsOff={true}
                />
            ) : (
                <Loading />
            )}
            {showError || ""}
        </>
    );
};

export default RelatedMenuOrder;
