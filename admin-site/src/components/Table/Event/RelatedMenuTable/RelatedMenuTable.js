import React, { useEffect, useState } from "react";
import { getAllEvents } from "../../../../store/reducers/eventReducer";
import { getAllCategories } from "../../../../store/reducers/categoryReducer";
import { getAllMenus } from "../../../../store/reducers/menuReducer";
import { useDispatch, useSelector } from "react-redux";
import Table from "../../Table";
import Loading from "../../../common/Loading/Loading";

const RelatedMenuTable = ({ filterName, itemFilter, onDelete }) => {
    const dispatch = useDispatch();
    const menus = useSelector((state) => state.menu.menus);
    const categories = useSelector((state) => state.category.categories);
    const events = useSelector((state) => state.event.events);

    const [showTable, setShowTable] = useState(false);
    const [showError, setShowError] = useState("");

    useEffect(() => {
        getAllData();
    }, []);

    const getAllData = () => {
        const filter = `?${filterName}=${itemFilter._id}`;
        setShowError("");
        Promise.all([
            dispatch(getAllEvents()),
            dispatch(getAllCategories()),
            dispatch(getAllMenus(filter)),
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
        description: "Description",
        category: "Category",
        price: "Price (€)",
        quantity: "Quantity",
        images: "Image",
        event: "Event",
        created_at: "Created At",
        updated_at: "Updated At",
    };

    return (
        <>
            {showTable ? (
                <Table
                    onDelete={onDelete}
                    items={menus}
                    events={events}
                    categories={categories}
                    tableHead={tableHead}
                    emptyMessage="Menu is empty"
                    linkToEdit="/menu/edit/"
                    linkToView="/menu/view/"
                />
            ) : (
                <Loading />
            )}
            {showError || ""}
        </>
    );
};

export default RelatedMenuTable;
